"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, HeartHandshake, Users, ActivitySquare, Building2 } from "lucide-react";

export default function CharityDetailsClientPage({ charityData }: { charityData: any }) {
  const badgeText = charityData.badgeText || "Our Commitment to Society";
  const heading = charityData.heading || "Information Regarding Charity";
  const introduction = charityData.introduction || "Deenanath Mangeshkar Hospital and Research Center actively provides world-class medical treatment to patients from indigent (निर्धन) and weaker sections (दुर्बल) of society. Below is a detailed breakdown of the patients we have recently assisted.";
  const records = charityData.records || [];

  const aboutOptions = [
    { name: "About Hospital", href: "/about-hospital", active: false },
    { name: "Associates", href: "/associates", active: false },
    { name: "Accreditations", href: "/accreditations", active: false },
    { name: "Support Hospital / Donations", href: "/supportHospitalDonations", active: false },
    { name: "Unique features of DMH", href: "/unique-features", active: false },
    { name: "Foreign Contribution", href: "/foreign-contribution", active: false },
    { name: "Charity Details", href: "/charity-details", active: true },
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

  // Calculate totals for the dashboard cards
  const totalIndigent = records.reduce((acc: number, curr: any) => acc + (parseInt(curr.indigent) || 0), 0);
  const totalWeaker = records.reduce((acc: number, curr: any) => acc + (parseInt(curr.weaker) || 0), 0);

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
            <span className="text-white">Charity Details</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Charity Details</h1>
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
                  <span>Charity Details</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Charity Details
                </h2>

                {/* Intro Section */}
                <div className="mb-10 text-center md:text-left mt-8">
                  <div className="inline-flex items-center justify-center md:justify-start gap-2 px-4 py-2 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs sm:text-sm font-bold tracking-wider uppercase mb-5">
                    <HeartHandshake className="w-4 h-4" />
                    <span>{badgeText}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] mb-5 tracking-tight">
                    {heading}
                  </h3>
                  
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-3xl whitespace-pre-wrap">
                    {introduction}
                  </p>
                </div>

                {/* Impact Metric Cards (Dashboard look) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                  <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100/60 rounded-2xl p-6 flex items-center gap-5 shadow-sm">
                    <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20 text-white">
                      <Users className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-teal-900 font-extrabold text-3xl mb-1">{totalIndigent.toLocaleString()}</p>
                      <p className="text-teal-700 font-semibold text-sm leading-tight">Indigent Patients (निर्धन) <br className="hidden md:block"/>Treated Since Sept 2025</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/60 rounded-2xl p-6 flex items-center gap-5 shadow-sm">
                    <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20 text-white">
                      <ActivitySquare className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-blue-900 font-extrabold text-3xl mb-1">{totalWeaker.toLocaleString()}</p>
                      <p className="text-blue-700 font-semibold text-sm leading-tight">Weaker Section Patients (दुर्बल) <br className="hidden md:block"/>Treated Since Sept 2025</p>
                    </div>
                  </div>
                </div>
                
                {/* Premium Table Design */}
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  
                  {/* Table Header Accent */}
                  <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Patient Treatment Records</h3>
                    <div className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">Monthly Breakdown</div>
                  </div>

                  {/* Responsive Table Wrapper */}
                  <div className="w-full overflow-x-auto custom-scrollbar">
                    <table className="w-full min-w-[700px] text-left border-collapse">
                      <thead>
                        <tr className="bg-[#1eb7a6] text-white">
                          <th className="py-4 px-6 font-semibold text-[14px] tracking-wide border-r border-teal-600/30 whitespace-nowrap w-[180px]">
                            Month
                          </th>
                          <th className="py-4 px-6 font-semibold text-[14px] tracking-wide border-r border-teal-600/30 leading-relaxed">
                            Total number of Indigent patients (निर्धन) to whom treatment is provided
                          </th>
                          <th className="py-4 px-6 font-semibold text-[14px] tracking-wide leading-relaxed">
                            Total number of Weaker section (दुर्बल) patients to whom treatment is provided
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((row: any, idx: number) => (
                          <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0 group">
                            <td className="py-4 px-6 text-[14px] font-bold text-[#002b5c] border-r border-slate-100 whitespace-nowrap group-hover:text-teal-600 transition-colors">
                              {row.month}
                            </td>
                            <td className="py-4 px-6 border-r border-slate-100">
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-sm">
                                {row.indigent}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-sm">
                                {row.weaker}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Scrollbar styles for tables */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}} />
    </div>
  );
}
