"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Building2 } from "lucide-react";
import * as Icons from "lucide-react";

export default function UniqueFeaturesClientPage({ featuresData }: { featuresData: any[] }) {
  const aboutOptions = [
    { name: "About Hospital", href: "/about-hospital", active: false },
    { name: "Associates", href: "/associates", active: false },
    { name: "Accreditations", href: "/accreditations", active: false },
    { name: "Support Hospital / Donations", href: "/supportHospitalDonations", active: false },
    { name: "Unique features of DMH", href: "/unique-features", active: true },
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
            <span className="text-white">Unique features of DMH</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Unique features of DMH</h1>
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
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-12">
              
              <div className="mb-10">
                <div style={{ fontSize: '14px' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>Unique features of DMH</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Unique features of DMH
                </h2>
                <p className="text-slate-600 leading-relaxed font-light text-lg">
                  We are committed to providing world-class medical care with a patient-centric approach. Our hospital is equipped with cutting-edge technology and staffed by renowned specialists to ensure the highest quality of treatment and recovery.
                </p>
              </div>

              {/* Features Stack List */}
              <div className="flex flex-col gap-6 md:gap-8">
                {featuresData.map((item, idx) => {
                  const IconComponent = (Icons as any)[item.iconStr] || Icons.Star;
                  return (
                    <div 
                      key={item.id || idx} 
                      className="flex flex-row gap-4 md:gap-6 p-4 sm:p-6 md:p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
                    >
                      {/* Subtle hover accent line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className={`shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center ${item.color}`}>
                        <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-[#002b5c] mb-2 md:mb-3 uppercase tracking-wider flex items-start gap-1.5 md:gap-2">
                          <span className="text-teal-500 font-black shrink-0">{idx + 1}.</span> 
                          <span className="leading-tight">{item.title}</span>
                        </h3>
                        
                        {(item.description || "").split('\n').map((para: string, pIdx: number) => (
                          <p key={pIdx} className="text-slate-600 leading-relaxed text-[13px] sm:text-[14px] md:text-[15px] mb-2 md:mb-3 last:mb-0 font-medium">
                            {para}
                          </p>
                        ))}
                        
                        {item.bullets && item.bullets.length > 0 && (
                          <ul className="mt-3 md:mt-4 space-y-2 md:space-y-3">
                            {item.bullets.map((bullet: string, bIdx: number) => {
                              const parts = bullet.split(' - ');
                              return (
                                <li key={bIdx} className="flex items-start gap-2 md:gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-1.5 md:mt-2"></div>
                                  <p className="text-slate-600 leading-relaxed text-[13px] sm:text-[14px] md:text-[14.5px]">
                                    {parts.length > 1 ? (
                                      <>
                                        <strong className="text-slate-800 font-bold">{parts[0]}</strong> - {parts.slice(1).join(' - ')}
                                      </>
                                    ) : (
                                      bullet
                                    )}
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
