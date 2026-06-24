

async function testApi() {
  const BASE_URL = 'https://mappapi.dmhospital.org/amrita_login/dmhApiRef/appointment_dummy/';
  const HEADERS = {
    'X-User-Name': 'dmhPhr-api',
    'X-Pass-Phrase': 'Phr25@DMH',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const formData = new URLSearchParams();
  formData.append('req_data', JSON.stringify({ action: 'speciality' }));

  try {
    const res = await fetch(BASE_URL + 'doctorList.php', {
      method: 'POST',
      headers: HEADERS,
      body: formData.toString()
    });
    const text = await res.text();
    console.log("SPECIALITY RESPONSE:");
    console.log(text.substring(0, 500));
  } catch (e) {
    console.error(e);
  }
}

testApi();
