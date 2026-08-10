import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { callDMHApi } from '@/lib/dmhApi';

export async function POST(req: Request) {
  try {
    // 1. Fetch all specialities from DMH API
    const specRes = await callDMHApi('speciality');
    const specList = specRes?.specialityJSON || (Array.isArray(specRes) ? specRes : []);

    if (!Array.isArray(specList) || specList.length === 0) {
      return NextResponse.json({ error: 'No specialities returned from DMH API' }, { status: 400 });
    }

    let synced = 0;
    let errors = 0;
    const processedDoctorIds = new Set<string>();

    // 2. Iterate each speciality to get full doctor roster
    for (const spec of specList) {
      const specId = String(spec.id || '');
      const specName = String(spec.speciality_name || '').trim();
      if (!specId) continue;

      try {
        const docRes = await callDMHApi('speciality_doctor', { speciality_id: specId });
        const docs = docRes?.doctorJSON || (Array.isArray(docRes) ? docRes : []);

        if (Array.isArray(docs)) {
          for (const doc of docs) {
            const dmhDoctorId = String(doc.doctor_id || doc.id || '');
            const rawName = String(doc.doctor_name || `${doc.first_name || ''} ${doc.last_name || ''}`).trim();
            const qualifications = String(doc.qualification || doc.qualifications || '');

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

            await prisma.doctor.upsert({
              where: { dmhDoctorId },
              update: {
                name: formattedName,
                specialty: specName,
                qualifications: qualifications || 'Consultant',
                dmhSpecialityId: specId,
                isAppAllowed,
              },
              create: {
                id: dmhDoctorId,
                dmhDoctorId,
                name: formattedName,
                specialty: specName,
                qualifications: qualifications || 'Consultant',
                dmhSpecialityId: specId,
                isAppAllowed,
              },
            });
            synced++;
          }
        }
      } catch (specErr) {
        console.error(`Failed syncing doctors for speciality ${specName}`, specErr);
        errors++;
      }
    }

    const { revalidatePath } = require("next/cache");
    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${synced} doctors across ${specList.length} specialties from DMH API. ${errors} errors.`,
      synced,
      errors
    });

  } catch (error: any) {
    console.error('Doctor Sync Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
