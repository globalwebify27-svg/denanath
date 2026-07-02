"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, HeartPulse, ArrowLeft, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function JeevanRekhaClient({ initialData }: { initialData: any }) {
  const options = [
    { name: "Academics", href: "/academics", active: false },
    { name: "Simulation Center", href: "/simulation-center", active: false }
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
            <Link href="/academics" className="hover:text-white transition-colors">Academics</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/simulation-center" className="hover:text-white transition-colors">Simulation Center</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Jeevan Rekha</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Jeevan Rekha
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
            <Link href="/simulation-center" className="inline-flex items-center gap-2 text-[#007a87] hover:text-[#002b5c] font-bold mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Simulation Center
            </Link>
            
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#002b5c]"></div>
              
              <div className="mb-10">
                <div style={{ fontSize: '14px' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <HeartPulse className="w-4 h-4" />
                  <span>Jeevan Rekha</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Simulation Home
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-700 space-y-8">
                
                <div className="bg-gradient-to-r from-red-50 to-white border-l-4 border-red-500 p-6 rounded-r-2xl shadow-sm">
                  <h3 className="text-xl font-bold text-red-700 m-0">{initialData.highlightText}</h3>
                </div>

                <p className="text-lg whitespace-pre-wrap">
                  {initialData.introText1}
                </p>

                <div className="flex items-start gap-4 p-6 bg-teal-50/50 rounded-2xl border border-teal-100">
                  <Clock className="w-6 h-6 text-teal-600 shrink-0 mt-1" />
                  <p className="m-0 font-medium text-slate-700 whitespace-pre-wrap">
                    {initialData.introText2}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 space-y-6">
                  <h4 className="text-lg font-bold text-[#002b5c] m-0 border-b border-slate-200 pb-4">Contact Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-teal-500 shrink-0 mt-1" />
                      <p className="m-0 text-slate-600 whitespace-pre-wrap">
                        {initialData.contactInfo?.address}
                      </p>
                    </div>
                    {initialData.contactInfo?.phones && initialData.contactInfo.phones.length > 0 && (
                      <div className="flex items-center gap-4">
                        <Phone className="w-5 h-5 text-teal-500 shrink-0" />
                        <p className="m-0 text-slate-600 font-medium flex items-center gap-2 flex-wrap">
                          {initialData.contactInfo.phones.map((phone: string, idx: number) => (
                            <React.Fragment key={idx}>
                              <a href={`tel:${phone}`} className="hover:text-[#007a87] hover:underline">{phone}</a>
                              {idx < initialData.contactInfo.phones.length - 1 && <span className="text-slate-300 font-normal">|</span>}
                            </React.Fragment>
                          ))}
                        </p>
                      </div>
                    )}
                    {initialData.contactInfo?.emails && initialData.contactInfo.emails.length > 0 && (
                      <div className="flex items-center gap-4">
                        <Mail className="w-5 h-5 text-teal-500 shrink-0" />
                        <div className="flex flex-col gap-1">
                          {initialData.contactInfo.emails.map((email: string, idx: number) => (
                            <a key={idx} href={`mailto:${email}`} className="text-[#007a87] font-bold hover:underline">
                              {email}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-8">
                  <h4 className="text-lg font-bold text-slate-800 mb-4">Announced Training Program:</h4>
                  {initialData.announcedPrograms && initialData.announcedPrograms.length > 0 ? (
                    <ul className="space-y-3 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                      {initialData.announcedPrograms.map((prog: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{prog}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center">
                      <p className="text-slate-500 italic m-0">No programs currently announced. Please check back later.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
