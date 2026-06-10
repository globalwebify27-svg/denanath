"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Building2, MapPin, Phone, Mail, HeartPulse, Stethoscope, Droplet, Pill, Activity, Baby, Send, ShieldAlert } from "lucide-react";

export default function ContactUsClient({ initialData }: { initialData?: any }) {
  const data = initialData || {
    pageTitle: "Contact Us",
    introTitle: "We Are Here To Help You",
    introDesc: "Whether you have a question about our services, need to reach a specific department, or want to provide feedback, our team is ready to assist you.",
    addressTitle: "Deenanath Mangeshkar Hospital & Research Center",
    address: "Near Mhatre Bridge,\nErandwane, Pune 411004",
    phoneLines: ["Tel: +91 20 4015 1000 / 49153000", "Fax: (+91) 20 2542 0104"],
    email: "info@dmhospital.org",
    departments: [
      { id: 1, name: "Emergency Services", icon: "shieldAlert", lines: ["GS: +91 20 4015 1024 / 1027 / 1065"] },
      { id: 2, name: "Intensive Care Unit", icon: "heartPulse", lines: ["GS: +91 20 4015 1115 / 157", "SS: 020 49153483 / 3484", "icu@dmhospital.org"] },
      { id: 3, name: "Paediatric / Neo Natal", icon: "baby", lines: ["Neo (SS): +91 20 4915 3380 / 81", "Paed (GS): +91 20 4015 1217 / 1297 / 1282", "Paed (SS): +91 20 4915 3381 / 82 / 83 / 84"] },
      { id: 4, name: "Blood Bank", icon: "droplet", lines: ["SS: +91 20 49153081 / 3089", "bloodbank@dmhospital.org"] },
      { id: 5, name: "Pharmacy", icon: "pill", lines: ["GS: +91 20 4015 1040 / 1041", "SS: 020 49153009"] },
      { id: 6, name: "Heart Hot Line", icon: "activity", lines: ["GS: +91 20 4015 1540"] },
      { id: 7, name: "IVF Clinic", icon: "stethoscope", lines: ["SS: +91 20 49153347 / 3396", "ivf@dmhospital.org"] }
    ]
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz023456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [captchaCode, setCaptchaCode] = React.useState("");

  React.useEffect(() => {
    setCaptchaCode(generateCaptcha());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("formType", "Contact Us");
    
    const userCaptcha = formData.get("captcha") as string;
    if (userCaptcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      alert("Verification code is incorrect. Please try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        setSuccess(true);
        (e.target as HTMLFormElement).reset();
      } else {
        alert("There was an error submitting your request. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
            <span className="hover:text-white transition-colors cursor-pointer">Hospital</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{data.pageTitle}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {data.pageTitle}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
          
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
              <Building2 className="w-4 h-4" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
              {data.introTitle}
            </h2>
            <div className="w-20 h-1.5 bg-[#007a87] rounded-full mx-auto mb-6"></div>
            <p className="text-slate-500 text-lg">
              {data.introDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            
            {/* Left Column: Contact Form */}
            <div>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-2xl font-extrabold text-[#002b5c] mb-8 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-[#007a87]" /> Send a Message
                </h3>
                
                {success ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldAlert className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="text-xl font-bold text-emerald-800 mb-2">Message Sent Successfully!</h4>
                    <p className="text-emerald-600 font-medium mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
                    <button 
                      onClick={() => setSuccess(false)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Name: <span className="text-red-500">*</span></label>
                      <input name="name" type="text" className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">E-mail: <span className="text-red-500">*</span></label>
                        <input name="email" type="email" className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow" required />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone: <span className="text-red-500">*</span></label>
                        <input name="phone" type="tel" required maxLength={10} pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Comments: <span className="text-red-500">*</span></label>
                      <textarea name="comments" rows={4} className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow resize-none" required></textarea>
                    </div>

                     <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <label className="block text-sm font-bold text-slate-700 mb-3">Verification Code: <span className="text-red-500">*</span></label>
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="w-32 h-12 bg-slate-100 flex items-center justify-center rounded-lg border border-slate-300 font-mono text-xl font-bold tracking-widest text-slate-600 select-none">
                          {captchaCode}
                        </div>
                        <div className="flex flex-col gap-1">
                          <button 
                            type="button" 
                            onClick={() => setCaptchaCode(generateCaptcha())}
                            className="text-xs font-bold text-[#007a87] hover:underline text-left"
                          >
                            Change the CAPTCHA code
                          </button>
                          <button type="button" className="text-xs font-bold text-[#007a87] hover:underline text-left">Speak the CAPTCHA code</button>
                        </div>
                      </div>
                      <input name="captcha" type="text" placeholder="Enter code here" className="mt-3 w-full sm:w-48 bg-white border border-slate-300 rounded-lg py-2 px-3 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#007a87] focus:border-transparent transition-shadow uppercase" required />
                    </div>

                    <button disabled={isSubmitting} type="submit" className="w-full bg-[#002b5c] hover:bg-[#001a38] text-white py-4 rounded-xl font-extrabold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                      {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Contact Information */}
            <div className="space-y-8">
              
              {/* Primary Address */}
              <div>
                <h3 className="text-xl font-extrabold text-[#002b5c] mb-6 border-b border-slate-100 pb-4">
                  {data.addressTitle}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                      <MapPin className="w-5 h-5 text-[#D9232D]" />
                    </div>
                    <p className="text-slate-600 font-medium pt-2 whitespace-pre-line">
                      {data.address}
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                      <Phone className="w-5 h-5 text-[#D9232D]" />
                    </div>
                    <div className="pt-2 text-slate-600 font-medium">
                      {data.phoneLines.map((line: string, idx: number) => (
                        <p key={idx} className={idx > 0 ? "text-sm mt-1" : ""}>{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                      <Mail className="w-5 h-5 text-[#D9232D]" />
                    </div>
                    <a href={`mailto:${data.email}`} className="text-[#007a87] hover:underline font-bold pt-2">
                      {data.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Department Numbers */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-200 py-4 px-6 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#002b5c]" />
                  <h4 className="text-lg font-bold text-[#002b5c]">Important Numbers</h4>
                </div>
                
                <div className="divide-y divide-slate-100">
                  {data.departments.map((dept: any, idx: number) => {
                    let Icon = Phone;
                    let colorClass = "text-blue-500";
                    if (dept.icon === "shieldAlert") { Icon = ShieldAlert; colorClass = "text-red-500"; }
                    if (dept.icon === "heartPulse") { Icon = HeartPulse; colorClass = "text-teal-600"; }
                    if (dept.icon === "baby") { Icon = Baby; colorClass = "text-pink-500"; }
                    if (dept.icon === "droplet") { Icon = Droplet; colorClass = "text-red-600"; }
                    if (dept.icon === "pill") { Icon = Pill; colorClass = "text-blue-500"; }
                    if (dept.icon === "activity") { Icon = Activity; colorClass = "text-rose-500"; }
                    if (dept.icon === "stethoscope") { Icon = Stethoscope; colorClass = "text-purple-500"; }

                    return (
                      <div key={idx} className="p-4 sm:p-5 flex flex-col sm:flex-row justify-between gap-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-3 shrink-0">
                          <Icon className={`w-5 h-5 ${colorClass}`} />
                          <span className="font-extrabold text-slate-800">{dept.name}</span>
                        </div>
                        <div className="text-sm font-medium text-slate-600 text-left sm:text-right space-y-1">
                          {dept.lines.map((line: string, lIdx: number) => {
                            if (line.includes("@")) {
                              return <a key={lIdx} href={`mailto:${line}`} className="text-teal-600 hover:underline block pt-1">{line}</a>
                            }
                            const parts = line.split(":");
                            if (parts.length === 2) {
                              return <p key={lIdx}><span className="text-[#007a87] font-bold">{parts[0]}:</span>{parts[1]}</p>
                            }
                            return <p key={lIdx}>{line}</p>
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
