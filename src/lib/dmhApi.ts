export const DMH_API_CONFIG = {
  baseUrl: 'https://mapp.dmhospital.org/dmhApiRef/appointment_dummy/',
  headers: {
    'X-User-Name': 'dmhPhr-api',
    'X-Pass-Phrase': 'Phr25@DMH',
    'Content-Type': 'application/json',
  },
  endpoints: {
    speciality: 'doctorList.php',
    doctor: 'doctorList.php',
    drAhis: 'doctorList.php',
    speciality_doctor: 'doctorList.php',
    opd_day_time: 'opdDayTime.php',
    check_date: 'checkDate.php',
    holidays_list: 'holidayJSON.php',
    check_slot: 'checkSlot.php',
    doctor_slot: 'doctorSlot.php',
    ptn_details: 'ptnDetails.php',
    save_appointment: 'saveAppointment.php',
    cancel_appointment: 'cancelAppointment.php',
    doctor_contact_no: 'doctorContactNo.php',
  },
};

export type DMHAction = keyof typeof DMH_API_CONFIG.endpoints;

// Request builder helper payloads
export const createDMHPayload = {
  getAhisDoctors: () => ({
    action: 'drAhis',
  }),

  getSpecialities: () => ({
    action: 'speciality',
  }),

  getDoctor: (doctorId: string, photo: string = '') => ({
    action: 'doctor',
    doctor_id: doctorId,
    photo: photo,
  }),

  getSpecialityDoctors: (serviceCenterId: string) => ({
    action: 'speciality_doctor',
    speciality_id: serviceCenterId,
  }),

  getDoctorOPDSchedule: (doctorId: string, specialityId: string) => ({
    action: 'opd_day_time',
    doctor_id: doctorId,
    speciality_id: specialityId,
  }),

  getAppointmentDates: (servicePointId: string, specialityId: string) => ({
    action: 'check_date',
    service_point_id: servicePointId,
    speciality_id: specialityId,
  }),

  getHolidayDates: () => ({
    action: 'holidays_list',
  }),

  getAvailableSlots: (servicePointId: string, slotDate: string) => ({
    action: 'check_slot',
    service_point_id: servicePointId,
    selDate: slotDate,
  }),

  getAvailableDoctor: (serviceCenterId: string, doctorId: string) => ({
    action: 'doctor_slot',
    service_center_id: serviceCenterId,
    doctor_id: doctorId,
  }),

  getPatientDetails: (mrdNo: string, dob: string) => ({
    action: 'ptn_details',
    mrd_no: mrdNo,
    dob: dob,
  }),

  createAppointment: (params: {
    appointment_type: string;
    service_id: string;
    mrd_no_followup?: string;
    patient_id_followup?: string;
    title: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    dob: string;
    gender: string;
    mobile_no: string;
    email_id?: string;
    service_center_id: string;
    service_point_id: string;
    speciality_id: string;
    doctor_id: string;
    slot_date: string;
    slot_time: string;
    token?: string;
  }) => ({
    action: 'save_appointment',
    appointment_type: params.appointment_type,
    service_id: params.service_id,
    mrd_no: params.mrd_no_followup || '',
    patient_id: params.patient_id_followup || '',
    title: params.title,
    first_name: params.first_name,
    middle_name: params.middle_name || '',
    last_name: params.last_name,
    dob: params.dob,
    gender: params.gender,
    mobile_no: params.mobile_no,
    email_id: params.email_id || '',
    service_center_id: params.service_center_id,
    service_point_id: params.service_point_id,
    speciality_id: params.speciality_id,
    doctor_id: params.doctor_id,
    slot_date: params.slot_date,
    slot_time: params.slot_time,
    token: params.token || '',
  }),

  cancelAppointment: (transactionId: string, dob: string) => ({
    action: 'cancel_appointment',
    transaction_id: transactionId,
    dob: dob,
  }),

  getDoctorContactNo: (serviceCenterId: string, doctorId: string) => ({
    action: 'doctor_contact_no',
    speciality_id: serviceCenterId,
    doctor_id: doctorId,
  }),
};

/**
 * Universal DMH API caller
 */
export async function callDMHApi(action: DMHAction, params: Record<string, any> = {}) {
  const endpoint = DMH_API_CONFIG.endpoints[action];
  if (!endpoint) {
    throw new Error(`Invalid action: ${action}`);
  }

  const url = `${DMH_API_CONFIG.baseUrl}${endpoint}`;
  const payload = { action, ...params };

  const response = await fetch(url, {
    method: 'POST',
    headers: DMH_API_CONFIG.headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`DMH API HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`Failed to parse DMH API response JSON: ${text}`);
  }
}
