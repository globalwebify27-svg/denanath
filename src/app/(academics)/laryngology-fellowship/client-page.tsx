"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Activity, Globe, Link as LinkIcon } from "lucide-react";

export default function LaryngologyFellowshipClientPage({ initialData }: { initialData?: any }) {
  const defaults = {
    heroTitle: "Laryngology Fellowship",
    heroBreadcrumb: "Laryngology Fellowship",
    aboutTitle: "About the Fellowship",
    aboutContent: `<p>The Department of Laryngology at Deenanath Mangeshkar Hospital, Pune, India, established annual fellowships in Advance Laryngology in the year 2015.</p><p>After the establishment of the hospital in the year 2001, the department first initiated short-term attachments for surgeons to undergo in-depth learning of laryngology at an advance level. Based on those experiences, we developed various teaching modules which were constantly refined by dynamic feedback from the trainees.</p><p>In addition to short-term attachments, we also conducted hands on training courses in Voice Surgery. We believed that Laryngology – an expanding Super-specialty, requires much more time in training and inculcating the skills and eventually we established the Advanced Laryngology one year fellowship program. Hand in hand with gaining extensive diagnostics and operating experience, the fellows are expected to undertake research and publish articles in peer-reviewed journals.</p><p>In 2016, the fellowship program received accreditation from the Royal College of Surgeons of England (RCS) under Senior Clinical Fellowship Scheme. This is the first and only RCS approved overseas fellowship outside UK and Ireland. Fellowship approval is an inspired step that leads to higher standards. The approval by the world-renowned Royal College of Surgeons of England represents a major step forward for us in our quest to achieve higher standards. We regard RCS approval as external evaluation and validation of our delivery of ‘teaching, learning and assessment’ programme. RCS approval to our fellowship training programme provides us a performance metric against which to set benchmark for training in Laryngology with knowledge, skills, support and resources. It is a key development for maintaining and improving standards for years to come.</p>`,
    quickLinksTitle: "More Information",
    quickLinksUrl: "http://voicelaser.com/",
    quickLinksLabel: "Visit VoiceLaser Website",
    quickLinksDesc: "For detailed information about the program",
    rcsRefTitle: "RCS References",
    rcsRefDesc: "Some references of the fellowship on the Royal College of Surgeons website:",
    rcsReferences: [
      {
        title: "RCS Education & Exams Accreditation",
        url: "https://www.rcseng.ac.uk/education-and-exams/accreditation/"
      },
      {
        title: "RCS Bulletin Publication (PDF)",
        url: "http://publishing.rcseng.ac.uk/doi/pdfplus/10.1308/rcsbull.2017.79"
      }
    ]
  };

  const data = {
    ...defaults,
    ...initialData,
    rcsReferences: Array.isArray(initialData?.rcsReferences) ? initialData.rcsReferences : defaults.rcsReferences
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      
      {/* 1. Hero Section */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1 overflow-hidden whitespace-nowrap">
            <Link href="/" className="hover:text-white transition-colors shrink-0">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/academics" className="hover:text-white transition-colors shrink-0">Academics</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-white truncate">{data.heroBreadcrumb}</span>
          </div>
          
          <h1 className="text-[24px] sm:text-[32px] md:text-[40px] leading-tight font-extrabold text-white tracking-tight truncate max-w-full">
            {data.heroTitle}
          </h1>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 md:pt-5 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section className="bg-white rounded-3xl px-6 pt-3 pb-6 sm:px-10 sm:pt-4 sm:pb-10 md:px-12 md:pt-4 md:pb-8 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#005f6b]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#e0f2f1] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-[#005f6b]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{data.aboutTitle}</h2>
              </div>
              <div 
                className="space-y-6 text-slate-600 font-normal leading-[31px] text-[18px] prose max-w-none"
                dangerouslySetInnerHTML={{ __html: data.aboutContent }}
              />
            </section>

          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            
            {/* Quick Links */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#e0f2f1] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5 text-[#005f6b]" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{data.quickLinksTitle}</h3>
              </div>
              <div className="border-l-2 border-[#00a69c] pl-4">
                <a 
                  href={data.quickLinksUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-[#005f6b] text-lg hover:underline"
                >
                  {data.quickLinksLabel}
                </a>
                <p className="text-sm text-slate-500 font-medium mt-1">{data.quickLinksDesc}</p>
              </div>
            </div>

            {/* RCS References */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#e0f2f1] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <LinkIcon className="w-5 h-5 text-[#005f6b]" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{data.rcsRefTitle}</h3>
              </div>
              <p className="text-slate-500 italic mb-6 text-[16px] leading-[26px] font-normal">
                {data.rcsRefDesc}
              </p>
              <div className="space-y-4">
                {data.rcsReferences.map((ref: any, idx: number) => (
                  <a 
                    key={idx}
                    href={ref.url || "#"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl border bg-slate-50 border-slate-200 hover:bg-[#e0f2f1] hover:border-[#b2dfdb] transition-colors"
                  >
                    <p className="text-sm font-semibold text-[#005f6b] break-words">
                      {ref.title || "Reference"}
                    </p>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
