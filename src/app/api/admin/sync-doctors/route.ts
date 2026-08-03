import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { callDMHApi } from '@/lib/dmhApi';

export async function POST(req: Request) {
  try {
    // 1. Fetch from DMH
    const data = await callDMHApi('doctor');
    const docs = data?.doctorJSON || (Array.isArray(data) ? data : Object.values(data).find(v => Array.isArray(v)) || []);

    if (!Array.isArray(docs) || docs.length === 0) {
      return NextResponse.json({ error: 'No doctors returned from DMH API' }, { status: 400 });
    }

    let synced = 0;
    let errors = 0;

    // 2. Upsert each doctor
    for (const doc of docs) {
      const dmhDoctorId = String(doc.doctor_id || doc.id || '');
      const dmhSpecialityId = String(doc.speciality_id || '');
      const dmhServicePointId = String(doc.service_point_id || '');
      const dmhServiceCenterId = String(doc.service_center_id || '');
      const rawName = String(doc.doctor_name || doc.name || '');
      const qualifications = String(doc.qualification || doc.qualifications || '');
      const specialty = String(doc.speciality_name || doc.specialty || '');

      if (!dmhDoctorId || dmhDoctorId === 'undefined' || !rawName) {
        errors++;
        continue;
      }

      // Format name: strip "(SPECIALTY)", Title Case, add "Dr." prefix
      // Keep original word order from API (LASTNAME FIRSTNAME)
      const strippedName = rawName.replace(/\s*\(.*?\)\s*/g, '').trim();
      const formattedName = 'Dr. ' + strippedName.replace(/\w\S*/g, (w: string) =>
        w.charAt(0).toUpperCase() + w.substring(1).toLowerCase()
      );

      try {
        // Fetch schedule to determine if booking is allowed
        let isAppAllowed = false;
        try {
          const scheduleRes = await callDMHApi('opd_day_time', {
            doctor_id: dmhDoctorId,
            speciality_id: dmhSpecialityId,
            service_point_id: dmhServicePointId,
            service_center_id: dmhServiceCenterId
          });
          const scheduleList = scheduleRes?.opdDayTimeJSON || (Array.isArray(scheduleRes) ? scheduleRes : []);
          isAppAllowed = scheduleList.some((s: any) => s.isApp === 'Y' || s.is_app === 'Y' || s.isApp === true);
        } catch (scheduleErr) {
          console.error(`Failed to fetch schedule for ${rawName} during sync`, scheduleErr);
        }

        // Add a 50ms delay to prevent WAF blocking
        await new Promise(res => setTimeout(res, 50));

        await prisma.doctor.upsert({
          where: { dmhDoctorId },
          update: {
            name: formattedName,
            specialty,
            qualifications,
            dmhSpecialityId,
            dmhServicePointId,
            dmhServiceCenterId,
            isAppAllowed,
          },
          create: {
            id: dmhDoctorId,
            dmhDoctorId,
            name: formattedName,
            qualifications,
            specialty,
            dmhSpecialityId,
            dmhServicePointId,
            dmhServiceCenterId,
            isAppAllowed,
          },
        });
        synced++;
      } catch (err) {
        console.error('Failed to sync doctor', name, err);
        errors++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${synced} doctors. ${errors} errors.`,
      synced,
      errors
    });

  } catch (error: any) {
    console.error('Doctor Sync Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
