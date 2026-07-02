"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Camera, Video, MonitorPlay } from "lucide-react";
import Image from "next/image";

export default function VirtualTourClientPage() {
  const patientGuideOptions = [
    { name: "Out Patient Guide", href: "/out-patient", active: false },
    { name: "Hospital Admission Guide", href: "/in-patient", active: false },
    { name: "Health Packages", href: "/health-packages", active: false },
    { name: "Facilities", href: "/facilities", active: false },
    { name: "Virtual Tour", href: "/virtual-tour", active: true },
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

  const tabs = ["Facilities", "Technology", "Outpatient Services", "Rooms"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [activeView, setActiveView] = useState("Main Entrance");

  const locations = [
    { name: "Ambulance", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Admission Desk", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Auditorium", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Cafeteria", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Emergency Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "FF Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "ICU Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Imaging Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Laboratory", category: "Technology", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "LB Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Lift", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Main Entrance", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop" },
    { name: "Main Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "OPD Lobby", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "OT", category: "Technology", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "OT Lobby", category: "Technology", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Reception Desk", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" }
  ];

  // Currently we show all regardless of category to match the layout in the image
  // but if needed we can filter by activeTab

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
            <span className="text-white">Virtual Tour</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Virtual Tour
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
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-10">
              
              <div className="mb-8">
                <div style={{ fontSize: '14px' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <MonitorPlay className="w-4 h-4" />
                  <span>Interactive Tour</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] tracking-tight">
                  Hospital Virtual Tour
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mt-6 mb-2"></div>
              </div>

              {/* Main 360 Viewer Placeholder */}
              <div className="w-full relative rounded-2xl overflow-hidden bg-slate-800 shadow-xl border-4 border-white mb-8 aspect-video">
                {/* We use an image as a placeholder for the iframe / 360 viewer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop')`}} 
                />
                
                {/* 360 Tour Overlay UI Controls */}
                <div className="absolute top-4 right-4 z-10">
                  <select 
                    className="bg-white/90 backdrop-blur text-sm font-bold text-[#002b5c] rounded-md px-3 py-2 border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007a87]"
                    value={activeView}
                    onChange={(e) => setActiveView(e.target.value)}
                  >
                    {locations.map(loc => (
                      <option key={loc.name} value={loc.name}>{loc.name}</option>
                    ))}
                  </select>
                </div>

                {/* Decorative UI elements representing 360 view controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 shadow-lg">
                   <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center hover:bg-white cursor-pointer transition-colors"><ChevronRight className="w-5 h-5 text-slate-800 rotate-180" /></div>
                   <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center hover:bg-white cursor-pointer transition-colors"><ChevronRight className="w-5 h-5 text-slate-800 -rotate-90" /></div>
                   <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center hover:bg-white cursor-pointer transition-colors"><ChevronRight className="w-5 h-5 text-slate-800 rotate-90" /></div>
                   <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center hover:bg-white cursor-pointer transition-colors"><ChevronRight className="w-5 h-5 text-slate-800" /></div>
                   <div className="w-px h-6 bg-white/40 mx-2" />
                   <div className="font-bold text-white text-xs px-2 tracking-wider flex items-center gap-1"><MonitorPlay className="w-4 h-4"/> 360° VIEW</div>
                </div>

                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 rounded-md p-2 shadow-lg border border-slate-200">
                    <div className="w-20 h-12 bg-slate-200 rounded overflow-hidden">
                       <Image src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=200&auto=format&fit=crop" alt="mini map" width={80} height={48} className="object-cover w-full h-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap border border-slate-200 rounded-xl overflow-hidden mb-8 shadow-sm">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-2 text-sm font-bold transition-all text-center border-r border-slate-200 last:border-r-0 ${
                      activeTab === tab 
                        ? 'bg-[#002b5c] text-white' 
                        : 'bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Grid of Thumbnails */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {locations.map((loc, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveView(loc.name)}
                    className="group cursor-pointer flex flex-col gap-3"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:shadow-md group-hover:border-[#007a87]/50 transition-all">
                      <Image
                        src={loc.img}
                        alt={loc.name}
                        width={300}
                        height={200}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                      
                      {/* 360 Icon Overlay */}
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 flex items-center gap-1 shadow-sm">
                         <MonitorPlay className="w-3 h-3 text-[#007a87]" />
                         <span className="text-[10px] font-black text-[#007a87]">360°</span>
                      </div>
                    </div>
                    <div className="text-center font-bold text-sm text-slate-700 group-hover:text-[#007a87] transition-colors">
                      {loc.name}
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
