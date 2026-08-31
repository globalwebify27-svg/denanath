import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { callDMHApi } from '@/lib/dmhApi';

export async function POST(req: Request) {
  try {
    // 1. Fetch all doctors from DMH API using drAhis endpoint
    const docRes = await callDMHApi('drAhis');
    const docs = docRes?.drAhisJSON || (Array.isArray(docRes) ? docRes : []);

    if (!Array.isArray(docs) || docs.length === 0) {
      return NextResponse.json({ error: 'No doctors returned from DMH API' }, { status: 400 });
    }

    let synced = 0;
    let errors = 0;
    const processedDoctorIds = new Set<string>();

    // 2. Iterate and process each doctor
    for (const doc of docs) {
      const dmhDoctorId = String(doc.doctor_code || doc.doctor_id || doc.id || '');
      const rawName = String(doc.doctor_name || `${doc.first_name || ''} ${doc.last_name || ''}`).trim();
      const specName = String(doc.speciality_name || '').trim();
      const specId = String(doc.speciality_id || '');
      const qualifications = String(doc.qualification || doc.qualifications || '');
      
      const gender = String(doc.gender || '');
      const consultantType = String(doc.consultant_type || '');
      const hasOpdSchedule = doc.OpdScheduleYN === 'Yes';

      if (!dmhDoctorId || dmhDoctorId === 'undefined' || !rawName) {
        errors++;
        continue;
      }

      // Key on dmhDoctorId + specId to avoid duplicate processing in single run
      const docSpecKey = `${dmhDoctorId}_${specId}`;
      if (processedDoctorIds.has(docSpecKey)) continue;
      processedDoctorIds.add(docSpecKey);

      // Format name nicely
      const strippedName = rawName.replace(/\s*\(.*?\)\s*/g, '').trim();
      const formattedName = strippedName.startsWith('Dr.')
        ? strippedName
        : 'Dr. ' + strippedName.replace(/\w\S*/g, (w: string) =>
            w.charAt(0).toUpperCase() + w.substring(1).toLowerCase()
          );

      const isAppAllowed = doc.isApp === 'Y' || doc.is_app === 'Y' || doc.isAppAllowed === true || true;

      try {
        await prisma.doctor.upsert({
          where: { dmhDoctorId },
          update: {
            name: formattedName,
            specialty: specName,
            qualifications: qualifications || 'Consultant',
            dmhSpecialityId: specId,
            isAppAllowed,
            gender: gender || null,
            consultantType: consultantType || null,
            hasOpdSchedule,
          },
          create: {
            id: dmhDoctorId, // Usually CUID, but using doctorId ensures no dupes
            dmhDoctorId,
            name: formattedName,
            specialty: specName,
            qualifications: qualifications || 'Consultant',
            dmhSpecialityId: specId,
            isAppAllowed,
            gender: gender || null,
            consultantType: consultantType || null,
            hasOpdSchedule,
          },
        });
        synced++;
      } catch (err) {
        console.error(`Failed to upsert doctor ${formattedName}`, err);
        errors++;
      }
    }

    const { revalidatePath } = require("next/cache");
    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${synced} doctors from DMH API. ${errors} errors.`,
      synced,
      errors
    });

  } catch (error: any) {
    console.error('Doctor Sync Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
