"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ActivitySquare, CheckCircle2, AlertCircle, Phone, Mail, Building2, FileText, IndianRupee } from "lucide-react";

export default function HealthPackagesClientPage({ pageData }: { pageData: any }) {
  const patientGuideOptions = [
    { name: "Out Patient Guide", href: "/out-patient", active: false },
    { name: "Hospital Admission Guide", href: "/in-patient", active: false },
    { name: "Health Packages", href: "/health-packages", active: true },
    { name: "Facilities", href: "/facilities", active: false },
    { name: "Patients Stories / Feedbacks", href: "/feedbacks", active: false },
    { name: "Patient Rights & Responsibilities", href: "/patient-rights", active: false },
    { name: "Photos", href: "/gallery-photos", active: false },
    { name: "Videos", href: "/gallery-videos", active: false },
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

  const {
    packages = [],
    companyList = [],
    instructions = [],
    womenNote = "Pregnant woman or those suspecting pregnancy should inform us and are advised to avoid X-rays or similar test. It is advisable to refrain from undergoing any health check up during menstruation.",
    appointmentPhones = ["020 – 40151011", "020 – 40151015", "9158885173"],
    appointmentTimings = "Mon to Sat, 10 a.m. to 6 p.m.",
    appointmentEmail = "pr@dmhospital.org"
  } = pageData || {};

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
            <span className="hover:text-white transition-colors cursor-pointer">Patient & Visitors</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Health Packages</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Health Packages
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
            <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {patientGuideOptions.map((option, idx) => (
                <Link
                  key={idx}
                  href={option.href}
                  data-active={option.active}
                  className={"snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal " + (
                    option.active
                      ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                      : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                  ) + " " + (idx !== patientGuideOptions.length - 1 ? "lg:border-b lg:border-b-slate-50" : "")}
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

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
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
                            {pkg.tests && pkg.tests.map((test: string, testIdx: number) => (
                              <li key={testIdx} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                                <span className="leading-tight">{test}</span>
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
                        {instructions.map((instruction: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3">
                            <ChevronRight className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 leading-relaxed">{instruction}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {womenNote && (
                        <div className="mt-6 pt-6 border-t border-blue-100">
                          <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            For Women
                          </h4>
                          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                            {womenNote}
                          </p>
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
                          {companyList.map((company: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                              <span className="text-sm text-slate-600">{company}</span>
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
