const url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/doctorList.php';
const headers = { 'X-User-Name': 'dmhPhr-api', 'X-Pass-Phrase': 'Phr25@DMH', 'Content-Type': 'application/json' };

async function test() {
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify({ action: 'drAhis' }) });
  const json = await res.json();
  const all = json.drAhisJSON || [];
  console.log('Total doctors:', all.length);

  // Simulate speciality_doctor for speciality_id=14 (DENTISTRY)
  const filtered = all.filter(d => String(d.speciality_id) === '14');
  const doctorJSON = filtered.map(d => ({ ...d, doctor_id: d.doctor_id || d.doctor_code || '' }));
  console.log('Filtered for spec 14:', doctorJSON.length);
  console.log('Sample:', JSON.stringify(doctorJSON[0], null, 2));
}
test();
