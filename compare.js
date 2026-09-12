const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fetch = require('node-fetch');

async function main() {
  const dbDocs = await prisma.doctor.findMany({ select: { dmhDoctorId: true } });
  const dbIds = new Set(dbDocs.map(d => d.dmhDoctorId).filter(Boolean));
  
  const url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'X-User-Name': 'dmhPhr-api', 'X-Pass-Phrase': 'Phr25@DMH', 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'drAhis', jsonKey: 'drAhisJSON' })
  });
  const data = await response.json();
  const docs = data?.drAhisJSON || (Array.isArray(data) ? data : []);
  
  const apiIds = new Set();
  for (const doc of docs) {
    const dmhDoctorId = String(doc.doctor_id || '');
    if (!dmhDoctorId || dmhDoctorId === 'undefined') continue;
    const rawName = String(doc.doctor_name || `${doc.first_name || ''} ${doc.last_name || ''}`).trim();
    if (!rawName) continue;
    apiIds.add(dmhDoctorId);
  }
  
  console.log('API count:', apiIds.size);
  console.log('DB count:', dbIds.size);
  
  const missing = [...apiIds].filter(id => !dbIds.has(id));
  console.log('Missing in DB:', missing.length);
  if (missing.length > 0) {
    console.log(missing.slice(0, 5));
    // Let's print one missing doc from API to see what's special
    console.log('Sample missing doc:', docs.find(d => String(d.doctor_id) === missing[0]));
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
