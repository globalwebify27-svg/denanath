import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function callDMHApi() {
  const url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php';
  const headers = {
    'Content-Type': 'application/json',
    'X-User-Name': 'dmhPhr-api',
    'X-Pass-Phrase': 'Phr25@DMH'
  };
  const body = JSON.stringify({ action: "drAhis" });
  const res = await fetch(url, { method: 'POST', headers, body });
  return await res.json();
}

export async function POST(req: Request) {
  try {
    const docRes = await callDMHApi();
    const docs = docRes?.drAhisJSON || (Array.isArray(docRes) ? docRes : []);

    if (!Array.isArray(docs) || docs.length === 0) {
      return NextResponse.json({ error: 'No doctors returned from DMH API' }, { status: 400 });
    }

    let merged = 0;
    let renamed = 0;
    let deleted = 0;
    const validDoctorIds = new Set<string>();

    const processedIds = new Set<string>();

    for (const doc of docs) {
      const docId = String(doc.doctor_id || '');
      const docCode = String(doc.doctor_code || '');

      if (!docId) continue;
      validDoctorIds.add(docId);

      if (processedIds.has(docId)) continue;
      processedIds.add(docId);

      if (docId !== docCode && docCode) {
        const oldRecord = await prisma.doctor.findUnique({
          where: { dmhDoctorId: docCode }
        });

        const newRecord = await prisma.doctor.findUnique({
          where: { dmhDoctorId: docId }
        });

        if (oldRecord && newRecord) {
          // Merge old manual data into the new record
          await prisma.doctor.update({
            where: { id: newRecord.id },
            data: {
              image: oldRecord.image || newRecord.image,
              education: oldRecord.education || newRecord.education,
              training: oldRecord.training || newRecord.training,
              experience: oldRecord.experience || newRecord.experience,
              publications: oldRecord.publications || newRecord.publications,
              seoKeywords: oldRecord.seoKeywords || newRecord.seoKeywords,
              seoMetaDescription: oldRecord.seoMetaDescription || newRecord.seoMetaDescription,
              seoMetaTitle: oldRecord.seoMetaTitle || newRecord.seoMetaTitle,
            }
          });
          
          await prisma.doctor.delete({
            where: { id: oldRecord.id }
          });
          merged++;
        } else if (oldRecord && !newRecord) {
          await prisma.doctor.update({
            where: { id: oldRecord.id },
            data: {
              dmhDoctorId: docId,
            }
          });
          renamed++;
        }
      }
    }

    if (validDoctorIds.size > 0) {
      const validArray = Array.from(validDoctorIds);
      const deleteResult = await prisma.doctor.deleteMany({
        where: {
          dmhDoctorId: { notIn: validArray }
        }
      });
      
      const deleteResultNull = await prisma.doctor.deleteMany({
        where: {
          dmhDoctorId: null
        }
      });
      
      deleted = deleteResult.count + deleteResultNull.count;
    }

    const totalDocsNow = await prisma.doctor.count();

    return NextResponse.json({
      success: true,
      merged_duplicates: merged,
      renamed_orphans: renamed,
      deleted_stale_records: deleted,
      total_doctors_now: totalDocsNow
    });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
