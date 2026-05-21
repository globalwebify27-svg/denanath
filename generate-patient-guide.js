const fs = require('fs');
const path = require('path');

const pages = [
  { folder: 'out-patient', title: 'Out Patient Guide', icon: 'UserCircle2' },
  { folder: 'in-patient', title: 'In Patient Guide', icon: 'Bed' },
  { folder: 'health-packages', title: 'Health Packages', icon: 'ActivitySquare' },
  { folder: 'facilities', title: 'Facilities', icon: 'Building2' },
  { folder: 'feedbacks', title: 'Patients Stories / Feedbacks', icon: 'MessageSquareHeart' },
  { folder: 'patient-rights', title: 'Patient Rights & Responsibilities', icon: 'ShieldAlert' },
  { folder: 'gallery-photos', title: 'Photos', icon: 'Image' },
  { folder: 'gallery-videos', title: 'Videos', icon: 'Video' },
];

const baseTemplate = `"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, PAGE_ICON } from "lucide-react";

export default function PatientGuidePage() {
__OPTIONS_ARRAY__

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
            <span className="text-white">PAGE_TITLE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            PAGE_TITLE
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
                  <PAGE_ICON className="w-4 h-4" />
                  <span>Patient Guide</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  PAGE_TITLE
                </h2>
                <p className="text-slate-600 leading-relaxed font-light text-lg">
                  Information regarding PAGE_TITLE will be updated here shortly. We are committed to providing the best facilities and transparent guidelines for our patients and visitors.
                </p>
              </div>

              {/* Placeholder Content Area */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow group relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-teal-600 mb-4">
                      <PAGE_ICON className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#002b5c] mb-2">Feature Section {item}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Detailed information and guidelines for patients visiting the hospital. This section contains important instructions.
                    </p>
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
`;

const baseDir = path.join(__dirname, 'src', 'app', '(patient-guide)');
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

for (const page of pages) {
  const pageDir = path.join(baseDir, page.folder);
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  const patientGuideOptionsStr = '  const patientGuideOptions = [\n' +
    pages.map(p => '    { name: "' + p.title + '", href: "/' + p.folder + '", active: ' + (page.folder === p.folder) + ' },').join('\n') +
    '\n  ];';

  let content = baseTemplate;
  content = content.replace(/__OPTIONS_ARRAY__/g, patientGuideOptionsStr);
  content = content.replace(/PAGE_TITLE/g, page.title);
  content = content.replace(/PAGE_ICON/g, page.icon);

  fs.writeFileSync(path.join(pageDir, 'page.tsx'), content);
  console.log("Created " + page.folder);
}
