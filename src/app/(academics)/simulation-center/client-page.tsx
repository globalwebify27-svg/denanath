"use client";

import React, { useState, useEffect, useRef } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { ChevronRight, Activity, Info, CreditCard, BookOpen, RefreshCw, Building2, Globe, Map, MapPin } from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";
import { submitFormAction } from "@/app/actions/submit-form";

// Client component wrapper for tabs
export default function SimulationCenterClient({ initialData, labsData }: { initialData: any, labsData?: any }) {
  const [activeTab, setActiveTab] = useState("Simulation Center");
  const [expandedLab, setExpandedLab] = useState<string | null>(null);

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSub = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const userCaptcha = formData.get("captcha") as string;
    
    if (userCaptcha?.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      alert("Verification code is incorrect. Please try again.");
      return;
    }

    setIsSubmitting(true);
    const res = await submitFormAction("Online Payment", formData);
    setIsSubmitting(false);

    if (res.success) {
      alert("Form submitted successfully!");
      form.reset();
      setCaptchaCode(generateCaptcha());
    } else {
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30 overflow-x-hidden">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Academics</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Simulation Center</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
            Simulation Center
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 md:pt-5 md:pb-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Dynamic Sidebar */}
          <DynamicSidebar categoryName="Academics" activeHref="/simulation-center" />

          {/* Right Main Content */}
          <div className="w-full flex-1 min-w-0">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-2 pb-6 sm:px-10 sm:pt-3 sm:pb-10 md:px-14 md:pt-4 md:pb-14">
              
              <div className="mb-5">
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <Activity className="w-4 h-4" />
                  <span>Academics</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Dr. Indumati Amodkar Simulation Center
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full"></div>
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
                    style={{ fontSize: '14px' }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 cursor-pointer ${
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
                      {initialData?.introText1 && <p className="text-base leading-relaxed">{initialData.introText1}</p>}
                      {initialData?.introText2 && <p className="text-base leading-relaxed">{initialData.introText2}</p>}
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
                    
                    <div className="space-y-4">
                      {[
                        { id: "lab1", title: labsData?.lab1?.title || "Simulation Lab 1", icon: <Info className="w-6 h-6" /> },
                        { id: "lab2", title: labsData?.lab2?.title || "Simulation Lab 2", icon: <Info className="w-6 h-6" /> },
                        { id: "lab3", title: labsData?.lab3?.title || "Simulation Lab 3", icon: <Info className="w-6 h-6" /> },
                        { id: "other", title: labsData?.other?.title || "Other facilities on 14th floor", icon: <Building2 className="w-6 h-6" /> }
                      ].map((card) => {
                        const isExpanded = expandedLab === card.id;
                        const labInfo = labsData?.[card.id];

                        return (
                          <div key={card.id} className={`border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-md bg-white border-[#007a87]/30' : 'bg-slate-50 hover:bg-white hover:border-[#D9232D]/50 hover:shadow-sm'}`}>
                            <button 
                              onClick={() => setExpandedLab(isExpanded ? null : card.id)} 
                              className="w-full text-left p-6 flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-[#007a87] text-white' : 'bg-teal-100 text-[#007a87]'}`}>
                                  {card.icon}
                                </div>
                                <h4 className={`text-base font-bold transition-colors ${isExpanded ? 'text-[#002b5c]' : 'text-slate-800'}`}>
                                  {card.title}
                                </h4>
                              </div>
                              <div className={`transform transition-transform duration-300 ${isExpanded ? "rotate-90 text-[#007a87]" : "text-slate-400"}`}>
                                <ChevronRight className="w-5 h-5" />
                              </div>
                            </button>
                            
                            {isExpanded && (
                              <div className="p-6 md:p-8 border-t border-slate-100 animate-in slide-in-from-top-2 fade-in duration-300 bg-white">
                                {labInfo?.content ? (
                                  <div style={{ fontSize: '14px' }} className="mb-8 prose prose-slate max-w-none break-words whitespace-normal overflow-hidden [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:mb-2 [&_li]:text-base [&_li]:!text-[#314158] [&_p]:text-base [&_p]:!text-[#314158] [&_strong]:!text-[#314158] [&_b]:!text-[#314158] [&_span]:!text-[#314158] [&_div]:!text-[#314158] prose-p:leading-relaxed prose-headings:!text-[#002b5c] !text-[#314158]" dangerouslySetInnerHTML={{ __html: labInfo.content.replace(/&nbsp;/g, ' ') }} />
                                ) : (
                                  <p className="mb-8 text-slate-500 italic">Content for this section will be updated soon.</p>
                                )}

                                {labInfo?.gallery && labInfo.gallery.length > 0 ? (
                                  <div className="mt-8 space-y-6">
                                    {labInfo.gallery.map((item: any, idx: number) => {
                                      const url = typeof item === 'string' ? item : item.url;
                                      const name = typeof item === 'string' ? "" : item.name;
                                      return (
                                      <div key={idx} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                        <img 
                                          src={url} 
                                          alt={name || `${labInfo.title} ${idx + 1}`} 
                                          className="w-full h-auto max-h-[500px] object-cover"
                                        />
                                        {name && <div className="p-4 bg-slate-50 border-t border-slate-100 text-center font-semibold text-slate-700">{name}</div>}
                                      </div>
                                      );
                                    })}
                                  </div>
                                ) : labInfo?.image ? (
                                  <div className="mt-8 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                    <img 
                                      src={labInfo.image} 
                                      alt={labInfo.title} 
                                      className="w-full h-auto max-h-[500px] object-cover"
                                    />
                                  </div>
                                ) : null}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {activeTab === "Payments" && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm">
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-6 border-b border-slate-100 pb-4">Online Payment</h3>
                    <div className="flex flex-col items-center justify-center py-12 space-y-6">
                      <p className="text-slate-600 text-lg text-center">
                        Please click the button below to proceed to our secure online payment portal.
                      </p>
                      <a 
                        href={initialData?.paymentLink || "https://www.dmhospital.org/pay/index.php"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-[#003360] text-white text-lg font-bold rounded-lg hover:bg-[#002b5c] transition-colors shadow-md inline-flex items-center gap-3"
                      >
                        <CreditCard className="w-5 h-5" />
                        Proceed to Payment
                      </a>
                    </div>
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
                        <h4 className="text-base font-bold text-slate-800 mb-2 group-hover/card:text-[#002b5c] transition-colors pr-6">
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
                        <h4 className="text-base font-bold text-slate-800 mb-2 group-hover/card:text-[#002b5c] transition-colors">
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
