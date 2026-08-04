"use client";

import React, { useEffect, useRef } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { ChevronRight, Building, Building2, Pill, Droplets, Users, Coffee, Activity, Ambulance, Copy, AlertTriangle, Glasses, Ticket, FileText, MapPin, Phone, Clock, Info, CheckCircle2, CreditCard } from "lucide-react";

const renderIcon = (iconName?: string, title?: string) => {
  const name = iconName || "";
  const t = (title || "").toLowerCase();
  
  if (name === "Building" || (!name && t.includes('reception'))) return <Building className="w-6 h-6" />;
  if (name === "Pill" || (!name && t.includes('pharmacy'))) return <Pill className="w-6 h-6" />;
  if (name === "Droplets" || (!name && t.includes('blood'))) return <Droplets className="w-6 h-6" />;
  if (name === "Users" || (!name && t.includes('public'))) return <Users className="w-6 h-6" />;
  if (name === "Coffee" || (!name && t.includes('canteen'))) return <Coffee className="w-6 h-6" />;
  if (name === "Activity" || (!name && t.includes('health'))) return <Activity className="w-6 h-6" />;
  if (name === "Ambulance" || (!name && t.includes('ambulance'))) return <Ambulance className="w-6 h-6" />;
  if (name === "Copy" || (!name && t.includes('photo'))) return <Copy className="w-6 h-6" />;
  if (name === "Info" || (!name && t.includes('mortuary'))) return <Info className="w-6 h-6" />;
  if (name === "AlertTriangle" || (!name && t.includes('emergency'))) return <AlertTriangle className="w-6 h-6" />;
  if (name === "Glasses" || (!name && t.includes('optic'))) return <Glasses className="w-6 h-6" />;
  if (name === "Ticket" || (!name && t.includes('pass'))) return <Ticket className="w-6 h-6" />;
  
  return <Building2 className="w-6 h-6" />;
};

export default function FacilitiesClientPage({ pageData }: { pageData: any }) {
  const {
    ipdBillingRules = [],
    opdBillingRules = [],
    ipdBillingTimings = [],
    facilities = []
  } = pageData || {};

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
            <span className="hover:text-white transition-colors cursor-pointer">Patient & Visitors</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Facilities</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
            Facilities
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-5">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Dynamic Sidebar */}
          <DynamicSidebar categoryName="Patient & Visitors" activeHref="/facilities" />

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-2 pb-6 sm:px-10 sm:pt-3 sm:pb-10 md:px-14 md:pt-4 md:pb-14">
              
              <div className="mb-10">
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>Patient Guide</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Facilities Offered
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="space-y-12 text-slate-700">

                {/* Reception Facilities */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <Building className="w-6 h-6 text-[#007a87]" />
                    Reception Facilities
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.slice(0, 2).map((facility: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-[0_8px_30px_rgba(217,35,45,0.12)] hover:border-[#D9232D]/30 transition-all duration-300 group flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#007a87] flex items-center justify-center shrink-0 group-hover:bg-[#D9232D] group-hover:text-white transition-all duration-300 group-hover:shadow-[0_4px_12px_rgba(217,35,45,0.3)]">
                            {renderIcon(facility.iconName, facility.title)}
                          </div>
                          <h4 style={{ fontSize: '18px' }} className="font-bold text-[#002b5c] leading-tight group-hover:text-[#D9232D] transition-colors">{facility.title}</h4>
                        </div>
                        
                        <div className="space-y-3 mb-4 flex-1">
                          {facility.time && facility.time !== "-" && (
                            <div className="flex items-start gap-2">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span style={{ fontSize: '16px' }} className="font-medium text-teal-600">{facility.time}</span>
                            </div>
                          )}
                          {facility.location && facility.location !== "-" && (
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span style={{ fontSize: '16px' }} className="text-slate-600">{facility.location}</span>
                            </div>
                          )}
                          {facility.phone && facility.phone !== "-" && (
                            <div className="flex items-start gap-2">
                              <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span style={{ fontSize: '16px' }} className="text-slate-600">{facility.phone}</span>
                            </div>
                          )}
                        </div>

                        {facility.details && facility.details.length > 0 && (
                          <div className="pt-4 border-t border-slate-100">
                            <ul className="space-y-2">
                              {facility.details.map((detail: string, dIdx: number) => (
                                <li key={dIdx} className="flex items-start gap-2 text-slate-500">
                                  <ChevronRight className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                                  <span style={{ fontSize: '16px' }} className="leading-tight">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Billing Section (Prominent) */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-[#007a87]" />
                    Billing Facilities
                  </h3>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* IPD Billing */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <h4 className="font-bold text-lg text-[#007a87] mb-4 border-b border-slate-200 pb-2">IPD Billing</h4>
                      
                      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-100 text-slate-700 font-semibold">
                            <tr><th className="px-4 py-3">Building & Floor</th><th className="px-4 py-3">Timing</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {ipdBillingTimings.map((item: any, idx: number) => (
                              <tr key={idx} className="hover:bg-slate-50">
                                <td className="px-4 py-2">{item.building}</td>
                                <td className={`px-4 py-2 ${item.timing.toLowerCase().includes('24x7') ? 'font-medium text-teal-600' : ''}`}>
                                  {item.timing}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <ul className="space-y-3 text-sm">
                        {ipdBillingRules.map((rule: string, i: number) => (
                          <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> <span>{rule}</span></li>
                        ))}
                      </ul>
                    </div>

                    {/* OPD Billing */}
                    <div className="bg-teal-50/50 p-6 rounded-2xl border border-teal-100 shadow-sm flex flex-col">
                      <h4 className="font-bold text-lg text-[#007a87] mb-4 border-b border-teal-200/50 pb-2">OPD Billing</h4>
                      <ul className="space-y-4 text-sm flex-1">
                        {opdBillingRules.map((rule: string, i: number) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="font-bold text-teal-600 bg-teal-100 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-xs">{i+1}</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Other Facilities Grid */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <Building className="w-6 h-6 text-[#007a87]" />
                    Other Key Facilities
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.slice(2).map((facility: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-[0_8px_30px_rgba(217,35,45,0.12)] hover:border-[#D9232D]/30 transition-all duration-300 group flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#007a87] flex items-center justify-center shrink-0 group-hover:bg-[#D9232D] group-hover:text-white transition-all duration-300 group-hover:shadow-[0_4px_12px_rgba(217,35,45,0.3)]">
                            {renderIcon(facility.iconName, facility.title)}
                          </div>
                          <h4 style={{ fontSize: '18px' }} className="font-bold text-[#002b5c] leading-tight group-hover:text-[#D9232D] transition-colors">{facility.title}</h4>
                        </div>
                        
                        <div className="space-y-3 mb-4 flex-1">
                          {facility.time && facility.time !== "-" && (
                            <div className="flex items-start gap-2">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span style={{ fontSize: '16px' }} className="font-medium text-teal-600">{facility.time}</span>
                            </div>
                          )}
                          {facility.location && facility.location !== "-" && (
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span style={{ fontSize: '16px' }} className="text-slate-600">{facility.location}</span>
                            </div>
                          )}
                          {facility.phone && facility.phone !== "-" && (
                            <div className="flex items-start gap-2">
                              <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span style={{ fontSize: '16px' }} className="text-slate-600">{facility.phone}</span>
                            </div>
                          )}
                        </div>

                        {facility.details && facility.details.length > 0 && (
                          <div className="pt-4 border-t border-slate-100">
                            <ul className="space-y-2">
                              {facility.details.map((detail: string, dIdx: number) => (
                                <li key={dIdx} className="flex items-start gap-2 text-slate-500">
                                  <ChevronRight className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                                  <span style={{ fontSize: '16px' }} className="leading-tight">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
