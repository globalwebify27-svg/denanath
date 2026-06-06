"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Globe, RefreshCw, Upload, Info, User, Calendar, MapPin, Phone, Mail, FileText, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";

export default function PatientRegistrationClient({ initialData }: { initialData: any }) {
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
        "active": false
    },
    {
        "name": "Patient Registration Form",
        "href": "/patient-registration",
        "active": true
    }
];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("formType", "Patient Registration");
    
    const userCaptcha = formData.get("captcha") as string;
    if (userCaptcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      alert("Verification code is incorrect. Please try again.");
      setIsSubmitting(false);
      return;
    }
    
    if (selectedImage) {
      formData.set("patientImage", selectedImage);
    }
    if (selectedDoc) {
      formData.set("patientDocument", selectedDoc);
    }

    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitSuccess(true);
      } else {
        alert("Error submitting registration. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const data = initialData || {
    pageTitle: "Patient Registration Form",
    introText: "Registration is a process by which patient is enrolled into the records of the hospital. This is required to provide seamless hospital services to the patient and to keep track of various services that are availed by the patient. This is also the first step to generate a medical record of the patient in which all medical details of the patient are documented.",
    introHighlight: "This facility is to be used only by patient coming first time to this hospital."
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
                
                <div className="mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                    <Globe className="w-4 h-4" />
                    <span>Online Facilities</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                    {data.pageTitle}
                  </h2>
                  <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
                  
                  <div className="bg-slate-50 border-l-4 border-[#007a87] p-6 rounded-r-2xl mb-8">
                    <p className="text-slate-700 leading-relaxed text-sm md:text-base m-0">
                      {data.introText} <span className="font-bold text-[#002b5c]">{data.introHighlight}</span>
                    </p>
                  </div>
                </div>

                {submitSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-12 text-center shadow-sm">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShieldCheck className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-emerald-800 mb-4">Registration Submitted!</h3>
                    <p className="text-emerald-700 text-lg mb-8 max-w-2xl mx-auto">Thank you for registering. Your details have been submitted successfully. Our team will verify your information.</p>
                    <button 
                      onClick={() => { setSubmitSuccess(false); setSelectedImage(null); setSelectedDoc(null); }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-bold transition-colors"
                    >
                      Register Another Patient
                    </button>
                  </div>
                ) : (
                <form className="space-y-12" onSubmit={handleSubmit}>
                  
                  {/* Patient Particulars */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87]"></div>
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                      <div className="bg-teal-50 p-2 rounded-xl text-teal-600">
                        <User className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-[#002b5c]">Patient Particulars</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      
                      <div className="lg:col-span-3">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Patient Image</label>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 shadow-sm rounded-xl cursor-pointer hover:bg-slate-50 hover:border-teal-500 transition-all">
                            <Upload className="w-5 h-5 text-[#007a87]" />
                            <span className="text-sm font-bold text-[#002b5c]">Choose File</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setSelectedImage(e.target.files[0]);
                                } else {
                                  setSelectedImage(null);
                                }
                              }}
                            />
                          </label>
                          <span className="text-sm font-medium text-slate-500 truncate max-w-[200px]">
                            {selectedImage ? selectedImage.name : "No file chosen"}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Title <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="title" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                            <option>-- Select --</option>
                          <option>Mr.</option>
                          <option>Mrs.</option>
                          <option>Ms.</option>
                          <option>Mast.</option>
                        
                          </select>
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input name="lastName" type="text" placeholder="Last Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input name="firstName" type="text" placeholder="First Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Middle Name</label>
                        <div className="relative">
                          <input name="middleName" type="text" placeholder="Middle Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">PAN Card No</label>
                        <div className="relative">
                          <input name="panNumber" type="text" placeholder="PAN Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <FileText className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Aadhar Number</label>
                        <div className="relative">
                          <input name="aadharNumber" type="text" placeholder="Aadhar Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <FileText className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Gender <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="gender" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                            <option>-- Select --</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        
                          </select>
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Father/Husband Name</label>
                        <div className="relative">
                          <input name="guardianName" type="text" placeholder="Relative's Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input name="dob" type="date" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium" />
                          <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Age <span className="text-red-500">*</span></label>
                        <div className="flex gap-3 items-center">
                          <div className="relative flex-1">
                            <input name="age" type="number" placeholder="Age" className="w-full px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          </div>
                          <span className="text-sm font-bold text-slate-500 bg-slate-50 px-4 py-3.5 rounded-xl border border-slate-100">Years</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Income Rs. (Approx)</label>
                        <div className="relative">
                          <input name="income" type="number" placeholder="Income Amount" className="w-full px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Local Address */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87]"></div>
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                      <div className="bg-teal-50 p-2 rounded-xl text-teal-600">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-[#002b5c]">Local Address</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">House Name/Appt.No <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input name="localAddress1" type="text" placeholder="Street Address 1" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Address 2</label>
                        <div className="relative">
                          <input name="localAddress2" type="text" placeholder="Street Address 2 (Optional)" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">PostOffice/Town</label>
                        <input name="localTown" type="text" placeholder="Town Name" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Country <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="localCountry" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                            <option>-- Select --</option>
                            <option>India</option>
                          </select>
                          <Globe className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">State <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="localState" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                            <option>-- Select --</option>
                            <option>Maharashtra</option>
                          </select>
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">District/City <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="localCity" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                            <option>-- Select --</option>
                            <option>Pune</option>
                          </select>
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                        <input name="localPincode" type="text" placeholder="Postal Code" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone (Home)</label>
                        <div className="relative">
                          <input name="localPhone" type="text" placeholder="Landline" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Office Phone</label>
                        <div className="relative">
                          <input name="localOfficePhone" type="text" placeholder="Office Contact" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Cell Phone <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input name="localMobile" type="text" placeholder="Mobile Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                        <div className="relative">
                          <input name="email" type="email" placeholder="example@email.com" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <p className="text-xs text-teal-600 mt-2 flex items-center gap-1.5 font-medium bg-teal-50 w-fit px-3 py-1.5 rounded-lg border border-teal-100">
                          <Info className="w-3.5 h-3.5" />
                          Confirmation email will be sent to this ID
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Copy to Permanent */}
                  <label className="flex items-center gap-3 bg-white p-5 rounded-2xl border-2 border-dashed border-[#007a87]/30 hover:border-[#007a87]/60 hover:bg-teal-50/30 transition-all cursor-pointer group shadow-sm">
                    <input name="copyAddress" type="checkbox" id="copy-address" className="w-5 h-5 text-[#007a87] rounded-md border-slate-300 focus:ring-[#007a87] cursor-pointer" />
                    <span className="text-base font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors">
                      Copy Local Address to Permanent Address
                    </span>
                  </label>

                  {/* Permanent Address */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87]"></div>
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-8">
                      <div className="bg-teal-50 p-2 rounded-xl text-teal-600">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-[#002b5c]">Permanent Address</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      
                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">House Name/Appt.No <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input name="permAddress1" type="text" placeholder="Street Address 1" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Address 2</label>
                        <div className="relative">
                          <input name="permAddress2" type="text" placeholder="Street Address 2 (Optional)" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">PostOffice/Town</label>
                        <input name="permTown" type="text" placeholder="Town Name" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Country <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="permCountry" className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                            <option>-- Select --</option>
                            <option>India</option>
                          </select>
                          <Globe className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">State <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="permState" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                            <option>-- Select --</option>
                            <option>Maharashtra</option>
                          </select>
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">District/City <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="permCity" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                            <option>-- Select --</option>
                            <option>Pune</option>
                          </select>
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                        <input name="permPincode" type="text" placeholder="Postal Code" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                        <div className="relative">
                          <input name="permPhone" type="text" placeholder="Landline" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500"></div>
                    <div className="flex items-center gap-3 border-b border-red-200/60 pb-4 mb-8">
                      <div className="bg-red-100 p-2 rounded-xl text-red-600">
                        <HeartPulse className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-red-900">Emergency Contact</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                        <div className="relative">
                          <input name="emLastName" type="text" placeholder="Last Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                        <div className="relative">
                          <input name="emFirstName" type="text" placeholder="First Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Middle Name</label>
                        <div className="relative">
                          <input name="emMiddleName" type="text" placeholder="Middle Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Relation</label>
                        <div className="relative">
                          <select name="emRelation" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                            <option>-- Select --</option>
                            <option>Self</option>
                            <option>Spouse</option>
                            <option>Other</option>
                          </select>
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Emergency Contact No</label>
                        <div className="relative">
                          <input name="emPhone" type="text" placeholder="Contact Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="lg:col-span-3 pt-4">
                        <hr className="border-red-100 mb-6" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Name of the Representative</label>
                        <div className="relative">
                          <input name="repName" type="text" placeholder="Representative Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Representative Relation</label>
                        <div className="relative">
                          <select name="repRelation" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                            <option>-- Select --</option>
                            <option>Self</option>
                            <option>Spouse</option>
                            <option>Other</option>
                          </select>
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>
                      
                      <div className="hidden lg:block"></div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Patient Document Type</label>
                        <div className="relative">
                          <select name="docType" className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                            <option>-- Select --</option>
                            <option>Aadhar card</option>
                            <option>Pan card</option>
                          </select>
                          <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">File Name</label>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 shadow-sm rounded-xl cursor-pointer hover:bg-slate-50 hover:border-teal-500 transition-all">
                            <Upload className="w-5 h-5 text-[#007a87]" />
                            <span className="text-sm font-bold text-[#002b5c]">Choose File</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setSelectedDoc(e.target.files[0]);
                                } else {
                                  setSelectedDoc(null);
                                }
                              }}
                            />
                          </label>
                          <span className="text-sm font-medium text-slate-500 truncate max-w-[200px]">
                            {selectedDoc ? selectedDoc.name : "No file chosen"}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Captcha & Submit */}
                  <div className="bg-gradient-to-b from-white to-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col items-center">
                    
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <ShieldCheck className="w-6 h-6 text-emerald-600" />
                      <span className="text-emerald-800 font-bold bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200 text-sm">
                        Secure Submission
                      </span>
                    </div>

                    <div className="w-full max-w-md">
                      <label className="block text-sm font-bold text-slate-700 mb-3 text-center">
                        <span className="text-red-500 mr-1">*</span>Security Verification
                      </label>
                      <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mb-5 bg-white p-3 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="bg-slate-800 px-4 sm:px-8 py-3 sm:py-3.5 tracking-widest sm:tracking-[0.5em] font-serif text-xl sm:text-2xl text-white select-none font-bold rounded-xl shadow-inner border border-slate-700">
                          {captchaCode}
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setCaptchaCode(generateCaptcha())}
                          className="text-blue-500 hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 p-3 sm:p-3.5 rounded-xl border border-blue-100 shadow-sm shrink-0"
                        >
                          <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </div>
                      <input name="captcha" type="text" placeholder="Enter Captcha Text" className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007a87] text-center font-medium shadow-sm transition-all mb-8" />
                      
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full bg-[#003360] hover:bg-[#002b5c] text-white py-4 sm:py-5 rounded-2xl font-bold text-lg transition-all shadow-[0_8px_20px_rgba(0,51,96,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,51,96,0.4)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                      >
                        {isSubmitting ? "Submitting Registration..." : "Submit Registration Form"}
                        {!isSubmitting && <ArrowRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />}
                      </button>
                    </div>
                  </div>
                </form>
                )}

                <div className="mt-12 text-center border-t border-slate-100 pt-6">
                  <p className="text-sm text-slate-500 font-medium">© 2020-2021 Deenanath Mangeshkar Hospital</p>
                </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}
