"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  Mic, Baby, Activity, Footprints, Dumbbell, Mountain, Heart, Brain, ArrowRight, Stethoscope 
} from "lucide-react";

export default function SpecialtyClinics() {
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Isse hum current scroll position ko track karenge bina real DOM ko baar-baar force kiye
  const scrollPosRef = useRef(0);

  // Static Clinics (Jo hamesha upar fix rahenge)
  const staticClinics = [
    { id: "01", name: "Voice Clinic", icon: Mic, color: "text-teal-600 bg-teal-50" },
    { id: "02", name: "IVF (In Vitro Fertilisation)", icon: Baby, color: "text-blue-600 bg-blue-50" }
  ];

  // Animated Clinics (Jo mobile par slide karenge)
  const scrollingClinics = [
    { id: "03", name: "Obesity Clinic", icon: Activity, color: "text-amber-600 bg-amber-50" },
    { id: "04", name: "Small Step", icon: Footprints, color: "text-purple-600 bg-purple-50" },
    { id: "05", name: "Thyroid Centre", icon: Activity, color: "text-teal-600 bg-teal-50" },
    { id: "06", name: "BILD Exercise Clinic", icon: Dumbbell, color: "text-blue-600 bg-blue-50" },
    { id: "07", name: "Swallowing Clinic", icon: Activity, color: "text-amber-600 bg-amber-50" },
    { id: "08", name: "Posture Pain Clinic", icon: Activity, color: "text-purple-600 bg-purple-50" },
    { id: "09", name: "VBS Mani Hypoxic Training", icon: Mountain, color: "text-teal-600 bg-teal-50" },
    { id: "10", name: "Knee Speciality Exercise", icon: Activity, color: "text-blue-600 bg-blue-50" }
  ];

  // Pure list for Desktop grid rendering
  const allClinics = [...staticClinics, ...scrollingClinics];

  // Infinite loop creation for mobile slider
  const extendedScrollingClinics = [...allClinics, ...allClinics, ...allClinics];

  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    
    // pixels per millisecond (Isko change karke speed stable rakhi ja sakti hai)
    const speedPerMs = 0.05; 

    // Sync initial state
    scrollPosRef.current = container.scrollLeft;

    const scrollLoop = (currentTime: number) => {
      // Delta time nikalna (kitna time beeta pichle frame se)
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPaused && container && window.innerWidth < 768) {
        // Frame rate independent calculation
        scrollPosRef.current += speedPerMs * deltaTime;
        
        const oneThirdWidth = container.scrollWidth / 3;
        if (scrollPosRef.current >= oneThirdWidth * 2) {
          scrollPosRef.current = oneThirdWidth;
        }

        container.scrollLeft = scrollPosRef.current;
      }
      
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Touch handle taaki agar user khud ungli se scroll kare to position sync bigde nahi
  const handleTouchEnd = () => {
    setIsPaused(false);
    if (sliderRef.current) {
      scrollPosRef.current = sliderRef.current.scrollLeft;
    }
  };

  // Card component wrapper
  const ClinicCard = ({ clinic, isDesktopOnly = false }: { clinic: any, isDesktopOnly?: boolean }) => {
    const Icon = clinic.icon;
    return (
      <div
        className={`
          group relative
          /* Mobile layout sizes */
          ${isDesktopOnly ? "w-full" : "w-[calc(50%-8px)] flex-shrink-0 md:w-auto md:flex-shrink"}
          rounded-2xl border border-emerald-100/80 bg-white/80 backdrop-blur-xl p-5
          overflow-hidden shadow-[0_10px_30px_rgba(16,185,129,0.06)]
          hover:shadow-[0_20px_45px_rgba(16,185,129,0.18)] hover:border-emerald-300
          hover:-translate-y-1.5 transition-all duration-400
          flex flex-col justify-between min-h-[160px] cursor-pointer
        `}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_60%)] pointer-events-none"></div>
        
        <div className="relative z-10 flex justify-between items-start">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ring-1 ring-black/5 ${clinic.color}`}>
            <Icon className="w-4 h-4 sm:w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-emerald-300/80 tracking-widest">{clinic.id}</span>
        </div>

        <div className="relative z-10 mt-4">
          <h3 className="text-xs sm:text-[13px] font-bold text-slate-800 tracking-tight leading-snug group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
            {clinic.name}
          </h3>
          <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <span>Explore</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-500"></div>
      </div>
    );
  };

  return (
    <section className="relative mt-24 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#ecfdf5] via-[#f0fdf4] to-[#d1fae5] py-14 px-4 sm:px-8 shadow-sm">
      
      {/* Glow / Ambient Gradients */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-300/30 blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#065f46_1px,transparent_1px),linear-gradient(to_bottom,#065f46_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 border-b border-emerald-200/60 pb-8 text-center md:text-left">
          <div>
            <p className="text-[10px] font-bold text-[#007a87] uppercase tracking-[0.2em] mb-2">Specialized Medical Care</p>
            <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
              Our Specialty <span className="font-bold text-emerald-700">Care Clinics</span>
            </h2>
          </div>
          <p className="text-slate-600 text-base sm:text-lg font-light max-w-md leading-relaxed mx-auto md:mx-0">
            Highly focused clinical programs and centers of excellence addressing specialized therapeutic and medical disciplines.
          </p>
        </div>

        {/* 1. MOBILE-ONLY VIEW */}
        <div className="block md:hidden space-y-5">
          <div className="relative w-full">
            <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-[#f0fdf4] to-transparent z-20 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-6 bg-gradient-to-l from-[#f0fdf4] to-transparent z-20 pointer-events-none"></div>

            <div
              ref={sliderRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={handleTouchEnd}
              className="w-full flex gap-4 overflow-x-auto py-2 px-0.5 hide-scrollbar"
              style={{ scrollBehavior: "auto" }}
            >
              {extendedScrollingClinics.map((clinic, index) => (
                <ClinicCard key={`${clinic.id}-${index}`} clinic={clinic} />
              ))}
            </div>
          </div>
        </div>

        {/* 2. DESKTOP & TABLET VIEW */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 gap-6">
          {allClinics.map((clinic) => (
            <ClinicCard key={clinic.id} clinic={clinic} isDesktopOnly={true} />
          ))}
        </div>

        {/* Universal View All Button */}
        <div className="mt-10 flex justify-center border-t border-emerald-200/60 pt-8">
          <Link href="/doctor-details" className="
            group flex items-center gap-3 rounded-full bg-emerald-700 
            px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold text-white 
            shadow-[0_10px_30px_rgba(4,120,87,0.3)] hover:bg-emerald-800 
            hover:shadow-[0_15px_40px_rgba(4,120,87,0.4)] hover:-translate-y-1 transition-all duration-300
          ">
            <Stethoscope className="w-5 h-5 group-hover:animate-pulse" />
            View All Specialty Clinics
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}