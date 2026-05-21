"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, MessageSquareHeart } from "lucide-react";

export default function PatientGuidePage() {
  const patientGuideOptions = [
    { name: "Out Patient Guide", href: "/out-patient", active: false },
    { name: "In Patient Guide", href: "/in-patient", active: false },
    { name: "Health Packages", href: "/health-packages", active: false },
    { name: "Facilities", href: "/facilities", active: false },
    { name: "Patients Stories / Feedbacks", href: "/feedbacks", active: true },
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
            <span className="text-white">Patients Stories / Feedbacks</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Patients Stories / Feedbacks
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
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <MessageSquareHeart className="w-4 h-4" />
                  <span>Patient Guide</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Patients Stories / Feedbacks
                </h2>
                
              </div>

              <div className="space-y-6 mt-8">\n  <ul className="list-none space-y-3 mb-6">\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Out Patient guide</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>In patient guide</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Health Packages</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Facilities</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Patients Stories / Feedbacks</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Patient Rights & Responsibilities</span></li>\n</ul>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">Generous help from Charity department made treatment possible</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">My son was diagnosed with cancer and doctor told to operate immediately. Surgery was successful but after surgery doctor recommended 6 cycles of chemotherapy which was non affordable. I approached charity department for monetary help. They verified the documents and after completing the formalities and with financial support I could avail the treatment. I am grateful to Charity department and doctors who helped me in all ways to recover my son from Cancer.</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">Great support received from staff and doctors during transplant surgery</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">My aunty was admitted for Liver Transplant surgery which was unfortunately not successful but I wasn’t to give special thanks to Doctors for their generous support . I want to appreciate the response received from Blood bank , where many known and unknown donors came forward to help when blood transfusion was required. Last but not the least the transplant co-ordinator and Billing staff also co-operated a lot for smooth transactions during admission and after discharge.</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">Where there is hope there is faith</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">I was suffering from gall bladder stones and in Ahmednagar consulted various doctors and did numerous tests but due to age and co-morbidities doctors denied to do surgery . Due to abdominal pain I was frustrated , one of doctors recommended me to go to Deenanath Mangeshkar Hospital. After consultation surgery was done successfully . I am grateful to all doctors and staff who were involved in this surgery. All nurses in ward, doctors and reception staff are very polite and guide in proper manner whenever required.</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">Prompt action by doctors and excellent service by Mediclaim department</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">My wife got admitted in ICU for Hemodialysis, I appreciate the quick decision taken by doctors of admission and good treatment given. During discharge immediate help was provided by Mediclaim department for approval and excellent service during the complete process. I am thankful for the chance you gave me to appreciate you all.</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">Good doctors and financial help from charity made treatment possible</h3>\n</div>\n

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
