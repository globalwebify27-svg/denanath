"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Stethoscope, Search, UserRound, GraduationCap, ArrowRight, X, Calendar, Clock, BookOpen, Briefcase } from "lucide-react";



export default function DoctorDetailsPage() {
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/doctors?t=' + Date.now(), { cache: 'no-store' })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch doctors");
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          console.error("Expected array but got:", data);
          setDoctorsList([]);
          return;
        }

        const safeParse = (str: any) => {
          if (!str) return [];
          if (typeof str !== 'string') return str;
          try {
            return JSON.parse(str);
          } catch (e) {
            const clean = str.trim();
            if (!clean.startsWith('[')) {
              return [];
            }
            
            if (clean.includes('"branch"') || clean.includes('"day"') || clean.includes('"time"')) {
              const matches = [...clean.matchAll(/\{[^}]*\}/g)];
              const result: any[] = [];
              for (const m of matches) {
                try {
                  let objStr = m[0];
                  if (!objStr.endsWith('}')) objStr += '}';
                  result.push(JSON.parse(objStr));
                } catch (err) {}
              }
              return result;
            }

            const result: string[] = [];
            const stringRegex = /"([^"\\]|\\.)*"/g;
            let match;
            let lastIndex = 0;
            
            const content = clean.substring(1);
            while ((match = stringRegex.exec(content)) !== null) {
              try {
                result.push(JSON.parse(match[0]));
              } catch (err) {}
              lastIndex = stringRegex.lastIndex;
            }
            
            const remaining = content.substring(lastIndex).trim();
            let rawStr = remaining;
            if (rawStr.startsWith(',')) {
              rawStr = rawStr.substring(1).trim();
            }
            if (rawStr.startsWith('"')) {
              let unclosed = rawStr.substring(1);
              if (unclosed.endsWith('\\')) {
                unclosed = unclosed.substring(0, unclosed.length - 1);
              }
              unclosed = unclosed.replace(/\]\s*$/, '');
              try {
                result.push(JSON.parse('"' + unclosed + '"'));
              } catch (err) {
                if (unclosed) result.push(unclosed);
              }
            }
            
            return result;
          }
        };

        const parsedData = data.map((doc: any) => ({
          ...doc,
          timings: safeParse(doc.timings),
          education: safeParse(doc.education),
          training: safeParse(doc.training),
          experience: safeParse(doc.experience),
          publications: safeParse(doc.publications),
        }));
        setDoctorsList(parsedData);
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
        setDoctorsList([]);
      })
      .finally(() => setLoading(false));
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
  const itemsPerPage = 30;

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

  // Filter doctors based on inputs
  const filteredDoctors = useMemo(() => {
    return doctorsList.filter(doc => {
      const docSpecialty = doc.specialty || "";
      const matchSpecialty = selectedSpecialty === "--Select--" || docSpecialty === selectedSpecialty;
      const matchName = doc.name.toLowerCase().includes(searchName.toLowerCase());
      return matchSpecialty && matchName;
    });
  }, [doctorsList, selectedSpecialty, searchName]);

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredDoctors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
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
                      <select 
                        className="w-full appearance-none bg-white border border-slate-300 rounded-lg py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow cursor-pointer"
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                      >
                        <option value="--Select--">--Select--</option>
                        {uniqueSpecialties.map((spec, idx) => (
                          <option key={idx} value={spec}>{spec}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
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
                    <div key={idx} className="group bg-white border border-slate-200 hover:border-[#D9232D] rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:-translate-y-1 flex flex-col h-full">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 overflow-hidden group-hover:bg-[#D9232D] group-hover:border-[#D9232D] transition-colors">
                          {doc.image && (
                            <img 
                              src={doc.image} 
                              alt={doc.name} 
                              className="w-full h-full object-cover text-[0px]" 
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.nextElementSibling?.classList.remove('hidden');
                              }}
                            />
                          )}
                          <UserRound className={"w-8 h-8 text-[#007a87] group-hover:text-white transition-colors " + (doc.image ? "hidden" : "")} />
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
                        <div className="flex items-start gap-2 text-sm font-medium text-slate-600">
                          <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{doc.qualifications}</span>
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
            <div className="flex items-start justify-between p-4 sm:p-6 md:p-8 border-b border-slate-100 shrink-0 sticky top-0 bg-white z-10 rounded-t-3xl gap-2">
              <div className="flex items-center gap-3 sm:gap-5 flex-1 min-w-0 pr-2">
                <div className="w-24 h-32 sm:w-32 sm:h-40 rounded-2xl bg-[#002b5c] flex items-center justify-center shrink-0 border-2 sm:border-4 border-white shadow-sm overflow-hidden text-white font-bold text-xl">
                  {selectedDoctor.image && (
                    <img 
                      src={selectedDoctor.image} 
                      alt={selectedDoctor.name} 
                      className="w-full h-full object-cover bg-white text-[0px]" 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  )}
                  <UserRound className={"w-7 h-7 sm:w-8 sm:h-8 text-white " + (selectedDoctor.image ? "hidden" : "")} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#002b5c] leading-tight break-words">{selectedDoctor.name}</h2>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 md:mt-1.5 leading-snug truncate sm:whitespace-normal">{selectedDoctor.qualifications}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all duration-300 hover:rotate-90 shrink-0 mt-1 sm:mt-0"
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
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> OPD Timings
                      </h3>
                      <div className="space-y-4">
                        {selectedDoctor.timings.map((t: any, i: number) => (
                          <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                            <div className="flex flex-col gap-1 mb-3">
                              <span className="text-xs font-bold text-[#007a87] uppercase">{t.branch}</span>
                              <span className="text-xs font-bold text-slate-600">{t.day}</span>
                            </div>
                            <div className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span>{t.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-xs font-medium text-slate-500 mb-2">For Appointment, please call:</p>
                        <a href="tel:02040151100" className="inline-flex items-center justify-center w-full py-2.5 bg-[#d9232d] hover:bg-[#b81d24] text-white rounded-lg font-bold text-sm transition-colors">
                          020 4015 1100
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column: Detailed Info */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {selectedDoctor.education && selectedDoctor.education.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                      <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3">
                        <GraduationCap className="w-6 h-6 text-[#007a87]" /> Education
                      </h3>
                      <ul className="space-y-4">
                        {selectedDoctor.education.map((item: string, i: number) => (
                          <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-2.5"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedDoctor.training && selectedDoctor.training.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                      <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-[#007a87]" /> Training
                      </h3>
                      <ul className="space-y-4">
                        {selectedDoctor.training.map((item: string, i: number) => (
                          <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2.5"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedDoctor.experience && selectedDoctor.experience.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                      <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-[#007a87]" /> Experience
                      </h3>
                      <ul className="space-y-4">
                        {selectedDoctor.experience.map((item: string, i: number) => (
                          <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2.5"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedDoctor.publications && selectedDoctor.publications.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                      <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3">
                        <BookOpen className="w-6 h-6 text-[#007a87]" /> Publications
                      </h3>
                      <ul className="space-y-4">
                        {selectedDoctor.publications.map((item: any, i: number) => {
                          const isObj = typeof item === 'object' && item !== null;
                          const title = isObj ? item.title : item;
                          const link = isObj ? item.link : null;
                          
                          return (
                            <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2.5"></div>
                              <div className="flex-1">
                                {title}
                                {link && (
                                  <a href={link} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center text-[#d9232d] hover:text-[#b81d24] hover:underline text-xs font-bold uppercase tracking-wide">
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
