"use client";

import React, { useEffect, useRef, useState } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { ChevronRight, ShieldAlert, X } from "lucide-react";

export default function PatientRightsClientPage({ pageData }: { pageData: any }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const { imageUrl = "/images/patient-rights-high-res.png" } = pageData || {};

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Patient & Visitors</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Patient Rights & Responsibilities</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
            Patient Rights & Responsibilities
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-5">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Dynamic Sidebar */}
          <DynamicSidebar categoryName="Patient & Visitors" activeHref="/patient-rights" />

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-4 sm:p-6 md:p-8">
              
              <div className="mb-10">
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Patient Guide</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Patient Rights & Responsibilities
                </h2>
                
              </div>
              <div className="space-y-6 mt-8">
                <div 
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm relative group cursor-pointer"
                  onClick={() => setIsZoomed(true)}
                >
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <span className="bg-white/95 text-[#002b5c] px-5 py-2.5 rounded-full font-bold shadow-lg text-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                      Click to Zoom
                    </span>
                  </div>
                  <img 
                    src={imageUrl} 
                    alt="Patient Rights & Responsibilities" 
                    className="w-full h-auto object-contain mix-blend-multiply transform-gpu will-change-transform [backface-visibility:hidden] transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-7xl w-full h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
            <button 
              className="absolute -top-12 sm:-top-4 sm:-right-12 right-0 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-10"
              onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white rounded-xl shadow-2xl w-full h-full overflow-y-auto flex flex-col items-center">
              <img 
                src={imageUrl} 
                alt="Patient Rights & Responsibilities Zoomed" 
                className="w-full h-auto sm:min-w-[800px] cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
