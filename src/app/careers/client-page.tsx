"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, GraduationCap, Briefcase, ClipboardList, Mail, Users, Clock, ArrowRight, ShieldCheck, Phone, X, User, Calendar, Upload, RefreshCw, FileText, Send } from "lucide-react";
import { jobsList } from "./careersData";
import CustomDropdown from "@/components/CustomDropdown";



export default function CareersClientPage({ pageData }: { pageData: any }) {
  const [applyingJob, setApplyingJob] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz023456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    if (applyingJob) {
      setCaptchaCode(generateCaptcha());
    }
  }, [applyingJob]);

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
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30 pb-16">
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Hospital</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Careers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {pageData?.title || "Careers"}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">

          <div className="mb-10">
            <div style={{ fontSize: '14px' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
              <Users className="w-4 h-4" />
              <span>JOIN OUR TEAM</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">{pageData?.pageHeader || "Active Requirements at DMH"}</h2>
            <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
          </div>

          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-slate-200 shadow-sm">
                <Mail className="w-5 h-5 text-[#007a87]" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-[900] text-[#002b5c] mb-1">How to Apply</h3>
                <p className="text-slate-600 font-[500] text-sm md:text-base">{pageData?.applyInstruction || "Please send an email with your CV mentioning the Job Title in the subject line."}</p>
              </div>
            </div>
            <a href={`mailto:${pageData?.applyEmail || "jobs@dmhospital.org"}`} className="inline-flex items-center justify-center gap-2 bg-[#002b5c] hover:bg-[#001f44] text-white px-6 py-3.5 rounded-xl font-bold transition-colors whitespace-nowrap shrink-0 shadow-sm text-sm">
              <Send className="w-4 h-4" />{pageData?.applyEmail || "jobs@dmhospital.org"}</a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {(pageData?.jobs && pageData.jobs.length > 0 ? pageData.jobs : jobsList).map((job: any, idx: number) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl hover:border-[#D9232D] hover:shadow-[0_8px_30px_rgb(217,35,45,0.08)] transition-all duration-300 flex flex-col h-full group relative overflow-hidden">

                <div className="px-6 pt-6 md:px-8 md:pt-8 pb-6 group-hover:bg-[#fef2f2] transition-colors duration-300 relative">
                  <div className="absolute top-6 right-6 text-slate-200 font-black text-2xl group-hover:text-[#D9232D] transition-colors">
                    #{idx + 1}
                  </div>
                  <h3 className="text-xl md:text-2xl font-[900] text-[#002b5c] pr-12 leading-tight">
                    {job.title}
                  </h3>
                </div>

                <div className="px-6 md:px-8 pb-6 md:pb-8 flex-1 flex flex-col pt-2 [&_.text-sm]:!text-[18px]">
                  <div className="space-y-6 flex-1 mb-8">
                  {job.qualification && (
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                        <GraduationCap className="w-4 h-4 text-[#007a87]" />
                      </div>
                      <div className="pt-0.5">
                        <div className="text-[10px] font-[800] text-slate-400 uppercase tracking-widest mb-1.5">QUALIFICATION</div>
                        <div className="text-sm font-[700] text-[#002b5c] leading-snug">{job.qualification}</div>
                      </div>
                    </div>
                  )}

                  {job.experience && (
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="pt-0.5">
                        <div className="text-[10px] font-[800] text-slate-400 uppercase tracking-widest mb-1.5">EXPERIENCE</div>
                        <div className="text-sm font-[500] text-slate-600 leading-snug">{job.experience}</div>
                      </div>
                    </div>
                  )}

                  {job.description && (
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                        <ClipboardList className="w-4 h-4 text-purple-500" />
                      </div>
                      <div className="pt-0.5">
                        <div className="text-[10px] font-[800] text-slate-400 uppercase tracking-widest mb-1.5">JOB DESCRIPTION</div>
                        <div className="text-sm font-[500] text-slate-600 leading-relaxed">{job.description}</div>
                      </div>
                    </div>
                  )}

                  {job.requirement && (
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                        <ClipboardList className="w-4 h-4 text-orange-500" />
                      </div>
                      <div className="pt-0.5">
                        <div className="text-[10px] font-[800] text-slate-400 uppercase tracking-widest mb-1.5">REQUIREMENT</div>
                        <div className="text-sm font-[500] text-slate-600 leading-relaxed">{job.requirement}</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-auto flex flex-col gap-6">
                  {job.duty ? (
                    <div className="inline-flex items-center gap-1.5 w-fit bg-[#fffbeb] border border-orange-100 text-[#d97706] px-3.5 py-1.5 rounded-lg text-xs font-[800]">
                      <Clock className="w-3.5 h-3.5" />
                      {job.duty}
                    </div>
                  ) : (
                    <div className="h-8" />
                  )}

                  <button onClick={() => { setApplyingJob(job); setSelectedFile(null); }} className="w-full bg-[#f8fafc] border border-slate-200 text-[#002b5c] group-hover:bg-[#002b5c] group-hover:text-white group-hover:border-[#002b5c] font-[800] py-3.5 rounded-xl transition-all duration-300 shadow-sm text-sm tracking-wide flex items-center justify-center gap-2">
                    Apply Now
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  </button>
                </div>
              </div>
            </div>
            ))}
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
              <form className="p-6 sm:p-8 space-y-6 [&_label]:!text-[18px] [&_input]:!text-[18px] [&_select]:!text-[18px] [&_textarea]:!text-[18px] [&_button]:!text-[18px] [&_.text-sm]:!text-[18px] [&_.text-xs]:!text-[18px]" onSubmit={handleJobSubmit}>
                
                {/* Personal Information */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-visible group hover:shadow-md transition-shadow z-40">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87] rounded-l-2xl"></div>
                  <h3 className="text-lg font-bold text-[#002b5c] mb-5 flex items-center gap-2">
                    <User className="w-5 h-5 text-teal-600" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    <div className="md:col-span-1">
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Salutation <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <CustomDropdown 
                          name="salutation" 
                          placeholder="Select" 
                          options={["Mr.", "Ms.", "Mrs.", "Dr."]} 
                          required={true}
                        />
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
                        <CustomDropdown 
                          name="gender" 
                          placeholder="Select" 
                          icon={User}
                          options={["Male", "Female", "Other"]} 
                          required={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-visible group hover:shadow-md transition-shadow z-30">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87] rounded-l-2xl"></div>
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
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-visible group hover:shadow-md transition-shadow z-20">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87] rounded-l-2xl"></div>
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
                        <CustomDropdown 
                          name="joiningStatus" 
                          placeholder="Select" 
                          icon={Calendar}
                          options={["Immediate", "15 Days", "30 Days", "60 Days"]} 
                          required={true}
                        />
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
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-visible flex flex-col items-center text-center z-10">
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
