"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Book, Users, Bed, Stethoscope, Building2, MessageSquare, ShieldCheck, Image as ImageIcon, Video } from "lucide-react";

export default function PatientGuidePage() {
  const options = [
    { name: "Out Patient Guide", href: "/out-patient", active: false, icon: Users, desc: "Information for OPD visits and consultations." },
    { name: "In Patient Guide", href: "/in-patient", active: false, icon: Bed, desc: "Admission, stay, and discharge procedures." },
    { name: "Health Packages", href: "/health-packages", active: false, icon: Stethoscope, desc: "Comprehensive health check-up packages." },
    { name: "Facilities", href: "/facilities", active: false, icon: Building2, desc: "Hospital amenities and services available." },
    { name: "Patients Stories / Feedbacks", href: "/feedbacks", active: false, icon: MessageSquare, desc: "Read experiences from our patients." },
    { name: "Patient Rights & Responsibilities", href: "/patient-rights", active: false, icon: ShieldCheck, desc: "Your rights and duties as a patient." },
    { name: "Photos", href: "/gallery-photos", active: false, icon: ImageIcon, desc: "Hospital campus and events gallery." },
    { name: "Videos", href: "/gallery-videos", active: false, icon: Video, desc: "Informational and educational videos." },
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
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Hospital</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Patient Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Patient Guide
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

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Book className="w-4 h-4" />
                  <span>Hospital</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Patient Guide
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
                <p className="text-slate-600 leading-relaxed max-w-3xl text-sm md:text-base">
                  Welcome to the Deenanath Mangeshkar Hospital Patient Guide. We are committed to making your visit as comfortable and stress-free as possible. Please select a section below to find detailed information tailored to your needs.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {options.map((option, idx) => (
                  <Link 
                    key={idx} 
                    href={option.href}
                    className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-xl hover:border-teal-500/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#007a87] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#007a87] group-hover:text-white transition-all duration-300 shadow-sm border border-teal-100/50">
                        <option.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-[#002b5c] mb-1 group-hover:text-[#007a87] transition-colors">{option.name}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">{option.desc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}