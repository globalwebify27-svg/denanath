import { callDMHApi } from '../src/lib/dmhApi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testSchedule() {
  const doctors = await prisma.doctor.findMany({ take: 10 });
  for (const doc of doctors) {
    if (!doc.dmhDoctorId) continue;
    try {
      const res = await callDMHApi('opd_day_time', {
        doctor_id: doc.dmhDoctorId,
        speciality_id: doc.dmhSpecialityId || '',
        service_point_id: doc.dmhServicePointId || '',
        service_center_id: doc.dmhServiceCenterId || ''
      });
      console.log(`Doctor: ${doc.name} (ID: ${doc.dmhDoctorId}, Spec: ${doc.dmhSpecialityId})`);
      console.log('Response:', JSON.stringify(res).slice(0, 300));
      const list = res?.opdDayTimeJSON || (Array.isArray(res) ? res : []);
      const isApp = list.some((s: any) => s.isApp === 'Y' || s.is_app === 'Y' || s.isApp === true);
      console.log('Calculated isAppAllowed:', isApp);
      console.log('---');
    } catch (e: any) {
      console.error(`Error for ${doc.name}:`, e.message);
    }
  }
}

testSchedule().finally(() => prisma.$disconnect());
