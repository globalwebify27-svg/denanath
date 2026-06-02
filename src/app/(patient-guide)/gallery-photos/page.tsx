"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Image as ImageIcon, Maximize2 } from "lucide-react";

export default function PhotosPage() {
  const patientGuideOptions = [
    { name: "Out Patient Guide", href: "/out-patient", active: false },
    { name: "In Patient Guide", href: "/in-patient", active: false },
    { name: "Health Packages", href: "/health-packages", active: false },
    { name: "Facilities", href: "/facilities", active: false },
    { name: "Patients Stories / Feedbacks", href: "/feedbacks", active: false },
    { name: "Patient Rights & Responsibilities", href: "/patient-rights", active: false },
    { name: "Photos", href: "/gallery-photos", active: true },
    { name: "Videos", href: "/gallery-videos", active: false },
  ];

  const categories = [
    "ALL", "DMH", "DMH MAIN BUILDING", "SUPER SPECIALITY BUILDING", "WORLD THYROID DAY 2024", "WORLD DIABETES DAY 2025"
  ];

  const allPhotos = [
    { title: "Deenanath Mangeshkar", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/dmangeshkar1.jpg" },
    { title: "Dr. APJ Abdul Kalam Visit", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/abdul-kalam.jpg" },
    { title: "Sachin Tendulkar Visit", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/tendulkar.jpg" },
    { title: "Obesity Clinic Inauguration", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/obesity-clinic-inauguration.jpg" },
    { title: "8th March Women's Day", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/8th%20march.JPG" },
    { title: "Advance Wound Care", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/adv%20wound%20care3.JPG" },
    { title: "Event Photo 1", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/DSC_0064.JPG" },
    { title: "Event Photo 2", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/feb.jpg" },
    { title: "Event Photo 3", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/oct.jpg" },
    { title: "Event Photo 4", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/4th%20april.jpg" },
    { title: "Event Photo 5", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/26th%20april.jpg" },
    { title: "Dr. Arundhati Khare", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/Dr.Arundhati-Khare.jpg" },
    { title: "WTD 2024 Event Photo 1", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%20(4).jpg" },
    { title: "WTD 2024 Event Photo 2", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%20(5).jpg" },
    { title: "WTD 2024 Event Photo 3", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%20(6).jpg" },
    { title: "WTD 2024 Event Photo 4", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/1_WTD%20(8).jpg" },
    { title: "WTD 2024 Event Photo 5", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%2024%20(2).jpg" },
    { title: "WTD 2024 Event Photo 6", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%2024%20(3).jpg" },
    { title: "WTD 2024 Event Photo 7", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%2024.jpg" },
    
    { title: "WDD 2025 Event Photo 1", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0007%20(1).jpg" },
    { title: "WDD 2025 Event Photo 2", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0017.jpg" },
    { title: "WDD 2025 Event Photo 3", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0045.jpg" },
    { title: "WDD 2025 Event Photo 4", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0069%20(1).jpg" },
    { title: "WDD 2025 Event Photo 5", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0091.jpg" },
    
    { title: "GS_ Private B (Deluxe Room)", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Private%20B%20(Deluxe%20Room).JPG" },
    { title: "GS_Non AC Day Care", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Non%20AC%20Day%20Care.jpg" },
    { title: "GS_Private C (Non AC)", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Private%20C%20(Non%20AC).JPG" },
    { title: "GS_Private D (Small AC Room)", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Private%20D%20(Small%20AC%20Room).JPG" },
    { title: "GS_Semi Private Room", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Semi%20Private%20Room.JPG" },
    { title: "GS_SUPER_DELUX_A", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_SUPER_DELUX_A.JPG" },
    { title: "GS_SUPER_DELUX_B", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS.SUPER_DELUX_B.JPG" },
    
    { title: "SS_Day Care", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS%20Day%20Care.jpg" },
    { title: "SS_Private A", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS%20Private%20A.JPG" },
    { title: "SS_Private B", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS_Private%20B.JPG" },
    { title: "SS_Semi Private A (Only For Gynaec)", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS_Semi%20Private%20A%20(Only%20For%20Gynaec).JPG" }
  ];

  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredPhotos = activeCategory === "ALL" 
    ? allPhotos 
    : allPhotos.filter(p => p.category === activeCategory);

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
            <span className="text-white">Photos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Photo Gallery
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
                  <ImageIcon className="w-4 h-4" />
                  <span>Media</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Hospital Photos
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

              {/* Photos Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhotos.map((photo, idx) => (
                  <div key={idx} className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col h-full">
                    {/* Photo Thumbnail */}
                    <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-200 transition-colors">
                      {photo.url ? (
                        <img 
                          src={photo.url} 
                          alt={photo.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-slate-300 group-hover:text-teal-400 group-hover:scale-110 transition-all duration-300" />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-end p-4">
                        <Maximize2 className="w-5 h-5 text-white drop-shadow-md" />
                      </div>
                      
                      {/* Badge overlay */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="bg-white/90 backdrop-blur-sm text-[#007a87] text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                          {photo.category.replace(" BUILDING", "").substring(0, 15)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Photo Details */}
                    <div className="p-4 border-t border-slate-100 bg-white relative z-10 flex-1 flex items-center">
                      <h3 className="font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors text-sm leading-snug">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                ))}
                
                {filteredPhotos.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-500">
                    No photos found for this category.
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
