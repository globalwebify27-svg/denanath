"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Microscope, FileText, Download } from "lucide-react";

export default function AnnualReportsPage() {
  const options = [
    {
        "name": "About Us",
        "href": "/research-about",
        "active": false
    },
    {
        "name": "Training And Events",
        "href": "/training-events",
        "active": false
    },
    {
        "name": "Awards",
        "href": "/awards",
        "active": false
    },
    {
        "name": "Newsletter Articles",
        "href": "/newsletter-articles",
        "active": false
    },
    {
        "name": "Publications",
        "href": "/publications",
        "active": false
    },
    {
        "name": "Annual Reports",
        "href": "/annual-reports",
        "active": true
    },
    {
        "name": "Sponsors & CROs",
        "href": "/sponsors-cros",
        "active": false
    },
    {
        "name": "Contact Us",
        "href": "/research-contact",
        "active": false
    }
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
            <span className="hover:text-white transition-colors cursor-pointer">Research</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Annual Reports</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Annual Reports
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
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Microscope className="w-4 h-4" />
                  <span>Research</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Annual Reports
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Annual Report 2024-2025", link: "#" },
                  { title: "Annual Report 2023-2024", link: "#" },
                  { title: "Annual Report 2022-2023", link: "#" },
                  { title: "Tribute issue (2021-2022)", description: "A tribute to Lata Mangeshkar (1929 - 2022)", link: "#" },
                  { title: "Annual Report 2020-2021", link: "#" },
                  { title: "Annual Report 2019-2020", link: "#" },
                  { title: "Annual Report 2018-2019", link: "#" },
                  { title: "Annual Report 2017-2018", link: "#" },
                  { title: "Annual Report 2016-2017", link: "#" },
                  { title: "Annual Report 2015-2016", link: "#" },
                  { title: "Annual Report 2014-2015", link: "#" },
                  { title: "Annual Report 2013-2014", link: "#" },
                ].map((report, idx) => (
                  <div key={idx} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:border-[#003360] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                    <div className="p-6 md:p-8 flex-1 flex flex-col items-center text-center justify-center relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-[#002b5c] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-[#003360]/5 group-hover:border-[#003360]/20 transition-colors duration-300">
                        <FileText className="w-8 h-8 text-slate-400 group-hover:text-[#D9232D] transition-colors duration-300" />
                      </div>
                      <h3 className="text-xl font-bold text-[#002b5c] mb-2">{report.title}</h3>
                      {report.description && (
                        <p className="text-sm text-slate-500 mb-4">{report.description}</p>
                      )}
                    </div>
                    <div className="border-t border-slate-100 p-4 bg-slate-50 group-hover:bg-[#003360] transition-colors duration-300 mt-auto">
                      <a 
                        href={report.link} 
                        target={report.link !== "#" ? "_blank" : "_self"}
                        rel={report.link !== "#" ? "noopener noreferrer" : ""}
                        className="flex items-center justify-center gap-2 text-[#007a87] group-hover:text-white font-bold text-sm transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
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