const fetch = require('node-fetch');
async function main() {
  const url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'X-User-Name': 'dmhPhr-api', 'X-Pass-Phrase': 'Phr25@DMH', 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'drAhis', jsonKey: 'drAhisJSON' })
  });
  const data = await response.json();
  const docs = data?.drAhisJSON || [];
  
  const groupedDocs = new Map();
  for (const doc of docs) {
    const dmhDoctorId = String(doc.doctor_id || '');
    if (!dmhDoctorId) continue;
    if (!groupedDocs.has(dmhDoctorId)) groupedDocs.set(dmhDoctorId, []);
    groupedDocs.get(dmhDoctorId).push(doc);
  }
  
  const dupes = Array.from(groupedDocs.values()).filter(arr => arr.length > 1);
  console.log(`Found ${dupes.length} doctors that appear multiple times.`);
  if (dupes.length > 0) {
    console.log('Sample duplicate doctor entries for one doctor:');
    console.log(JSON.stringify(dupes[0], null, 2));
  }
}
main().catch(console.error);
