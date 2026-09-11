import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { callDMHApi } from '@/lib/dmhApi';

const dayNames: Record<string, string> = {
  Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday'
};

const formatTime = (t: string) => {
  if (!t) return '';
  const parts = t.split(':');
  if (parts.length < 2) return t;
  const hour = parseInt(parts[0], 10);
  const m = parts[1];
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${m} ${ampm}`;
};

export async function POST(req: Request) {
  try {
    // 1. Fetch all doctors from DMH API using drAhis endpoint
    const docRes = await callDMHApi('drAhis');
    const docs = docRes?.drAhisJSON || (Array.isArray(docRes) ? docRes : []);

    if (!Array.isArray(docs) || docs.length === 0) {
      return NextResponse.json({ error: 'No doctors returned from DMH API' }, { status: 400 });
    }

    // 2. Group doctors by dmhDoctorId to merge multiple specialties and timings
    const groupedDocs = new Map<string, any>();

    for (const doc of docs) {
      const dmhDoctorId = String(doc.doctor_id || '');
      if (!dmhDoctorId || dmhDoctorId === 'undefined') continue;

      const rawName = String(doc.doctor_name || `${doc.first_name || ''} ${doc.last_name || ''}`).trim();
      if (!rawName) continue;

      if (!groupedDocs.has(dmhDoctorId)) {
        groupedDocs.set(dmhDoctorId, {
          dmhDoctorId,
          rawNames: new Set<string>(),
          specNames: new Set<string>(),
          specIds: new Set<string>(),
          qualifications: new Set<string>(),
          gender: String(doc.gender || ''),
          consultantType: String(doc.consultant_type || ''),
          isAppAllowed: false,
          hasOpdSchedule: false,
          opdTimings: [] as any[]
        });
      }

      const group = groupedDocs.get(dmhDoctorId);
      group.rawNames.add(rawName);

      const specName = String(doc.speciality_name || '').trim();
      if (specName) group.specNames.add(specName);

      const specId = String(doc.speciality_id || '').trim();
      if (specId) group.specIds.add(specId);

      const qual = String(doc.qualification || doc.qualifications || '').trim();
      if (qual) group.qualifications.add(qual);

      if (doc.OpdScheduleYN === 'Yes') group.hasOpdSchedule = true;

      // Extract and format opdSchedule
      if (doc.OpdScheduleYN === 'Yes' && doc.opdSchedule) {
        const processSchedule = (sched: any) => {
          if (!sched || !sched.opdday || !sched.frmtime) return;
          const branch = specName || sched.opdtyp || 'General OPD';
          const day = dayNames[sched.opdday] || sched.opdday;
          const time = `${formatTime(sched.frmtime)} - ${formatTime(sched.totime)}`;
          // Avoid exact duplicates per branch
          const exists = group.opdTimings.find((t: any) => t.branch === branch && t.day === day && t.time === time);
          if (!exists) {
            group.opdTimings.push({ 
              branch, 
              day, 
              time, 
              speciality_id: String(doc.speciality_id || '').trim(),
              opdtyp: sched.opdtyp 
            });
          }
        };

        if (Array.isArray(doc.opdSchedule)) {
          doc.opdSchedule.forEach(processSchedule);
        } else {
          processSchedule(doc.opdSchedule);
        }
      }
    }

    let synced = 0;
    let errors = 0;
    const validDmhDoctorIds = Array.from(groupedDocs.keys());

    // 3. Upsert each grouped doctor profile
    for (const [dmhDoctorId, group] of groupedDocs.entries()) {
      const rawName = Array.from(group.rawNames)[0] as string;
      const strippedName = rawName.replace(/\s*\(.*?\)\s*/g, '').trim();
      const formattedName = strippedName.startsWith('Dr.')
        ? strippedName
        : 'Dr. ' + strippedName.replace(/\w\S*/g, (w: string) =>
          w.charAt(0).toUpperCase() + w.substring(1).toLowerCase()
        );

      const combinedSpecs = Array.from(group.specNames).join(' & ');
      const combinedSpecIds = Array.from(group.specIds).join(',');
      const combinedQuals = Array.from(group.qualifications).join(', ') || 'Consultant';

      // Timings Fallback Logic
      let finalTimings = null;
      if (group.opdTimings.length > 0) {
        finalTimings = JSON.stringify(group.opdTimings);
      } else {
        // Fallback to manual entry if API provided no schedules
        const existingDoc = await prisma.doctor.findUnique({
          where: { dmhDoctorId }
        });
        if (existingDoc && existingDoc.timings) {
          finalTimings = existingDoc.timings;
        }
      }

      try {
        await prisma.doctor.upsert({
          where: { dmhDoctorId },
          update: {
            name: formattedName,
            specialty: combinedSpecs,
            qualifications: combinedQuals,
            dmhSpecialityId: combinedSpecIds,
            gender: group.gender || null,
            consultantType: group.consultantType || null,
            hasOpdSchedule: group.hasOpdSchedule,
            timings: finalTimings,
          },
          create: {
            id: dmhDoctorId,
            dmhDoctorId,
            name: formattedName,
            specialty: combinedSpecs,
            qualifications: combinedQuals,
            dmhSpecialityId: combinedSpecIds,
            gender: group.gender || null,
            consultantType: group.consultantType || null,
            hasOpdSchedule: group.hasOpdSchedule,
            timings: finalTimings,
          },
        });
        synced++;
      } catch (err) {
        console.error(`Failed to upsert doctor ${formattedName}`, err);
        errors++;
      }
    }

    // 4. Remove stale doctors that no longer exist in the API
    let deletedCount = 0;
    if (validDmhDoctorIds.length > 0) {
      const deleteResult = await prisma.doctor.deleteMany({
        where: {
          dmhDoctorId: {
            notIn: validDmhDoctorIds,
            not: null
          }
        }
      });
      deletedCount = deleteResult.count;
      console.log(`Deleted ${deletedCount} stale doctors.`);
    }

    const { revalidatePath } = require("next/cache");
    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${synced} doctors. Removed ${deletedCount} stale doctors. ${errors} errors.`,
      synced,
      deleted: deletedCount,
      errors
    });

  } catch (error: any) {
    console.error('Doctor Sync Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
