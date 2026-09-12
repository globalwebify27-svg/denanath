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
  
  const keys = new Set();
  const rawKeys = new Set();
  for (const doc of docs) {
    const key = `${doc.doctor_id}_${doc.speciality_id}`;
    keys.add(key);
    rawKeys.add(doc.doctor_id);
  }
  
  console.log('Total JSON docs:', docs.length);
  console.log('Unique doctor_id + speciality_id:', keys.size);
  console.log('Unique doctor_id:', rawKeys.size);
}
main().catch(console.error);
