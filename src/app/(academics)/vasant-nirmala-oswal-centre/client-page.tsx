"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Award, GraduationCap, Building2, Stethoscope, BriefcaseMedical } from "lucide-react";

export default function VasantNirmalaOswalCentreClientPage({ initialData }: { initialData?: any }) {
  const defaults = {
    heroTitle: "Vasant & Nirmala Oswal Centre For Post Graduate Training & Education",
    heroBreadcrumb: "Vasant & Nirmala Oswal Centre",
    overviewTitle: "Overview",
    overviewContent: `<p>Vasant and Nirmala Oswal Centre for Post Graduate Training and Education is situated on the 14th floor of Superspeciality building is the first center in India accredited by Royal College of Surgeons England (RCS), London for skill development courses in surgical speciality.</p><p class="mt-4 font-semibold text-slate-700">Vasant & Nirmala Oswal Centre offers: Hands on training - Skill development</p>`,
    coursesTitle: "Courses accredited by Royal College of Surgeons, London, England",
    coursesAccredited: [
      "Core Skills in Laparoscopic Surgery",
      "Hands on course in Trans Oral Laser Surgery & Medialisation Thyroplasty",
      "Core skills in Knee Arthroplasty",
      "Core skills in Knee Arthroscopy",
      "Core Skills in Shoulder Arthroscopy",
      "Core Skills in RIRS",
      "Hands on Course on Evaluation & Management of Swallowing Disorders",
      "Hands on Surgical Course in Laryngotracheal Reconstruction"
    ],
    specialtiesTitle: "Departments / Specialties",
    specialties: [
      "General Surgery",
      "Joint Replacement",
      "Shoulder and Sports Medicine",
      "Voice Laser",
      "Urology"
    ],
    facilitiesTitle: "Facilities at Academic Center",
    mainFacilities: [
      { name: "Auditorium", desc: "8th Floor GS Building (300 Capacity)" },
      { name: "Meena Choksi", desc: "14th Floor SS Building" }
    ],
    otherFacilities: [
      "Lecture Hall",
      "Library",
      "Reading Hall",
      "Skill Stations",
      "Simulation Lab",
      "Conference Hall",
      "Academic Office"
    ]
  };

  const data = {
    ...defaults,
    ...initialData,
    coursesAccredited: Array.isArray(initialData?.coursesAccredited) ? initialData.coursesAccredited : defaults.coursesAccredited,
    specialties: Array.isArray(initialData?.specialties) ? initialData.specialties : defaults.specialties,
    mainFacilities: Array.isArray(initialData?.mainFacilities) ? initialData.mainFacilities : defaults.mainFacilities,
    otherFacilities: Array.isArray(initialData?.otherFacilities) ? initialData.otherFacilities : defaults.otherFacilities,
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      
      {/* 1. Hero Section */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden pt-24 pb-16">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d9232d]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#b2dfdb] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <Link href="/academics" className="hover:text-white transition-colors">Academics</Link>
            <ChevronRight className="w-4 h-4 shrink-0" />
            <span className="text-white font-medium">{data.heroBreadcrumb}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                {data.heroTitle}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Overview */}
        <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow mb-12">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#005f6b]" />
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#e0f2f1] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-[#005f6b]" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{data.overviewTitle}</h2>
          </div>
          <div 
            className="text-slate-600 font-normal leading-[31px] text-[18px] prose max-w-none"
            dangerouslySetInnerHTML={{ __html: data.overviewContent }}
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Courses Accredited */}
          <div className="space-y-12">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#e0f2f1] flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-[#005f6b]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{data.coursesTitle}</h2>
              </div>
              <ul className="space-y-4">
                {data.coursesAccredited.map((course: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-[#005f6b] hover:bg-[#e0f2f1]/30 transition-all">
                    <div className="w-2 h-2 rounded-full bg-[#005f6b] shrink-0 mt-2.5" />
                    <span className="text-slate-700 font-medium text-[16px]">{course}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Specialties & Facilities */}
          <div className="space-y-12">
            
            {/* Specialties */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#e0f2f1] flex items-center justify-center shrink-0">
                  <Stethoscope className="w-6 h-6 text-[#005f6b]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{data.specialtiesTitle}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.specialties.map((dept: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-teal-50 border border-teal-100 text-[#005f6b] font-semibold">
                    <BriefcaseMedical className="w-5 h-5 shrink-0" />
                    {dept}
                  </div>
                ))}
              </div>
            </section>

            {/* Facilities */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#e0f2f1] flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-[#005f6b]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">{data.facilitiesTitle}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-slate-600 font-medium">
                {data.mainFacilities.map((fac: any, idx: number) => (
                  <div key={idx} className="col-span-1 sm:col-span-2 mb-2 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="font-semibold text-slate-800 mb-1">{fac.name}</p>
                    <p className="text-sm">{fac.desc}</p>
                  </div>
                ))}
                {data.otherFacilities.map((facility: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    {facility}
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
