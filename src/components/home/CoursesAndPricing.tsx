"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Activity, FileText, Award, Users } from "lucide-react";
import { getHomeCourses } from "@/app/actions/get-home-courses";

export default function CoursesAndPricing() {
  const [leftCourses, setLeftCourses] = useState<{title: string, link: string}[]>([
    { title: "Practice Course for Practical Exam - Emergency Medicine", link: "#" },
    { title: "Breastfeeding Masterclass 2nd August 2026", link: "#" },
    { title: "AIHA from IH Lab to Clinical Practice 7th August 2026", link: "#" },
    { title: "Joint Replacement : Core Skills In Knee Replacement Surgery 18th July 2026", link: "#" },
    { title: "Orthopaedics : Clubfoot Course 26_July_2026", link: "#" },
    { title: "Critical Edge - Comprehensive ICU Exam Preparatory Course_May 2026 to Oct 2026", link: "#" },
    { title: "Neuro Radiology Fellowship", link: "/neuro-radiology-fellowship" },
    { title: "Oncology Imaging Fellowship", link: "#" },
    { title: "Fellowship in Musculoskeletal Imaging", link: "#" }
  ]);

  const [rightCourses, setRightCourses] = useState<{title: string, link: string}[]>([
    { title: "Senior Registrar Vacancy Pathology", link: "https://www.dmhospital.org/cms/Media/file/Senior_Registrar_Vacancy_Pathology.pdf" },
    { title: "Autism Coach Brochure", link: "https://www.dmhospital.org/cms/Media/file/Autism-Coach-Brochure-2025.pdf" },
    { title: "Befriending Parkinsons Program", link: "https://www.dmhospital.org/cms/Media/file/befriending-parkinsons.pdf" },
    { title: "Yoga Classes Schedule", link: "/yoga-centre" },
    { title: "Eye Donation form", link: "https://www.dmhospital.org/cms/Media/file/eye_donation_form.pdf" },
    { title: "Garbha-Swasthya Helpline", link: "#" },
    { title: "Organ Donation & Transplantation", link: "#" }
  ]);

  useEffect(() => {
    getHomeCourses().then((data) => {
      if (data) {
        setLeftCourses(data.leftCourses);
        setRightCourses(data.rightCourses);
      }
    }).catch(console.error);
  }, []);

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
          <Link 
            href="/implant-pricing" 
            className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6 transition-all duration-300 hover:shadow-2xl hover:shadow-teal-900/20 hover:-translate-y-1 border border-slate-700/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="flex items-center gap-4 sm:gap-5 relative z-10 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                <Activity className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-1">Pricing Details</p>
                <h3 className="text-white text-base font-semibold tracking-wide leading-snug">Knee Replacement <br className="hidden sm:block" />Implants</h3>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-2 bg-teal-500/20 group-hover:bg-teal-500/30 text-teal-300 px-5 py-2.5 rounded-full text-base font-semibold leading-[22px] uppercase tracking-wider transition-colors shrink-0 w-full sm:w-auto justify-center sm:justify-start">
              <span>Click Here</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link 
            href="/cathlab-pricing" 
            className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1 border border-slate-700/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="flex items-center gap-4 sm:gap-5 relative z-10 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-1">Pricing Details</p>
                <h3 className="text-white text-base font-semibold tracking-wide leading-snug">Cathlab Pharmacy <br className="hidden sm:block" />Implants</h3>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-2 bg-blue-500/20 group-hover:bg-blue-500/30 text-blue-300 px-5 py-2.5 rounded-full text-base font-semibold leading-[22px] uppercase tracking-wider transition-colors shrink-0 w-full sm:w-auto justify-center sm:justify-start">
              <span>Click Here</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link 
            href="/in-patient" 
            className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/20 hover:-translate-y-1 border border-slate-700/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="flex items-center gap-4 sm:gap-5 relative z-10 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-1">View our</p>
                <h3 className="text-white text-base font-semibold tracking-wide leading-snug">In Patient <br className="hidden sm:block" />Guide</h3>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-2 bg-purple-500/20 group-hover:bg-purple-500/30 text-purple-300 px-5 py-2.5 rounded-full text-base font-semibold leading-[22px] uppercase tracking-wider transition-colors shrink-0 w-full sm:w-auto justify-center sm:justify-start">
              <span>Click Here</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link 
            href="/out-patient" 
            className="group relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-6 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-900/20 hover:-translate-y-1 border border-slate-700/50"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="flex items-center gap-4 sm:gap-5 relative z-10 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-1">View our</p>
                <h3 className="text-white text-base font-semibold tracking-wide leading-snug">Out Patient <br className="hidden sm:block" />Guide</h3>
              </div>
            </div>
            <div className="relative z-10 flex items-center gap-2 bg-amber-500/20 group-hover:bg-amber-500/30 text-amber-300 px-5 py-2.5 rounded-full text-base font-semibold leading-[22px] uppercase tracking-wider transition-colors shrink-0 w-full sm:w-auto justify-center sm:justify-start">
              <span>Click Here</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1.5 rounded-full bg-teal-50 text-[#007a87] text-[10px] font-bold tracking-widest uppercase border border-teal-100 shadow-sm inline-block mb-4">
            Education & Resources
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-[#002b5c] tracking-tight">
            Courses & <span className="font-semibold">Conferences</span>
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
              Upcoming Courses
            </h3>
            <ul className="space-y-0">
              {leftCourses.map((course, idx) => {
                const hasDetails = (course.content && course.content.trim() !== "") || (course.gallery && course.gallery.length > 0);
                const customLink = course.link && course.link.trim() !== "" ? course.link : null;
                const href = customLink ? customLink : (hasDetails ? `/courses/${course.id}` : `/courses/${course.id}`);
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
              Programs & Forms
            </h3>
            <ul className="space-y-0">
              {rightCourses.map((course, idx) => {
                const hasDetails = (course.content && course.content.trim() !== "") || (course.gallery && course.gallery.length > 0);
                const customLink = course.link && course.link.trim() !== "" ? course.link : null;
                const href = customLink ? customLink : (hasDetails ? `/courses/${course.id}` : `/courses/${course.id}`);
                
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
