"use client";

import { MapPin, Beaker, CheckCircle2, ShieldCheck, HeartPulse, GraduationCap, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import DynamicSidebar from "@/components/DynamicSidebar";


export default function BloodBankClientPage({ pageData }: { pageData: any }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Blood Bank</span>
          </div>
          <h1 className="text-3xl md:text-[40px] leading-tight font-extrabold text-white tracking-tight">{pageData.title}</h1>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 overflow-hidden sticky top-32">
              <div className="p-5 bg-gradient-to-r from-[#002b5c] to-[#003b7c] border-b border-white/10">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-teal-400" />
                  Quick Info
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Location</h4>
                  <p className="text-sm font-medium text-[#002b5c] flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#007a87] shrink-0 mt-0.5" />
                    {pageData.location}
                  </p>
                </div>
                {pageData.stats && pageData.stats.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">At a Glance</h4>
                    <div className="space-y-3">
                      {pageData.stats.map((stat: any) => (
                        <div key={stat.id} className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex justify-between items-center">
                          <span className="text-xs text-slate-600 font-medium w-2/3 leading-snug">{stat.label}</span>
                          <span className="text-sm font-black text-[#007a87]">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 w-full min-w-0 space-y-10">
            
            {/* Intro Section */}
            <section className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 md:p-10">
              <div 
                className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-strong:text-[#002b5c]"
                dangerouslySetInnerHTML={{ __html: pageData.introText }}
              />
            </section>

            {/* Department Images */}
            {pageData.images && pageData.images.length > 0 && (
              <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pageData.images.map((img: string, idx: number) => (
                  <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-200 group">
                    <img src={img} alt={`Department picture ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </section>
            )}

            {/* Components Licensed */}
            <section className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Beaker size={150} className="text-[#007a87]" />
              </div>
              <h2 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                <Beaker className="w-6 h-6 text-[#007a87]" />
                Components Licensed to Manufacture
              </h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 relative z-10">
                {pageData.components && pageData.components.map((comp: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-700 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Initiatives */}
            {pageData.initiatives && pageData.initiatives.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-[#002b5c] flex items-center gap-3 px-2">
                  <ShieldCheck className="w-6 h-6 text-[#007a87]" />
                  Safety & Advanced Infrastructure
                </h2>
                <div className="grid gap-6">
                  {pageData.initiatives.map((init: any) => (
                    <div key={init.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                      <h3 className="text-lg font-bold text-[#007a87] mb-3">{init.title}</h3>
                      <div 
                        className="prose prose-sm prose-slate max-w-none text-slate-600 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: init.description }}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tests & Apheresis */}
            <section className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#002b5c] rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Beaker size={120} />
                </div>
                <h3 className="text-xl font-bold mb-6 text-teal-300 relative z-10">Laboratory Tests</h3>
                <div className="space-y-6 relative z-10">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Donor</h4>
                    <p className="text-sm leading-relaxed text-blue-100">{pageData.donorTests}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Patients</h4>
                    <p className="text-sm leading-relaxed text-blue-100">{pageData.patientTests}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-8">
                <h3 className="text-xl font-bold text-[#002b5c] mb-4">Apheresis Procedures</h3>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {pageData.apheresisIntro}
                </p>
                <div className="space-y-3">
                  {pageData.apheresisProcedures && pageData.apheresisProcedures.map((proc: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#007a87] mt-1.5 shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{proc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Team */}
            {pageData.team && pageData.team.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-[#002b5c] flex items-center gap-3 px-2">
                  <HeartPulse className="w-6 h-6 text-[#007a87]" />
                  Our Experts
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {pageData.team.map((member: any) => (
                    <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-5 group hover:border-[#007a87]/30 transition-colors">
                      <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden shrink-0 border-2 border-white shadow-sm group-hover:border-[#007a87]/20 transition-colors">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#007a87]/30 bg-teal-50">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#002b5c] text-lg group-hover:text-[#007a87] transition-colors">{member.name}</h3>
                        <p className="text-xs font-semibold text-slate-500 mt-1">{member.qualifications}</p>
                        <p className="text-sm font-medium text-[#007a87] mt-1">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Academics & Publications */}
            <section className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg">
                    <GraduationCap size={20} />
                  </div>
                  <h3 className="font-bold text-[#002b5c]">Training Program</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pageData.trainingProgram}
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-teal-100 text-teal-600 p-2 rounded-lg">
                    <FileText size={20} />
                  </div>
                  <h3 className="font-bold text-[#002b5c]">Publications</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pageData.publications}
                </p>
              </div>
            </section>

          </div>

        </div>
      </div>
    </div>
  );
}
