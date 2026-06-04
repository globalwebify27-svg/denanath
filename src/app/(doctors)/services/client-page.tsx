"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import * as Icons from "lucide-react";
import { ChevronRight, Stethoscope, ArrowRight } from "lucide-react";

type Service = {
  id?: string;
  title: string;
  icon?: string | null;
  items: string; // JSON string
  status?: boolean;
};

const getServiceIcon = (service: Service) => {
  if (service.icon && (Icons as any)[service.icon]) {
    return (Icons as any)[service.icon];
  }
  return Icons.Activity; // fallback
};

export default function ServicesClient({ servicesList }: { servicesList: Service[] }) {
  const options = [
    { name: "Doctor Details", href: "/doctor-details", active: false },
    { name: "Department Details", href: "/department-details", active: false },
    { name: "Services", href: "/services", active: true }
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
            <span className="hover:text-white transition-colors cursor-pointer">Doctors & Departments</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Services</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Services
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
                    ) + " " + (idx !== options.length - 1 ? "lg:border-b lg:border-b-slate-50" : "") + (idx === 0 ? " lg:rounded-t-[15px]" : "") + (idx === options.length - 1 ? " lg:rounded-b-[15px]" : "")}
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
                  <Stethoscope className="w-4 h-4" />
                  <span>Doctors & Departments</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Our Specialities & Services
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
                <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
                  Deenanath Mangeshkar Hospital offers a comprehensive range of advanced medical services, specialized departments, and state-of-the-art therapeutic facilities designed to provide world-class care to our patients.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {servicesList.map((service, idx) => {
                  let itemsArray: string[] = [];
                  try {
                    itemsArray = JSON.parse(service.items);
                  } catch (e) {
                    itemsArray = [];
                  }
                  const Icon = getServiceIcon(service);

                  return (
                    <div 
                      key={service.id || idx} 
                      className="group bg-white border border-slate-200 hover:border-[#D9232D] rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:-translate-y-1 flex flex-col h-full"
                    >
                      <div className="flex items-center gap-4 mb-5 border-b border-slate-100 pb-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200 group-hover:bg-[#d9232d] group-active:bg-[#d9232d] transition-colors">
                          <Icon className="w-6 h-6 text-[#007a87] group-hover:text-white group-active:text-white transition-colors" />
                        </div>
                        <h3 className="text-xl font-extrabold text-[#002b5c] group-hover:text-[#D9232D] transition-colors leading-tight">
                          {service.title}
                        </h3>
                      </div>
                      
                      <div className="flex-1">
                        {itemsArray.length > 0 ? (
                          <ul className="space-y-3">
                            {itemsArray.map((item, iIdx) => (
                              <li key={iIdx} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                <ArrowRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm font-medium text-slate-400 italic flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                            General Department Services
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
