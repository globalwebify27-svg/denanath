"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Stethoscope, Search, UserRound, GraduationCap, ArrowRight, X, Calendar, Clock, BookOpen, Briefcase, Phone } from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";

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
  const router = useRouter();
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctorsFromDB = async () => {
      setLoading(true);
      try {
        const docRes = await fetch('/api/doctors');
        if (!docRes.ok) return;
        const doctors = await docRes.json();

        if (!Array.isArray(doctors) || doctors.length === 0) return;

        const safeParse = (val: any) => {
          if (!val) return [];
          if (typeof val !== 'string') return val;
          try { return JSON.parse(val); } catch { return []; }
        };

        const mapped = doctors.map((doc: any) => ({
          id: doc.id,
          doctor_id: doc.dmhDoctorId || '',
          speciality_id: doc.dmhSpecialityId || '',
          service_point_id: doc.dmhServicePointId || '',
          service_center_id: doc.dmhServiceCenterId || '',
          name: doc.name || 'Doctor',
          specialty: doc.specialty || 'General',
          qualifications: doc.qualifications || '',
          image: doc.image || '',
          isAppAllowed: doc.isAppAllowed === true,
          timings: safeParse(doc.timings),
          education: safeParse(doc.education),
          training: safeParse(doc.training),
          experience: safeParse(doc.experience),
          publications: safeParse(doc.publications),
        }));

        setDoctorsList(mapped);
      } catch (err) {
        console.error("Failed to fetch doctors from local DB:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDoctorsFromDB();
  }, []);

  // State for filters & infinite scroll
  const [selectedSpecialty, setSelectedSpecialty] = useState("--Select--");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // Auto-select doctor from URL query parameters (e.g. ?name=Dr.+GADRE+ANIKET or ?id=...)
  useEffect(() => {
    if (doctorsList.length === 0) return;
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const paramName = params.get('name') || params.get('doctor') || params.get('search');
    const paramId = params.get('id');

    if (paramId) {
      router.replace(`/doctor-details/${paramId}`);
      return;
    }

    if (paramName) {
      const exactMatch = doctorsList.find(d => d.name.toLowerCase() === paramName.toLowerCase());
      if (exactMatch) {
        router.replace(`/doctor-details/${exactMatch.id}`);
        return;
      }
      
      const partialMatches = doctorsList.filter(d => d.name.toLowerCase().includes(paramName.toLowerCase()));
      if (partialMatches.length === 1) {
        router.replace(`/doctor-details/${partialMatches[0].id}`);
        return;
      }

      setSearchName(paramName);
    }
  }, [doctorsList, router]);

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
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-2 pb-6 sm:px-10 sm:pt-3 sm:pb-10 md:px-14 md:pt-4 md:pb-14">
              
              <div className="mb-8">
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctors & Departments</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Doctor Details
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              {/* Filters Section */}
              <div className="bg-slate-50 rounded-2xl py-4 px-6 sm:px-10 mb-8 border border-slate-200">
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
                        className="!text-sm !h-[46px]"
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
                        suppressHydrationWarning={true}
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
                <>
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
                            {(doc.specialty || '').split(',')[0]}
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
                        <Link 
                          href={`/doctor-details/${doc.id}`}
                          className="flex items-center gap-2 text-sm font-bold text-[#007a87] group-hover:text-teal-600 transition-colors"
                        >
                          View Profile
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

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
                </>
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
