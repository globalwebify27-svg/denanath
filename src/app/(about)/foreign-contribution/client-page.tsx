"use client";

import React, { useEffect, useRef } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { ChevronRight, Building2 } from "lucide-react";

export default function ForeignContributionClientPage({ fcraData }: { fcraData: any }) {
  const introduction = fcraData.introduction || "Information regarding receipt of Foreign Contribution";
  const quarters = fcraData.quarters || [];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const parts = dateStr.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/about-hospital" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Foreign Contribution</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight">Foreign Contribution</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-5">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Dynamic Sidebar */}
          <DynamicSidebar categoryName="About Us" activeHref="/foreign-contribution" />

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-12">
              
              <div className="mb-10">
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>Foreign Contribution</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Foreign Contribution
                </h2>
                
                <div className="text-slate-600 leading-relaxed font-normal mb-8 mt-8 prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: introduction || '' }} />
              </div>

              {/* FCRA Data Blocks */}
              <div className="space-y-12">
                {quarters.map((quarterData: any, qIdx: number) => (
                  <div key={qIdx} className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                    {/* Quarter Header */}
                    <div style={{ fontSize: '18px' }} className="bg-[#1eb7a6] text-white py-4 px-6 font-bold">
                      {quarterData.quarter}
                    </div>
                    
                    <div className="bg-white p-6">
                      {quarterData.donations && quarterData.donations.length > 0 ? (
                        <div className="overflow-x-auto custom-scrollbar">
                          <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                              <tr className="border-b-2 border-slate-200 bg-slate-50">
                                <th style={{ fontSize: '18px' }} className="py-4 px-4 font-bold text-slate-700 leading-[31px] w-16 text-center">Sr. No.</th>
                                <th style={{ fontSize: '18px' }} className="py-4 px-4 font-bold text-slate-700 leading-[31px]">Name and address of donors</th>
                                <th style={{ fontSize: '18px' }} className="py-4 px-4 font-bold text-slate-700 leading-[31px] w-40">Amount received (in INR)</th>
                                <th style={{ fontSize: '18px' }} className="py-4 px-4 font-bold text-slate-700 leading-[31px] w-32">Date of receipt</th>
                                <th style={{ fontSize: '18px' }} className="py-4 px-4 font-bold text-slate-700 leading-[31px] w-32">Purpose (Social / Medical)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {quarterData.donations.map((donation: any, dIdx: number) => (
                                <tr key={dIdx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                  <td style={{ fontSize: '16px' }} className="py-4 px-4 text-slate-500 font-medium text-center">{dIdx + 1}</td>
                                  <td style={{ fontSize: '16px' }} className="py-4 px-4 text-slate-700 font-medium">{donation.name}</td>
                                  <td style={{ fontSize: '16px' }} className="py-4 px-4 text-slate-600 font-semibold">{donation.inr}</td>
                                  <td style={{ fontSize: '16px' }} className="py-4 px-4 text-slate-500">{formatDate(donation.date)}</td>
                                  <td className="py-4 px-4">
                                    <span style={{ fontSize: '16px' }} className={`inline-flex items-center justify-center px-3 py-1 rounded-full font-bold ${
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
