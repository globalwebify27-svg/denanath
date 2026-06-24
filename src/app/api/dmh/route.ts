import { NextResponse } from 'next/server';

const BASE_URL = 'https://mappapi.dmhospital.org/amrita_login/dmhApiRef/appointment_dummy/';
const HEADERS = {
  'X-User-Name': 'dmhPhr-api',
  'X-Pass-Phrase': 'Phr25@DMH',
  'Content-Type': 'application/x-www-form-urlencoded',
};

const ACTION_TO_ENDPOINT: Record<string, string> = {
  'speciality': 'doctorList.php',
  'doctor': 'doctorList.php',
  'speciality_doctor': 'doctorList.php',
  'opd_day_time': 'opdDayTime.php',
  'check_date': 'checkDate.php',
  'holidays_list': 'holidayJSON.php',
  'check_slot': 'checkSlot.php',
  'doctor_slot': 'doctorSlot.php',
  'ptn_details': 'ptnDetails.php',
  'save_appointment': 'saveAppointment.php',
  'cancel_appointment': 'cancelAppointment.php',
  'doctor_contact_no': 'doctorContactNo.php',
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // The client should send the action and any other required params in the body
    const { action, ...restParams } = body;

    if (!action || !ACTION_TO_ENDPOINT[action]) {
      return NextResponse.json({ error: 'Invalid or missing action' }, { status: 400 });
    }

    const endpoint = ACTION_TO_ENDPOINT[action];
    const url = `${BASE_URL}${endpoint}`;

    // Format the req_data payload as a JSON string
    const reqDataPayload = {
      action,
      ...restParams
    };

    // Prepare the form body (application/x-www-form-urlencoded)
    const formData = new URLSearchParams();
    
    // Based on the user prompt, some APIs might expect just a JSON payload or form-data with req_data
    // Let's assume it expects a form field `req_data` with the JSON string
    formData.append('req_data', JSON.stringify(reqDataPayload));

    const response = await fetch(url, {
      method: 'POST',
      headers: HEADERS,
      body: formData.toString(),
    });

    // The API might return non-JSON on errors
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
      console.log(`[DMH API] Success -> ${action}:`, data);
    } catch (e) {
      console.error(`[DMH API] Failed to parse JSON -> ${action}. Raw response:`, text);
      throw new Error('Invalid JSON response from DMH API');
    }

    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('DMH API Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch from DMH API', 
        details: error.message,
        cause: error.cause ? String(error.cause) : null
      },
      { status: 500 }
    );
  }
}
