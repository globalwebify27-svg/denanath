"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Target, Eye, Heart, ShieldCheck, Activity, Award, CheckCircle2, Building2 } from "lucide-react";

export default function AboutHospitalClient({ data }: { data: any }) {
  const aboutOptions = [
    { name: "About Hospital", href: "/about-hospital", active: true },
    { name: "Associates", href: "/associates", active: false },
    { name: "Accreditations", href: "/accreditations", active: false },
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
            <span className="text-white">About Hospital</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">About Hospital</h1>
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
                  <span>About Hospital</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  About Hospital
                </h2>
              </div>

              {/* Introduction */}
              <div className="prose prose-slate max-w-none">
                <div className="text-lg md:text-xl text-slate-700 leading-relaxed font-light mb-6" dangerouslySetInnerHTML={{ __html: data?.introduction || '' }} />
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-light mb-12">
                  {data?.description}
                </p>
              </div>

              {/* Vision & Mission Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-2xl border border-teal-100/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                    <Eye className="w-24 h-24 text-teal-600" />
                  </div>
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="bg-teal-100 p-2.5 rounded-xl text-teal-600">
                      <Eye className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#002b5c] tracking-tight">Vision</h3>
                  </div>
                  <p className="text-slate-700 italic font-medium leading-relaxed relative z-10">
                    {data?.vision}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100/50 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                    <Target className="w-24 h-24 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="bg-blue-100 p-2.5 rounded-xl text-blue-600">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#002b5c] tracking-tight">Mission</h3>
                  </div>
                  <p className="text-slate-700 italic font-medium leading-relaxed relative z-10">
                    {data?.mission}
                  </p>
                </div>
              </div>

              {/* Core Values */}
              <div className="mb-14">
                <h3 className="text-2xl font-bold text-[#002b5c] mb-6 tracking-tight flex items-center gap-2">
                  <Heart className="w-6 h-6 text-[#007a87]" />
                  Core Values
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(data?.coreValues || []).map((value: string, idx: number) => (
                    <div key={idx} className="group flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-[#D9232D] hover:bg-white hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] transition-all duration-300">
                      <div className="bg-teal-100/50 rounded-full p-1 text-teal-600 group-hover:text-[#D9232D] shrink-0 transition-colors">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-slate-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Policy & Objective */}
              <div className="bg-[#002b5c] rounded-3xl p-8 md:p-10 text-white mb-14 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none">
                  <ShieldCheck className="w-64 h-64 -mb-10 -mr-10" />
                </div>
                
                <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-teal-300 mb-3 tracking-wide uppercase text-sm flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5" />
                      Quality Policy
                    </h3>
                    <p className="text-blue-50 text-sm md:text-base leading-relaxed font-light">
                      {data?.qualityPolicy}
                    </p>
                  </div>
                  
                  <div className="h-px w-full bg-blue-800/50" />
                  
                  <div>
                    <h3 className="text-xl font-bold text-teal-300 mb-3 tracking-wide uppercase text-sm flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Quality Objective
                    </h3>
                    <p className="text-blue-50 text-sm md:text-base leading-relaxed font-light">
                      {data?.qualityObjective}
                    </p>
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="mb-14">
                <h3 className="text-3xl font-extrabold text-[#002b5c] mb-8 tracking-tight">Our History</h3>
                <div className="space-y-6 text-slate-600 leading-relaxed border-l-4 border-teal-100 pl-6 md:pl-8 py-2 relative">
                  <div className="absolute top-0 left-0 w-1 h-12 bg-[#007a87] -ml-[4px] rounded-full" />
                  {(data?.history || []).map((paragraph: string, idx: number) => (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))}
                </div>
              </div>



              {/* Facilities / Capabilities */}
              <div>
                <h3 className="text-2xl font-bold text-[#002b5c] mb-6 tracking-tight flex items-center gap-2">
                  <Activity className="w-6 h-6 text-[#007a87]" />
                  Other special capabilities include:
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Complete Diagnostic Imaging */}
                  <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
                    <h4 className="text-lg font-bold text-[#002b5c] mb-5 pb-3 border-b border-slate-200">
                      Complete Diagnostic Imaging
                    </h4>
                    <ul className="space-y-3">
                      {(data?.capabilities?.imaging || []).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                          <ChevronRight className="w-4 h-4 text-[#007a87] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Radiation Therapy */}
                  <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
                    <h4 className="text-lg font-bold text-[#002b5c] mb-5 pb-3 border-b border-slate-200">
                      Radiation Therapy
                    </h4>
                    <ul className="space-y-3">
                      {(data?.capabilities?.radiation || []).map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                          <ChevronRight className="w-4 h-4 text-[#007a87] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
