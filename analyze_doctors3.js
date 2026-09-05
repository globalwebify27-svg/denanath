// Full picture: what exactly happens to the 428 doctors with images that are NOT in the API
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Fetch API doctors to build name-based lookup
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
  const apiDoctors = apiData.drAhisJSON || [];
  
  const apiCodes = new Set(apiDoctors.map(d => String(d.doctor_code)));
  
  // Build name-based lookup from API 
  // normalize: "BAPAT SUNIL" -> "bapat sunil"
  const apiByNorm = {};
  apiDoctors.forEach(d => {
    const norm = (d.doctor_name || '').replace(/^Dr\.\s*/i, '').replace(/^Miss\.\s*/i, '').toLowerCase().trim();
    apiByNorm[norm] = d.doctor_code;
    // Also by last_name first_name
    const byLastFirst = `${(d.last_name||'').toLowerCase()} ${(d.first_name||'').toLowerCase()}`.trim();
    if (byLastFirst) apiByNorm[byLastFirst] = d.doctor_code;
  });

  // Get all DB doctors not in API that have images or rich content
  const allDb = await prisma.doctor.findMany({
    select: { name: true, dmhDoctorId: true, image: true, education: true, experience: true, publications: true, timings: true, qualifications: true }
  });

  const notInApi = allDb.filter(d => !d.dmhDoctorId || !apiCodes.has(d.dmhDoctorId));
  const withImageOrContent = notInApi.filter(d => d.image || d.education || d.experience);
  
  let canNameMatch = 0;
  let cannotMatch = 0;
  
  withImageOrContent.slice(0, 20).forEach(d => {
    const norm = d.name.replace(/^Dr\.\s*/i, '').replace(/^Miss\.\s*/i, '').toLowerCase().trim();
    // Try various normalizations
    const parts = norm.split(/\s+/);
    const reversed = parts.length > 1 ? `${parts.slice(1).join(' ')} ${parts[0]}` : norm;
    
    const matchCode = apiByNorm[norm] || apiByNorm[reversed];
    if (matchCode) {
      canNameMatch++;
      console.log(`NAME MATCH: "${d.name}" -> API code ${matchCode} | has_img: ${!!d.image} | has_edu: ${!!d.education}`);
    } else {
      cannotMatch++;
      const urlId = (d.image||'').match(/\/(\d+)_Pic/);
      console.log(`NO MATCH: "${d.name}" | url_id: ${urlId ? urlId[1] : 'base64/null'} | has_img: ${!!d.image} | has_edu: ${!!d.education}`);
    }
  });

  console.log(`\nSample result: ${canNameMatch} matched by name, ${cannotMatch} could not match`);
  console.log(`Total not-in-API with image/content: ${withImageOrContent.length}`);
}

main().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
