"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ChevronRight, Stethoscope, Search, ChevronLeft, ArrowRight } from "lucide-react";

// Fallback logic if no icon string is provided in DB
const getDepartmentIcon = (dept: Department) => {
  if (dept.icon && (Icons as any)[dept.icon]) {
    return (Icons as any)[dept.icon];
  }
  
  const n = dept.name.toLowerCase();
  if (n.includes("cardio") || n.includes("cardiac") || n.includes("heart") || n.includes("vascular")) return Icons.HeartPulse;
  if (n.includes("preventive") || n.includes("immun")) return Icons.ShieldCheck;
  if (n.includes("transfusion") || n.includes("blood")) return Icons.Droplets;
  if (n.includes("molecular") || n.includes("nuclear") || n.includes("atom")) return Icons.Atom;
  if (n.includes("haematology") || n.includes("pathology") || n.includes("lab") || n.includes("microbiology") || n.includes("biochem")) return Icons.Microscope;
  if (n.includes("brain") || n.includes("neuro") || n.includes("epilepsy") || n.includes("psych") || n.includes("plexus") || n.includes("vertigo")) return Icons.Brain;
  if (n.includes("respiratory") || n.includes("lung") || n.includes("pulmonary") || n.includes("chest") || n.includes("wind")) return Icons.Wind;
  if (n.includes("small steps") || n.includes("footprint")) return Icons.Footprints;
  if (n.includes("play") || n.includes("game")) return Icons.Gamepad2;
  if (n.includes("pain") || n.includes("bandage") || n.includes("wound")) return Icons.Bandage;
  if (n.includes("radiation")) return Icons.Radiation;
  if (n.includes("fetal") || n.includes("paediatric") || n.includes("neonat") || n.includes("child") || n.includes("lactation") || n.includes("obstetrics") || n.includes("gynaecology")) return Icons.Baby;
  if (n.includes("dietetics") || n.includes("nutrition") || n.includes("food")) return Icons.Apple;
  if (n.includes("emergency") || n.includes("trauma") || n.includes("critical")) return Icons.Ambulance;
  if (n.includes("ent ") || n === "ent" || n.match(/\bear\b/) || n.includes("audiology")) return Icons.Ear;
  if (n.includes("ophthalmology") || n.includes("eye") || n.includes("vision") || n.includes("ocul")) return Icons.Eye;
  if (n.includes("genetics") || n.includes("dna")) return Icons.Dna;
  if (n.includes("dentistry") || n.includes("dental") || n.includes("tooth")) return Icons.Smile;
  if (n.includes("ayurved") || n.includes("homeopathy") || n.includes("natural")) return Icons.Leaf;
  if (n.includes("hand")) return Icons.Hand;
  if (n.includes("infectious") || n.includes("disease")) return Icons.Users;
  if (n.includes("exercise")) return Icons.Dumbbell;
  if (n.includes("integrative") || n.includes("care") || n.includes("rehab") || n.includes("physiotherapy") || n.includes("palliative")) return Icons.HeartHandshake;
  if (n === "medicine" || n.includes("pill") || n.includes("pharmacy") || n.includes("internal medicine")) return Icons.Pill;
  if (n.includes("ortho") || n.includes("bone") || n.includes("joint") || n.includes("spine") || n.includes("arthroscopy") || n.includes("foot") || n.includes("ankle") || n.includes("rheumatology") || n.includes("sports")) return Icons.Bone;
  if (n.includes("voice") || n.includes("speech") || n.includes("mic")) return Icons.Mic;
  if (n.includes("gastro") || n.includes("liver") || n.includes("hepatic") || n.includes("endocrinology") || n.includes("renal") || n.includes("nephrology") || n.includes("urology")) return Icons.Activity;
  if (n.includes("cosmetic") || n.includes("dermatology") || n.includes("plastic") || n.includes("skin") || n.includes("head and neck") || n.includes("obesity") || n.includes("user")) return Icons.User;
  if (n.includes("surgery") || n.includes("transplant") || n.includes("onco") || n.includes("cancer") || n.includes("radio")) return Icons.Activity;
  return Icons.Stethoscope;
};

type Department = {
  id?: string;
  name: string;
  description: string | null;
  icon?: string | null;
  status?: boolean;
};

export default function DepartmentDetailsClient({ departmentsList }: { departmentsList: Department[] }) {
  const options = [
    { name: "Doctor Details", href: "/doctor-details", active: false },
    { name: "Department Details", href: "/department-details", active: true },
    { name: "Services", href: "/services", active: false }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // State for filters & pagination
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchName]);

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

  // Filter departments
  const filteredDepartments = useMemo(() => {
    return departmentsList.filter(dept => 
      dept.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [searchName]);

  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage);
  const paginatedDepartments = filteredDepartments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
            <span className="text-white">Department Details</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Department Details
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
                  Department Details
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              {/* Search Bar */}
              <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200">
                <label className="block text-sm font-bold text-slate-700 mb-2">Search Department:</label>
                <div className="relative max-w-md">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter department name..." 
                    className="w-full bg-white border border-slate-300 rounded-lg py-3 pl-11 pr-4 text-slate-700 font-medium placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
              </div>

              {/* Departments List */}
              {paginatedDepartments.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {paginatedDepartments.map((dept, idx) => (
                    <div 
                      key={idx} 
                      className="group bg-white border border-slate-200 hover:border-[#D9232D] rounded-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:-translate-y-1 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
                    >
                      {(() => {
                        const Icon = getDepartmentIcon(dept);
                        return (
                          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100 group-hover:bg-[#d9232d] group-active:bg-[#d9232d] transition-colors">
                            <Icon className="w-6 h-6 text-[#007a87] group-hover:text-white group-active:text-white transition-colors" />
                          </div>
                        );
                      })()}
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-extrabold text-[#002b5c] group-hover:text-[#D9232D] transition-colors mb-2">
                          {dept.name}
                        </h3>
                        {dept.description ? (
                          <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">
                            {dept.description}
                          </p>
                        ) : (
                          <div className="h-2"></div>
                        )}
                        
                        <Link href="/doctor-details" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007a87] hover:text-teal-600 transition-colors uppercase tracking-wider">
                          View Doctors
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">No Departments Found</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    We couldn't find any departments matching "{searchName}".
                  </p>
                  <button 
                    onClick={() => setSearchName("")}
                    className="mt-6 text-sm font-bold text-[#007a87] hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredDepartments.length > 0 && (
                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-500">
                    Showing <strong className="text-slate-800">{paginatedDepartments.length}</strong> of <strong className="text-slate-800">{filteredDepartments.length}</strong> Results
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
    </div>
  );
}
