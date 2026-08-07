"use client";

import React, { useEffect, useRef } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { ChevronRight, MessageSquareQuote, Quote, Calendar, User } from "lucide-react";

export default function FeedbacksClientPage({ pageData }: { pageData: any }) {
  const { stories = [] } = pageData || {};

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
            <span className="text-white">Patients Stories / Feedbacks</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
            Patients Stories / Feedbacks
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 md:pt-5 md:pb-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Dynamic Sidebar */}
          <DynamicSidebar categoryName="Patient & Visitors" activeHref="/feedbacks" />

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-2 pb-6 sm:px-10 sm:pt-3 sm:pb-10 md:px-14 md:pt-4 md:pb-14">
              
              <div className="mb-10">
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>Patient Experiences</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Patients Stories / Feedbacks
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="space-y-8">
                {stories.map((story: any, idx: number) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                    <Quote className="absolute -top-4 -left-4 w-24 h-24 text-teal-500/5 rotate-180 transform group-hover:text-teal-500/10 transition-colors" />
                    
                    <div className="relative z-10">
                      <h3 className="text-xl md:text-2xl font-bold text-[#002b5c] mb-4 leading-snug">
                        "{story.title}"
                      </h3>
                      
                      <p className="text-slate-600 leading-relaxed mb-6 italic text-lg">
                        {story.content}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-teal-100 text-[#007a87] flex items-center justify-center shrink-0">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{story.author}</p>
                            <p className="text-sm text-slate-500">Patient / Relative</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                          <Calendar className="w-4 h-4 text-teal-600" />
                          <span>{story.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {stories.length === 0 && (
                  <div className="text-center py-10 text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
                    No stories found.
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
