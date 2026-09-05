/**
 * DOCTOR DATA RESET & SYNC SCRIPT
 * 
 * Phases:
 *  0. Full DB backup → doctor-full-backup.json
 *  1. Build image/content recovery maps from backup
 *  2. Clear Doctor table
 *  3. Sync 499 doctors from DMH API
 *  4. Auto re-apply images + rich content
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const BACKUP_FILE = path.join(__dirname, 'doctor-full-backup.json');
const DMH_API_URL = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php';
const DMH_HEADERS = {
  'X-User-Name': 'dmhPhr-api',
  'X-Pass-Phrase': 'Phr25@DMH',
  'Content-Type': 'application/json'
};

function normalizeName(name) {
  return (name || '')
    .replace(/^Dr\.\s*/i, '')
    .replace(/^Miss\.\s*/i, '')
    .replace(/^Mr\.\s*/i, '')
    .replace(/\(.*?\)/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

async function fetchApiDoctors() {
  const res = await fetch(DMH_API_URL, {
    method: 'POST',
    headers: DMH_HEADERS,
    body: JSON.stringify({ action: 'drAhis' })
  });
  const data = await res.json();
  return data.drAhisJSON || (Array.isArray(data) ? data : []);
}

async function main() {
  console.log('='.repeat(60));
  console.log('  DOCTOR DATA RESET & SYNC');
  console.log('='.repeat(60));

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 0: Full DB Backup
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n[Phase 0] Creating full DB backup...');
  
  const allDoctors = await prisma.doctor.findMany();
  fs.writeFileSync(BACKUP_FILE, JSON.stringify(allDoctors, null, 2), 'utf8');
  
  const backupSizeMb = (fs.statSync(BACKUP_FILE).size / 1024 / 1024).toFixed(2);
  console.log(`✓ Backup saved: doctor-full-backup.json (${allDoctors.length} doctors, ${backupSizeMb} MB)`);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 1: Build Recovery Maps
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n[Phase 1] Building image + content recovery maps...');

  // Map A: doctor_code (from image URL) → full data
  const mapByUrlId = {};
  // Map B: normalized name → full data
  const mapByName = {};
  // Map C: existing dmhDoctorId → full data (direct match, most accurate)
  const mapByDmhId = {};

  for (const doc of allDoctors) {
    const payload = {
      image: doc.image || null,
      education: doc.education || null,
      training: doc.training || null,
      experience: doc.experience || null,
      publications: doc.publications || null,
      timings: doc.timings || null,
      seoMetaTitle: doc.seoMetaTitle || null,
      seoMetaDescription: doc.seoMetaDescription || null,
      seoKeywords: doc.seoKeywords || null,
    };

    // Only add to map if there's something worth preserving
    const hasValue = Object.values(payload).some(v => v !== null);
    if (!hasValue) continue;

    // Map C: by dmhDoctorId (direct match)
    if (doc.dmhDoctorId) {
      mapByDmhId[doc.dmhDoctorId] = payload;
    }

    // Map A: extract URL ID from image
    if (doc.image) {
      const urlMatch = doc.image.match(/\/(\d+)_Pic/i);
      if (urlMatch) {
        mapByUrlId[urlMatch[1]] = payload;
      }
    }

    // Map B: by normalized name
    const norm = normalizeName(doc.name);
    if (norm) {
      mapByName[norm] = payload;
      // Also try reversed (last first_name → first_name last_name)
      const parts = norm.split(' ');
      if (parts.length >= 2) {
        const reversed = parts.slice(1).join(' ') + ' ' + parts[0];
        mapByName[reversed] = payload;
      }
    }
  }

  console.log(`✓ Map by dmhDoctorId: ${Object.keys(mapByDmhId).length} entries`);
  console.log(`✓ Map by URL ID:      ${Object.keys(mapByUrlId).length} entries`);
  console.log(`✓ Map by name:        ${Object.keys(mapByName).length} entries`);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 2: Clear Doctor Table
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n[Phase 2] Clearing Doctor table...');
  const deleted = await prisma.doctor.deleteMany({});
  console.log(`✓ Deleted ${deleted.count} doctor records`);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 3: Sync from API
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n[Phase 3] Fetching doctors from DMH API...');
  const apiDoctors = await fetchApiDoctors();
  console.log(`✓ API returned ${apiDoctors.length} doctors`);

  // Deduplicate by doctor_code (some doctors have multiple specialties)
  const seen = new Set();
  const uniqueApiDoctors = [];
  for (const doc of apiDoctors) {
    const code = String(doc.doctor_code || '');
    if (!code || seen.has(code)) continue;
    seen.add(code);
    uniqueApiDoctors.push(doc);
  }
  console.log(`✓ Unique doctors after dedup: ${uniqueApiDoctors.length}`);

  let inserted = 0;
  let insertErrors = 0;

  for (const doc of uniqueApiDoctors) {
    const dmhDoctorId = String(doc.doctor_code);
    const rawName = String(doc.doctor_name || `${doc.first_name || ''} ${doc.last_name || ''}`).trim();
    
    // Format name nicely
    const strippedName = rawName.replace(/\s*\(.*?\)\s*/g, '').trim();
    const formattedName = strippedName.match(/^(Dr\.|Miss\.|Mr\.)/i)
      ? strippedName
      : 'Dr. ' + strippedName;

    try {
      await prisma.doctor.create({
        data: {
          dmhDoctorId,
          name: formattedName,
          specialty: doc.speciality_name || null,
          qualifications: doc.qualification || 'Consultant',
          dmhSpecialityId: String(doc.speciality_id || ''),
          gender: doc.gender || null,
          consultantType: doc.consultant_type || null,
          hasOpdSchedule: doc.OpdScheduleYN === 'Yes',
          isAppAllowed: true,
        }
      });
      inserted++;
    } catch (err) {
      console.error(`  ✗ Failed to insert ${formattedName} (${dmhDoctorId}):`, err.message);
      insertErrors++;
    }
  }

  console.log(`✓ Inserted ${inserted} doctors (${insertErrors} errors)`);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PHASE 4: Auto Re-apply Images + Rich Content
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n[Phase 4] Restoring images + rich content...');

  const freshDoctors = await prisma.doctor.findMany({
    select: { id: true, name: true, dmhDoctorId: true }
  });

  let restored = 0;
  let notMatched = [];

  for (const doc of freshDoctors) {
    let payload = null;
    let matchMethod = '';

    // Method 1: direct dmhDoctorId match (most accurate)
    if (!payload && doc.dmhDoctorId && mapByDmhId[doc.dmhDoctorId]) {
      payload = mapByDmhId[doc.dmhDoctorId];
      matchMethod = 'dmhId';
    }

    // Method 2: URL ID match (doctor_code is often the image URL number)
    if (!payload && doc.dmhDoctorId && mapByUrlId[doc.dmhDoctorId]) {
      payload = mapByUrlId[doc.dmhDoctorId];
      matchMethod = 'urlId';
    }

    // Method 3: normalized name match
    if (!payload) {
      const norm = normalizeName(doc.name);
      if (mapByName[norm]) {
        payload = mapByName[norm];
        matchMethod = 'name';
      }
    }

    if (payload) {
      // Only update if there's actual content to restore
      const updateData = {};
      if (payload.image) updateData.image = payload.image;
      if (payload.education) updateData.education = payload.education;
      if (payload.training) updateData.training = payload.training;
      if (payload.experience) updateData.experience = payload.experience;
      if (payload.publications) updateData.publications = payload.publications;
      if (payload.timings) updateData.timings = payload.timings;
      if (payload.seoMetaTitle) updateData.seoMetaTitle = payload.seoMetaTitle;
      if (payload.seoMetaDescription) updateData.seoMetaDescription = payload.seoMetaDescription;
      if (payload.seoKeywords) updateData.seoKeywords = payload.seoKeywords;

      if (Object.keys(updateData).length > 0) {
        await prisma.doctor.update({
          where: { id: doc.id },
          data: updateData
        });
        restored++;
        if (restored <= 10) {
          console.log(`  ✓ [${matchMethod}] ${doc.name} → restored: ${Object.keys(updateData).join(', ')}`);
        }
      }
    } else {
      notMatched.push(doc.name);
    }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FINAL REPORT
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n' + '='.repeat(60));
  console.log('  SYNC COMPLETE — REPORT');
  console.log('='.repeat(60));

  const finalCount = await prisma.doctor.count();
  const withImage = await prisma.doctor.count({ where: { image: { not: null } } });
  const withRich = await prisma.doctor.count({ where: { OR: [{ education: { not: null } }, { experience: { not: null } }, { publications: { not: null } }] } });

  console.log(`\n✅ Total doctors in DB:          ${finalCount}`);
  console.log(`✅ Doctors with image:           ${withImage}`);
  console.log(`✅ Doctors with rich content:    ${withRich}`);
  console.log(`✅ Records restored from backup: ${restored}`);
  console.log(`⚠️  Doctors with no match:        ${notMatched.length}`);

  if (notMatched.length > 0) {
    console.log('\n--- Doctors that could NOT be matched (may need manual image) ---');
    notMatched.forEach(n => console.log('  -', n));
  }

  console.log('\n✅ Backup file preserved at: doctor-full-backup.json');
  console.log('='.repeat(60));
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error('\n❌ FATAL ERROR:', e.message);
    console.error('The database may be in a partial state. Restore from doctor-full-backup.json if needed.');
    process.exit(1);
  });
