"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Globe, RefreshCw, Lock, CreditCard, User, Phone, Mail, MapPin, Building, ShieldCheck, IndianRupee, MessageSquare, Map } from "lucide-react";
import { COUNTRIES, STATES_INDIA, CITIES_BY_STATE } from "../../../lib/geoData";

export default function OnlinePaymentClient({ initialData }: { initialData: any }) {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");
  const [city, setCity] = useState("Pune");

  const options = [
    {
        "name": "E-Mail Login (DMH Users)",
        "href": "/email-login",
        "active": false
    },
    {
        "name": "Online Payment",
        "href": "/online-payment",
        "active": true
    },
    {
        "name": "Patient Portal",
        "href": "/patient-portal",
        "active": false
    },
    {
        "name": "Patient Registration Form",
        "href": "/patient-registration",
        "active": false
    }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz023456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [captchaCode, setCaptchaCode] = useState("");

  useEffect(() => {
    setCaptchaCode(generateCaptcha());
  }, []);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const userCaptcha = formData.get("captcha") as string;
    if (userCaptcha?.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      alert("Verification code is incorrect. Please try again.");
      return;
    }
    alert("Proceeding to payment gateway...");
  };

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

  const data = initialData || {
    pageTitle: "Online Payment",
    securityText: "256-bit Secure Encrypted Payment"
  };

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
            <span className="text-white">{data.pageTitle}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {data.pageTitle}
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
              
              <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                    <Globe className="w-4 h-4" />
                    <span>Online Facilities</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] tracking-tight">
                    {data.pageTitle}
                  </h2>
                </div>
                <div className="bg-red-50 border border-red-200 text-[#D9232D] px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 self-start shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-[#D9232D]" />
                  <span>{data.securityText}</span>
                </div>
              </div>
              <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-10"></div>

              <form className="max-w-4xl space-y-8" onSubmit={handlePay}>
                
                {/* 1. Payment Details Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87]"></div>
                  <h3 className="text-xl font-bold text-[#002b5c] mb-6 flex items-center gap-2 border-b border-slate-200 pb-4">
                    <CreditCard className="w-6 h-6 text-[#007a87]" />
                    Payment Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Purpose of Payment <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                    <option>-- Select --</option>
                    <option>Patient Help</option>
                    <option>Indoor Patient Payment (IPD)</option>
                    <option>Outdoor Patient Payment (OPD)</option>
                    <option>Conference / Workshop</option>
                    <option>Pharmacy</option>
                    <option>ICU Deposit</option>
                  </select>
                        <CreditCard className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Amount <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type="text" placeholder="Enter Amount" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                        <IndianRupee className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Payer Information Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87]"></div>
                  <h3 className="text-xl font-bold text-[#002b5c] mb-6 flex items-center gap-2 border-b border-slate-200 pb-4">
                    <User className="w-6 h-6 text-[#007a87]" />
                    Payer Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Name Of Payer <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type="text" placeholder="Full Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                        <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input name="contactNumber" type="tel" placeholder="Mobile Number" maxLength={10} pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" required />
                        <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email ID <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type="email" placeholder="Email Address" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                        <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Location Details Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87]"></div>
                  <h3 className="text-xl font-bold text-[#002b5c] mb-6 flex items-center gap-2 border-b border-slate-200 pb-4">
                    <MapPin className="w-6 h-6 text-[#007a87]" />
                    Location Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Address <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <textarea rows={3} placeholder="Complete Address" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400 resize-none"></textarea>
                        <Building className="w-5 h-5 text-slate-400 absolute left-4 top-4 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Country <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select name="country" value={country} onChange={(e) => { setCountry(e.target.value); setState(""); setCity(""); }} className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer" required>
                          <option value="">-- Select --</option>
                          {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <Globe className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">State <span className="text-red-500">*</span></label>
                      <div className="relative">
                        {country === "India" ? (
                          <select name="state" value={state} onChange={(e) => { setState(e.target.value); setCity(""); }} className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer" required>
                            <option value="">-- Select --</option>
                            {STATES_INDIA.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        ) : (
                          <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter State" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" required />
                        )}
                        <Map className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        {country === "India" && (
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        )}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">City <span className="text-red-500">*</span></label>
                      <div className="relative">
                        {country === "India" ? (
                          <select name="city" value={city} onChange={(e) => setCity(e.target.value)} className="w-full md:w-1/2 appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer" required>
                            <option value="">-- Select --</option>
                            {(CITIES_BY_STATE[state] || ["Other"]).map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        ) : (
                          <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City" className="w-full md:w-1/2 px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" required />
                        )}
                        <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        {country === "India" && (
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90 md:right-[calc(50%+1rem)]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Additional Info */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87]"></div>
                  <h3 className="text-xl font-bold text-[#002b5c] mb-6 flex items-center gap-2 border-b border-slate-200 pb-4">
                    <MessageSquare className="w-6 h-6 text-[#007a87]" />
                    Additional Comments
                  </h3>
                  
                  <div>
                    <div className="relative">
                      <textarea rows={2} placeholder="Any specific instructions..." className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400 resize-none"></textarea>
                      <MessageSquare className="w-5 h-5 text-slate-400 absolute left-4 top-4 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Captcha & Submit */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">Security Verification <span className="text-red-500">*</span></label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-800 text-white px-5 py-2.5 rounded-lg tracking-widest font-mono font-bold text-lg select-none shadow-inner border border-slate-700">
                            {captchaCode}
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setCaptchaCode(generateCaptcha())}
                            className="text-blue-500 hover:text-blue-600 transition-colors bg-blue-50 p-2.5 rounded-lg hover:bg-blue-100"
                          >
                            <RefreshCw className="w-5 h-5" />
                          </button>
                        </div>
                        <input name="captcha" type="text" placeholder="Enter text" className="w-full sm:w-40 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-slate-50 transition-all font-medium" required />
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4 md:pt-0 border-t border-slate-100 md:border-none">
                      <button type="submit" className="group w-full md:w-auto inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-10 py-4 bg-[#003360] hover:bg-[#002b5c] text-white font-bold text-base md:text-lg whitespace-nowrap rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-1">
                        <Lock className="w-5 h-5 shrink-0 text-teal-300" />
                        Proceed to Pay
                        <ChevronRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
