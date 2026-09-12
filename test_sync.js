const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fetch = require('node-fetch');

const dayNames = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };
const formatTime = (t) => {
  if (!t) return '';
  const parts = t.split(':');
  if (parts.length < 2) return t;
  const hour = parseInt(parts[0], 10);
  const m = parts[1];
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${m} ${ampm}`;
};

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
    if (!['24', '66', '123', '126', '406'].includes(dmhDoctorId)) continue;
    
    const rawName = String(doc.doctor_name || '').trim();
    if (!groupedDocs.has(dmhDoctorId)) {
      groupedDocs.set(dmhDoctorId, {
        dmhDoctorId, rawNames: new Set(), specNames: new Set(), specIds: new Set(), qualifications: new Set(), gender: doc.gender, consultantType: doc.consultant_type, hasOpdSchedule: false, opdTimings: []
      });
    }
    const group = groupedDocs.get(dmhDoctorId);
    group.rawNames.add(rawName);
    if (doc.speciality_name) group.specNames.add(doc.speciality_name.trim());
    if (doc.speciality_id) group.specIds.add(String(doc.speciality_id).trim());
    if (doc.qualification) group.qualifications.add(doc.qualification.trim());
    if (doc.OpdScheduleYN === 'Yes') group.hasOpdSchedule = true;
  }
  
  for (const [dmhDoctorId, group] of groupedDocs.entries()) {
    const rawName = Array.from(group.rawNames)[0];
    const strippedName = rawName.replace(/\s*\(.*?\)\s*/g, '').trim();
    const formattedName = strippedName.startsWith('Dr.')
        ? strippedName
        : 'Dr. ' + strippedName.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase());
        
    const combinedSpecs = Array.from(group.specNames).join(' & ');
    const combinedSpecIds = Array.from(group.specIds).join(',');
    const combinedQuals = Array.from(group.qualifications).join(', ') || 'Consultant';
    
    let existingDoc = await prisma.doctor.findUnique({ where: { dmhDoctorId } });
    if (!existingDoc) {
      existingDoc = await prisma.doctor.findUnique({ where: { id: dmhDoctorId } });
    }
    
    let finalTimings = null;
    const syncData = {
      name: formattedName, specialty: combinedSpecs, qualifications: combinedQuals,
      dmhSpecialityId: combinedSpecIds, gender: group.gender || null, consultantType: group.consultantType || null,
      hasOpdSchedule: group.hasOpdSchedule, timings: finalTimings, dmhDoctorId
    };
    
    try {
      if (existingDoc) {
        console.log(`Updating existing doc for ${dmhDoctorId}, existing ID: ${existingDoc.id}`);
        await prisma.doctor.update({ where: { id: existingDoc.id }, data: syncData });
      } else {
        console.log(`Creating new doc for ${dmhDoctorId}`);
        await prisma.doctor.create({ data: { id: dmhDoctorId, ...syncData } });
      }
    } catch (e) {
      console.error(`Error for ${dmhDoctorId}:`, e.message);
    }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
