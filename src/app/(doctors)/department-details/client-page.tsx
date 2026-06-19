"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Stethoscope } from "lucide-react";

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
              
              {pageData.content ? (
                <div className="prose prose-slate max-w-none break-words whitespace-normal overflow-hidden [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:mb-2 prose-p:leading-relaxed prose-headings:text-[#002b5c] text-slate-700" dangerouslySetInnerHTML={{ __html: pageData.content }} />
              ) : (
                <div className="py-16 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
                    <Stethoscope className="w-8 h-8 text-[#007a87]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Content Coming Soon</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    The information for this section is currently being updated. Please check back later.
                  </p>
                </div>
              )}

              {/* Dynamic Departments List */}
              {departments && departments.length > 0 && (
                <div className="mt-16 pt-12 border-t border-slate-100">
                  <h3 className="text-3xl font-extrabold text-[#002b5c] mb-10 flex items-center gap-3">
                    <Stethoscope className="w-8 h-8 text-[#007a87]" />
                    Our Departments
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                    {departments.map((dept, idx) => (
                      <div key={idx} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all group flex flex-col hover:-translate-y-1">
                        <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-[#007a87] mb-6 group-hover:bg-[#007a87] group-hover:text-white transition-colors">
                          <Stethoscope className="w-8 h-8" />
                        </div>
                        <h4 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-[#007a87] transition-colors">{dept.name}</h4>
                        {dept.headOfDepartment && (
                          <p className="text-[13px] font-bold text-slate-500 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                            Head: {dept.headOfDepartment}
                          </p>
                        )}
                        <p className="text-slate-600 leading-relaxed mb-6 flex-1">
                          {dept.description || "Comprehensive medical services and expert care provided by our dedicated specialists."}
                        </p>
                        <div className="mt-auto">
                           <Link href="/departments" className="inline-flex items-center text-sm font-bold text-[#007a87] group-hover:gap-2 transition-all">
                             Learn More <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                           </Link>
                        </div>
                      </div>
                    ))}
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
