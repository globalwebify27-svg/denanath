"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Stethoscope, Search, UserRound, GraduationCap, ArrowRight, X, Calendar, Clock, BookOpen, Briefcase } from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";

const DoctorImage = ({ doc, className, iconClassName }: { doc: any, className?: string, iconClassName?: string }) => {
  const [error, setError] = useState(false);
  
  // Reset error state if the image URL changes (e.g. during pagination or filtering)
  useEffect(() => {
    setError(false);
  }, [doc?.image]);

  if (!doc?.image || error) {
    return <UserRound className={iconClassName} />;
  }

  return (
    <img 
      src={doc.image} 
      alt={doc.name} 
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default function DoctorDetailsPage() {
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctorsFromApi = async () => {
      setLoading(true);
      try {
        // Step 1: Fetch all specialties
        const specRes = await fetch('/api/dmh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'speciality' }),
        });
        if (!specRes.ok) return;
        const specData = await specRes.json();
        const specialtiesList = specData?.specialityJSON || (Array.isArray(specData) ? specData : []);
        if (!Array.isArray(specialtiesList) || specialtiesList.length === 0) return;

        // Step 2: Fire ALL requests in parallel, stream results as they arrive
        let firstResultShown = false;
        const allDoctors: any[] = [];

        await Promise.all(
          specialtiesList.map(async (spec: any) => {
            const specId = spec.id || spec.speciality_id;
            if (!specId) return;
            try {
              const docRes = await fetch('/api/dmh', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'speciality_doctor', speciality_id: String(specId) }),
              });
              if (!docRes.ok) return;
              const docData = await docRes.json();
              const doctors = docData?.doctorJSON || (Array.isArray(docData) ? docData : []);
              if (!Array.isArray(doctors) || doctors.length === 0) return;

              const mapped = doctors.map((doc: any, dIdx: number) => ({
                id: `${doc.doctor_id || 'doc'}_${specId}_${dIdx}`,
                doctor_id: doc.doctor_id || '',
                speciality_id: doc.speciality_id || String(specId),
                service_center_id: doc.service_center_id || '',
                service_point_id: doc.service_point_id || '',
                name: doc.doctor_name || `${doc.first_name || ''} ${doc.last_name || ''}`.trim() || 'Doctor',
                specialty: doc.speciality_name || spec.speciality_name || 'General',
                qualifications: doc.qualification || doc.qualifications || 'MBBS',
                image: doc.doctorImage || doc.photo || '',
                isApp: doc.isApp === 'Y' || doc.isApp === 'true' || doc.isApp === true,
                timings: [],
              }));

              allDoctors.push(...mapped);

              // Stream: update UI immediately as each specialty's doctors arrive
              setDoctorsList([...allDoctors]);
              if (!firstResultShown) {
                firstResultShown = true;
                setLoading(false);
              }
            } catch (e) {
              // silently skip failed specialties
            }
          })
        );

        // Final update with complete list
        setDoctorsList([...allDoctors]);
      } catch (err) {
        console.error("Failed to fetch doctors from DMH API:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDoctorsFromApi();
  }, []);

  const options = [
    { name: "Doctor Details", href: "/doctor-details", active: true },
    { name: "Department Details", href: "/department-details", active: false },
    { name: "Services", href: "/services", active: false }
];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // State for filters & pagination
  const [selectedSpecialty, setSelectedSpecialty] = useState("--Select--");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isAppAllowed, setIsAppAllowed] = useState<boolean | null>(null);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const itemsPerPage = 30;

  // Whenever a doctor is selected, check opd_day_time using API doctor_id and speciality_id
  // Whenever a doctor is selected, fetch opd_day_time from API using doctor_id and speciality_id
  useEffect(() => {
    if (!selectedDoctor) {
      setIsAppAllowed(null);
      return;
    }

    const checkDoctorSchedule = async () => {
      setLoadingSchedule(true);
      try {
        const response = await fetch('/api/dmh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'opd_day_time',
            doctor_id: String(selectedDoctor.doctor_id || ''),
            speciality_id: String(selectedDoctor.speciality_id || ''),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('[opd_day_time API Response]:', data);

          const list = data?.opdDayTimeJSON || (Array.isArray(data) ? data : []);
          if (Array.isArray(list) && list.length > 0) {
            const firstSlot = list[0];
            const isApp = firstSlot?.isApp === 'Y' || firstSlot?.isApp === 'true' || firstSlot?.isApp === true || data?.isApp === 'Y' || data?.isApp === true;
            setIsAppAllowed(isApp);

            // Construct human-readable OPD timings array from API Mon-Sun days
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const dayNames: Record<string, string> = {
              Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday'
            };

            const parsedTimings: any[] = [];
            list.forEach((slot: any) => {
              days.forEach(d => {
                if (slot[d] && slot[d] !== '-') {
                  // Clean raw HTML tags (e.g. <br>, <br/>) from API time string
                  const cleanTime = String(slot[d])
                    .replace(/<br\s*\/?>/gi, '\n')
                    .replace(/<[^>]*>/g, '')
                    .trim();

                  parsedTimings.push({
                    branch: selectedDoctor.specialty || slot.opd_type || 'General OPD',
                    day: dayNames[d] || d,
                    time: cleanTime,
                  });
                }
              });
            });

            if (parsedTimings.length > 0) {
              setSelectedDoctor((prev: any) => ({ ...prev, timings: parsedTimings }));
            }
          } else {
            setIsAppAllowed(selectedDoctor.isApp ?? false);
          }
        } else {
          setIsAppAllowed(selectedDoctor.isApp ?? false);
        }
      } catch (err) {
        console.warn('Failed to check opd_day_time schedule:', err);
        setIsAppAllowed(selectedDoctor.isApp ?? false);
      } finally {
        setLoadingSchedule(false);
      }
    };

    checkDoctorSchedule();
  }, [selectedDoctor?.doctor_id, selectedDoctor?.speciality_id]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSpecialty, searchName]);

  useEffect(() => {
    if (window.innerWidth < 1024 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        const scrollPos = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  // Get unique specialties for dropdown
  const uniqueSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    doctorsList.forEach(doc => {
      // Split by comma in case of multiple specialties, but for now we take the full string to match the design
      if (doc.specialty) specialties.add(doc.specialty);
    });
    return Array.from(specialties).sort();
  }, [doctorsList]);

  // Filter and sort doctors based on inputs
  const filteredDoctors = useMemo(() => {
    const filtered = doctorsList.filter(doc => {
      const docSpecialty = doc.specialty || "";
      const matchSpecialty = selectedSpecialty === "--Select--" || docSpecialty === selectedSpecialty;
      const matchName = doc.name.toLowerCase().includes(searchName.toLowerCase());
      return matchSpecialty && matchName;
    });

    // Sort alphabetically by name, ignoring "Dr." or "Dr " prefix for proper sorting
    return filtered.sort((a, b) => {
      const nameA = a.name.trim().replace(/^Dr\.?\s+/i, "").trim().toLowerCase();
      const nameB = b.name.trim().replace(/^Dr\.?\s+/i, "").trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [doctorsList, selectedSpecialty, searchName]);

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredDoctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Doctors & Departments</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Doctor Details</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Doctor Details
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          {options.length > 0 && (
            <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
              <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                {options.map((option, idx) => (
                  <Link
                    key={idx}
                    href={option.href}
                    data-active={option.active}
                    className={"snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal " + (
                      option.active
                        ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                        : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                    ) + " " + (idx !== options.length - 1 ? "lg:border-b lg:border-b-slate-50" : "") + (idx === 0 ? " lg:rounded-t-[15px]" : "") + (idx === options.length - 1 ? " lg:rounded-b-[15px]" : "")}
                  >
                    <span>{option.name}</span>
                    <ChevronRight 
                      className={"hidden lg:block w-4 h-4 transition-transform duration-300 " + (
                        option.active 
                          ? "text-[#007a87] translate-x-1" 
                          : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#002b5c]"
                      )} 
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="mb-8">
                <div style={{ fontSize: '14px' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctors & Departments</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Doctor Details
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              {/* Filters Section */}
              <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Specialty Filter */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Filter By Specialty:</label>
                    <div className="relative">
                      <CustomDropdown
                        name="specialtyFilter"
                        options={uniqueSpecialties}
                        placeholder="--Select--"
                        value={selectedSpecialty === "--Select--" ? "" : selectedSpecialty}
                        onChange={(val: string) => setSelectedSpecialty(val || "--Select--")}
                        className="!text-sm"
                      />
                    </div>
                  </div>

                  {/* Name Search */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Filter By Name:</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="Doctor Name" 
                        className="w-full bg-white border border-slate-300 rounded-lg py-3 pl-11 pr-4 text-slate-700 font-medium placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctors Grid */}
              {loading ? (
                <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Loading Doctors...</h3>
                </div>
              ) : paginatedDoctors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedDoctors.map((doc, idx) => (
                    <div key={`${doc.id || doc.doctor_id || 'doc'}_card_${idx}`} className="group bg-white border border-slate-200 hover:border-[#D9232D] rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:-translate-y-1 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-24 h-28 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 overflow-hidden group-hover:bg-[#D9232D] group-hover:border-[#D9232D] transition-colors">
                          <DoctorImage 
                            doc={doc}
                            className="w-full h-full object-cover text-[0px]"
                            iconClassName="w-12 h-12 text-[#007a87] group-hover:text-white transition-colors"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold text-[#002b5c] group-hover:text-[#D9232D] transition-colors line-clamp-2">
                            {doc.name}
                          </h3>
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-100 text-amber-700 text-[10px] font-bold tracking-wider uppercase mt-2">
                            {(doc.specialty || '').split(',')[0]} {/* Display primary specialty */}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 mb-6">
                        <div className="flex items-start gap-2 text-slate-600">
                          <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-[7px]" />
                          <span className="text-[16px] leading-[31px] font-normal">{doc.qualifications}</span>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <button 
                          onClick={() => setSelectedDoctor(doc)}
                          className="flex items-center gap-2 text-sm font-bold text-[#007a87] group-hover:text-teal-600 transition-colors"
                        >
                          View Profile
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">No Doctors Found</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We couldn't find any doctors matching your current filters. Try adjusting the specialty or name.
                  </p>
                  <button 
                    onClick={() => { setSelectedSpecialty("--Select--"); setSearchName(""); }}
                    className="mt-6 text-sm font-bold text-[#007a87] hover:underline"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredDoctors.length > 0 && (
                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500">
                    Showing <strong className="text-slate-800">{paginatedDoctors.length}</strong> of <strong className="text-slate-800">{filteredDoctors.length}</strong> Results
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-[#002b5c]">Page: {currentPage} of {totalPages || 1}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setCurrentPage(p => Math.max(1, p - 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === 1}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentPage === 1 ? 'border border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#007a87] text-white hover:bg-teal-700'}`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentPage(p => Math.min(totalPages, p + 1));
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        disabled={currentPage === totalPages}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${currentPage === totalPages ? 'border border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-[#007a87] text-white hover:bg-teal-700'}`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative my-auto animate-slideUp">
            
            {/* Modal Header */}
            <div className="relative p-6 md:p-8 border-b border-slate-100 shrink-0 sticky top-0 bg-white z-10 rounded-t-3xl">
              <div className="flex items-start gap-5 sm:gap-6 pr-12">
                <div className="w-[150px] h-[200px] sm:w-[220px] sm:h-[280px] rounded-2xl bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm overflow-hidden text-slate-400">
                  <DoctorImage 
                    doc={selectedDoctor}
                    className="w-full h-full object-fill rounded-xl bg-white"
                    iconClassName="w-16 h-16 sm:w-20 sm:h-20 text-slate-400"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between h-[200px] sm:h-[280px] py-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-[28px] font-[900] text-[#002b5c] leading-tight mb-2 uppercase">{selectedDoctor.name}</h2>
                    <p className="text-[16px] leading-[31px] font-normal text-slate-500">{selectedDoctor.qualifications}</p>
                  </div>
                  
                  <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    {loadingSchedule ? (
                      <div className="text-xs font-semibold text-slate-400 mt-2 sm:mt-0">Checking appointment availability...</div>
                    ) : isAppAllowed !== false ? (
                      <Link href={`/book-appointment?doctor_id=${selectedDoctor.doctor_id || selectedDoctor.id || ''}&speciality_id=${selectedDoctor.speciality_id || ''}&service_point_id=${selectedDoctor.service_point_id || ''}`} className="inline-flex items-center justify-center px-6 py-2.5 bg-[#007a87] hover:bg-[#005f69] text-[#ffffff] font-extrabold text-sm transition-colors rounded-lg w-fit mt-5 sm:mt-6">
                        Book Appointment
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all duration-300 hover:rotate-90 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto bg-slate-50/50">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Schedule & Basics */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Stethoscope className="w-4 h-4" /> Specialty
                    </h3>
                    <div className="inline-block px-3 py-1.5 bg-amber-50 border border-amber-100 text-amber-700 rounded-lg text-sm font-bold">
                      {selectedDoctor.specialty}
                    </div>
                  </div>

                  {selectedDoctor.timings && selectedDoctor.timings.length > 0 && (
                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2 leading-[31px]">
                        <Calendar className="w-4 h-4" /> OPD Timings
                      </h3>
                      <div className="space-y-4">
                        {selectedDoctor.timings.map((t: any, i: number) => (
                          <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <div className="flex flex-col gap-1 mb-3">
                              <span className="text-[16px] leading-[31px] font-normal text-[#007a87] uppercase">{t.branch}</span>
                              <span className="text-[16px] leading-[31px] font-normal text-slate-600">{t.day}</span>
                            </div>
                            <div className="flex items-start gap-2 text-[16px] leading-[31px] text-slate-700 font-normal">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-2" />
                              <span className="whitespace-pre-line">{t.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                        <div>
                          <p className="text-[14px] leading-[31px] font-normal text-slate-500 mb-2">For Appointment, please call:</p>
                          <a href="tel:02040151100" className="inline-flex items-center justify-center w-full py-2.5 bg-[#d9232d] hover:bg-[#b81d24] text-white rounded-lg font-bold text-sm transition-colors">
                            020 4015 1100
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {selectedDoctor.education && selectedDoctor.education.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                      <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3 leading-[31px]">
                        <GraduationCap className="w-6 h-6 text-[#007a87]" /> Education
                      </h3>
                      <ul className="space-y-4">
                        {selectedDoctor.education.map((item: string, i: number) => (
                          <li key={i} className="flex gap-3 text-slate-600 font-normal text-[16px] leading-[31px]">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-2.5"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedDoctor.training && selectedDoctor.training.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                      <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3 leading-[31px]">
                        <BookOpen className="w-6 h-6 text-[#007a87]" /> Training
                      </h3>
                      <ul className="space-y-4">
                        {selectedDoctor.training.map((item: string, i: number) => (
                          <li key={i} className="flex gap-3 text-slate-600 font-normal text-[16px] leading-[31px]">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2.5"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedDoctor.experience && selectedDoctor.experience.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                      <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3 leading-[31px]">
                        <Briefcase className="w-6 h-6 text-[#007a87]" /> Experience
                      </h3>
                      <ul className="space-y-4">
                        {selectedDoctor.experience.map((item: string, i: number) => (
                          <li key={i} className="flex gap-3 text-slate-600 font-normal text-[16px] leading-[31px]">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2.5"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedDoctor.publications && selectedDoctor.publications.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                      <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3 leading-[31px]">
                        <BookOpen className="w-6 h-6 text-[#007a87]" /> Publications
                      </h3>
                      <ul className="space-y-4">
                        {selectedDoctor.publications.map((item: any, i: number) => {
                          let title = '';
                          let link = '';
                          
                          if (typeof item === 'string') {
                            title = item;
                          } else if (item && typeof item === 'object') {
                            title = item.title || '';
                            link = item.link || '';
                          }

                          return (
                            <li key={i} className="flex gap-3 text-slate-600 font-normal text-[16px] leading-[31px]">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2.5"></div>
                              <div className="flex-1">
                                {title.includes('[PDF]') ? (
                                  <span>
                                    {title.replace('[PDF]', '')}
                                    <span className="text-red-500 font-bold ml-1">[PDF]</span>
                                  </span>
                                ) : (
                                  <span className="mr-2">{title}</span>
                                )}
                                {link && (
                                  <a href={link} target="_blank" rel="noopener noreferrer" className="text-red-500 font-bold hover:underline">
                                    [PDF]
                                  </a>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
