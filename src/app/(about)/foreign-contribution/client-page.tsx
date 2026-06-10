"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Building2 } from "lucide-react";

export default function ForeignContributionClientPage({ fcraData }: { fcraData: any }) {
  const introduction = fcraData.introduction || "Information regarding receipt of Foreign Contribution";
  const quarters = fcraData.quarters || [];

  const aboutOptions = [
    { name: "About Hospital", href: "/about-hospital", active: false },
    { name: "Associates", href: "/associates", active: false },
    { name: "Accreditations", href: "/accreditations", active: false },
    { name: "Support Hospital / Donations", href: "/supportHospitalDonations", active: false },
    { name: "Unique features of DMH", href: "/unique-features", active: false },
    { name: "Foreign Contribution", href: "/foreign-contribution", active: true },
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
            <span className="text-white">Foreign Contribution</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Foreign Contribution</h1>
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
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>Foreign Contribution</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Foreign Contribution
                </h2>
                
                <p className="text-slate-600 leading-relaxed font-light mb-8 whitespace-pre-wrap mt-8">
                  {introduction}
                </p>
              </div>

              {/* FCRA Data Blocks */}
              <div className="space-y-12">
                {quarters.map((quarterData: any, qIdx: number) => (
                  <div key={qIdx} className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                    {/* Quarter Header */}
                    <div className="bg-[#1eb7a6] text-white py-4 px-6 font-bold text-lg">
                      {quarterData.quarter}
                    </div>
                    
                    <div className="bg-white p-6">
                      {quarterData.donations && quarterData.donations.length > 0 ? (
                        <div className="overflow-x-auto custom-scrollbar">
                          <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                              <tr className="border-b-2 border-slate-200 bg-slate-50">
                                <th className="py-4 px-4 font-bold text-slate-700 w-16 text-center">Sr. No.</th>
                                <th className="py-4 px-4 font-bold text-slate-700">Name and address of donors</th>
                                <th className="py-4 px-4 font-bold text-slate-700 w-40">Amount received (in INR)</th>
                                <th className="py-4 px-4 font-bold text-slate-700 w-32">Date of receipt</th>
                                <th className="py-4 px-4 font-bold text-slate-700 w-32">Purpose (Social / Medical)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {quarterData.donations.map((donation: any, dIdx: number) => (
                                <tr key={dIdx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                  <td className="py-4 px-4 text-slate-500 font-medium text-center">{dIdx + 1}</td>
                                  <td className="py-4 px-4 text-slate-700 font-medium">{donation.name}</td>
                                  <td className="py-4 px-4 text-slate-600 font-semibold">{donation.inr}</td>
                                  <td className="py-4 px-4 text-slate-500">{donation.date}</td>
                                  <td className="py-4 px-4">
                                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold ${
                                      donation.purpose.toLowerCase() === 'medical' 
                                        ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                                        : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                    }`}>
                                      {donation.purpose}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="py-8 text-center text-slate-500 font-medium bg-slate-50 rounded-xl border border-dashed border-slate-200">
                          {quarterData.emptyMessage || "No donations received during this quarter."}
                        </div>
                      )}
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
