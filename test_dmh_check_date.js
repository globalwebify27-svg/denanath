async function testDMHApi() {
  const url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/checkDate.php';
  const headersBase = {
    'X-User-Name': 'dmhPhr-api',
    'X-Pass-Phrase': 'Phr25@DMH',
    'Content-Type': 'application/json'
  };

  try {
    const payload = {
      action: "check_date",
      service_point_id: "135", // Kalindi Modak (Ophthalmology)
      speciality_id: "43"
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: headersBase,
      body: JSON.stringify(payload)
    });
    console.log("Dates for Dr. Kalindi:", await res.text());
  } catch (error) {
    console.error('Test script failed:', error);
  }
}

testDMHApi();
