"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Camera, Video, MonitorPlay, Send, ChevronDown } from "lucide-react";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const locations = [
    { name: "Ambulance", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Admission Desk", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Auditorium", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Cafeteria", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Emergency Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "FF Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "ICU Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Imaging Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "LB Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Lift", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Ambulance", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Admission Desk", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Auditorium", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Cafeteria", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Emergency Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "FF Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "ICU Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Imaging Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "LB Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Lift", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Main Entrance", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop" },
    { name: "Main Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Reception Desk", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Laboratory", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "OT", category: "Facilities", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "OT Lobby", category: "Facilities", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Accident and Emergency", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Blood Bank", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Cathlab", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Chemo", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Dialysis", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Emergency Entrance", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Emergency Entry Gate", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Health Check-Up", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Hospital Outdoor", category: "Outpatient Services", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "CSSD", category: "Technology", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "CT Simulation", category: "Technology", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Imaging CT", category: "Technology", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "LINAC-Radiation Oncology", category: "Technology", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "MRI", category: "Technology", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Economy", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "General Ward 6 Beds", category: "Rooms", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "ICU", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "ICU Isolation", category: "Rooms", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "OPD Consulting Room", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Single Bed", category: "Rooms", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Single Bed Isolation", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Suite", category: "Rooms", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Suite 2", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
    { name: "Triple Sharing", category: "Rooms", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop" },
    { name: "Twin Sharing", category: "Rooms", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" }
  ];

  // Currently we show all regardless of category to match the layout in the image
  // but if needed we can filter by activeTab

  const activeLocation = locations.find(loc => loc.name === activeView) || locations[0];
  const [pan, setPan] = useState({ x: 50, y: 50 });

  const handlePan = (dx: number, dy: number) => {
    setPan(prev => ({
      x: Math.max(0, Math.min(100, prev.x + dx)),
      y: Math.max(0, Math.min(100, prev.y + dy))
    }));
  };

  // Reset pan when location changes
  useEffect(() => {
    setPan({ x: 50, y: 50 });
  }, [activeView]);

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

              {/* Main 360 Viewer */}
              <div 
                className="w-full relative rounded-2xl overflow-hidden bg-slate-800 shadow-xl border-4 border-white mb-8 aspect-video group cursor-grab active:cursor-grabbing"
                onMouseMove={(e) => {
                  // Optional: slight parallax on mouse move if desired, but we'll stick to button controls for explicit "360 degree" feel
                  if (e.buttons === 1) { // Drag to pan
                    handlePan(-e.movementX * 0.1, -e.movementY * 0.1);
                  }
                }}
              >
                <div 
                  className="absolute inset-0 bg-no-repeat transition-all duration-300 ease-out" 
                  style={{ 
                    backgroundImage: `url('${activeLocation.img}')`,
                    backgroundPosition: `${pan.x}% ${pan.y}%`,
                    backgroundSize: '150% auto' // Zoomed in to allow panning
                  }} 
                />
                
                {/* 360 Tour Overlay UI Controls */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="relative">
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                      className="flex items-center justify-between w-[220px] bg-white/95 backdrop-blur text-sm font-bold text-[#002b5c] rounded-md px-4 py-2.5 border border-slate-200 shadow-sm hover:border-[#007a87]/50 focus:outline-none focus:ring-2 focus:ring-[#007a87]/30 transition-all"
                    >
                      <span className="truncate">{activeView}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full right-0 mt-2 w-[220px] bg-white rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-100 overflow-hidden z-50 flex flex-col max-h-[300px]">
                        <div className="overflow-y-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                          {locations.map((loc, i) => (
                            <div
                              key={`${loc.name}-${i}`}
                              onClick={() => {
                                setActiveView(loc.name);
                                setIsDropdownOpen(false);
                              }}
                              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                                activeView === loc.name
                                  ? 'bg-[#002b5c] text-white font-bold'
                                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#002b5c]'
                              }`}
                            >
                              {loc.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative UI elements representing 360 view controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30 shadow-lg transition-opacity duration-300 opacity-70 group-hover:opacity-100">
                   <div onClick={() => handlePan(-10, 0)} className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center hover:bg-white cursor-pointer transition-colors"><ChevronRight className="w-5 h-5 text-slate-800 rotate-180" /></div>
                   <div onClick={() => handlePan(0, -10)} className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center hover:bg-white cursor-pointer transition-colors"><ChevronRight className="w-5 h-5 text-slate-800 -rotate-90" /></div>
                   <div onClick={() => handlePan(0, 10)} className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center hover:bg-white cursor-pointer transition-colors"><ChevronRight className="w-5 h-5 text-slate-800 rotate-90" /></div>
                   <div onClick={() => handlePan(10, 0)} className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center hover:bg-white cursor-pointer transition-colors"><ChevronRight className="w-5 h-5 text-slate-800" /></div>
                   <div className="w-px h-6 bg-white/40 mx-2" />
                   <div className="font-bold text-white text-xs px-2 tracking-wider flex items-center gap-1"><MonitorPlay className="w-4 h-4"/> 360° VIEW</div>
                </div>

                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 rounded-md p-2 shadow-lg border border-slate-200">
                    <div className="w-20 h-12 bg-slate-200 rounded overflow-hidden relative">
                       <Image src={activeLocation.img} alt="mini map" width={80} height={48} className="object-cover w-full h-full" />
                       <div className="absolute inset-0 border-2 border-[#007a87]/50 rounded pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center justify-center px-4 py-4 text-sm md:text-base font-bold tracking-wide transition-colors duration-300 rounded-xl shadow-sm outline-none focus:outline-none border-none text-white ${
                      activeTab === tab 
                        ? 'bg-[#002b5c] hover:bg-[#9f0712]' 
                        : 'bg-[#002b5c] hover:bg-[#9f0712]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Grid of Thumbnails */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {locations.filter(loc => loc.category === activeTab).map((loc, idx) => (
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
                    <div className="text-center font-bold text-sm text-slate-700 group-hover:text-[#c81b51] transition-colors">
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
