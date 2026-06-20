"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Globe, RefreshCw, Check, Smartphone, User, Lock, Calendar, Hash, Mail, Phone, Shield, ArrowRight } from "lucide-react";

export default function PatientPortalPage({ pageData }: { pageData: any }) {
  const [activeTab, setActiveTab] = useState("register");
  const options = [
    {
        "name": "E-Mail Login (DMH Users)",
        "href": "/email-login",
        "active": false
    },
    {
        "name": "Online Payment",
        "href": "/online-payment",
        "active": false
    },
    {
        "name": "Patient Portal",
        "href": "/patient-portal",
        "active": true
    },
    {
        "name": "Patient Registration Form",
        "href": "/patient-registration",
        "active": false
    }
];

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
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Online Facilities</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Patient Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {pageData.title || "Patient Portal"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          {options.length > 0 && (
            <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
              <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                {options.map((option, idx) => (
                  <Link
                    key={idx}
                    href={option.href}
                    data-active={option.active}
                    className={"snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal " + (
                      option.active
                        ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                        : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                    ) + " " + (idx !== options.length - 1 ? "lg:border-b lg:border-b-slate-50" : "")}
                  >
                    <span>{option.name}</span>
                    <ChevronRight 
                      className={"hidden lg:block w-4 h-4 transition-transform duration-300 " + (
                        option.active 
                          ? "text-[#007a87] translate-x-1" 
                          : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#002b5c]"
                      )} 
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Globe className="w-4 h-4" />
                  <span>Online Facilities</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  {pageData.title || "Patient Portal"}
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                
                {/* Header Section */}
                <div className="p-8 pb-6 border-b border-slate-100 flex flex-col items-center text-center bg-gradient-to-b from-slate-50 to-white">
                  <div className="flex gap-4 w-full justify-between mb-8">
                    <a href={pageData.googlePlayUrl || "#"} className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm">
                      <Smartphone className="w-4 h-4" />
                      <div className="text-left leading-tight">
                        <div className="text-[9px] uppercase opacity-80 font-normal">GET IT ON</div>
                        <div>Google Play</div>
                      </div>
                    </a>
                    <a href={pageData.appStoreUrl || "#"} className="flex items-center gap-2 bg-black text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm">
                      <Smartphone className="w-4 h-4" />
                      <div className="text-left leading-tight">
                        <div className="text-[9px] uppercase opacity-80 font-normal">Download on the</div>
                        <div>App Store</div>
                      </div>
                    </a>
                  </div>
                  
                  <div className="flex flex-col items-center mb-2">
                    <div className="relative w-32 h-24 mb-4">
                      <Image 
                        src="/logo.png" 
                        alt="Deenanath Mangeshkar Hospital Logo" 
                        fill 
                        className="object-contain"
                      />
                    </div>
                    <h2 className="text-xl text-slate-500 font-normal tracking-wide">DMH Patient Portal</h2>
                  </div>
                </div>

                {/* Premium Tabs */}
                <div className="p-2 sm:p-4 bg-slate-50 border-b border-slate-100">
                  <div className="flex p-1 bg-slate-200/60 rounded-xl relative max-w-sm mx-auto">
                    {/* Sliding Background */}
                    <div 
                      className="absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out"
                      style={{ left: activeTab === "login" ? "4px" : "calc(50%)" }}
                    />
                    
                    <button 
                      onClick={() => setActiveTab("login")}
                      className={`flex-1 py-3 text-center text-sm font-bold relative z-10 transition-colors duration-300 ${activeTab === "login" ? "text-[#003360]" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => setActiveTab("register")}
                      className={`flex-1 py-3 text-center text-sm font-bold relative z-10 transition-colors duration-300 ${activeTab === "register" ? "text-[#003360]" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      Create Account
                    </button>
                  </div>
                </div>

                <div className="p-6 sm:p-10 md:p-12">
                  {activeTab === "login" ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <form className="space-y-6">
                        
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            MRD Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input type="number" placeholder="Enter MRD Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                            <Hash className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Password <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input type="password" placeholder="Enter Password" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                            <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                          <label className="block text-sm font-semibold text-slate-700 mb-3">
                            Security Verification <span className="text-red-500">*</span>
                          </label>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                              <div className="bg-slate-800 text-white px-5 py-2.5 rounded-lg tracking-widest font-mono font-bold text-lg select-none shadow-inner border border-slate-700">
                                l z X Y
                              </div>
                              <button type="button" className="text-blue-500 hover:text-blue-600 transition-colors bg-blue-50 p-2.5 rounded-lg hover:bg-blue-100">
                                <RefreshCw className="w-5 h-5" />
                              </button>
                            </div>
                            <input type="text" placeholder="Enter text" className="w-full sm:w-40 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all font-medium placeholder-slate-400" />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
                          <button type="button" className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                            Secure Login
                            <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
                          </button>
                          
                          <div className="flex flex-col items-center sm:items-end gap-1 text-sm font-medium">
                            <a href="#" className="text-slate-500 hover:text-[#007a87] transition-colors">Forgot your password?</a>
                            <a href="#" className="text-slate-500 hover:text-[#007a87] transition-colors">Forgot your email?</a>
                          </div>
                        </div>
                      </form>

                      <div className="mt-10 pt-8 border-t border-slate-100 bg-slate-50/50 rounded-2xl p-6">
                        <p className="text-[15px] text-[#002b5c] font-bold mb-4 flex items-center gap-2">
                          <Shield className="w-5 h-5 text-teal-500" />
                          Portal Features
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-slate-600 font-medium">
                          {(pageData.features || [
                            "View Pathology & Radiology Reports",
                            "View Discharge Summary",
                            "View OPD Schedule",
                            "Book Appointments",
                            "Explore Health Packages",
                            "Ask Queries directly to Doctors"
                          ]).map((item: any, idx: number) => (
                            <div key={idx} className="flex items-start gap-2">
                              <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <form className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              MRD Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input type="text" placeholder="MRD Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                              <Hash className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Patient Name
                            </label>
                            <div className="relative">
                              <input type="text" placeholder="Patient Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                              <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input type="text" placeholder="DD/MM/YYYY" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                              <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Gender <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <select className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                                <option>-- Select --</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                              </select>
                              <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                              <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Email ID <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input type="email" placeholder="Email Address" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                              <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input type="tel" placeholder="Mobile Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                              <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex flex-col items-center gap-6">
                          <button type="button" className="group w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-3.5 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base whitespace-nowrap rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                            Register Account
                            <ArrowRight className="w-4 h-4 text-teal-300 group-hover:translate-x-1 transition-transform" />
                          </button>
                          
                          <div className="text-[13px] text-slate-500 font-medium leading-relaxed text-center max-w-md">
                            By registering, your details will be verified with the hospital records. If they match, you will receive an activation email to login to the portal.
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}