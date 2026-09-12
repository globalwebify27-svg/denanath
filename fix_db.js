const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fetch = require('node-fetch');

async function main() {
  const url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'X-User-Name': 'dmhPhr-api', 'X-Pass-Phrase': 'Phr25@DMH', 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'drAhis', jsonKey: 'drAhisJSON' })
  });
  const data = await response.json();
  const docs = data?.drAhisJSON || [];
  
  const groupedDocs = new Map();
  for (const doc of docs) {
    const originalDoctorId = String(doc.doctor_id || '');
    const originalSpecialityId = String(doc.speciality_id || '').trim();
    const dmhDoctorId = `${originalDoctorId}_${originalSpecialityId}`;
    if (!originalDoctorId || originalDoctorId === 'undefined') continue;
    const rawName = String(doc.doctor_name || '').trim();
    if (!rawName) continue;
    
    if (!groupedDocs.has(dmhDoctorId)) {
      groupedDocs.set(dmhDoctorId, {
        dmhDoctorId,
        rawNames: new Set(),
        specNames: new Set(),
        specIds: new Set(),
        qualifications: new Set(),
        gender: doc.gender,
        consultantType: doc.consultant_type,
        hasOpdSchedule: false,
        opdTimings: []
      });
    }
    
    const group = groupedDocs.get(dmhDoctorId);
    group.rawNames.add(rawName);
    if (doc.speciality_name) group.specNames.add(doc.speciality_name.trim());
    if (doc.speciality_id) group.specIds.add(String(doc.speciality_id).trim());
    if (doc.qualification) group.qualifications.add(doc.qualification.trim());
    if (doc.OpdScheduleYN === 'Yes') group.hasOpdSchedule = true;
  }
  
  const validDmhDoctorIds = Array.from(groupedDocs.keys());
  console.log(`Valid API keys: ${validDmhDoctorIds.length}`);

  let created = 0, updated = 0;
  for (const [dmhDoctorId, group] of groupedDocs.entries()) {
    const rawName = Array.from(group.rawNames)[0];
    const strippedName = rawName.replace(/\s*\(.*?\)\s*/g, '').trim();
    const formattedName = strippedName.startsWith('Dr.') ? strippedName : 'Dr. ' + strippedName.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase());
    
    const combinedSpecs = Array.from(group.specNames).join(' & ');
    const combinedSpecIds = Array.from(group.specIds).join(',');
    const combinedQuals = Array.from(group.qualifications).join(', ') || 'Consultant';
    
    let existingDoc = await prisma.doctor.findUnique({ where: { dmhDoctorId } });
    if (!existingDoc) {
      existingDoc = await prisma.doctor.findUnique({ where: { id: dmhDoctorId } });
    }
    
    const syncData = {
      name: formattedName, specialty: combinedSpecs, qualifications: combinedQuals,
      dmhSpecialityId: combinedSpecIds, gender: group.gender || null, consultantType: group.consultantType || null,
      hasOpdSchedule: group.hasOpdSchedule, timings: null, dmhDoctorId
    };
    
    if (existingDoc) {
      await prisma.doctor.update({ where: { id: existingDoc.id }, data: syncData });
      updated++;
    } else {
      await prisma.doctor.create({ data: { id: dmhDoctorId, ...syncData } });
      created++;
    }
  }
  
  const deleteResult = await prisma.doctor.deleteMany({
    where: {
      dmhDoctorId: { notIn: validDmhDoctorIds, not: null }
    }
  });
  
  console.log(`Created: ${created}, Updated: ${updated}, Deleted: ${deleteResult.count}`);
  console.log(`Final DB count: ${await prisma.doctor.count()}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
