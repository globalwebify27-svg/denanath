"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, Calendar, UserRound, Clock, Loader2, ChevronLeft } from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const generatePagination = (currentPage: number, totalPages: number) => {
  const delta = 1;
  const range = [];
  const rangeWithDots: (number | string)[] = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

// Component for rendering individual doctor with staggered schedule loading
const DoctorScheduleCard = ({ doc, initialData, index }: { doc: any, initialData: any, index: number }) => {
  const [timings, setTimings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchSchedule = async () => {
      try {
        const res = await fetch('/api/dmh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'opd_day_time',
            doctor_id: doc.dmhDoctorId || String(doc.doctor_id || doc.id || ''),
            speciality_id: doc.dmhSpecialityId || String(doc.speciality_id || ''),
            service_point_id: doc.dmhServicePointId || '',
            service_center_id: doc.dmhServiceCenterId || ''
          })
        });
        const data = await res.json();
        if (!isMounted) return;

        const list = data?.opdDayTimeJSON || (Array.isArray(data) ? data : []);
        if (list.length > 0) {
          const dmhSchedule = list[0];
          const parsedTimings: any[] = [];
          daysOfWeek.forEach((day: string) => {
            const val = dmhSchedule[day];
            if (val && val !== '-' && !val.toLowerCase().includes('no opd') && !val.toLowerCase().includes('none')) {
              const cleanVal = val.replace(/<br\s*\/?>/gi, " | ").replace(/\[.*?\]/g, "");
              parsedTimings.push({ day, time: cleanVal.trim() });
            }
          });
          setTimings(parsedTimings);
        }
      } catch (err) {
        console.error("Failed to fetch schedule for", doc.doctor_name, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Deterministic stagger based on index to completely avoid WAF blocks (200ms between each request)
    const timer = setTimeout(() => {
      if (isMounted) fetchSchedule();
    }, index * 200);

    return () => { 
      isMounted = false; 
      clearTimeout(timer);
    };
  }, [doc, index]);

  const availability = useMemo(() => {
    const mapping: { [key: string]: string[] } = {
      Mon: [], Tue: [], Wed: [], Thu: [], Fri: [], Sat: [], Sun: []
    };
    timings.forEach(t => {
      if (mapping[t.day]) {
        mapping[t.day].push(t.time + (t.branch ? ` (${t.branch})` : ''));
      }
    });
    // For original timings loaded directly with "Mon to Sat" parsing fallback
    let fallbackTimings: any[] = [];
    if (typeof doc.timings === 'string' && doc.timings.trim().startsWith('[')) {
      try { fallbackTimings = JSON.parse(doc.timings); } catch(e) {}
    } else if (Array.isArray(doc.timings)) {
      fallbackTimings = doc.timings;
    }

    fallbackTimings.forEach((t: any) => {
      const dayStr = (t.day || "").toLowerCase();
      const timeStr = t.time || "";
      const branchStr = t.branch ? ` (${t.branch})` : "";
      const displayStr = `${timeStr}${branchStr}`;
      
      if (dayStr.includes("mon") || dayStr.includes("monday")) mapping.Mon.push(displayStr);
      if (dayStr.includes("tue") || dayStr.includes("tuesday")) mapping.Tue.push(displayStr);
      if (dayStr.includes("wed") || dayStr.includes("wednesday")) mapping.Wed.push(displayStr);
      if (dayStr.includes("thu") || dayStr.includes("thursday")) mapping.Thu.push(displayStr);
      if (dayStr.includes("fri") || dayStr.includes("friday")) mapping.Fri.push(displayStr);
      if (dayStr.includes("sat") || dayStr.includes("saturday")) mapping.Sat.push(displayStr);
      if (dayStr.includes("sun") || dayStr.includes("sunday")) mapping.Sun.push(displayStr);
      if (dayStr.includes("monday to saturday") || dayStr.includes("mon to sat")) {
        mapping.Mon.push(displayStr); mapping.Tue.push(displayStr); mapping.Wed.push(displayStr);
        mapping.Thu.push(displayStr); mapping.Fri.push(displayStr); mapping.Sat.push(displayStr);
      } else if (dayStr.includes("monday to friday") || dayStr.includes("mon to fri")) {
        mapping.Mon.push(displayStr); mapping.Tue.push(displayStr); mapping.Wed.push(displayStr);
        mapping.Thu.push(displayStr); mapping.Fri.push(displayStr);
      }
    });
    for (const key in mapping) {
      mapping[key] = Array.from(new Set(mapping[key]));
    }
    return mapping;
  }, [timings, doc.timings]);

  const docName = doc.doctor_name || doc.name || "";
  const qual = doc.qualification || doc.qualifications || "";

  return (
    <div className="p-6">
      <div className="mb-4">
        <h4 className="text-lg font-extrabold text-black mb-1">{docName}</h4>
        <p className="text-[18px] leading-[31px] font-[400] text-slate-600">{qual}</p>
      </div>
      
      {/* Schedule Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 relative min-h-[120px]">
        {loading && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10 backdrop-blur-[1px]">
             <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
          </div>
        )}
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 text-slate-700 text-[18px] leading-[31px] font-[700]">
              <th className="p-4 border-b border-slate-200">{initialData?.tableDaysHeader || "Days"}</th>
              {daysOfWeek.map(day => (
                <th key={day} className="p-4 border-b border-l border-slate-200 text-center">{day}</th>
              ))}
              <th className="p-4 border-b border-l border-slate-200 text-center">{initialData?.tableAppointmentHeader || "Appointment"}</th>
            </tr>
          </thead>
          <tbody className="text-xs text-slate-600 bg-white">
            <tr>
              <td className="p-4 font-[700] text-[18px] leading-[31px] text-slate-700 align-top">{initialData?.tableAvailabilityLabel || "Availability"}</td>
              {daysOfWeek.map(day => (
                <td key={day} className="p-4 border-l border-slate-100 align-top text-center">
                  {availability[day].length > 0 ? (
                    <div className="space-y-2">
                      {availability[day].map((time, i) => (
                        <div key={i} className="text-slate-700 text-[16px] leading-[31px] font-[400]">
                          {time}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
              ))}
              <td className="p-4 border-l border-slate-100 align-middle text-center">
                <Link href={`/book-appointment?doctor_id=${doc.dmhDoctorId || doc.doctor_id || doc.id || ''}&speciality_id=${doc.dmhSpecialityId || doc.speciality_id || ''}`} className="inline-flex items-center justify-center px-4 py-2 bg-[#007a87] hover:bg-[#005f69] text-white text-lg rounded-lg font-bold transition-colors w-full">
                  {initialData?.tableBookBtnLabel || "Book"}
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function OpdScheduleClientPage({ initialData }: { initialData?: any }) {
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  const [specialitiesList, setSpecialitiesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const specRes = await fetch('/api/dmh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'speciality' })
        });
        const specData = await specRes.json();
        let specs = specData?.specialityJSON || (Array.isArray(specData) ? specData : []);
        setSpecialitiesList(specs);

        const docRes = await fetch('/api/doctors');
        const docs = await docRes.json();
        
        if (Array.isArray(docs) && docs.length > 0) {
           setDoctorsList(docs);
        }
      } catch (err) {
        console.error("Failed to fetch initial schedule data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const [selectedSpecialty, setSelectedSpecialty] = useState("--Select--");
  const [selectedDoctor, setSelectedDoctor] = useState("-- Doctor --");

  const uniqueSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    doctorsList.forEach(doc => {
      const sName = doc.speciality_name || doc.specialty;
      if (sName) specialties.add(sName);
    });
    return Array.from(specialties).sort();
  }, [doctorsList]);

  const uniqueDoctors = useMemo(() => {
    const doctors = new Set<string>();
    doctorsList.forEach(doc => {
      const sName = doc.speciality_name || doc.specialty;
      if (selectedSpecialty === "--Select--" || sName === selectedSpecialty) {
        doctors.add(doc.doctor_name || doc.name);
      }
    });
    return Array.from(doctors).sort((a, b) => {
      const nameA = a.replace(/^Dr\.?\s+/i, "").trim().toLowerCase();
      const nameB = b.replace(/^Dr\.?\s+/i, "").trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [doctorsList, selectedSpecialty]);

  // When specialty changes, reset doctor selection and reset to page 1
  useEffect(() => {
    if (selectedDoctor !== "-- Doctor --" && !uniqueDoctors.includes(selectedDoctor)) {
      setSelectedDoctor("-- Doctor --");
    }
  }, [selectedSpecialty, uniqueDoctors, selectedDoctor]);

  const filteredDoctors = useMemo(() => {
    return doctorsList.filter(doc => {
      const sName = doc.speciality_name || doc.specialty;
      const dName = doc.doctor_name || doc.name;
      const matchSpecialty = selectedSpecialty === "--Select--" || sName === selectedSpecialty;
      const matchDoctor = selectedDoctor === "-- Doctor --" || dName === selectedDoctor;
      return matchSpecialty && matchDoctor;
    }).sort((a, b) => {
      const specA = a.speciality_name || a.specialty || "";
      const specB = b.speciality_name || b.specialty || "";
      if (specA !== specB) return specA.localeCompare(specB);
      const nameA = (a.doctor_name || a.name || "").replace(/^Dr\.?\s+/i, "").trim().toLowerCase();
      const nameB = (b.doctor_name || b.name || "").replace(/^Dr\.?\s+/i, "").trim().toLowerCase();
      return nameA.localeCompare(nameB);
    });
  }, [doctorsList, selectedSpecialty, selectedDoctor]);

  // Calculate Pagination
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const currentDoctors = filteredDoctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Group current page doctors by specialty for display
  const groupedDoctors = useMemo(() => {
    const groups: { [key: string]: any[] } = {};
    currentDoctors.forEach(doc => {
      const spec = doc.speciality_name || doc.specialty || "OTHER";
      if (!groups[spec]) groups[spec] = [];
      groups[spec].push(doc);
    });
    return groups;
  }, [currentDoctors]);

  const sortedSpecialties = Object.keys(groupedDoctors).sort();

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
            <span className="text-white">{initialData?.heroBreadcrumb || "OPD Schedule"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {initialData?.heroTitle || "OPD Schedule"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
          
          <div className="mb-8">
            <div style={{ fontSize: '14px' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
              <Calendar className="w-4 h-4" />
              <span>{initialData?.subtitle || "Timetable"}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
              {initialData?.pageTitle || "Hospital OPD Schedule"}
            </h2>
            <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
            
            {initialData?.content && (
              <div 
                className="prose prose-slate max-w-none mb-10 text-slate-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: initialData.content }}
              />
            )}
          </div>

          {/* Filters */}
          <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{initialData?.filterSpecialtyLabel || "Filter By Specialty:"}</label>
                <div className="relative">
                  <CustomDropdown
                    name="specialtyFilter"
                    options={uniqueSpecialties}
                    placeholder="--Select--"
                    value={selectedSpecialty === "--Select--" ? "" : selectedSpecialty}
                    onChange={(val: string) => { setSelectedSpecialty(val || "--Select--"); setCurrentPage(1); }}
                    className="!text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{initialData?.filterDoctorLabel || "Filter By Doctor:"}</label>
                <div className="relative">
                  <CustomDropdown
                    name="doctorFilter"
                    options={uniqueDoctors}
                    placeholder="-- Doctor --"
                    value={selectedDoctor === "-- Doctor --" ? "" : selectedDoctor}
                    onChange={(val: string) => { setSelectedDoctor(val || "-- Doctor --"); setCurrentPage(1); }}
                    className="!text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Schedule List */}
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <Loader2 className="w-10 h-10 text-[#007a87] animate-spin mb-4" />
              <h3 className="text-xl font-bold text-slate-700 mb-2">{initialData?.loadingMessage || "Loading Schedule..."}</h3>
            </div>
          ) : sortedSpecialties.length > 0 ? (
            <div className="space-y-12">
              {sortedSpecialties.map((spec, specIdx) => (
                <div key={specIdx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  {/* Specialty Header */}
                  <div className="bg-[#002b5c] px-6 py-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">{spec}</h3>
                  </div>
                  
                  {/* Doctors in this specialty */}
                  <div className="divide-y divide-slate-100">
                    {groupedDoctors[spec].map((doc, docIdx) => (
                      <DoctorScheduleCard 
                        key={doc.doctor_id || docIdx} 
                        doc={doc} 
                        initialData={initialData} 
                        index={docIdx} 
                      />
                    ))}
                  </div>
                </div>
              ))}
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-8">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  {generatePagination(currentPage, totalPages).map((page, idx) => (
                    page === '...' ? (
                      <span key={`dots-${idx}`} className="w-10 h-10 flex items-center justify-center text-slate-500">
                        ...
                      </span>
                    ) : (
                      <button
                        key={`page-${page}`}
                        onClick={() => setCurrentPage(page as number)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg border font-bold transition-colors ${
                          currentPage === page 
                            ? "bg-[#007a87] border-[#007a87] text-white" 
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}

                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
              <h3 className="text-xl font-bold text-slate-700 mb-2">{initialData?.noDoctorsTitle || "No Doctors Found"}</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                {initialData?.noDoctorsDesc || "We couldn't find any doctors matching your current filters. Try adjusting the specialty or name."}
              </p>
              <button 
                onClick={() => { setSelectedSpecialty("--Select--"); setSelectedDoctor("-- Doctor --"); setCurrentPage(1); }}
                className="mt-6 text-sm font-bold text-[#007a87] hover:underline"
              >
                {initialData?.clearFiltersBtnLabel || "Clear Filters"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
