"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, Award, ChevronRight, ArrowLeft, Target, Stethoscope, Briefcase, Activity, CheckCircle2, X } from 'lucide-react';
import Image from 'next/image';

export default function EventsClientPage({ data }: { data: any }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { title, date, overview, objectives, summary, organizers, gallery, agenda } = data;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      
      {/* 1. Hero Section */}
      <div className="relative bg-gradient-to-r from-[#004d56] to-[#007b8a] pt-24 pb-16 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d9232d]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#b2dfdb] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Events Details</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm">
                <Calendar className="w-4 h-4 text-[#a7ffeb]" />
                <span>{date}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                {title}
              </h1>
            </div>
            
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#005f6b] rounded-xl hover:bg-[#e0f2f1] hover:scale-105 transition-all duration-300 font-bold shadow-lg w-fit"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Event Overview */}
            <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#005f6b]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#e0f2f1] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-[#005f6b]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Event Overview</h2>
              </div>
              <div className="space-y-4 text-slate-600 leading-relaxed text-[17px]">
                {overview && overview.map((p: string, idx: number) => (
                  idx === overview.length - 1 ? (
                    <div key={idx} className="bg-amber-50 rounded-2xl p-6 mt-6 border border-amber-100 flex items-start gap-4">
                      <Award className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                      <p className="text-amber-900 leading-relaxed font-medium">
                        {p}
                      </p>
                    </div>
                  ) : (
                    <p key={idx}>{p}</p>
                  )
                ))}
              </div>
            </section>

            {/* Key Objectives */}
            <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 group hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#e0f2f1] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-[#005f6b]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Key Objectives</h2>
              </div>
              <ul className="space-y-4">
                {objectives && objectives.map((objective: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-[#00a69c] shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-lg leading-relaxed font-medium">{objective}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Summary */}
            <section className="bg-gradient-to-br from-[#005f6b] to-[#003d45] rounded-3xl p-8 md:p-10 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[50px] -z-0" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-6 text-[#e0f2f1]">Summary</h2>
                <p className="text-[#b2dfdb] text-lg leading-relaxed font-light">
                  {summary}
                </p>
              </div>
            </section>

          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            
            {/* Organizers */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#e0f2f1] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#005f6b]" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Organizers</h3>
              </div>
              <div className="space-y-6">
                {organizers && organizers.map((org: any, idx: number) => (
                  <div key={idx} className="border-l-2 border-[#00a69c] pl-4">
                    <p className="font-bold text-slate-800 text-lg">{org.name}</p>
                    <p className="text-sm text-slate-500 font-medium">{org.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Images / Gallery */}
            {gallery && gallery.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <div className="w-2 h-6 bg-[#005f6b] rounded-full" />
                  Event Gallery
                </h3>
                <div className="flex flex-col gap-4">
                  {gallery.map((img: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="relative rounded-xl overflow-hidden group cursor-zoom-in aspect-video w-full shadow-sm"
                      onClick={() => setSelectedImage(`/images/${img}`)}
                    >
                      <img 
                        src={`/images/${img}`} 
                        alt={`${title} moment ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Agenda / Speakers Table (Full Width) */}
        {agenda && agenda.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#e0f2f1] flex items-center justify-center shrink-0">
                <Stethoscope className="w-6 h-6 text-[#005f6b]" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">Conference Topics & Speakers</h2>
            </div>
            
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-5 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider w-1/3">Topic</th>
                      <th className="py-5 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider w-1/4">Speaker</th>
                      <th className="py-5 px-6 font-bold text-slate-700 text-sm uppercase tracking-wider">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    
                    {agenda.map((row: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                        <td className="py-6 px-6 font-semibold text-slate-800 group-hover:text-[#005f6b] transition-colors">
                          {row.topic}
                        </td>
                        <td className="py-6 px-6 text-slate-700 font-medium">
                          {row.speaker}
                        </td>
                        <td className="py-6 px-6 text-slate-500">
                          {row.role}
                        </td>
                      </tr>
                    ))}
                    
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors cursor-pointer"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Zoomed Event Image" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
    </div>
  );
}
