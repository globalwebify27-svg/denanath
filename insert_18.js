const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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
  
  const doc18_raw = docs.filter(d => String(d.doctor_id) === '18');
  console.log('Doc 18 from API:', doc18_raw);
  
  // Try inserting it
  const syncData = {
    name: 'Dr. Test 18',
    specialty: 'Test',
    qualifications: 'Test',
    dmhSpecialityId: 'Test',
    gender: 'Male',
    consultantType: 'Test',
    hasOpdSchedule: false,
    timings: null,
    dmhDoctorId: '18'
  };
  try {
    await prisma.doctor.create({ data: { id: '18', ...syncData } });
    console.log('Successfully inserted doc 18!');
  } catch (e) {
    console.error('Error inserting doc 18:', e.message);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
