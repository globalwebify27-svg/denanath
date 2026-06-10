"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Building2, Briefcase, GraduationCap, Clock, FileText, Send, Phone, Mail, AlertCircle, Calendar, ArrowRight, Stethoscope, HeartPulse, Pill, X, Upload, User, ShieldCheck, RefreshCw } from "lucide-react";
import { jobsList } from "./careersData";

export default function CareersClient({ data }: { data: any }) {
  const options: any[] = [];

  const [activeCategory, setActiveCategory] = useState<string>("All Categories");
  const [applyingJob, setApplyingJob] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz023456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [captchaCode, setCaptchaCode] = useState("");

  useEffect(() => {
    if (applyingJob) {
      setCaptchaCode(generateCaptcha());
    }
  }, [applyingJob]);

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

  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("formType", "Job Application");
    formData.append("jobTitle", applyingJob?.title || "Unknown");

    const userCaptcha = formData.get("captcha") as string;
    if (userCaptcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      alert("Verification code is incorrect. Please try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        alert("There was an error submitting your application. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            <span className="hover:text-white transition-colors cursor-pointer">Hospital</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{data.pageTitle || "Careers"}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {data.pageTitle || "Careers"}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
          
          {/* Header & Instructions */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
              <Briefcase className="w-4 h-4" />
              <span>Join Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
              {data.pageHeader || "Active Requirements at DMH"}
            </h2>
            <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-[#007a87]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#002b5c] mb-1">How to Apply</h3>
                  <p className="text-slate-600 font-medium">{data.applyInstruction || "Please send an email with your CV, mentioning the Job Title in the subject line."}</p>
                </div>
              </div>
              <a href={`mailto:${data.applyEmail || "jobs@dmhospital.org"}`} className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#003360] hover:bg-[#003360] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap">
                <Send className="w-5 h-5" />
                {data.applyEmail || "jobs@dmhospital.org"}
              </a>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-16">
            {(data.jobs || jobsList).map((job: any, idx: number) => (
              <div key={idx} className="group bg-white border border-slate-200 hover:border-[#D9232D] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:-translate-y-1 flex flex-col h-full">
                {/* Job Title Header */}
                <div className="bg-slate-50 group-hover:bg-red-50 border-b border-slate-100 p-5 sm:p-6 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-[#002b5c] mb-1">{job.title}</h3>
                      {job.subtitle && <p className="text-sm font-bold text-teal-600">{job.subtitle}</p>}
                    </div>
                    <span className="text-2xl font-black text-slate-200 group-hover:text-[#D9232D] transition-colors">#{idx + 1}</span>
                  </div>
                </div>
                
                {/* Job Details */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col gap-4">
                  
                  {job.designation && (
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">Designation</span>
                        <span className="text-sm font-bold text-slate-800">{job.designation}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">Qualification</span>
                      <span className="text-sm font-bold text-slate-800">{job.qualification}</span>
                    </div>
                  </div>

                  {job.experience && (
                    <div className="flex items-start gap-3">
                      <Briefcase className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">Experience</span>
                        <span className="text-sm font-medium text-slate-700">{job.experience}</span>
                      </div>
                    </div>
                  )}
                  
                  {job.requirement && (
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">Requirement</span>
                        <span className="text-sm font-bold text-red-600">{job.requirement}</span>
                      </div>
                    </div>
                  )}

                  {job.preference && (
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">Preference</span>
                        <span className="text-sm font-medium text-slate-700">{job.preference}</span>
                      </div>
                    </div>
                  )}

                  {job.description && (
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-0.5">Job Description</span>
                        <span className="text-sm font-medium text-slate-600 leading-relaxed">{job.description}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-auto pt-4 flex flex-wrap gap-3">
                    {job.duty && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 border border-amber-100 rounded-lg text-xs font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {job.duty}
                      </div>
                    )}
                    {job.duration && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 border border-purple-100 rounded-lg text-xs font-bold">
                        <Calendar className="w-3.5 h-3.5" />
                        {job.duration}
                      </div>
                    )}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="p-5 sm:p-6 pt-0 mt-auto">
                  <button 
                    onClick={() => { setApplyingJob(job); setSelectedFile(null); }}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-[#002b5c] text-slate-700 hover:text-white font-bold rounded-xl transition-colors group/btn"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover/btn:opacity-100 group-hover/btn:ml-0 transition-all" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Department Contact Directory */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-extrabold text-[#002b5c] mb-2">Department Contact Directory</h3>
              <p className="text-slate-500">For specific departmental inquiries, please use the numbers below.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(data.contacts || []).map((contact: any, idx: number) => {
                let Icon = Building2;
                if (contact.iconType === "stethoscope1" || contact.iconType === "stethoscope2") Icon = Stethoscope;
                if (contact.iconType === "briefcase") Icon = Briefcase;
                if (contact.iconType === "heart") Icon = HeartPulse;
                if (contact.iconType === "pill") Icon = Pill;

                const colorClass = idx % 6 === 0 ? "bg-blue-50 text-blue-600" 
                  : idx % 6 === 1 ? "bg-teal-50 text-teal-600"
                  : idx % 6 === 2 ? "bg-purple-50 text-purple-600"
                  : idx % 6 === 3 ? "bg-orange-50 text-orange-600"
                  : idx % 6 === 4 ? "bg-rose-50 text-rose-600"
                  : "bg-emerald-50 text-emerald-600";

                return (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 ${colorClass} rounded-full flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-800 mb-1">{contact.title}</h4>
                    <p className="text-sm font-medium text-slate-600">{contact.phone}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Job Application Modal */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] flex flex-col relative my-auto animate-slideUp">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0 sticky top-0 bg-white z-10 rounded-t-3xl">
              <div>
                <h2 className="text-2xl font-extrabold text-[#002b5c]">Job Application Form</h2>
                <p className="text-sm font-semibold text-slate-500 mt-0.5">Applying for: {applyingJob.title}</p>
              </div>
              <button 
                onClick={() => { setApplyingJob(null); setSelectedFile(null); setSubmitSuccess(false); }}
                className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all duration-300 hover:rotate-180 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-0 overflow-y-auto bg-slate-50">
              {submitSuccess ? (
                <div className="p-12 text-center flex flex-col items-center justify-center h-full">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                    <ShieldCheck className="w-10 h-10 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#002b5c] mb-3">Application Submitted!</h3>
                  <p className="text-slate-600 mb-8 max-w-md">Thank you for applying to the {applyingJob?.title} position. Our HR team will review your application and contact you soon.</p>
                  <button 
                    onClick={() => { setApplyingJob(null); setSelectedFile(null); setSubmitSuccess(false); }}
                    className="bg-[#002b5c] hover:bg-[#001a38] text-white px-8 py-3 rounded-xl font-bold transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
              <form className="p-6 sm:p-8 space-y-6" onSubmit={handleJobSubmit}>
                
                {/* Personal Information */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87]"></div>
                  <h3 className="text-lg font-bold text-[#002b5c] mb-5 flex items-center gap-2">
                    <User className="w-5 h-5 text-teal-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Salutation <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select name="salutation" className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-10 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all cursor-pointer" required>
                          <option value="">Select</option>
                          <option value="Mr">Mr.</option>
                          <option value="Ms">Ms.</option>
                          <option value="Mrs">Mrs.</option>
                          <option value="Dr">Dr.</option>
                        </select>
                        <ChevronRight className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                      </div>
                    </div>
                    
                    <div className="md:col-span-3">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">First Name <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input name="firstName" type="text" placeholder="Enter your first name" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                        <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Middle Name</label>
                      <div className="relative">
                        <input name="middleName" type="text" placeholder="Enter middle name" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" />
                        <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Surname <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input name="lastName" type="text" placeholder="Enter surname" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                        <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date of Birth <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input name="dob" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all" required />
                        <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select name="gender" className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-10 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all cursor-pointer" required>
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <ChevronRight className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87]"></div>
                  <h3 className="text-lg font-bold text-[#002b5c] mb-5 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-teal-600" />
                    Contact Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Contact No <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input name="mobile" type="tel" placeholder="Mobile Number" maxLength={10} pattern="[0-9]{10}" title="Please enter a valid 10-digit mobile number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                        <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email ID <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input name="email" type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                        <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Details */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87]"></div>
                  <h3 className="text-lg font-bold text-[#002b5c] mb-5 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-teal-600" />
                    Professional Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Highest Qualification <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input name="highestQualification" type="text" placeholder="e.g. B.Sc Nursing" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                        <FileText className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Joining Status <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select name="joiningStatus" className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-10 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all cursor-pointer" required>
                          <option value="">Select</option>
                          <option value="Immediate">Immediate</option>
                          <option value="15 Days">15 Days</option>
                          <option value="30 Days">30 Days</option>
                          <option value="60 Days">60 Days</option>
                        </select>
                        <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <ChevronRight className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Current Salary <span className="text-red-500">*</span></label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 font-bold text-slate-400">₹</span>
                        <input name="currentSalary" type="text" placeholder="Amount" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-9 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Expected Salary <span className="text-red-500">*</span></label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 font-bold text-slate-400">₹</span>
                        <input name="expectedSalary" type="text" placeholder="Amount" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-9 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Resume / CV (PDF Max 2MB) <span className="text-red-500">*</span></label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-teal-50/50 hover:border-teal-400 transition-colors group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {selectedFile ? (
                          <>
                            <FileText className="w-8 h-8 text-teal-500 mb-3" />
                            <p className="mb-1 text-sm text-teal-700 font-bold max-w-[200px] truncate">{selectedFile.name}</p>
                            <p className="text-xs text-teal-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-slate-400 group-hover:text-teal-500 mb-3 transition-colors" />
                            <p className="mb-1 text-sm text-slate-600 font-semibold group-hover:text-teal-700"><span className="font-bold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-slate-500">PDF Document (Max. 2MB)</p>
                          </>
                        )}
                      </div>
                      <input 
                        name="resume"
                        type="file" 
                        className="hidden" 
                        accept=".pdf" 
                        required 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setSelectedFile(e.target.files[0]);
                          } else {
                            setSelectedFile(null);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Security and Submission */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col items-center text-center">
                  <div className="flex items-center gap-2 mb-4 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-800">Secure Application</span>
                  </div>
                  
                  <div className="w-full max-w-sm">
                    <label className="block text-sm font-bold text-slate-700 mb-3">Security Verification <span className="text-red-500">*</span></label>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-14 bg-slate-800 flex items-center justify-center rounded-xl border border-slate-700 font-mono text-2xl font-bold tracking-[0.3em] text-white select-none shadow-inner">
                          {captchaCode}
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setCaptchaCode(generateCaptcha())}
                          className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors border border-blue-100"
                        >
                          <RefreshCw className="w-5 h-5" />
                        </button>
                      </div>
                      <input 
                        name="captcha"
                        type="text" 
                        placeholder="Enter the code above"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-center text-slate-700 font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all"
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full mt-8 bg-[#003360] hover:bg-[#002b5c] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-[0_8px_20px_rgba(0,51,96,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,51,96,0.4)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                      {!isSubmitting && <ArrowRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </div>
                </div>

              </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
