"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Video, PlayCircle } from "lucide-react";

export default function VideosPage() {
  const patientGuideOptions = [
    { name: "Out Patient Guide", href: "/out-patient", active: false },
    { name: "In Patient Guide", href: "/in-patient", active: false },
    { name: "Health Packages", href: "/health-packages", active: false },
    { name: "Facilities", href: "/facilities", active: false },
    { name: "Patients Stories / Feedbacks", href: "/feedbacks", active: false },
    { name: "Patient Rights & Responsibilities", href: "/patient-rights", active: false },
    { name: "Photos", href: "/gallery-photos", active: false },
    { name: "Videos", href: "/gallery-videos", active: true },
  ];

  const categories = [
    "ALL", "PATIENT STORIES", "ICU-VISIT", "COVID-19", "WELLNESS AND LIFESTYLE", "MAAI MOTHER'S MILK BANK"
  ];

  const allVideos = [
    { title: "COVID 19 VACCINE : Why When & How by Dr. Dhananjay Kelkar", category: "COVID-19" },
    { title: "Covid-19 Home Isolation Instructions by DMH - Marathi", category: "COVID-19" },
    { title: "Covid-19 Home Isolation Instructions by DMH- English", category: "COVID-19" },
    { title: "Covid-19 Home Isolation Instructions by DMH- Hindi", category: "COVID-19" },
    { title: "DMH covid-19 update (for doctors) Part 1: Overview, Prevention & Diagnosis", category: "COVID-19" },
    { title: "DMH covid-19 update (for doctors) Part 2: Treatment", category: "COVID-19" },
    { title: "DMH covid-19 update Part 3: Paediatric", category: "COVID-19" },
    { title: "DMH Jalneti -1", category: "WELLNESS AND LIFESTYLE" },
    { title: "DMH Jalneti-2 Q & A", category: "WELLNESS AND LIFESTYLE" },
    { title: "Everything to know about covid-19 Part 1 of 3 : Prevention and Overview by Dr. Dhananjay Kelkar, DMH", category: "COVID-19" },
    { title: "Everything to know about covid-19 part 2 of 3 : Diagnosis and Treatment by Dr. Dhananjay Kelkar, DMH", category: "COVID-19" },
    { title: "Everything to know about covid-19 part 3 of 3 : Living with covid by Dr. Dhananjay Kelkar, DMH", category: "COVID-19" },
    { title: "Guidance Lecture on Corona Virus | Dr. Dhananjay Kelkar", category: "COVID-19" },
    { title: "ICU-Visit", category: "ICU-VISIT" },
    { title: "In the shadow of virtual truth… Corona in our minds | Dr Dhananjay Kelkar", category: "COVID-19" },
    { title: "Maai Mother's Milk Bank", category: "MAAI MOTHER'S MILK BANK" },
    { title: "MIND over MATTER by Dr.Dhananjay Kelkar", category: "WELLNESS AND LIFESTYLE" },
    { title: "Patient Stories - Testimonial 1", category: "PATIENT STORIES" },
    { title: "Patient Stories - Testimonial 2", category: "PATIENT STORIES" },
    { title: "Patient Stories - Testimonial 3", category: "PATIENT STORIES" },
    { title: "Rehabilitation guidelines for patients recovering from Covid-19 (in English)", category: "COVID-19" },
    { title: "Rehabilitation guidelines for patients recovering from Covid-19 (in marathi)", category: "COVID-19" },
    { title: "Sukshma Yoga And Pranayama", category: "WELLNESS AND LIFESTYLE" },
    { title: "Work Life Balance by Dr. Dhananjay Kelkar", category: "WELLNESS AND LIFESTYLE" },
    { title: "माझे गुरु (कै. अप्पासाहेब पेंडसे , डॉ. मेहरू मेहता , मा. लता दीदी ) by Dr. Dhananjay Kelkar MS FRCS", category: "WELLNESS AND LIFESTYLE" }
  ];

  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredVideos = activeCategory === "ALL" 
    ? allVideos 
    : allVideos.filter(v => v.category === activeCategory);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoriesScrollRef = useRef<HTMLDivElement>(null);

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
            <span className="text-white">Videos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Video Gallery
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
                  <Video className="w-4 h-4" />
                  <span>Media</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Hospital Videos
                </h2>
                
                {/* Categories Scrollable Row */}
                <div 
                  ref={categoriesScrollRef}
                  className="flex gap-2 overflow-x-auto pb-4 pt-2 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCategory(cat)}
                      className={"whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 " + (
                        activeCategory === cat 
                          ? "bg-[#002b5c] text-white shadow-md transform scale-105" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Videos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {filteredVideos.map((video, idx) => (
                  <div key={idx} className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col h-full">
                    {/* Video Thumbnail Placeholder */}
                    <div className="aspect-video bg-slate-800 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                      {/* Simulated thumbnail background */}
                      <div className="absolute inset-0 bg-slate-800 group-hover:scale-105 transition-transform duration-700"></div>
                      
                      <div className="relative z-20 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#007a87] group-hover:scale-110 transition-all duration-300">
                        <PlayCircle className="w-8 h-8 text-white ml-1" />
                      </div>
                      
                      {/* Badge overlay */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-teal-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          {video.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Video Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <h3 className="font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors leading-snug line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="mt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span>Watch Video</span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#007a87] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredVideos.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-500">
                    No videos found for this category.
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
