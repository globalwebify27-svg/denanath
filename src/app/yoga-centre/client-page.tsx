"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Calendar, CalendarDays, Clock, IndianRupee, Phone, Mail, Activity, Contact } from "lucide-react";

export default function YogaCentreClientPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      
      {/* 1. Hero Section */}
      <div className="relative bg-[#002b5c] pt-24 pb-16 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#b2dfdb] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Yoga Centre</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                Yoga Centre
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
            
            {/* Image Gallery */}
            <div className="grid grid-cols-1 gap-8">
              <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
                <img src="/images/Yoga_Img1.jpg" alt="Yoga Class 1" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-100 group">
                <img src="/images/Yoga_Img2.jpg" alt="Yoga Class 2" className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Overview */}
            <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#005f6b]" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#e0f2f1] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6 text-[#005f6b]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Yoga Class Schedule</h2>
              </div>
              <div className="space-y-4 text-slate-600 font-normal leading-[31px] text-[18px]">
                <p>
                  Welcome to the Yoga Centre. Join our classes to improve your physical and mental well-being under expert guidance. Below are the details of our ongoing schedule.
                </p>
                <div className="bg-teal-50 rounded-2xl p-6 mt-6 border border-teal-100 space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-[#007a87]" />
                    <p className="text-slate-800 text-[18px] font-semibold">
                      Batch Name : <span className="font-normal">Bihar School of Yoga</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-[#007a87]" />
                    <p className="text-slate-800 text-[18px] font-semibold">
                      Timing : <span className="font-normal">06:00pm to 7:00pm</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-6 h-6 text-[#007a87]" />
                    <p className="text-slate-800 text-[18px] font-semibold">
                      Days : <span className="font-normal">Monday , Wednesday and Friday</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <IndianRupee className="w-6 h-6 text-[#007a87]" />
                    <p className="text-slate-800 text-[18px] font-semibold">
                      Fee Structure : <span className="font-normal">Rs. 1200 /- for one month</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-[#e0f2f1] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Contact className="w-5 h-5 text-[#005f6b]" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Registration Details</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-3 pb-2 border-b border-slate-100">Contact Information</h4>
                  <div className="space-y-3 text-slate-600 text-[18px] leading-[31px] font-normal">
                    <p>
                      For registration details kindly contact:
                    </p>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#005f6b] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-800 mb-1">Telephone</p>
                        <p className="font-medium text-[#005f6b]">
                          <a href="tel:02049154121" className="hover:underline">020 4915 4121</a>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4">
                      <Mail className="w-5 h-5 text-[#005f6b] shrink-0" />
                      <a href="mailto:yoga@dmhospital.org" className="text-[#005f6b] font-medium hover:underline">yoga@dmhospital.org</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
