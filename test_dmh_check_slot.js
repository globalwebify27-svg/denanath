async function testDMHApi() {
  const url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/checkSlot.php';
  const headersBase = {
    'X-User-Name': 'dmhPhr-api',
    'X-Pass-Phrase': 'Phr25@DMH',
    'Content-Type': 'application/json'
  };

  try {
    const payload = {
      action: "check_slot",
      service_point_id: "131", // Let's use the same doctor's service_point_id
      selDate: "2026-06-26" // Assuming some date format. Wait, let's try a few formats
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: headersBase,
      body: JSON.stringify(payload)
    });
    console.log(await res.text());
  } catch (error) {
    console.error('Test script failed:', error);
  }
}

testDMHApi();
