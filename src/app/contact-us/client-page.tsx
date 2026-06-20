"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Building2, MapPin, Phone, Mail, HeartPulse, Stethoscope, Droplet, Pill, Activity, Baby, Send, ShieldAlert } from "lucide-react";

export default function ContactUsClientPage({ pageData }: { pageData: any }) {
  const options = [];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        const scrollPos = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Hospital</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {pageData.title || "Contact Us"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">

          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              <div className="mb-12 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>Get In Touch</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  We Are Here To Help You
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mx-auto mb-6"></div>
                <p className="text-slate-500 text-lg">
                  Whether you have a question about our services, need to reach a specific department, or want to provide feedback, our team is ready to assist you.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
                
                {/* Left Column: Contact Form */}
                <div>
                  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                    <h3 className="text-xl font-extrabold text-[#002b5c] mb-8 flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#007a87]" /> Send a Message
                    </h3>
                    
                    <form className="space-y-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Name: <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">E-mail: <span className="text-red-500">*</span></label>
                          <input 
                            type="email" 
                            className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">Phone:</label>
                          <input 
                            type="tel" 
                            className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Comments: <span className="text-red-500">*</span></label>
                        <textarea 
                          rows={4}
                          className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow resize-none"
                          required
                        ></textarea>
                      </div>

                      {/* CAPTCHA Placeholder */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <label className="block text-sm font-bold text-slate-700 mb-3">Verification Code: <span className="text-red-500">*</span></label>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          <div className="w-32 h-12 bg-slate-100 flex items-center justify-center rounded-lg border border-slate-300 font-mono text-xl font-bold tracking-widest text-slate-600 select-none">
                            9F2X
                          </div>
                          <div className="flex flex-col gap-1">
                            <button type="button" className="text-xs font-bold text-[#007a87] hover:underline text-left">Change the CAPTCHA code</button>
                            <button type="button" className="text-xs font-bold text-[#007a87] hover:underline text-left">Speak the CAPTCHA code</button>
                          </div>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Enter code here"
                          className="mt-3 w-full sm:w-48 bg-white border border-slate-300 rounded-lg py-2 px-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow uppercase"
                          required
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-[#002b5c] hover:bg-[#001a38] text-white py-4 rounded-xl font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
                      >
                        Submit Request
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right Column: Contact Information */}
                <div className="space-y-8">
                  
                  {/* Primary Address */}
                  <div>
                    <h3 className="text-xl font-extrabold text-[#002b5c] mb-6 border-b border-slate-100 pb-4">
                      Deenanath Mangeshkar Hospital & Research Center
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                          <MapPin className="w-5 h-5 text-[#D9232D]" />
                        </div>
                        <p className="text-slate-600 font-medium pt-2">
                          Near Mhatre Bridge,<br />
                          Erandwane, Pune 411004
                        </p>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                          <Phone className="w-5 h-5 text-[#D9232D]" />
                        </div>
                        <div className="pt-2 text-slate-600 font-medium">
                          <p>Tel: +91 20 4015 1000 / 49153000</p>
                          <p className="text-sm mt-1">Fax: (+91) 20 2542 0104</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                          <Mail className="w-5 h-5 text-[#D9232D]" />
                        </div>
                        <a href="mailto:info@dmhospital.org" className="text-[#007a87] hover:underline font-bold pt-2">
                          info@dmhospital.org
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Department Numbers */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex items-center gap-3">
                      <Phone className="w-5 h-5 text-[#002b5c]" />
                      <h4 className="text-lg font-bold text-[#002b5c]">Important Members</h4>
                    </div>
                    
                    <div className="divide-y divide-slate-100">
                      
                      <div className="p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3 shrink-0">
                          <ShieldAlert className="w-4 h-4 text-red-500" />
                          <span className="font-extrabold text-slate-800 text-sm">Emergency Services</span>
                        </div>
                        <div className="text-xs font-medium text-slate-600 text-left sm:text-right space-y-1">
                          <p><span className="text-[#007a87] font-bold">GS:</span> +91 20 4015 1024 / 1027 / 1065</p>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3 shrink-0">
                          <HeartPulse className="w-4 h-4 text-teal-600" />
                          <span className="font-extrabold text-slate-800 text-sm">Intensive Care Unit</span>
                        </div>
                        <div className="text-xs font-medium text-slate-600 text-left sm:text-right space-y-1">
                          <p><span className="text-[#007a87] font-bold">GS:</span> +91 20 4015 1115 / 157</p>
                          <p><span className="text-[#007a87] font-bold">SS:</span> 020 49153483 / 3484</p>
                          <a href="mailto:icu@dmhospital.org" className="text-teal-600 hover:underline block pt-1">icu@dmhospital.org</a>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3 shrink-0">
                          <Baby className="w-4 h-4 text-pink-500" />
                          <span className="font-extrabold text-slate-800 text-sm">Paediatric / Neo Natal</span>
                        </div>
                        <div className="text-xs font-medium text-slate-600 text-left sm:text-right space-y-1">
                          <p><span className="text-[#007a87] font-bold">Neo (SS):</span> +91 20 4915 3380 / 81</p>
                          <p><span className="text-[#007a87] font-bold">Paed (GS):</span> +91 20 4015 1217 / 1297 / 1282</p>
                          <p><span className="text-[#007a87] font-bold">Paed (SS):</span> +91 20 4915 3381 / 82 / 83 / 84</p>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3 shrink-0">
                          <Droplet className="w-4 h-4 text-red-600" />
                          <span className="font-extrabold text-slate-800 text-sm">Blood Bank</span>
                        </div>
                        <div className="text-xs font-medium text-slate-600 text-left sm:text-right space-y-1">
                          <p><span className="text-[#007a87] font-bold">SS:</span> +91 20 49153081 / 3089</p>
                          <a href="mailto:bloodbank@dmhospital.org" className="text-teal-600 hover:underline block pt-1">bloodbank@dmhospital.org</a>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3 shrink-0">
                          <Pill className="w-4 h-4 text-blue-500" />
                          <span className="font-extrabold text-slate-800 text-sm">Pharmacy</span>
                        </div>
                        <div className="text-xs font-medium text-slate-600 text-left sm:text-right space-y-1">
                          <p><span className="text-[#007a87] font-bold">GS:</span> +91 20 4015 1040 / 1041</p>
                          <p><span className="text-[#007a87] font-bold">SS:</span> 020 49153009</p>
                        </div>
                      </div>

                      <div className="p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3 shrink-0">
                          <Activity className="w-4 h-4 text-rose-500" />
                          <span className="font-extrabold text-slate-800 text-sm">Heart Hot Line</span>
                        </div>
                        <div className="text-xs font-medium text-slate-600 text-left sm:text-right">
                          <p><span className="text-[#007a87] font-bold">GS:</span> +91 20 4015 1540</p>
                        </div>
                      </div>
                      
                      <div className="p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3 shrink-0">
                          <Stethoscope className="w-4 h-4 text-purple-500" />
                          <span className="font-extrabold text-slate-800 text-sm">IVF Clinic</span>
                        </div>
                        <div className="text-xs font-medium text-slate-600 text-left sm:text-right space-y-1">
                          <p><span className="text-[#007a87] font-bold">SS:</span> +91 20 49153347 / 3396</p>
                          <a href="mailto:ivf@dmhospital.org" className="text-teal-600 hover:underline block pt-1">ivf@dmhospital.org</a>
                        </div>
                      </div>

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
