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
  const [isFetchingPatient, setIsFetchingPatient] = useState(false);
  const [isEditableContact, setIsEditableContact] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "",
    dob: "", gender: "", mobileNo: "", email: "",
    mrdNo: "", isFirstVisit: true,
  });

  // Helper to fetch registered patient details automatically via ptn_details API
  const fetchRegisteredPatientDetails = async (mrdNo: string, dobInput: string) => {
    if (!mrdNo || !dobInput) return;
    
    // Normalize date format to YYYY-MM-DD as expected by DMH ptnDetails API
    let formattedDob = dobInput.trim();
    if (formattedDob.includes('/') || formattedDob.includes('-')) {
      const separator = formattedDob.includes('/') ? '/' : '-';
      const parts = formattedDob.split(separator);
      if (parts.length === 3) {
        if (parts[0].length === 4) {
          formattedDob = `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
        } else {
          formattedDob = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
      }
    }

    setIsFetchingPatient(true);
    try {
      console.log(`[Frontend] Fetching patient details for MRD: ${mrdNo}, DOB: ${formattedDob}`);
      const res = await fetchApi("ptn_details", { mrd_no: mrdNo, dob: formattedDob });
      console.log("[Frontend] ptn_details response:", res);

      // DMH API returns response as { patientDetails: [ { lastname, firstname, mobile_no, email_id, ... } ] }
      const list = res?.patientDetails || res?.Response || res?.patientJSON || (Array.isArray(res) ? res : []);
      const ptn = Array.isArray(list) && list.length > 0 ? list[0] : null;

      if (ptn) {
        setFormData(prev => ({
          ...prev,
          firstName: ptn.firstname || ptn.first_name || ptn.firstName || prev.firstName,
          middleName: ptn.middlename || ptn.middle_name || ptn.middleName || prev.middleName,
          lastName: ptn.lastname || ptn.last_name || ptn.lastName || prev.lastName,
          mobileNo: ptn.mobile_no || ptn.mobileNo || ptn.mobile || ptn.contact_no || prev.mobileNo,
          email: ptn.email_id || ptn.emailId || ptn.email || prev.email,
          gender: ptn.sex || ptn.gender || prev.gender
        }));
        // Auto-lock mobile & email fields when fetched from API
        setIsEditableContact(false);
      }
    } catch (err) {
      console.warn("Failed to auto-fetch patient details:", err);
    } finally {
      setIsFetchingPatient(false);
    }
  };

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

  // --- Initial Load & Direct Booking URL Query Handler ---
  useEffect(() => {
    // Fetch specialities on mount
    fetchApi("speciality").then(data => {
      if (!data) return;
      if (Array.isArray(data)) setSpecialities(data);
      else if (data.specialityJSON) setSpecialities(data.specialityJSON);
      else {
        const arr = Object.values(data).find(v => Array.isArray(v));
        if (arr) setSpecialities(arr as any[]);
      }
    });

    // Check URL parameters for direct doctor booking
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlDocId = params.get('doctor_id');
      const urlSpecId = params.get('speciality_id');
      const urlServicePointId = params.get('service_point_id');

      if (urlDocId) {
        if (urlSpecId) setSelectedSpeciality(urlSpecId);
        setSelectedDoctor(urlDocId);

        // Directly load calendar step for this doctor
        const loadDirectCalendar = async () => {
          setStep("calendar");
          setIsLoadingCalendar(true);

          // Fetch doctor details to display doctor name in header
          if (urlSpecId) {
            const docData = await fetchApi("speciality_doctor", { speciality_id: urlSpecId });
            const docs = docData?.doctorJSON || (Array.isArray(docData) ? docData : []);
            if (Array.isArray(docs)) setDoctors(docs);
          }

          const datesRes = await fetchApi("check_date", {
            service_point_id: urlServicePointId || "0",
            speciality_id: urlSpecId || ""
          });

          let dateArr: any[] = [];
          if (datesRes && !datesRes.error) {
            if (Array.isArray(datesRes)) dateArr = datesRes;
            else dateArr = Object.values(datesRes).find(v => Array.isArray(v)) as any[] || [];
          }

          if (dateArr.length > 0) {
            setAvailableDates(dateArr.map((d: any) => typeof d === 'string' ? d : (d.date || d.appointment_date || d.availableDate || Object.values(d)[0])));
          } else {
            setAvailableDates([]);
          }

          setIsLoadingCalendar(false);
        };

        loadDirectCalendar();
      }
    }
  }, []);

  // Fetch doctors dynamically: either for all specialities or for the selected speciality
  useEffect(() => {
    const loadDoctorsList = async () => {
      if (selectedSpeciality) {
        const data = await fetchApi("speciality_doctor", { speciality_id: selectedSpeciality });
        if (!data) return;
        const docs = data.doctorJSON || (Array.isArray(data) ? data : []);
        if (Array.isArray(docs)) setDoctors(docs);
      } else if (specialities.length > 0) {
        const allDocs: any[] = [];
        await Promise.all(
          specialities.slice(0, 15).map(async (s: any) => {
            const specId = s.speciality_id || s.id;
            if (!specId) return;
            const data = await fetchApi("speciality_doctor", { speciality_id: String(specId) });
            const docs = data?.doctorJSON || (Array.isArray(data) ? data : []);
            if (Array.isArray(docs)) allDocs.push(...docs);
          })
        );
        setDoctors(allDocs);
      }
    };

    loadDoctorsList();
  }, [selectedSpeciality, specialities]);

  // Search Results Doctors State
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // --- Handlers ---
  const handleSearch = async () => {
    if (!selectedSpeciality && !selectedDoctor) return alert("Please select a Speciality or Doctor");

    setIsSearching(true);
    setSearchResults([]);

    // Fetch doctors directly for the selected speciality
    let currentDoctors: any[] = [];
    if (selectedSpeciality) {
      const data = await fetchApi("speciality_doctor", { speciality_id: selectedSpeciality });
      const fetchedDocs = data?.doctorJSON || (Array.isArray(data) ? data : []);
      if (Array.isArray(fetchedDocs)) {
        currentDoctors = fetchedDocs;
      }
    } else {
      currentDoctors = doctors;
    }
    
    // Filter if specific doctor is selected
    if (selectedDoctor) {
      currentDoctors = currentDoctors.filter(d => String(d.doctor_id || d.id) === String(selectedDoctor));
    }

    // Fetch OPD day & time for each doctor to render schedule table
    const doctorsWithSchedule = await Promise.all(
      currentDoctors.map(async (doc: any) => {
        let schedule: any[] = [];
        let isApp = doc.isApp === 'Y' || doc.isApp === 'true' || doc.isApp === true;

        try {
          const opdData = await fetchApi("opd_day_time", {
            doctor_id: String(doc.doctor_id || ''),
            speciality_id: String(doc.speciality_id || selectedSpeciality || '')
          });

          const list = opdData?.opdDayTimeJSON || (Array.isArray(opdData) ? opdData : []);
          if (Array.isArray(list) && list.length > 0) {
            schedule = list;
            if (list[0]?.isApp === 'Y' || list[0]?.isApp === 'true') isApp = true;
          }
        } catch (e) {
          console.warn("Failed to fetch OPD time:", e);
        }

        return {
          ...doc,
          isApp,
          schedule
        };
      })
    );

    setSearchResults(doctorsWithSchedule);
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
                  className="w-full bg-white border-2 border-teal-500/20 text-slate-700 text-lg rounded-full py-4 px-6 cursor-pointer flex items-center justify-between font-medium transition-colors hover:border-teal-500/40 relative z-10"
                  onClick={() => { setIsSpecOpen(!isSpecOpen); setIsDocOpen(false); }}
                >
                  <span className="flex-1 text-center truncate font-semibold">
                    {selectedSpeciality ? (specialities.find(s => String(s.speciality_id || s.id || s.name) === String(selectedSpeciality))?.speciality_name || specialities.find(s => String(s.speciality_id || s.id || s.name) === String(selectedSpeciality))?.name || 'Selected') : 'Select Speciality'}
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
                        Select Speciality
                      </div>
                      {specialities.map((s, i) => {
                        const val = s.speciality_id || s.id || s.name || `spec_${i}`;
                        const label = s.speciality_name || s.name || `Speciality ${i+1}`;
                        return (
                          <div 
                            key={i}
                            className={`px-6 py-3 hover:bg-teal-50 cursor-pointer text-center font-medium transition-colors uppercase ${String(selectedSpeciality) === String(val) ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-600'}`}
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
              
              <div className="text-slate-400 font-bold uppercase tracking-widest text-sm py-1">OR</div>
              
              <div className="relative">
                <div 
                  className="w-full bg-white border-2 border-teal-500/20 text-slate-700 text-lg rounded-full py-4 px-6 cursor-pointer flex items-center justify-between font-medium transition-colors hover:border-teal-500/40 relative z-10"
                  onClick={() => { setIsDocOpen(!isDocOpen); setIsSpecOpen(false); }}
                >
                  <span className="flex-1 text-center truncate font-semibold">
                    {selectedDoctor ? (
                      doctors.find(d => String(d.doctor_id || d.id || d.name) === String(selectedDoctor))?.doctor_name || 
                      doctors.find(d => String(d.doctor_id || d.id || d.name) === String(selectedDoctor))?.name || 
                      'Selected Doctor'
                    ) : 'Select Doctor'}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-teal-500 transition-transform ${isDocOpen ? 'rotate-180' : ''}`} />
                </div>

                {isDocOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDocOpen(false)} />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto z-50 py-2 custom-scrollbar">
                      <div 
                        className="px-6 py-3 hover:bg-teal-50 cursor-pointer text-slate-600 text-center font-medium transition-colors"
                        onClick={() => { setSelectedDoctor(""); setIsDocOpen(false); }}
                      >
                        Select Doctor
                      </div>
                      {doctors
                        .filter(d => selectedSpeciality ? String(d.speciality_id) === String(selectedSpeciality) : true)
                        .map((d, i) => {
                          const val = d.doctor_id || d.id || d.name || `doc_${i}`;
                          const label = d.doctor_name || d.name || `Doctor ${i+1}`;
                          return (
                            <div 
                              key={i}
                              className={`px-6 py-3 hover:bg-teal-50 cursor-pointer text-center font-medium transition-colors uppercase ${String(selectedDoctor) === String(val) ? 'bg-teal-50 text-teal-700 font-bold' : 'text-slate-600'}`}
                              onClick={() => { setSelectedDoctor(val); setIsDocOpen(false); }}
                            >
                              {label}
                            </div>
                          );
                      })}
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

        {/* Doctor Search Results List with Timetable */}
        {!bookingSuccess && searchResults.length > 0 && (
          <div className="mt-10 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-extrabold text-[#002b5c] tracking-tight">
                Available Doctors ({searchResults.length})
              </h2>
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-teal-50 text-[#007a87] rounded-full border border-teal-100">
                Live DMH Schedule
              </span>
            </div>

            {searchResults.map((doc, idx) => {
              const docName = doc.doctor_name || `${doc.first_name || ''} ${doc.last_name || ''}`.trim();
              const specName = doc.speciality_name || 'General';
              const qual = doc.qualification || 'MBBS';

              return (
                <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-slate-100 hover:border-teal-500/30 transition-all duration-300 flex flex-col lg:flex-row gap-6 items-start justify-between">
                  <div className="flex-1 w-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-[#007a87] shrink-0 border border-teal-100 shadow-sm overflow-hidden p-1">
                        {doc.doctorImage ? (
                          <img src={doc.doctorImage} alt={docName} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          <User className="w-8 h-8 text-[#007a87]" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#002b5c] tracking-tight uppercase">{docName}</h3>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold tracking-wider uppercase mt-1">
                          {specName}
                        </div>
                        <p className="text-slate-600 text-sm font-medium mt-2 leading-relaxed">{qual}</p>
                      </div>
                    </div>

                    {/* OPD Timetable Grid */}
                    {doc.schedule && doc.schedule.length > 0 ? (
                      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/60 p-1">
                        <table className="w-full text-xs text-center border-collapse">
                          <thead>
                            <tr className="bg-[#002b5c] text-white font-bold uppercase tracking-wider rounded-xl">
                              <th className="py-2.5 px-3 rounded-l-xl">MON</th>
                              <th className="py-2.5 px-3">TUE</th>
                              <th className="py-2.5 px-3">WED</th>
                              <th className="py-2.5 px-3">THU</th>
                              <th className="py-2.5 px-3">FRI</th>
                              <th className="py-2.5 px-3">SAT</th>
                              <th className="py-2.5 px-3 rounded-r-xl">SUN</th>
                            </tr>
                          </thead>
                          <tbody>
                            {doc.schedule.map((s: any, sIdx: number) => (
                              <tr key={sIdx} className="font-semibold text-slate-700 hover:bg-slate-100/60 transition-colors">
                                <td className="py-3 px-2 border-r border-slate-200/60">{s.Mon || '-'}</td>
                                <td className="py-3 px-2 border-r border-slate-200/60">{s.Tue || '-'}</td>
                                <td className="py-3 px-2 border-r border-slate-200/60">{s.Wed || '-'}</td>
                                <td className="py-3 px-2 border-r border-slate-200/60">{s.Thu || '-'}</td>
                                <td className="py-3 px-2 border-r border-slate-200/60">{s.Fri || '-'}</td>
                                <td className="py-3 px-2 border-r border-slate-200/60">{s.Sat || '-'}</td>
                                <td className="py-3 px-2">{s.Sun || '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="mt-4 text-xs font-semibold text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        OPD Schedule available via consultation query.
                      </div>
                    )}
                  </div>

                  {/* Booking or Toll Free Phone Button Column */}
                  <div className="shrink-0 w-full lg:w-auto flex flex-col items-stretch lg:items-end justify-center self-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    {doc.isApp ? (
                      <button
                        onClick={async () => {
                          setSelectedDoctor(doc.doctor_id);
                          setSelectedSpeciality(doc.speciality_id);
                          setStep("calendar");
                          setIsLoadingCalendar(true);
                          const datesRes = await fetchApi("check_date", {
                            service_point_id: doc.service_point_id || "0",
                            speciality_id: doc.speciality_id
                          });
                          let dateArr: any[] = [];
                          if (datesRes && !datesRes.error) {
                            if (Array.isArray(datesRes)) dateArr = datesRes;
                            else dateArr = Object.values(datesRes).find(v => Array.isArray(v)) as any[] || [];
                          }
                          setAvailableDates(dateArr.map((d: any) => typeof d === 'string' ? d : (d.date || d.appointment_date || Object.values(d)[0])));
                          setIsLoadingCalendar(false);
                        }}
                        className="w-full lg:w-auto bg-[#007a87] hover:bg-[#005f69] text-white px-8 py-3.5 rounded-xl font-extrabold text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300 text-center"
                      >
                        Book Appointment
                      </button>
                    ) : (
                      <div className="text-center lg:text-right w-full">
                        <p className="text-xs text-slate-500 font-bold mb-2">Please call for appointment:</p>
                        <a href="tel:02049153347" className="inline-flex items-center justify-center w-full lg:w-auto bg-[#d9232d] hover:bg-[#b81d24] text-white px-6 py-3 rounded-xl font-black text-sm shadow-md hover:shadow-lg transition-all duration-300">
                          020 4915 3347
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Step 2: Calendar View */}
        {!bookingSuccess && step === "calendar" && (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mt-6">
            <div className="bg-[#007a87] text-white text-center py-5 px-6 relative flex flex-col items-center justify-center gap-1">
              <button onClick={() => setStep("search")} className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-semibold hover:underline text-teal-100 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm transition-colors">
                ← Back To Search
              </button>
              {(() => {
                const currentDoc = doctors.find(d => String(d.doctor_id || d.id) === String(selectedDoctor)) || 
                                   searchResults.find(d => String(d.doctor_id || d.id) === String(selectedDoctor));
                const docName = currentDoc ? (currentDoc.doctor_name || `${currentDoc.first_name || ''} ${currentDoc.last_name || ''}`.trim()) : '';
                return (
                  <>
                    <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                      {docName ? docName : "Available Appointment Dates"}
                    </h2>
                    <p className="text-xs text-teal-100 font-medium uppercase tracking-wider">
                      {docName ? "Select an Available Date Below to Book Consultation" : "Available Appointment Dates"}
                    </p>
                  </>
                );
              })()}
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
                      <input 
                        required 
                        type="date" 
                        value={formData.dob.includes('/') ? formData.dob.split('/').reverse().join('-') : formData.dob} 
                        onChange={e => {
                          const val = e.target.value;
                          let formatted = val;
                          if (val) {
                            const parts = val.split('-');
                            if (parts.length === 3) formatted = `${parts[2]}/${parts[1]}/${parts[0]}`;
                          }
                          setFormData({...formData, dob: formatted});
                        }} 
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none cursor-pointer" 
                      />
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
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-bold text-slate-700"><span className="text-red-500">*</span> Patient/MRD Number</label>
                        {isFetchingPatient && <span className="text-[11px] text-teal-600 font-semibold animate-pulse">Fetching details...</span>}
                      </div>
                      <input 
                        required 
                        type="text" 
                        value={formData.mrdNo} 
                        onChange={e => {
                          const val = e.target.value;
                          setFormData({...formData, mrdNo: val});
                          if (val && formData.dob) fetchRegisteredPatientDetails(val, formData.dob);
                        }} 
                        onBlur={() => {
                          if (formData.mrdNo && formData.dob) fetchRegisteredPatientDetails(formData.mrdNo, formData.dob);
                        }}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none" 
                        placeholder="Enter MRD Number..." 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1"><span className="text-red-500">*</span> DOB (DD/MM/YYYY)</label>
                      <div className="relative">
                        <input 
                          required 
                          type="date" 
                          value={formData.dob.includes('/') ? formData.dob.split('/').reverse().join('-') : formData.dob} 
                          onChange={e => {
                            const val = e.target.value; // YYYY-MM-DD
                            let formatted = val;
                            if (val) {
                              const parts = val.split('-');
                              if (parts.length === 3) formatted = `${parts[2]}/${parts[1]}/${parts[0]}`;
                            }
                            setFormData({...formData, dob: formatted});
                            if (formData.mrdNo && formatted) fetchRegisteredPatientDetails(formData.mrdNo, formatted);
                          }} 
                          onBlur={() => {
                            if (formData.mrdNo && formData.dob) fetchRegisteredPatientDetails(formData.mrdNo, formData.dob);
                          }}
                          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0] outline-none cursor-pointer" 
                        />
                      </div>
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
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-slate-700"><span className="text-red-500">*</span> Mobile No</label>
                    {patientTab === "registered" && !isEditableContact && formData.mobileNo && (
                      <button 
                        type="button" 
                        onClick={() => setIsEditableContact(true)} 
                        className="text-[11px] font-bold text-[#007a87] hover:underline"
                      >
                        Update Contact Info
                      </button>
                    )}
                  </div>
                  <input 
                    required 
                    type="tel" 
                    disabled={patientTab === "registered" && !isEditableContact && Boolean(formData.mobileNo)} 
                    value={formData.mobileNo} 
                    onChange={e => setFormData({...formData, mobileNo: e.target.value})} 
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors ${patientTab === "registered" && !isEditableContact && Boolean(formData.mobileNo) ? 'bg-slate-100/80 text-slate-700 cursor-not-allowed border-slate-200' : 'border-slate-300 focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0]'}`} 
                    placeholder="Mobile No..." 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1"><span className="text-red-500">*</span> Email ID</label>
                  <input 
                    required 
                    type="email" 
                    disabled={patientTab === "registered" && !isEditableContact && Boolean(formData.email)} 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors ${patientTab === "registered" && !isEditableContact && Boolean(formData.email) ? 'bg-slate-100/80 text-slate-700 cursor-not-allowed border-slate-200' : 'border-slate-300 focus:border-[#4bc2b0] focus:ring-1 focus:ring-[#4bc2b0]'}`} 
                    placeholder="Email Address..." 
                  />
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
