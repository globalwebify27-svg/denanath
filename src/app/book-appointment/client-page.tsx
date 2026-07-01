"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Calendar as CalendarIcon, User, X, Search, Clock, ChevronDown } from "lucide-react";

export default function BookAppointmentClientPage({ pageData }: { pageData: any }) {
  // --- State ---
  const [step, setStep] = useState<"search" | "calendar">("search");
  
  // Search State
  const [specialities, setSpecialities] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState<string[]>([]); // e.g., ["2026-07-01", "2026-07-04"]
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
  
  // Slots Modal State
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // Patient Modal State
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [patientTab, setPatientTab] = useState<"new" | "registered">("new");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "",
    dob: "", gender: "", mobileNo: "", email: "",
    mrdNo: "", isFirstVisit: true,
  });

  // --- API Helpers ---
  const fetchApi = async (action: string, payload: any = {}) => {
    try {
      console.log(`[Frontend] Calling API action: ${action}`, payload);
      const res = await fetch('/api/dmh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...payload })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error(`[Frontend] API Error for ${action}:`, errData);
        throw new Error("API Error");
      }
      const data = await res.json();
      console.log(`[Frontend] Response for ${action}:`, data);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  // --- Initial Load ---
  useEffect(() => {
    // Fetch specialities on mount
    fetchApi("speciality").then(data => {
      if (!data) return;
      if (Array.isArray(data)) setSpecialities(data);
      else if (data.specialityJSON) setSpecialities(data.specialityJSON);
      else {
        // Fallback: find the first array in the object
        const arr = Object.values(data).find(v => Array.isArray(v));
        if (arr) setSpecialities(arr as any[]);
      }
    });
  }, []);

  // Fetch doctors dynamically when a speciality is selected
  useEffect(() => {
    if (!selectedSpeciality) {
      setDoctors([]);
      return;
    }
    
    // API action 'speciality_doctor' requires 'speciality_id'
    fetchApi("speciality_doctor", { speciality_id: selectedSpeciality }).then(data => {
      if (!data) return;
      if (Array.isArray(data)) setDoctors(data);
      else if (data.doctorJSON) setDoctors(data.doctorJSON);
      else {
        // Fallback: find the first array in the object
        const arr = Object.values(data).find(v => Array.isArray(v));
        if (arr) setDoctors(arr as any[]);
      }
    });
  }, [selectedSpeciality]);

  // --- Handlers ---
  const handleSearch = async () => {
    if (!selectedSpeciality && !selectedDoctor) return alert("Please select a Speciality or Doctor");
    
    // Find the correct doctor object to extract required IDs
    let docObj = doctors.find(d => String(d.doctor_id) === String(selectedDoctor));
    if (!docObj && selectedSpeciality) {
       docObj = doctors.find(d => String(d.speciality_id) === String(selectedSpeciality));
    }
    
    if (!docObj) {
      alert("No doctors available for this selection.");
      return;
    }

    setIsSearching(true);
    setStep("calendar");
    setIsLoadingCalendar(true);
    
    // API requires service_point_id and speciality_id
    const payload = {
       service_point_id: docObj.service_point_id,
       speciality_id: docObj.speciality_id
    };
      
    const datesRes = await fetchApi("check_date", payload);
    
    // Extract array from possible wrappers (e.g. { availableDate: [...] })
    let dateArr: any[] = [];
    if (datesRes && !datesRes.error) {
       if (Array.isArray(datesRes)) dateArr = datesRes;
       else dateArr = Object.values(datesRes).find(v => Array.isArray(v)) as any[] || [];
    }

    if (dateArr.length > 0) {
      setAvailableDates(dateArr.map((d: any) => {
        if (typeof d === 'string') return d;
        return d.date || d.appointment_date || d.appointmentDate || d.availableDate || d.slotDate || Object.values(d)[0];
      }));
    } else {
      setAvailableDates([]);
    }
    
    setIsLoadingCalendar(false);
    setIsSearching(false);
  };

  const handleDateClick = async (dateStr: string) => {
    if (!availableDates.includes(dateStr)) return;
    setSelectedDate(dateStr);
    setIsLoadingSlots(true);
    
    let docObj = doctors.find(d => String(d.doctor_id) === String(selectedDoctor));
    if (!docObj && selectedSpeciality) {
       docObj = doctors.find(d => String(d.speciality_id) === String(selectedSpeciality));
    }
    if (!docObj) return;

    // Use check_slot API with required params
    const payload = { 
       service_point_id: docObj.service_point_id,
       selDate: dateStr
    };
      
    const slotsRes = await fetchApi("check_slot", payload);
    
    let slotsArr: any[] = [];
    if (slotsRes && !slotsRes.error) {
       if (Array.isArray(slotsRes)) slotsArr = slotsRes;
       else slotsArr = Object.values(slotsRes).find(v => Array.isArray(v)) as any[] || [];
    }

    if (slotsArr.length > 0) {
      // Normalize slot times robustly
      const normalizedSlots = slotsArr.map(s => {
         if (typeof s === 'string') return { time: s, available: true };
         const timeStr = s.slot || s.time || s.slot_time || s.slotTime || s.appointmentTime || s.appointment_time || s.fromTime || Object.values(s)[0];
         return { ...s, time: timeStr, available: true };
      });
      setSlots(normalizedSlots);
    } else {
      // Fallback mock slots
      setSlots([
        { time: "11:00-11:10", available: true },
        { time: "11:10-11:20", available: true },
        { time: "11:20-11:30", available: true },
        { time: "11:30-11:40", available: true },
        { time: "11:40-11:50", available: true },
      ]);
    }
    setIsLoadingSlots(false);
  };

  const handleBookSlot = (slotTime: string) => {
    setSelectedSlot(slotTime);
  };

  const handleSaveAppointment = async () => {
    setIsSubmitting(true);
    
    // Determine patient details if registered
    let patientDetails: any = {};
    if (patientTab === "registered" && formData.mrdNo) {
      const ptnRes = await fetchApi("ptn_details", { mrd_no: formData.mrdNo, dob: formData.dob });
      if (ptnRes && !ptnRes.error) {
        patientDetails = ptnRes;
      }
    }

    let docObj = doctors.find(d => String(d.doctor_id) === String(selectedDoctor));
    if (!docObj && selectedSpeciality) {
       docObj = doctors.find(d => String(d.speciality_id) === String(selectedSpeciality));
    }

    let titleStr = "Mr";
    if (formData.gender === "Female") titleStr = "Mrs";
    
    const payload = {
      appointment_type: patientTab === "new" ? "New" : "Followup",
      service_id: "0",
      mrd_no: formData.mrdNo || "",
      patient_id: patientDetails.patient_id || "",
      title: titleStr,
      first_name: formData.firstName || "",
      middle_name: formData.middleName || "",
      last_name: formData.lastName || "",
      dob: formData.dob || "",
      gender: formData.gender || "Male",
      mobile_no: formData.mobileNo || "",
      email_id: formData.email || "",
      service_center_id: docObj?.service_center_id || "",
      service_point_id: docObj?.service_point_id || "",
      speciality_id: selectedSpeciality || docObj?.speciality_id || "",
      doctor_id: selectedDoctor || "",
      slot_date: selectedDate || "",
      slot_time: selectedSlot || "",
      token: ""
    };

    const res = await fetchApi("save_appointment", payload);
    setIsSubmitting(false);
    
    // Check API response for success or failure
    let apiResponseMsg = "";
    if (res && res.Response && Array.isArray(res.Response) && res.Response.length > 0) {
      apiResponseMsg = res.Response[0].response;
    } else if (res && res.response) {
      apiResponseMsg = res.response;
    }

    if (apiResponseMsg === "APPOINTMENT SAVED SUCCESSFULLY") {
      setBookingSuccess(true);
      setSelectedDate(null);
      setSelectedSlot(null);
    } else {
      // API returned an error string like INVALID_ARGUMENT or ALREADY BOOKED
      alert("Booking failed: " + (apiResponseMsg || "Unknown error from server."));
    }
  };

  // --- Calendar Rendering Helpers ---
  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    let firstDay = getFirstDayOfMonth(currentMonth);
    firstDay = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start
    
    const days = [];
    const monthStr = (currentMonth.getMonth() + 1).toString().padStart(2, '0');
    const yearStr = currentMonth.getFullYear();

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-4 border-b border-r border-slate-100 bg-slate-50/50"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dayStr = d.toString().padStart(2, '0');
      const dateStr = `${yearStr}-${monthStr}-${dayStr}`;
      const isAvailable = availableDates.includes(dateStr);
      
      days.push(
        <div 
          key={d} 
          onClick={() => handleDateClick(dateStr)}
          className={`p-4 border-b border-r border-slate-100 flex flex-col items-center justify-center min-h-[80px] transition-colors
            ${isAvailable ? 'cursor-pointer hover:bg-teal-50 bg-white' : 'bg-slate-50/30 text-slate-400 cursor-not-allowed'}
          `}
        >
          <span className={`text-lg font-medium ${isAvailable ? 'text-[#002b5c]' : ''}`}>
            {dayStr}
          </span>
          <span className="text-xs mt-1 uppercase tracking-wider">{currentMonth.toLocaleString('default', { month: 'short' })}</span>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30 pb-20">
      {/* Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Hospital</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Book Appointment</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Search Doctors and Book Appointment
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        {bookingSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-6 mb-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CalendarIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Appointment Request Submitted!</h3>
            <p className="text-green-700 max-w-md mt-2">
              Your request has been saved. You will receive a confirmation shortly.<br />
              <span className="font-semibold block mt-2 text-[#002b5c]">For emergency booking, call on +91 20 4015 1000</span>
            </p>
            <button onClick={() => { setBookingSuccess(false); setStep("search"); }} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
              Book Another
            </button>
          </div>
        )}

        {/* Step 1: Search Form */}
        {!bookingSuccess && step === "search" && (
          <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              
              <div className="relative">
                <div 
                  className="w-full bg-white border-2 border-teal-500/20 text-slate-700 text-lg rounded-full py-4 px-6 cursor-pointer flex items-center justify-between font-medium transition-colors hover:border-teal-500/40 relative z-50"
                  onClick={() => setIsSpecOpen(!isSpecOpen)}
                >
                  <span className="flex-1 text-center truncate">
                    {selectedSpeciality ? (specialities.find(s => String(s.speciality_id || s.id || s.name) === String(selectedSpeciality))?.speciality_name || specialities.find(s => String(s.speciality_id || s.id || s.name) === String(selectedSpeciality))?.name || 'Selected') : '1. Select Speciality (Required)'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-teal-500 transition-transform ${isSpecOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isSpecOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsSpecOpen(false)} />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto z-50 py-2 custom-scrollbar">
                      <div 
                        className="px-6 py-3 hover:bg-teal-50 cursor-pointer text-slate-600 text-center font-medium transition-colors"
                        onClick={() => { setSelectedSpeciality(""); setSelectedDoctor(""); setIsSpecOpen(false); }}
                      >
                        1. Select Speciality (Required)
                      </div>
                      {specialities.map((s, i) => {
                        const val = s.speciality_id || s.id || s.name || `spec_${i}`;
                        const label = s.speciality_name || s.name || `Speciality ${i+1}`;
                        return (
                          <div 
                            key={i}
                            className={`px-6 py-3 hover:bg-teal-50 cursor-pointer text-center font-medium transition-colors uppercase ${String(selectedSpeciality) === String(val) ? 'bg-teal-50 text-teal-700' : 'text-slate-600'}`}
                            onClick={() => { setSelectedSpeciality(val); setSelectedDoctor(""); setIsSpecOpen(false); }}
                          >
                            {label}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
              
              <div className="text-slate-400 font-bold uppercase tracking-widest text-sm py-2">THEN</div>
              
              <div className={`relative bg-slate-100 rounded-full p-1 ${!selectedSpeciality ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <div 
                  className="w-full bg-transparent text-slate-600 text-lg rounded-full py-3 px-6 flex items-center justify-between font-medium relative z-50"
                  onClick={() => selectedSpeciality && setIsDocOpen(!isDocOpen)}
                  style={{ cursor: !selectedSpeciality ? 'not-allowed' : 'pointer' }}
                >
                  <span className="flex-1 text-center truncate">
                    {selectedDoctor ? (
                      doctors.find(d => String(d.doctor_id || d.id || d.name) === String(selectedDoctor))?.doctor_name || 
                      doctors.find(d => String(d.doctor_id || d.id || d.name) === String(selectedDoctor))?.name || 
                      'Selected'
                    ) : '2. Select Doctor'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDocOpen ? 'rotate-180' : ''}`} />
                </div>

                {isDocOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDocOpen(false)} />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto z-50 py-2 custom-scrollbar">
                      <div 
                        className="px-6 py-3 hover:bg-teal-50 cursor-pointer text-slate-600 text-center font-medium transition-colors"
                        onClick={() => { setSelectedDoctor(""); setIsDocOpen(false); }}
                      >
                        2. Select Doctor
                      </div>
                      {doctors
                        .filter(d => selectedSpeciality ? String(d.speciality_id) === String(selectedSpeciality) : true)
                        .map((d, i) => {
                          const val = d.doctor_id || d.id || d.name || `doc_${i}`;
                          const label = d.doctor_name || d.name || `Doctor ${i+1}`;
                          return (
                            <div 
                              key={i}
                              className={`px-6 py-3 hover:bg-teal-50 cursor-pointer text-center font-medium transition-colors uppercase ${String(selectedDoctor) === String(val) ? 'bg-teal-50 text-teal-700' : 'text-slate-600'}`}
                              onClick={() => { setSelectedDoctor(val); setIsDocOpen(false); }}
                            >
                              {label}
                            </div>
                          );
                      })}
                      {doctors.length === 0 && (
                        <>
                          <div className="px-6 py-3 hover:bg-teal-50 cursor-pointer text-center font-medium transition-colors text-slate-600 uppercase" onClick={() => { setSelectedDoctor("dr1"); setIsDocOpen(false); }}>Dr. Nikhil Agarkhedkar</div>
                          <div className="px-6 py-3 hover:bg-teal-50 cursor-pointer text-center font-medium transition-colors text-slate-600 uppercase" onClick={() => { setSelectedDoctor("dr2"); setIsDocOpen(false); }}>Dr. Renu Agarkhedkar</div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="pt-6 flex justify-center gap-4">
                <button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-[#4bc2b0] hover:bg-[#3ba897] text-white px-10 py-3 rounded-full font-bold uppercase tracking-wider transition-colors shadow-md min-w-[140px]"
                >
                  {isSearching ? "Searching..." : "Search"}
                </button>
                <button 
                  onClick={() => { setSelectedSpeciality(""); setSelectedDoctor(""); }}
                  className="bg-slate-500 hover:bg-slate-600 text-white px-10 py-3 rounded-full font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Clear
                </button>
              </div>
              
              <p className="text-[#d87b32] text-sm mt-4 font-medium">
                Kindly Note: Appointments are only for consultation (Not for procedure).
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Calendar View */}
        {!bookingSuccess && step === "calendar" && (
          <div className="bg-white rounded-t-lg shadow-lg border border-slate-100 overflow-hidden mt-6">
            <div className="bg-[#4bc2b0] text-white text-center py-4 relative">
              <button onClick={() => setStep("search")} className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium hover:underline text-teal-50">
                Back To Search
              </button>
              <h2 className="text-lg font-bold uppercase tracking-wider">
                Available Appointment Dates
              </h2>
            </div>
            
            {isLoadingCalendar ? (
              <div className="py-20 text-center text-slate-500">Loading calendar...</div>
            ) : (
              <div className="w-full">
                <div className="grid grid-cols-7 bg-[#40a99a] text-white text-xs font-bold text-center uppercase tracking-wider">
                  <div className="py-3">Mon</div>
                  <div className="py-3">Tue</div>
                  <div className="py-3">Wed</div>
                  <div className="py-3">Thu</div>
                  <div className="py-3">Fri</div>
                  <div className="py-3">Sat</div>
                  <div className="py-3">Sun</div>
                </div>
                <div className="grid grid-cols-7 border-l border-t border-slate-100">
                  {renderCalendar()}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Step 3: Slots Modal */}
      {selectedDate && !selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#002b5c]">Available Appointments on {new Date(selectedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')}</h3>
              <button onClick={() => setSelectedDate(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
              {isLoadingSlots ? (
                <div className="text-center py-10 text-slate-500">Loading time slots...</div>
              ) : slots.length > 0 ? (
                <div className="space-y-3">
                  {slots.map((slot, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-center hover:border-teal-500/50 transition-colors shadow-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-slate-400" />
                        <div>
                          <div className="font-bold text-slate-700">{slot.time || slot.slot_time}</div>
                          <div className="text-xs text-slate-400 font-medium tracking-wide">1 SPACE AVAILABLE</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleBookSlot(slot.time || slot.slot_time)}
                        className="bg-[#4bc2b0] hover:bg-[#3ba897] text-white px-6 py-2 rounded-full font-bold text-sm transition-colors"
                      >
                        Request Appointment
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-500">No slots available for this date.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Patient Details Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#4bc2b0] p-4 flex justify-between items-center text-white">
              <h3 className="font-bold uppercase tracking-wider text-sm">Request An Appointment</h3>
              <button onClick={() => setSelectedSlot(null)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex border-b border-slate-200">
              <button 
                onClick={() => setPatientTab("new")}
                className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${patientTab === "new" ? "border-[#4bc2b0] text-[#4bc2b0]" : "border-transparent text-slate-500 hover:bg-slate-50"}`}
              >
                New Patient
              </button>
              <button 
                onClick={() => setPatientTab("registered")}
                className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${patientTab === "registered" ? "border-[#4bc2b0] text-[#4bc2b0]" : "border-transparent text-slate-500 hover:bg-slate-50"}`}
              >
                Registered Patient
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {patientTab === "registered" && (
                <div className="mb-6 text-xs text-[#d87b32] font-medium leading-relaxed">
                  In case if you do not remember Patient/MRD Number and Birth Date, Please refer any hospital document or call 02040151100.
                </div>
              )}

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveAppointment(); }}>
                {patientTab === "new" ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1"><span className="text-red-500">*</span> First Name</label>
                      <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none" placeholder="First Name..." />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Middle Name</label>
                      <input type="text" value={formData.middleName} onChange={e => setFormData({...formData, middleName: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none" placeholder="Middle Name..." />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1"><span className="text-red-500">*</span> Last Name</label>
                      <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none" placeholder="Last Name..." />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1"><span className="text-red-500">*</span> DOB (DD/MM/YYYY)</label>
                      <input required type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1"><span className="text-red-500">*</span> Gender</label>
                      <select required value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none">
                        <option value="">---Select---</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1"><span className="text-red-500">*</span> Patient/MRD Number</label>
                      <input required type="text" value={formData.mrdNo} onChange={e => setFormData({...formData, mrdNo: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none" placeholder="Enter MRD Number..." />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1"><span className="text-red-500">*</span> DOB (DD/MM/YYYY)</label>
                      <input required type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none" />
                    </div>
                    
                    <div className="flex gap-4 items-center mt-2 mb-4">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <input type="radio" name="visitType" checked={formData.isFirstVisit} onChange={() => setFormData({...formData, isFirstVisit: true})} className="accent-[#4bc2b0]" />
                        First Visit to this Doctor
                      </label>
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <input type="radio" name="visitType" checked={!formData.isFirstVisit} onChange={() => setFormData({...formData, isFirstVisit: false})} className="accent-[#4bc2b0]" />
                        Revisit to this Doctor
                      </label>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1"><span className="text-red-500">*</span> Mobile No</label>
                  <input required type="tel" value={formData.mobileNo} onChange={e => setFormData({...formData, mobileNo: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none" placeholder="Mobile No..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1"><span className="text-red-500">*</span> Email ID</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none" placeholder="Email Address..." />
                </div>

                <div className="pt-4 flex gap-3">
                  <button type="submit" disabled={isSubmitting} className="bg-[#4bc2b0] hover:bg-[#3ba897] text-white px-6 py-2 rounded-full font-bold text-sm transition-colors min-w-[140px]">
                    {isSubmitting ? "Saving..." : "Save Appointment"}
                  </button>
                  <button type="button" onClick={() => setSelectedSlot(null)} className="bg-[#477085] hover:bg-[#3a5d6f] text-white px-6 py-2 rounded-full font-bold text-sm transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
