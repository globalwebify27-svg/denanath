"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Stethoscope, ArrowRight, Activity } from "lucide-react";

export default function ServicesClientPage({ pageData, services }: { pageData: any, services?: any[] }) {
  const options = [
    {
        "name": "Doctor Details",
        "href": "/doctor-details",
        "active": false
    },
    {
        "name": "Department Details",
        "href": "/department-details",
        "active": false
    },
    {
        "name": "Services",
        "href": "/services",
        "active": true
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
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Doctors & Departments</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {pageData.title || "Services"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {options.length > 0 && (
            <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
              <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                {options.map((option: any, idx: number) => (
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

          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctors & Departments</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  {pageData.title || "Our Specialities & Services"}
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              {pageData.image && (
                <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200">
                  <img src={pageData.image} alt={pageData.title || "Services"} className="w-full h-auto object-contain max-h-[500px] bg-slate-50" />
                </div>
              )}
              
              {pageData.content && (
                <div className="prose prose-slate max-w-none break-words whitespace-normal overflow-hidden [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:mb-2 prose-p:leading-relaxed prose-headings:text-[#002b5c] text-slate-700" dangerouslySetInnerHTML={{ __html: pageData.content }} />
              )}

              {/* Dynamic Services List */}
              {services && services.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  {services.map((service, idx) => {
                    let parsedItems: string[] = [];
                    try { parsedItems = JSON.parse(service.items || "[]"); } catch (e) {}

                    return (
                      <div key={idx} className="bg-white border border-slate-100 rounded-[1.25rem] p-6 sm:p-8 hover:border-[#d9232d] hover:shadow-[0_8px_30px_rgb(217,35,45,0.08)] transition-all duration-300 group flex flex-col h-full">
                        <div className="flex items-center gap-5 mb-8">
                          <div className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center shrink-0 bg-slate-50 text-[#002b5c] border border-slate-100 group-hover:bg-[#d9232d] group-hover:text-white group-hover:border-[#d9232d] transition-all duration-300">
                            <Activity className="w-7 h-7" />
                          </div>
                          <h3 className="text-[22px] font-[900] text-[#002b5c] group-hover:text-[#d9232d] tracking-tight leading-tight transition-colors duration-300">{service.title}</h3>
                        </div>
                        <div className="mt-auto border-t border-slate-100/80 pt-6 space-y-3">
                          {parsedItems.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 text-[#007a87] text-[15px] font-[600] group/item">
                              <ArrowRight className="w-[18px] h-[18px] shrink-0 mt-[2px] transition-transform group-hover/item:translate-x-1" />
                              <span className="text-slate-600 group-hover/item:text-[#002b5c] transition-colors">{item}</span>
                            </div>
                          ))}
                          {parsedItems.length === 0 && (
                            <div className="text-slate-400 text-sm italic">No specific items listed</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
