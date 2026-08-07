"use client";

import React, { useEffect, useRef } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { ChevronRight, ActivitySquare, CheckCircle2, AlertCircle, Phone, Mail, Building2, FileText, IndianRupee } from "lucide-react";

export default function HealthPackagesClientPage({ pageData }: { pageData: any }) {
  const {
    packages = [],
    companyList = [],
    instructions = [],
    womenNote = "Pregnant woman or those suspecting pregnancy should inform us and are advised to avoid X-rays or similar test. It is advisable to refrain from undergoing any health check up during menstruation.",
    appointmentPhones = ["020 – 40151011", "020 – 40151015", "9158885173"],
    appointmentTimings = "Mon to Sat, 10 a.m. to 6 p.m.",
    appointmentEmail = "pr@dmhospital.org"
  } = pageData || {};

  const parseHtmlLines = (htmlLines: string[]) => {
    if (!htmlLines) return [];
    return htmlLines.flatMap((line: string) => 
      line.replace(/(<\/p>|<\/ul>|<\/ol>)\s*(<p[^>]*>)/gi, '$1|||$2')
          .split('|||')
          .map(s => s.trim())
          .filter(s => {
             const textOnly = s.replace(/<[^>]*>/g, '').replace(/&nbsp;/gi, '').trim();
             return textOnly.length > 0 || s.includes('<img');
          })
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      <style>{`
        .health-package-rich-text ul {
          list-style-type: disc !important;
          padding-left: 1.5rem !important;
          margin-top: 0.25rem !important;
          margin-bottom: 0.25rem !important;
        }
        .health-package-rich-text ol {
          list-style-type: decimal !important;
          padding-left: 1.5rem !important;
          margin-top: 0.25rem !important;
          margin-bottom: 0.25rem !important;
        }
        .health-package-rich-text li {
          display: list-item !important;
        }
      `}</style>
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
            <span className="text-white">Health Packages</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
            Health Packages
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 md:pt-5 md:pb-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Dynamic Sidebar */}
          <DynamicSidebar categoryName="Patient & Visitors" activeHref="/health-packages" />

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-2 pb-6 sm:px-10 sm:pt-3 sm:pb-10 md:px-14 md:pt-4 md:pb-14">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                    <ActivitySquare className="w-4 h-4" />
                    <span>Patient Guide</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] tracking-tight">
                    Health Packages
                  </h2>
                </div>
              </div>
              <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-10"></div>

              <div className="space-y-12 text-slate-700">
                
                {/* Health Packages Grid */}
                <section>
                  <div className="grid md:grid-cols-2 gap-6">
                    {packages.map((pkg: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full group">
                        <div className="p-5 md:p-6 bg-slate-50 border-b border-slate-100 flex-1">
                          <h3 className="text-xl font-bold text-[#002b5c] mb-4 group-hover:text-[#007a87] transition-colors">{pkg.name}</h3>
                          <ul className="space-y-2 mb-2">
                            {pkg.tests && parseHtmlLines(pkg.tests).map((test: string, testIdx: number) => (
                              <li key={testIdx} className="flex items-start gap-2 text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-2" />
                                <div style={{ fontSize: '18px', lineHeight: '31px' }} className="health-package-rich-text font-normal prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 prose-ol:my-0 prose-li:my-0" dangerouslySetInnerHTML={{ __html: test }}></div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-5 bg-teal-50/50 flex flex-col sm:flex-row justify-between gap-4 border-t border-teal-100/50">
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Cost</p>
                            <p className="text-sm font-semibold text-slate-400 line-through flex items-center"><IndianRupee className="w-3.5 h-3.5 mr-0.5" /> {pkg.cost}</p>
                          </div>
                          <div className="sm:text-right">
                            <p className="text-xs text-[#007a87] uppercase font-bold tracking-wider mb-1">Payable Cost</p>
                            <p className="text-2xl font-bold text-[#007a87] flex items-center sm:justify-end"><IndianRupee className="w-5 h-5 mr-0.5" /> {pkg.payable}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 pt-8 border-t border-slate-100">
                  {/* Important Instructions */}
                  <section>
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                      <FileText className="w-6 h-6 text-[#007a87]" />
                      Important Instructions
                    </h3>
                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                      <ul className="space-y-3">
                        {parseHtmlLines(instructions).map((instruction: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <ChevronRight className="w-5 h-5 text-blue-600 shrink-0 mt-1.5" />
                            <div style={{ fontSize: '18px', lineHeight: '31px' }} className="health-package-rich-text text-slate-700 font-normal prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 prose-ol:my-0 prose-li:my-0" dangerouslySetInnerHTML={{ __html: instruction }}></div>
                          </li>
                        ))}
                      </ul>
                      
                      {womenNote && (
                        <div className="mt-6 pt-6 border-t border-blue-100">
                          <h4 style={{ fontSize: '18px', lineHeight: '31px' }} className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            For Women
                          </h4>
                          <div style={{ fontSize: '18px', lineHeight: '31px' }} className="health-package-rich-text text-slate-600 font-normal whitespace-pre-line prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 prose-ol:my-0 prose-li:my-0" dangerouslySetInnerHTML={{ __html: womenNote }}>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  <div className="space-y-8">
                    {/* Appointments Contact */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                        <Phone className="w-6 h-6 text-[#007a87]" />
                        Book Appointment
                      </h3>
                      <div className="bg-[#002b5c] text-white rounded-2xl p-6 shadow-lg">
                        <h4 className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-4">Health Check Appointments</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                            <div>
                              {appointmentPhones.map((phone: string, idx: number) => (
                                <p key={idx} className="font-semibold text-lg">{phone}</p>
                              ))}
                              {appointmentTimings && (
                                <p className="text-blue-200 text-sm mt-1 whitespace-pre-line">{appointmentTimings}</p>
                              )}
                            </div>
                          </div>
                          {appointmentEmail && (
                            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                              <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                              <a href={`mailto:${appointmentEmail}`} className="text-teal-100 hover:text-white transition-colors">{appointmentEmail}</a>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>

                    {/* Corporate Companies */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-[#007a87]" />
                        Company List
                      </h3>
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 h-[300px] overflow-y-auto custom-scrollbar">
                        <ul className="space-y-2">
                          {parseHtmlLines(companyList).map((company: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-2" />
                              <div style={{ fontSize: '18px', lineHeight: '31px' }} className="health-package-rich-text text-slate-600 font-normal prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0 prose-ol:my-0 prose-li:my-0" dangerouslySetInnerHTML={{ __html: company }}></div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>
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
