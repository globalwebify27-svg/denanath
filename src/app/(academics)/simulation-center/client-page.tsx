"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Activity, Info, CreditCard, BookOpen, RefreshCw, Building2 } from "lucide-react";

// Client component wrapper for tabs
export default function SimulationCenterClient({ initialData }: { initialData: any }) {
  const [activeTab, setActiveTab] = useState("Simulation Center");

  const options = [
    { name: "Academics", href: "/academics", active: false },
    { name: "Simulation Center", href: "/simulation-center", active: true }
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
    if (activeTab === "Payments") {
      setCaptchaCode(generateCaptcha());
    }
  }, [activeTab]);

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const userCaptcha = formData.get("captcha") as string;
    if (userCaptcha?.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      alert("Verification code is incorrect. Please try again.");
      return;
    }
    alert("Form submitted successfully!");
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
            <span className="hover:text-white transition-colors cursor-pointer">Academics</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Simulation Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Simulation Center
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
                  <Activity className="w-4 h-4" />
                  <span>Academics</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Dr. Indumati Amodkar Simulation Center
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              {/* In-Page Navigation / Tabs */}
              <div className="flex flex-wrap gap-2 mb-10 border-b border-slate-200 pb-4">
                {[
                  { id: "Simulation Center", icon: Activity },
                  { id: "Overview", icon: Info },
                  { id: "Payments", icon: CreditCard },
                  { id: "Courses", icon: BookOpen }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                      activeTab === tab.id 
                        ? "bg-[#002b5c] text-white shadow-md" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-teal-400" : "text-slate-400"}`} />
                    {tab.id}
                  </button>
                ))}
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === "Simulation Center" && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#007a87]"></div>
                    <div className="prose max-w-none text-slate-700 space-y-6">
                      {initialData?.introText1 && <p className="text-lg leading-relaxed">{initialData.introText1}</p>}
                      {initialData?.introText2 && <p className="text-lg leading-relaxed">{initialData.introText2}</p>}
                    </div>
                    {initialData?.image && (
                      <div className="mt-8 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                        <img 
                          src={initialData.image} 
                          alt="Simulation Center" 
                          className="w-full h-auto max-h-[500px] object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "Overview" && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#003360]"></div>
                    
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-2">Simulation Overview</h3>
                    <p className="text-slate-600 mb-8 border-b border-slate-100 pb-4">
                      Explore our state-of-the-art simulation facilities and labs.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { title: "Simulation Lab 1", href: "/simulation-center/lab-1", icon: <Info className="w-6 h-6" /> },
                        { title: "Simulation Lab 2", href: "/simulation-center/lab-2", icon: <Info className="w-6 h-6" /> },
                        { title: "Simulation Lab 3", href: "/simulation-center/lab-3", icon: <Info className="w-6 h-6" /> },
                        { title: "Other facilities on 14th floor", href: "/simulation-center/other-facilities", icon: <Building2 className="w-6 h-6" /> }
                      ].map((card, idx) => (
                        <Link key={idx} href={card.href} className="group/card block p-6 border border-slate-200 rounded-2xl hover:border-[#D9232D] hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:-translate-y-1 transition-all duration-300 bg-slate-50 hover:bg-white relative overflow-hidden">
                          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform text-[#007a87] group-hover/card:text-[#D9232D]">
                            {card.icon}
                          </div>
                          <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover/card:text-[#002b5c] transition-colors pr-6">
                            {card.title}
                          </h4>
                          <div className="absolute bottom-6 right-6 opacity-0 group-hover/card:opacity-100 transform translate-x-4 group-hover/card:translate-x-0 transition-all duration-300">
                            <ChevronRight className="w-5 h-5 text-[#007a87]" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === "Payments" && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm">
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-100 pb-4">Online Payment</h3>
                    <form className="space-y-6" onSubmit={handleSub}>
                      {/* Row 1 */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Purpose of Payment <span className="text-red-500">*</span></label>
                        <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">
                          <option>-- Select --</option>
                          <option>Simulation Course Fee</option>
                          <option>Workshop Registration</option>
                        </select>
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Name Of Payer <span className="text-red-500">*</span></label>
                          <input type="text" placeholder="Name Of Payer" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Contact Number <span className="text-red-500">*</span></label>
                          <input type="text" placeholder="Contact Number" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50" />
                        </div>
                      </div>

                      {/* Row 3 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Email Id <span className="text-red-500">*</span></label>
                          <input type="email" placeholder="Email ID" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Amount <span className="text-red-500">*</span></label>
                          <input type="text" placeholder="Amount" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50" />
                        </div>
                      </div>

                      {/* Row 4 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Address <span className="text-red-500">*</span></label>
                          <textarea rows={4} placeholder="Enter ..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50 resize-none"></textarea>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Country <span className="text-red-500">*</span></label>
                            <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">
                              <option>India</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">State <span className="text-red-500">*</span></label>
                            <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">
                              <option>-- Select --</option>
                              <option>Maharashtra</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Row 5 */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">City <span className="text-red-500">*</span></label>
                        <select className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50">
                          <option>-- Select --</option>
                          <option>Pune</option>
                        </select>
                      </div>

                      {/* Row 6 */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Comments</label>
                        <textarea rows={2} placeholder="Enter ..." className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50 resize-none"></textarea>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Captcha <span className="text-red-500">*</span></label>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-slate-200 px-4 py-2 rounded-lg tracking-widest font-mono font-bold text-lg text-slate-800 select-none">
                            {captchaCode}
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setCaptchaCode(generateCaptcha())}
                            className="text-blue-500 hover:text-blue-600 transition-colors"
                          >
                            <RefreshCw className="w-5 h-5" />
                          </button>
                        </div>
                        <input name="captcha" type="text" placeholder="Enter Captcha Text" className="w-full md:w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 bg-slate-50" required />
                      </div>

                      <div className="pt-4 flex justify-center md:justify-start">
                        <button type="submit" className="w-full md:w-[200px] py-3 bg-[#003360] text-white font-bold rounded-md hover:bg-[#002b5c] transition-colors shadow-sm">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {activeTab === "Courses" && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#002b5c]"></div>
                    
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-2">Simulation Home</h3>
                    <p className="text-slate-600 mb-8 border-b border-slate-100 pb-4">
                      Kindly click on the relevant tabs for viewing the list of courses.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Link href="/nbems-courses" className="group/card block p-6 border border-slate-200 rounded-2xl hover:border-[#D9232D] hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:-translate-y-1 transition-all duration-300 bg-slate-50 hover:bg-white relative overflow-hidden">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform">
                          <BookOpen className="w-6 h-6 text-[#007a87] group-hover/card:text-[#D9232D] transition-colors" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover/card:text-[#002b5c] transition-colors pr-6">
                          National Board of Examinations in Medical Sciences (NBEMS)
                        </h4>
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover/card:opacity-100 transform translate-x-4 group-hover/card:translate-x-0 transition-all duration-300">
                          <ChevronRight className="w-5 h-5 text-[#007a87]" />
                        </div>
                      </Link>

                      <Link href="/jeevan-rekha" className="group/card block p-6 border border-slate-200 rounded-2xl hover:border-[#D9232D] hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:-translate-y-1 transition-all duration-300 bg-slate-50 hover:bg-white relative overflow-hidden">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform">
                          <Activity className="w-6 h-6 text-[#007a87] group-hover/card:text-[#D9232D] transition-colors" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover/card:text-[#002b5c] transition-colors">
                          Jeevan Rekha
                        </h4>
                        <p className="text-sm text-slate-500 font-medium">
                          (For non-medical people)
                        </p>
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover/card:opacity-100 transform translate-x-4 group-hover/card:translate-x-0 transition-all duration-300">
                          <ChevronRight className="w-5 h-5 text-[#007a87]" />
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
