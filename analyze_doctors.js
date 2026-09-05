const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Fetch all doctors from DB with image but no dmhDoctorId
  const noDmhWithUrl = await prisma.doctor.findMany({
    where: {
      AND: [
        { dmhDoctorId: null },
        { image: { contains: 'dmhospital.org' } }
      ]
    },
    select: { name: true, image: true },
    take: 15
  });

  console.log('\n--- Doctors with NO dmhId but HAVE dmhospital.org URL image ---');
  noDmhWithUrl.forEach(d => {
    const urlMatch = (d.image || '').match(/\/(\d+)_Pic/);
    console.log(`Name: ${d.name} | URL_ID: ${urlMatch ? urlMatch[1] : 'none'}`);
  });

  // Fetch all from API and see if URL IDs match doctor_code
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
  
  // Build a map of doctor_code -> doctor_name from API
  const apiCodeMap = {};
  apiDoctors.forEach(d => {
    apiCodeMap[String(d.doctor_code)] = d.doctor_name;
  });

  console.log('\n--- Checking if URL IDs match API doctor_codes ---');
  noDmhWithUrl.forEach(d => {
    const urlMatch = (d.image || '').match(/\/(\d+)_Pic/);
    if (urlMatch) {
      const urlId = urlMatch[1];
      const apiName = apiCodeMap[urlId];
      console.log(`DB Name: ${d.name} | URL_ID: ${urlId} | API Name for that ID: ${apiName || 'NOT FOUND'}`);
    }
  });

  // How many URL IDs from no-dmhId doctors match an API doctor_code?
  let matches = 0;
  noDmhWithUrl.forEach(d => {
    const urlMatch = (d.image || '').match(/\/(\d+)_Pic/);
    if (urlMatch && apiCodeMap[urlMatch[1]]) matches++;
  });
  console.log(`\nMatches found: ${matches} of ${noDmhWithUrl.length} sampled`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
