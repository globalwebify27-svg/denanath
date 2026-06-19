"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Stethoscope } from "lucide-react";

export default function DoctorDetailsClientPage({ pageData, doctors }: { pageData: any, doctors?: any[] }) {
  const options = [
    {
        "name": "Doctor Details",
        "href": "/doctor-details",
        "active": true
    },
    {
        "name": "Department Details",
        "href": "/department-details",
        "active": false
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
            <span className="text-white">Doctor Details</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {pageData.title || "Doctor Details"}
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
                  {pageData.title || "Doctor Details"}
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              {/* Dynamic Doctors List */}
              {doctors && doctors.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-3xl font-extrabold text-[#002b5c] mb-10 flex items-center gap-3">
                    <Stethoscope className="w-8 h-8 text-[#007a87]" />
                    Our Doctors
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                    {doctors.map((doctor, idx) => (
                      <div key={idx} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] transition-all group flex flex-col hover:-translate-y-1">
                        <div className="relative h-[280px] w-full bg-slate-50 overflow-hidden">
                          {doctor.image ? (
                            <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <Stethoscope className="w-20 h-20" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                          {doctor.specialty && (
                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 text-xs font-bold text-[#002b5c] rounded-full shadow-sm">
                              {doctor.specialty}
                            </div>
                          )}
                        </div>
                        <div className="p-6 md:p-8 flex-1 flex flex-col bg-white relative">
                          <h4 className="text-xl font-extrabold text-slate-900 mb-2">{doctor.name}</h4>
                          {doctor.qualifications && <p className="text-[13px] font-bold text-[#007a87] mb-3">{doctor.qualifications}</p>}
                          {doctor.experience && <p className="text-[13px] text-slate-500 mb-6 font-medium leading-relaxed">{doctor.experience}</p>}
                          <div className="mt-auto">
                            <Link href="/book-appointment" className="block w-full text-center bg-slate-50 hover:bg-[#002b5c] text-[#002b5c] hover:text-white border border-slate-200 hover:border-[#002b5c] py-3 rounded-xl text-sm font-bold transition-all duration-300">
                              Book Appointment
                            </Link>
                          </div>
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
