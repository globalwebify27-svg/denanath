"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, BookOpen } from "lucide-react";

export default function TrainingProgramsPage() {
  const options = [
    {
        "name": "Academics",
        "href": "/academics",
        "active": false
    },
    {
        "name": "Simulation Center",
        "href": "/simulation-center",
        "active": true
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

  const programs = [
    "Arterial Blood Gas Analysis",
    "Basic Clinical Skill Certification Program - level 1",
    "Basic & Advanced ECG",
    "Basic Airway Management",
    "Advanced Airway Management",
    "Jeevan Rekha COLS, AED & First aid",
    "Healthcare Communication",
    "Essentials Basic life support & Essentials of Advanced Cardiac Life Support"
  ];

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
            <Link href="/academics" className="hover:text-white transition-colors">Academics</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/simulation-center" className="hover:text-white transition-colors">Simulation Center</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/nbems-courses" className="hover:text-white transition-colors">NBEMS Courses</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Training Programs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Training Programs
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
            <Link href="/nbems-courses" className="inline-flex items-center gap-2 text-[#007a87] hover:text-[#002b5c] font-bold mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to NBEMS Courses
            </Link>
            
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#002b5c]"></div>
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <BookOpen className="w-4 h-4" />
                  <span>Programs</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Simulation Home
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programs.map((program, idx) => (
                  <a 
                    key={idx} 
                    href="#"
                    className="flex items-center gap-4 bg-slate-50 border border-slate-200 hover:border-[#D9232D] hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:bg-white hover:-translate-y-1 p-4 rounded-xl transition-all duration-300 group/btn"
                  >
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#002b5c] font-bold group-hover/btn:border-[#D9232D] group-hover/btn:text-[#D9232D]">
                      {idx + 1}
                    </div>
                    <span className="font-semibold text-slate-700 group-hover/btn:text-[#002b5c] flex-1">
                      {program}
                    </span>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover/btn:text-[#D9232D] group-hover/btn:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
