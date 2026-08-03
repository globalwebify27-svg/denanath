import { PrismaClient } from '@prisma/client';
import { callDMHApi } from '../src/lib/dmhApi';

const prisma = new PrismaClient();

async function syncAllAppointmentStatuses() {
  console.log('Starting appointment status sync for all doctors...');
  const doctors = await prisma.doctor.findMany();
  console.log(`Found ${doctors.length} doctors in database.`);

  let updatedTrue = 0;
  let updatedFalse = 0;
  let errors = 0;

  for (let i = 0; i < doctors.length; i++) {
    const doc = doctors[i];
    if (!doc.dmhDoctorId) {
      // Manual doctors without API ID default to false unless configured
      await prisma.doctor.update({
        where: { id: doc.id },
        data: { isAppAllowed: false }
      });
      updatedFalse++;
      continue;
    }

    try {
      const scheduleRes = await callDMHApi('opd_day_time', {
        doctor_id: doc.dmhDoctorId,
        speciality_id: doc.dmhSpecialityId || '',
        service_point_id: doc.dmhServicePointId || '',
        service_center_id: doc.dmhServiceCenterId || ''
      });

      const scheduleList = scheduleRes?.opdDayTimeJSON || (Array.isArray(scheduleRes) ? scheduleRes : []);
      const isApp = Array.isArray(scheduleList) && scheduleList.some((s: any) => s.isApp === 'Y' || s.is_app === 'Y' || s.isApp === true);

      await prisma.doctor.update({
        where: { id: doc.id },
        data: { isAppAllowed: isApp }
      });

      if (isApp) updatedTrue++;
      else updatedFalse++;

      if ((i + 1) % 20 === 0 || i === doctors.length - 1) {
        console.log(`Progress: ${i + 1}/${doctors.length} doctors processed. (True: ${updatedTrue}, False: ${updatedFalse})`);
      }

      // 40ms delay to be gentle on server/WAF
      await new Promise(r => setTimeout(r, 40));
    } catch (err: any) {
      console.error(`Error checking status for doctor ${doc.name} (ID: ${doc.dmhDoctorId}):`, err.message);
      errors++;
    }
  }

  console.log(`\nSync completed! Enabled (True): ${updatedTrue}, Disabled (False): ${updatedFalse}, Errors: ${errors}`);
}

syncAllAppointmentStatuses()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
