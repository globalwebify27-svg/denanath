async function testCancel() {
  const url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/cancelAppointment.php';
  const headersBase = {
    'X-User-Name': 'dmhPhr-api',
    'X-Pass-Phrase': 'Phr25@DMH',
    'Content-Type': 'application/json'
  };

  try {
    const payload = {
      action: "cancel_appointment",
      transaction_id: "871986", // From my previous successful save test
      mrd_no: "",
      patient_id: ""
    };

    let res = await fetch(url, { method: 'POST', headers: headersBase, body: JSON.stringify(payload) });
    console.log("Test 1:", await res.text());

  } catch (error) {
    console.error('Test script failed:', error);
  }
}

testCancel();
