"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Stethoscope, Search, UserRound, GraduationCap, ArrowRight, X, Calendar, Clock, BookOpen, Briefcase } from "lucide-react";

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


const DoctorImage = ({ doc, className, iconClassName }: { doc: any, className?: string, iconClassName?: string }) => {
  const [error, setError] = useState(false);
  
  if (!doc.image || error) {
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
        const docRes = await fetch('/api/doctors');
        if (!docRes.ok) return;
        const doctors = await docRes.json();
        
        if (!Array.isArray(doctors) || doctors.length === 0) return;

        const mapped = doctors.map((doc: any) => ({
          id: doc.id,
          doctor_id: doc.dmhDoctorId || '',
          speciality_id: doc.dmhSpecialityId || '',
          service_point_id: doc.dmhServicePointId || '',
          service_center_id: doc.dmhServiceCenterId || '',
          name: doc.name || 'Doctor',
          specialty: doc.specialty || 'General',
          isAppAllowed: doc.isAppAllowed !== false,
          qualifications: doc.qualifications || '',
          image: doc.image || '',
          timings: doc.timings ? (typeof doc.timings === 'string' ? JSON.parse(doc.timings) : doc.timings) : [],
          education: doc.education ? (typeof doc.education === 'string' ? JSON.parse(doc.education) : doc.education) : [],
          training: doc.training ? (typeof doc.training === 'string' ? JSON.parse(doc.training) : doc.training) : [],
          experience: doc.experience ? (typeof doc.experience === 'string' ? JSON.parse(doc.experience) : doc.experience) : [],
          publications: doc.publications ? (typeof doc.publications === 'string' ? JSON.parse(doc.publications) : doc.publications) : [],
        }));

        setDoctorsList(mapped);
      } catch (err) {
        console.error("Failed to fetch doctors from local DB:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDoctorsFromApi();
  }, []);
  // State for filters & pagination
  const [selectedSpecialty, setSelectedSpecialty] = useState("--Select--");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isAppAllowed, setIsAppAllowed] = useState<boolean | null>(null);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const itemsPerPage = 30;

  // Whenever a doctor is selected, check opd_day_time using API doctor_id and speciality_id
  useEffect(() => {
    if (!selectedDoctor) {
      setIsAppAllowed(null);
      return;
    }
    
    setIsAppAllowed(selectedDoctor.isAppAllowed);
    setLoadingSchedule(false);
  }, [selectedDoctor]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSpecialty, searchName]);

  // Get unique specialties for dropdown
  const uniqueSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    doctorsList.forEach(doc => {
      // Split by comma in case of multiple specialties, but for now we take the full string to match the design
      if (doc.specialty) specialties.add(doc.specialty);
    });
    return Array.from(specialties).sort();
  }, [doctorsList]);

  // Filter and sort doctors alphabetically by name
  const filteredDoctors = useMemo(() => {
    const filtered = doctorsList.filter(doc => {
      const docSpecialty = doc.specialty || "";
      const matchSpecialty = selectedSpecialty === "--Select--" || docSpecialty === selectedSpecialty;
      const matchName = doc.name.toLowerCase().includes(searchName.toLowerCase());
      return matchSpecialty && matchName;
    });

    // Sort alphabetically by doctor name
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Doctors & Departments</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Doctor Details</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
            Doctor Details
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 md:pt-5 md:pb-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Dynamic Sidebar */}
          <DynamicSidebar categoryName="Doctors & Departments" activeHref="/doctor-details" />

          {/* Right Main Content */}
          <div className="w-full flex-1 min-w-0">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-3 pb-6 sm:px-10 sm:pt-4 sm:pb-10 md:px-14 md:pt-4 md:pb-8">
              
              <div className="mb-4">
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctors & Departments</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-4 tracking-tight">
                  Doctor Details
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full"></div>
              </div>

              {/* Filters Section */}
              <div className="bg-slate-50 rounded-2xl py-4 px-6 sm:px-10 mb-8 border border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Specialty Filter */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Filter By Specialty:</label>
                    <div className="relative">
                      <select 
                        className="w-full appearance-none bg-white border border-slate-300 rounded-lg h-[46px] px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow cursor-pointer"
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
                        className="w-full bg-white border border-slate-300 rounded-lg h-[46px] pl-11 pr-4 text-slate-700 font-medium placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow"
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
                        <div className="w-16 h-16 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 overflow-hidden group-hover:bg-[#D9232D] group-hover:border-[#D9232D] transition-colors">
                          <DoctorImage 
                            doc={doc}
                            className="w-full h-full object-cover text-[0px]"
                            iconClassName="w-8 h-8 text-[#007a87] group-hover:text-white transition-colors"
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
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${currentPage === 1 ? 'border border-slate-200 text-slate-400 cursor-not-allowed' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    {generatePagination(currentPage, totalPages).map((page, idx) => (
                      page === '...' ? (
                        <span key={`dots-${idx}`} className="w-8 h-8 flex items-center justify-center text-slate-500 font-bold">
                          ...
                        </span>
                      ) : (
                        <button
                          key={`page-${page}`}
                          onClick={() => {
                            setCurrentPage(page as number);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-8 h-8 flex items-center justify-center rounded-lg border font-bold transition-colors text-sm ${
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
                      onClick={() => {
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${currentPage === totalPages ? 'border border-slate-200 text-slate-400 cursor-not-allowed' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
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
            <div className="flex items-start justify-between p-6 md:p-8 border-b border-slate-100 shrink-0 sticky top-0 bg-white z-10 rounded-t-3xl gap-4">
              <div className="flex items-start gap-5 sm:gap-6 flex-1 min-w-0">
                <div className="w-[120px] h-[160px] sm:w-[150px] sm:h-[200px] rounded-2xl bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm overflow-hidden text-slate-400 p-1">
                  <DoctorImage 
                    doc={selectedDoctor}
                    className="w-full h-full object-contain rounded-xl bg-white"
                    iconClassName="w-16 h-16 sm:w-20 sm:h-20 text-slate-300"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between h-[160px] sm:h-[200px] py-1">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-[28px] font-[900] text-[#002b5c] leading-tight mb-2 uppercase">{selectedDoctor.name}</h2>
                    <p className="text-sm sm:text-base font-[500] text-slate-500 leading-snug">{selectedDoctor.qualifications}</p>
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
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all duration-300 hover:rotate-90 shrink-0"
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
                              <span className="text-[16px] font-bold text-[#007a87] uppercase">{t.branch}</span>
                              <span className="text-[16px] font-bold text-slate-600">{t.day}</span>
                            </div>
                            <div className="flex items-start gap-2 text-[16px] text-slate-700 font-medium">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span>{t.time}</span>
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
                      <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3 leading-[31px]">
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
                      <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3 leading-[31px]">
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
                      <h3 className="text-lg font-extrabold text-[#002b5c] mb-6 flex items-center gap-3 leading-[31px]">
                        <BookOpen className="w-6 h-6 text-[#007a87]" /> Publications
                      </h3>
                      <ul className="space-y-4">
                        {selectedDoctor.publications.map((item: string, i: number) => (
                          <li key={i} className="flex gap-3 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2.5"></div>
                            {item.includes('[PDF]') ? (
                              <span>
                                {item.replace('[PDF]', '')}
                                <span className="text-red-500 font-bold ml-1">[PDF]</span>
                              </span>
                            ) : (
                              item
                            )}
                          </li>
                        ))}
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
