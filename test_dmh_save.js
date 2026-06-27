async function testDMHSave() {
  const url = 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/saveAppointment.php';
  const headersBase = {
    'X-User-Name': 'dmhPhr-api',
    'X-Pass-Phrase': 'Phr25@DMH',
    'Content-Type': 'application/json'
  };

  try {
    const payload = {
      action: "save_appointment",
      appointment_type: "New",
      service_id: "0",
      mrd_no: "",
      patient_id: "",
      title: "Mr",
      first_name: "Test",
      middle_name: "",
      last_name: "User",
      dob: "01/01/1990", 
      gender: "Male",
      mobile_no: "9876543210",
      email_id: "test@example.com",
      service_center_id: "75",
      service_point_id: "135", // Kalindi
      speciality_id: "43",
      doctor_id: "54",
      slot_date: "2026-06-25", // try today
      slot_time: "15:50-16:00", // valid slot user saw
      token: "123"
    };

    console.log("Testing with title=Mr...");
    let res = await fetch(url, { method: 'POST', headers: headersBase, body: JSON.stringify(payload) });
    console.log(await res.text());

    payload.title = "";
    console.log("Testing with title empty...");
    res = await fetch(url, { method: 'POST', headers: headersBase, body: JSON.stringify(payload) });
    console.log(await res.text());

  } catch (error) {
    console.error('Test script failed:', error);
  }
}

testDMHSave();
