"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, Quote, CheckCircle2, Heart, ArrowLeft, ArrowRight } from "lucide-react";

export default function PatientReviews() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const listContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  // Expanded patient list (Total 6)
  const reviews = [
    {
      name: "Mukund Deshpande",
      type: "Cardiac Care Patient",
      treatment: "Double Bypass Surgery",
      text: "The ethical care here is unmatched. Dr. Keskar and the cardiac team did not just perform a highly successful surgery; they supported my family at every step. Truly Pune's finest medical landmark.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      rating: 5,
      date: "October 2025"
    },
    {
      name: "Priya Sharma",
      type: "Maternity & Pediatrics",
      treatment: "Neonatal & ICU Care",
      text: "The neonatal ICU nurses are absolute angels. They looked after my newborn daughter with unbelievable tenderness and medical precision. The transparency in billing and communication was highly reassuring.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      rating: 5,
      date: "January 2026"
    },
    {
      name: "Dr. Arvind Joshi",
      type: "Orthopaedics Patient",
      treatment: "Total Knee Replacement",
      text: "Being a medical professional myself, I was critical of protocols. DMH's post-operative recovery suite, high-speed rehab plans, and zero-infection theater standards are on par with international benchmarks.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      rating: 5,
      date: "March 2026"
    },
    {
      name: "Ananya Patil",
      type: "Neurology Patient",
      treatment: "Brain Tumor Excision",
      text: "The neurology team was exceptional. From the initial MRI to the complex surgery, everything was explained with immense patience. I owe my new life to Dr. Sharma and his incredible surgical team.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
      rating: 5,
      date: "December 2025"
    },
    {
      name: "Rajesh Shinde",
      type: "Nephrology Patient",
      treatment: "Kidney Transplant",
      text: "Finding a matching donor was a journey, but the hospital's transplant coordinator made the legal and medical paperwork seamless. The post-op isolation rooms are simply world-class.",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
      rating: 5,
      date: "February 2026"
    },
    {
      name: "Sunita Rao",
      type: "Oncology Care",
      treatment: "Chemotherapy Cycle",
      text: "Cancer treatment is physically and emotionally draining. The nursing staff at the day-care chemo ward are incredibly compassionate. They always ensured I was comfortable and pain-free.",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
      rating: 5,
      date: "April 2026"
    }
  ];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  // 1. Auto-Play Logic (Changes active index every 3.5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, reviews.length]);

  // 2. Vertical Auto-Scroll Logic (Keeps the active button in the center of the list)
  useEffect(() => {
    if (listContainerRef.current && activeButtonRef.current) {
      const container = listContainerRef.current;
      const activeItem = activeButtonRef.current;
      
      container.scrollTo({
        top: activeItem.offsetTop - container.clientHeight / 2 + activeItem.clientHeight / 2,
        behavior: "smooth"
      });
    }
  }, [activeIndex]);

  return (
    <section className="w-full relative z-30 py-12 sm:py-16 bg-gradient-to-br from-[#f5fbfb] via-teal-50/[0.1] to-[#f4fafb] overflow-hidden">
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-500/[0.02] rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/[0.02] rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl text-left">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-[#007a87] text-[10px] font-bold tracking-widest uppercase border border-teal-100/50 shadow-sm">
              <Heart className="w-3 h-3 fill-current text-red-500" />
              <span>Patient Gratitude</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-[#002b5c] tracking-tight mt-5">
              Real Stories of <span className="font-semibold">Healing & Hope</span>
            </h2>
            <p className="text-slate-600 text-sm font-light leading-relaxed mt-4">
              Read true experiences shared by our patients, detailing their journeys to wellness supported by our doctors and clinical staff.
            </p>
          </div>
          
          {/* Custom Carousel Arrows */}
          {/* <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-slate-200 hover:border-[#007a87] text-slate-600 hover:text-[#007a87] bg-white flex items-center justify-center transition-all hover:shadow-md cursor-pointer"
              aria-label="Previous story"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-slate-200 hover:border-[#007a87] text-slate-600 hover:text-[#007a87] bg-white flex items-center justify-center transition-all hover:shadow-md cursor-pointer"
              aria-label="Next story"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div> */}
        </div>

        {/* Carousel Showcase */}
        <div 
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Big Focused Review Card */}
            <div className="lg:col-span-8 h-full">
              <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,122,135,0.06)] hover:border-teal-500/10 min-h-[380px] h-full flex flex-col justify-between">
                
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
                
                <div className="absolute right-8 top-8 text-teal-500/5">
                  <Quote className="w-24 h-24 stroke-current" />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-1">
                    {[...Array(reviews[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[10px] font-bold text-amber-600 ml-2 tracking-widest uppercase">Verified Patient Care</span>
                  </div>

                  <blockquote className="text-base sm:text-lg lg:text-xl text-[#002b5c] font-light leading-relaxed tracking-tight italic min-h-[120px]">
                    &ldquo;{reviews[activeIndex].text}&rdquo;
                  </blockquote>
                </div>

                <div className="relative z-10 mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-teal-500/10 shrink-0">
                      <img 
                        src={reviews[activeIndex].avatar} 
                        alt={reviews[activeIndex].name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm tracking-tight flex items-center gap-1.5">
                        {reviews[activeIndex].name}
                        <CheckCircle2 className="w-4.5 h-4.5 text-teal-500 fill-teal-50" />
                      </h4>
                      <p className="text-[11px] text-[#007a87] font-semibold uppercase tracking-wider">{reviews[activeIndex].type}</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200/50">
                      {reviews[activeIndex].treatment}
                    </span>
                    <span className="block text-[9px] text-slate-400 font-medium tracking-wider mt-1">{reviews[activeIndex].date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Selection Column - Now vertically scrolling */}
            <div 
              ref={listContainerRef}
              className="lg:col-span-4 flex flex-col gap-3 max-h-[420px] overflow-y-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {reviews.map((review, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={idx}
                    ref={isActive ? activeButtonRef : null}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 shrink-0 ${
                      isActive 
                        ? "bg-white border-teal-500/30 shadow-[0_12px_30px_rgba(0,122,135,0.08)] ring-2 ring-[#007a87]/5" 
                        : "bg-white/40 border-slate-100 hover:bg-white hover:border-slate-200"
                    }`}
                  >
                    <div className={`relative w-12 h-12 rounded-full overflow-hidden border-2 shrink-0 transition-transform duration-300 ${isActive ? "border-teal-500 scale-105" : "border-slate-200"}`}>
                      <img 
                        src={review.avatar} 
                        alt={review.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-sm font-bold truncate ${isActive ? "text-[#007a87]" : "text-slate-800"}`}>
                        {review.name}
                      </h4>
                      <p className="text-[10.5px] text-slate-400 truncate font-light mt-0.5">{review.treatment}</p>
                    </div>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Clinical Trust Strip */}
        <div className="mt-20 pt-12 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-[#002b5c] tracking-tight">1.2M+</span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Consultations Done</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-[#007a87] tracking-tight">25+</span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Years of Legacy</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-[#db5209] tracking-tight">98.4%</span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Patient Satisfaction</span>
          </div>
          <div>
            <span className="block text-3xl sm:text-4xl font-extrabold text-[#002b5c] tracking-tight">4.8★</span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Google Review Score</span>
          </div>
        </div>

      </div>
    </section>
  );
}