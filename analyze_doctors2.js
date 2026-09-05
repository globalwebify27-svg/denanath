const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Get unique dmhDoctorIds from current API
  const res = await fetch('https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php', {
    method: 'POST',
    headers: {
      'X-User-Name': 'dmhPhr-api',
      'X-Pass-Phrase': 'Phr25@DMH',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action: 'drAhis' })
  });
  const apiData = await res.json();
  const apiDoctors = apiData.drAhisJSON || (Array.isArray(apiData) ? apiData : []);
  const apiCodes = new Set(apiDoctors.map(d => String(d.doctor_code)));

  console.log('\nAPI unique doctor_codes:', apiCodes.size);

  // Count current DB doctors that ARE in the API
  const dbDoctors = await prisma.doctor.findMany({
    select: { dmhDoctorId: true, name: true, image: true, education: true, training: true, experience: true, publications: true, timings: true }
  });

  const inApi = dbDoctors.filter(d => d.dmhDoctorId && apiCodes.has(d.dmhDoctorId));
  const notInApi = dbDoctors.filter(d => !d.dmhDoctorId || !apiCodes.has(d.dmhDoctorId));
  const inApiWithImage = inApi.filter(d => d.image);
  const inApiWithRich = inApi.filter(d => d.education || d.training || d.experience || d.publications || d.timings);
  const notInApiWithImage = notInApi.filter(d => d.image);
  const notInApiWithRich = notInApi.filter(d => d.education || d.training || d.experience || d.publications || d.timings);

  console.log('\n=== DOCTORS IN CURRENT API (499) ===');
  console.log('Matched in DB:', inApi.length);
  console.log('Of those with image:', inApiWithImage.length);
  console.log('Of those with rich content:', inApiWithRich.length);

  console.log('\n=== DOCTORS NOT IN CURRENT API (will be removed) ===');
  console.log('Total:', notInApi.length);
  console.log('Of those with image:', notInApiWithImage.length, '← these images will be LOST unless by name-match');
  console.log('Of those with rich content:', notInApiWithRich.length, '← this rich content will be LOST');

  // Show sample of API doctors that have rich content in DB
  console.log('\n=== SAMPLE: API doctors with rich content in DB ===');
  inApiWithRich.slice(0, 5).forEach(d => {
    console.log(`- ${d.name} (dmhId: ${d.dmhDoctorId}) | edu: ${!!d.education} | exp: ${!!d.experience} | pub: ${!!d.publications} | timings: ${!!d.timings}`);
  });
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
