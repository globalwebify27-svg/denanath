"use client";

import Link from "next/link";

import {
  CalendarCheck,
  Building2,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const defaultPatientJourneyData = {
  tagline: "Patient Journey",
  title: 'Your Healthcare <br/> Journey Made <br/> Simple & <span class="text-red-800">Supportive</span>',
  description: "We ensure a smooth, transparent, and compassionate experience at every phase of your recovery.",
  steps: [
    {
      title: "Book Appointment",
      description: "Schedule your consultation online or through our support team.",
      iconString: "CalendarCheck",
      color: "#2563eb",
    },
    {
      title: "Visit Hospital",
      description: "Experience seamless check-in and personalized patient assistance.",
      iconString: "Building2",
      color: "#0891b2",
    },
    {
      title: "Consultation",
      description: "Meet our experienced specialists for expert diagnosis and guidance.",
      iconString: "Stethoscope",
      color: "#9333ea",
    },
    {
      title: "Treatment",
      description: "Receive advanced treatment with world-class medical technology.",
      iconString: "HeartPulse",
      color: "#dc2626",
    },
    {
      title: "Recovery Support",
      description: "Continuous follow-up care and recovery assistance for better healing.",
      iconString: "ShieldCheck",
      color: "#059669",
    }
  ]
};

export default function PatientJourney({ data = defaultPatientJourneyData }: { data?: any }) {
  if (!data || Object.keys(data).length === 0) data = defaultPatientJourneyData;
  const steps = data.steps || defaultPatientJourneyData.steps;

  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Do boxes ko support karne ke liye array ko multiply kiya taaki smooth infinite loop bane
  const extendedSteps = [...steps, ...steps, ...steps];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let scrollSpeed = 1; // Speed adjust karne ke liye isko kam-bada kar sakte hain

    const scrollLoop = () => {
      if (!isPaused && container) {
        container.scrollTop += scrollSpeed;

        // Jab array ke aakhir me pahuche, bina jhatke ke wapas top par jump kare (Infinite loop effect)
        const halfHeight = container.scrollHeight / 3;
        if (container.scrollTop >= halfHeight * 2) {
          container.scrollTop = halfHeight;
        }
      }
      animationFrameId = requestAnimationFrame(scrollLoop);
    };

    animationFrameId = requestAnimationFrame(scrollLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  // Manual Trigger Up Arrow
  const handleScrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: -160, behavior: "smooth" });
    }
  };

  // Manual Trigger Down Arrow
  const handleScrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: 160, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-[20px] md:py-10">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-blue-100 blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-cyan-100 blur-3xl opacity-40 pointer-events-none"></div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Left Side: Content and Titles */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#007a87]">
              {data.tagline}
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight" dangerouslySetInnerHTML={{__html: (data.title || "").replace(/\\n/g, '<br/>')}}>
            </h2>
            <p className="mt-4 text-[18px] font-normal leading-[31px] text-slate-600">
              {data.description}
            </p>


          </div>

          {/* Right Side: The 2-Box Fixed Window Slider */}
          <div className="lg:col-span-7 relative flex justify-center">
            
            {/* Soft Top/Bottom Fade Effect Layer */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>

            {/* The Scroll Container Window (Height locked to exactly fit 2 boxes) */}
            <div
              ref={containerRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="w-full max-w-md h-[340px] overflow-y-hidden space-y-4 px-2 py-4 hide-scrollbar"
              style={{ scrollBehavior: "auto" }}
            >
              {extendedSteps.map((step, index) => {
                const Icons = require('lucide-react');
                const Icon = Icons[step.iconString] || Icons.CalendarCheck;
                // Original Index detection for 01, 02 numbering loop
                const originalIndex = (index % steps.length) + 1;

                return (
                  <div
                    key={index}
                    className="relative w-full border border-slate-100 bg-white p-5 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-200 flex gap-4 items-start"
                  >
                    {/* Badge Count */}
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#002b5c] text-xs font-semibold text-white shadow-sm">
                      0{originalIndex}
                    </div>

                    {/* Left Icon Panel */}
                    <div 
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${step.color?.startsWith('bg-') ? step.color : ''}`}
                      style={step.color?.startsWith('#') ? { backgroundColor: `${step.color}15`, color: step.color } : {}}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content text layout */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-normal line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}