"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, FileText, Download, Award, Building2 } from "lucide-react";

export default function AccreditationsClient({ data }: { data: any[] }) {
  const aboutOptions = [
    { name: "About Hospital", href: "/about-hospital", active: false },
    { name: "Associates", href: "/associates", active: false },
    { name: "Accreditations", href: "/accreditations", active: true },
    { name: "Support Hospital / Donations", href: "/supportHospitalDonations", active: false },
    { name: "Unique features of DMH", href: "/unique-features", active: false },
    { name: "Foreign Contribution", href: "/foreign-contribution", active: false },
    { name: "Charity Details", href: "/charity-details", active: false },
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

  const accreditations = data || [];

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
            <Link href="/about-hospital" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Accreditations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Accreditations</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
            <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {aboutOptions.map((option, idx) => (
                <Link
                  key={idx}
                  href={option.href}
                  data-active={option.active}
                  className={`snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal ${
                    option.active
                      ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                      : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                  } ${idx !== aboutOptions.length - 1 ? "lg:border-b lg:border-b-slate-50" : ""}`}
                >
                  <span>{option.name}</span>
                  <ChevronRight 
                    className={`hidden lg:block w-4 h-4 transition-transform duration-300 ${
                      option.active 
                        ? "text-[#007a87] translate-x-1" 
                        : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#002b5c]"
                    }`} 
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Main Content */}
          <div className="w-full flex-1 min-w-0">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>Accreditations</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Accreditations
                </h2>
              </div>

              {/* Introduction Text */}
              <div className="text-center mb-14 bg-slate-50/50 p-8 rounded-2xl border border-slate-100">
                <ShieldCheck className="w-12 h-12 text-[#007a87] mx-auto mb-4 opacity-80" />
                <p className="text-lg md:text-xl text-[#002b5c] leading-relaxed font-semibold">
                  Deenanath Mangeshkar Hospital and Research Center is accredited by
                </p>
                <div className="mt-4 space-y-2 text-slate-600 font-light">
                  <p>National Accreditation Board for Hospitals and Healthcare Providers <strong className="font-semibold text-teal-700">(NABH)</strong> since 24th September 2019</p>
                  <p>National Accreditation Board for Testing and Calibration Laboratories <strong className="font-semibold text-blue-700">(NABL)</strong> since 19th March 2007</p>
                </div>
              </div>

              {/* Accreditations List */}
              <div className="space-y-16">
                {accreditations.map((item, index) => (
                  <div key={item.id} className="relative">
                    
                    {/* Divider for subsequent items */}
                    {index > 0 && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-full max-w-md flex items-center justify-center">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                        <div className="absolute bg-white rounded-full p-1 border border-slate-100 text-slate-300">
                          <ChevronRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start group">
                      
                      {/* Styled Seal / Badge Graphic */}
                      <div className="shrink-0 flex flex-col items-center gap-3">
                        <div className={`relative w-40 h-40 rounded-full flex items-center justify-center border-[8px] shadow-lg transition-transform duration-500 group-hover:scale-105 ${
                          item.theme === 'red' 
                            ? "border-[#d32f2f] bg-white text-[#d32f2f]" 
                            : "border-[#1565c0] bg-white text-[#1565c0]"
                        }`}>
                          <div className={`absolute inset-2 rounded-full border-[3px] flex items-center justify-center flex-col ${
                            item.theme === 'red' ? "border-[#d32f2f]/20" : "border-[#1565c0]/20"
                          }`}>
                            <Award className={`w-12 h-12 mb-1 ${item.theme === 'red' ? "text-[#d32f2f]" : "text-[#1565c0]"}`} />
                            <span className="font-black text-xl tracking-wider">{item.certType}</span>
                            <span className="text-[9px] font-bold tracking-widest uppercase mt-0.5">Accredited</span>
                          </div>
                        </div>
                        <span className={`text-sm font-bold tracking-wider ${
                          item.theme === 'red' ? "text-[#d32f2f]" : "text-[#1565c0]"
                        }`}>
                          {item.certNumber}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex-1 space-y-5 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold text-[#002b5c] leading-tight">
                          {item.title}
                        </h3>
                        
                        <div>
                          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                            Certificate Number
                          </span>
                          <span className="font-semibold text-slate-700">{item.certNumber}</span>
                        </div>

                        <div>
                          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 block flex items-center justify-center md:justify-start gap-1.5">
                            <FileText className="w-4 h-4" />
                            Quality Policy
                          </span>
                          <p className="text-slate-600 font-light leading-relaxed">
                            {item.policy}
                          </p>
                        </div>

                        {((item.link && item.link !== "#" && item.link !== "") || (item.linkText && item.linkText.startsWith('http'))) && (
                          <div className="pt-4 border-t border-slate-100">
                            <span className="text-sm text-slate-500 mr-2">Scope of accreditation:</span>
                            <Link 
                              href={(item.link && item.link !== "#" && item.link.startsWith('http')) ? item.link : item.linkText}
                              target="_blank"
                              className="inline-flex items-center gap-1.5 text-[#007a87] hover:text-teal-600 font-semibold transition-colors group/link break-all"
                            >
                              Please find the:
                              <Download className="w-4 h-4 shrink-0 transform group-hover/link:-translate-y-0.5 transition-transform" />
                            </Link>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
