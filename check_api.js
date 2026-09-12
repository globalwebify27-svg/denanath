const fetch = require('node-fetch'); // or native fetch if Node >= 18
async function main() {
  const url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-User-Name': 'dmhPhr-api',
      'X-Pass-Phrase': 'Phr25@DMH',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action: 'drAhis', jsonKey: 'drAhisJSON' })
  });
  const data = await response.json();
  const docs = data?.drAhisJSON || (Array.isArray(data) ? data : []);
  console.log('API array length:', docs.length);
  
  const groupedDocs = new Map();
  for (const doc of docs) {
    const dmhDoctorId = String(doc.doctor_id || '');
    if (!dmhDoctorId || dmhDoctorId === 'undefined') continue;
    const rawName = String(doc.doctor_name || `${doc.first_name || ''} ${doc.last_name || ''}`).trim();
    if (!rawName) continue;
    
    if (!groupedDocs.has(dmhDoctorId)) {
      groupedDocs.set(dmhDoctorId, { dmhDoctorId });
    }
  }
  
  console.log('Unique valid dmhDoctorId count:', groupedDocs.size);
}
main().catch(console.error);
