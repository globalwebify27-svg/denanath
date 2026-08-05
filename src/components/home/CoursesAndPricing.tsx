"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Activity, FileText, Award, Users } from "lucide-react";

export const defaultCoursesPricingData = {
  pricingCards: [
    {
      title: 'Knee Replacement <br class="hidden sm:block" />Implants',
      subtitle: "Pricing Details",
      url: "/implant-pricing",
      iconString: "Activity",
      theme: "#14b8a6"
    },
    {
      title: 'Cathlab Pharmacy <br class="hidden sm:block" />Implants',
      subtitle: "Pricing Details",
      url: "/cathlab-pricing",
      iconString: "FileText",
      theme: "#3b82f6"
    },
    {
      title: 'In Patient <br class="hidden sm:block" />Guide',
      subtitle: "View our",
      url: "/in-patient",
      iconString: "Users",
      theme: "#a855f7"
    },
    {
      title: 'Out Patient <br class="hidden sm:block" />Guide',
      subtitle: "View our",
      url: "/out-patient",
      iconString: "Award",
      theme: "#f59e0b"
    }
  ],
  educationHeader: {
    tagline: "Education & Resources",
    title: 'Courses & <span class="font-semibold">Conferences</span>',
    leftTitle: "Upcoming Courses",
    rightTitle: "Programs & Forms"
  }
};

export default function CoursesAndPricing({ 
  data = defaultCoursesPricingData,
  initialLeftCourses = [],
  initialRightCourses = []
}: { 
  data?: any,
  initialLeftCourses?: any[],
  initialRightCourses?: any[]
}) {
  if (!data || Object.keys(data).length === 0) data = defaultCoursesPricingData;
  const pricingCards = data.pricingCards || defaultCoursesPricingData.pricingCards;
  const educationHeader = data.educationHeader || defaultCoursesPricingData.educationHeader;
  
  const leftCourses = initialLeftCourses;
  const rightCourses = initialRightCourses;

  return (
    <section className="relative w-full py-[20px] md:py-10 bg-white border-t border-slate-100 overflow-hidden z-20">
      {/* Background Blur Effects */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-50 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl opacity-50 pointer-events-none z-0"></div>

      {/* Soft Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f0f9ff] to-[#ecfeff] pointer-events-none z-0"></div>

      {/* Subtle Texture Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#007a8706_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 max-w-5xl mx-auto">
          {pricingCards.map((card: any, idx: number) => {
            const Icons = require('lucide-react');
            const Icon = Icons[card.iconString] || Icons.Activity;
            
            const themeValue = card.theme || "#14b8a6";
            const isHex = themeValue.startsWith('#');
            
            const themeColors: any = {
              teal: { hover: "hover:shadow-teal-900/20", icon: "text-teal-400", badge: "bg-teal-500/20 group-hover:bg-teal-500/30 text-teal-300", accent: "bg-teal-500/10" },
              blue: { hover: "hover:shadow-blue-900/20", icon: "text-blue-400", badge: "bg-blue-500/20 group-hover:bg-blue-500/30 text-blue-300", accent: "bg-blue-500/10" },
              purple: { hover: "hover:shadow-purple-900/20", icon: "text-purple-400", badge: "bg-purple-500/20 group-hover:bg-purple-500/30 text-purple-300", accent: "bg-purple-500/10" },
              amber: { hover: "hover:shadow-amber-900/20", icon: "text-amber-400", badge: "bg-amber-500/20 group-hover:bg-amber-500/30 text-amber-300", accent: "bg-amber-500/10" }
            };
            const theme = isHex ? {} : (themeColors[themeValue] || themeColors.teal);
            
            return (
              <Link 
                key={idx}
                href={card.url} 
                className={`group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-slate-700/50 ${isHex ? '' : theme.hover}`}
              >
                <div 
                  className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110 ${isHex ? '' : theme.accent}`}
                  style={isHex ? { backgroundColor: `${themeValue}1A` } : {}}
                ></div>
                <div className="flex items-center gap-4 sm:gap-5 relative z-10 w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                    <Icon className={`w-5 h-5 ${isHex ? '' : theme.icon}`} style={isHex ? { color: themeValue } : {}} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-1">{card.subtitle}</p>
                    <h3 className="text-white text-base font-semibold tracking-wide leading-snug" dangerouslySetInnerHTML={{__html: card.title}}></h3>
                  </div>
                </div>
                <div 
                  className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-semibold leading-[22px] uppercase tracking-wider transition-colors shrink-0 w-full sm:w-auto justify-center sm:justify-start ${isHex ? 'group-hover:opacity-90' : theme.badge}`}
                  style={isHex ? { backgroundColor: `${themeValue}33`, color: themeValue } : {}}
                >
                  <span>Click Here</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1.5 rounded-full bg-teal-50 text-[#007a87] text-[10px] font-bold tracking-widest uppercase border border-teal-100 shadow-sm inline-block mb-4">
            {educationHeader.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-[#002b5c] tracking-tight" dangerouslySetInnerHTML={{__html: educationHeader.title}}>
          </h2>
          <div className="flex justify-center items-center mt-5">
            <div className="w-12 h-1 bg-slate-200 rounded-l-full"></div>
            <div className="w-12 h-1 bg-[#007a87] rounded-r-full"></div>
          </div>
        </div>

        {/* Premium Lists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Left Column Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <h3 className="text-lg font-bold text-slate-800 mb-0 flex items-center gap-3 border-b border-slate-100 pb-2">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              </div>
              {educationHeader.leftTitle}
            </h3>
            <ul className="space-y-0">
              {leftCourses.map((course, idx) => {
                const hasDetails = (course.content && course.content.trim() !== "") || (course.gallery && course.gallery.length > 0);
                const customLink = course.link && course.link.trim() !== "" ? course.link : null;
                const href = hasDetails ? `/courses/${course.id}` : (customLink || `/courses/${course.id}`);
                return (
                  <li key={course.id || idx} className="group">
                    <Link href={href} className="flex items-start gap-3.5 py-1.5 px-3 rounded-xl border border-transparent transition-all duration-300 hover:bg-white hover:shadow-md hover:border-slate-100 hover:-translate-y-0.5">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-[#D30039]/30 group-hover:bg-[#D30039]/5 transition-colors">
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#D30039] transition-colors" />
                      </div>
                      <span className="text-[16px] text-slate-600 group-hover:text-[#D30039] font-medium leading-relaxed transition-colors">
                        {course.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
            <h3 className="text-lg font-bold text-slate-800 mb-0 flex items-center gap-3 border-b border-slate-100 pb-2">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-[#007a87]"></div>
              </div>
              {educationHeader.rightTitle}
            </h3>
            <ul className="space-y-0">
              {rightCourses.map((course, idx) => {
                const hasDetails = (course.content && course.content.trim() !== "") || (course.gallery && course.gallery.length > 0);
                const customLink = course.link && course.link.trim() !== "" ? course.link : null;
                const href = hasDetails ? `/courses/${course.id}` : (customLink || `/courses/${course.id}`);
                
                const isExternal = href.startsWith("http") || href.includes(".pdf");
                const target = isExternal ? "_blank" : undefined;
                const rel = isExternal ? "noopener noreferrer" : undefined;
                
                return (
                  <li key={course.id || idx} className="group">
                    <Link href={href} target={target} rel={rel} className="flex items-start gap-3.5 py-1.5 px-3 rounded-xl border border-transparent transition-all duration-300 hover:bg-white hover:shadow-md hover:border-slate-100 hover:-translate-y-0.5">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:border-[#007a87]/30 group-hover:bg-[#007a87]/5 transition-colors">
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#007a87] transition-colors" />
                      </div>
                      <span className="text-[16px] text-slate-600 group-hover:text-[#007a87] font-medium leading-relaxed transition-colors">
                        {course.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
