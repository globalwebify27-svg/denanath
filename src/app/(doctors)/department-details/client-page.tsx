"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Stethoscope, Search, ArrowRight, HeartPulse, Shield } from "lucide-react";

export default function DepartmentDetailsClientPage({ pageData, departments }: { pageData: any, departments?: any[] }) {
  const options = [
    {
        "name": "Doctor Details",
        "href": "/doctor-details",
        "active": false
    },
    {
        "name": "Department Details",
        "href": "/department-details",
        "active": true
    },
    {
        "name": "Services",
        "href": "/services",
        "active": false
    }
];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const filteredDepartments = (departments || []).filter(dept => 
    dept.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredDepartments.length / itemsPerPage));
  const currentDepartments = filteredDepartments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
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
            {pageData.title || "Department Details"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {options.length > 0 && (
            <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
              <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                {options.map((option: any, idx: number) => (
                  <Link
                    key={idx}
                    href={option.href}
                    data-active={option.active}
                    className={"snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal " + (
                      option.active
                        ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                        : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                    ) + " " + (idx !== options.length - 1 ? "lg:border-b lg:border-b-slate-50" : "")}
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

          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctors & Departments</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  {pageData.title || "Department Details"}
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              {pageData.image && (
                <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200">
                  <img src={pageData.image} alt={pageData.title || "Department Details"} className="w-full h-auto object-contain max-h-[500px] bg-slate-50" />
                </div>
              )}
              
              {pageData.content && (
                <div className="prose prose-slate max-w-none break-words whitespace-normal overflow-hidden [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:mb-2 prose-p:leading-relaxed prose-headings:text-[#002b5c] text-slate-700" dangerouslySetInnerHTML={{ __html: pageData.content }} />
              )}

              {/* Search Box */}
              {departments && departments.length > 0 && (
                <>
                  <div className="bg-gray-50/50 rounded-2xl border border-gray-100 p-6 mt-12 mb-8">
                    <label className="block text-[#002b5c] font-[800] mb-3">Search Department:</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Enter department name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-gray-700 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Vertical Stacked Cards */}
                  <div className="space-y-4">
                    {currentDepartments.length > 0 ? (
                      currentDepartments.map((dept: any, index: number) => {
                        const IconComponent = index % 2 === 0 ? HeartPulse : Shield;
                        
                        return (
                          <div key={dept.id || index} className="group bg-white border border-gray-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:border-[#D9232D] hover:shadow-[0_8px_30px_rgb(217,35,45,0.08)] hover:-translate-y-0.5 transition-all duration-300">
                            <div className="w-14 h-14 rounded-xl bg-[#007a87]/5 group-hover:bg-[#D9232D]/5 flex items-center justify-center shrink-0 border border-[#007a87]/10 group-hover:border-[#D9232D]/20 transition-colors">
                              <IconComponent className="w-7 h-7 text-[#007a87] group-hover:text-[#D9232D] transition-colors" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-[18px] font-[900] text-[#002b5c] group-hover:text-[#D9232D] uppercase tracking-wide mb-2 leading-tight transition-colors">
                                {dept.name}
                              </h3>
                              <Link 
                                href={`/departments/${dept.id}`} 
                                className="inline-flex items-center gap-1.5 text-[12px] font-[800] text-[#007a87] group-hover:text-[#D9232D] uppercase tracking-widest transition-colors"
                              >
                                VIEW DETAILS <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                        <p className="text-slate-500 font-medium">No departments found matching your search.</p>
                      </div>
                    )}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
                      <div className="text-sm text-slate-500">
                        Showing <span className="font-[800] text-[#002b5c]">{currentDepartments.length}</span> of <span className="font-[800] text-[#002b5c]">{filteredDepartments.length}</span> Results
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-[800] text-[#002b5c]">
                          Page: {currentPage} of {totalPages}
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-[#007a87] hover:border-[#007a87] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="flex items-center justify-center w-10 h-10 bg-[#007a87] rounded-full text-white hover:bg-[#005e69] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
