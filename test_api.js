fetch('https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/opdDayTime.php', {
  method: 'POST',
  headers: {
    'X-User-Name': 'dmhPhr-api',
    'X-Pass-Phrase': 'Phr25@DMH',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ action: "opd_day_time", doctor_id: "74", speciality_id: "63" })
}).then(r => r.text()).then(console.log);
