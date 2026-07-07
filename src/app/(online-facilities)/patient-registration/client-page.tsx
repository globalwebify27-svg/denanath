"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Globe, RefreshCw, Upload, Info, User, Calendar, MapPin, Phone, Mail, FileText, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";
import CustomDropdown from "@/components/CustomDropdown";
import { submitFormAction } from "@/app/actions/submit-form";
import statesData from "@/data/statesAndDistricts.json";

const stateOptions = statesData.states.map((s: any) => s.state);
const getDistrictsForState = (stateName: string | undefined) => {
  const stateObj = statesData.states.find((s: any) => s.state === stateName);
  return stateObj ? stateObj.districts : [];
};

export default function PatientRegistrationFormPage({ pageData }: { pageData: any }) {
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
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("Bnvy");
  const [patientImageName, setPatientImageName] = useState<string>("No file chosen");
  const [documentImageName, setDocumentImageName] = useState<string>("No file chosen");
  const [patientImagePreview, setPatientImagePreview] = useState<string | null>(null);
  const [documentImagePreview, setDocumentImagePreview] = useState<string | null>(null);
  const patientImageInputRef = useRef<HTMLInputElement>(null);
  const documentImageInputRef = useRef<HTMLInputElement>(null);
  const [isCopying, setIsCopying] = useState(false);
  const [localStateVal, setLocalStateVal] = useState<string | undefined>(undefined);
  const [permCountryVal, setPermCountryVal] = useState<string | undefined>(undefined);
  const [permStateVal, setPermStateVal] = useState<string | undefined>(undefined);
  const [permDistrictVal, setPermDistrictVal] = useState<string | undefined>(undefined);

  const handleCopyAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsCopying(checked);
    if (checked && formRef.current) {
      const form = formRef.current;
      if(form.permHouseName) form.permHouseName.value = form.localHouseName?.value || "";
      if(form.permAddress2) form.permAddress2.value = form.localAddress2?.value || "";
      if(form.permTown) form.permTown.value = form.localTown?.value || "";
      if(form.permPincode) form.permPincode.value = form.localPincode?.value || "";
      if(form.permPhone) form.permPhone.value = form.localPhone?.value || "";
      
      setPermCountryVal(form.localCountry?.value || "");
      setPermStateVal(form.localState?.value || "");
      setPermDistrictVal(form.localDistrict?.value || "");
    }
  };

  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  useEffect(() => {
    generateCaptcha();
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
            <span className="text-white">Patient Registration Form</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {pageData?.title || "Patient Registration Form"}
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
                  <div style={{ fontSize: '14px' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                    <Globe className="w-4 h-4" />
                    <span>Online Facilities</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                    {pageData?.title || "Patient Registration Form"}
                  </h2>
                  <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
                  
                  <div className="bg-slate-50 border-l-4 border-[#007a87] p-6 rounded-r-2xl mb-8">
                    <p className="text-slate-700 leading-relaxed text-sm md:text-base m-0 whitespace-pre-line">
                      {pageData?.introText || "Registration is a process by which patient is enrolled into the records of the hospital. This is required to provide seamless hospital services to the patient and to keep track of various services that are availed by the patient. This is also the first step to generate a medical record of the patient in which all medical details of the patient are documented."} <span className="font-bold text-[#002b5c] block mt-2">{pageData?.highlightText || "This facility is to be used only by patient coming first time to this hospital."}</span>
                    </p>
                  </div>
                </div>

                <form 
                  ref={formRef}
                  className="space-y-12 [&_label]:!text-[18px] [&_input]:!text-[18px] [&_select]:!text-[18px] [&_textarea]:!text-[18px] [&_button]:!text-[18px] [&_.text-sm]:!text-[18px] [&_.text-xs]:!text-[18px]" 
                  action={async (formData) => { 
                    setIsSubmitting(true);
                    const res = await submitFormAction("Patient Registration", formData); 
                    if (res.success) {
                      alert("Form submitted successfully!"); 
                      formRef.current?.reset();
                      setPatientImageName("No file chosen");
                      setDocumentImageName("No file chosen");
                      setPatientImagePreview(null);
                      setDocumentImagePreview(null);
                      setLocalStateVal(undefined);
                      setPermCountryVal(undefined);
                      setPermStateVal(undefined);
                      setPermDistrictVal(undefined);
                      setIsCopying(false);
                      if (patientImageInputRef.current) patientImageInputRef.current.value = "";
                      if (documentImageInputRef.current) documentImageInputRef.current.value = "";
                    } else {
                      alert("Failed to submit form.");
                    }
                    setIsSubmitting(false);
                  }}
                >
                  
                  {/* Patient Particulars */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-visible group hover:shadow-md transition-shadow z-40">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87] rounded-l-3xl"></div>
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
                              name="patientImage" 
                              ref={patientImageInputRef}
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                setPatientImageName(file?.name || "No file chosen");
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => setPatientImagePreview(ev.target?.result as string);
                                  reader.readAsDataURL(file);
                                } else {
                                  setPatientImagePreview(null);
                                }
                              }}
                            />
                          </label>
                          
                          {patientImagePreview && (
                            <div className="relative group/imagebtn w-max h-max">
                              <img src={patientImagePreview} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                              <button
                                type="button"
                                onClick={() => {
                                  setPatientImagePreview(null);
                                  setPatientImageName("No file chosen");
                                  if (patientImageInputRef.current) patientImageInputRef.current.value = "";
                                }}
                                className="absolute -top-1.5 -right-1.5 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold transition-all shadow-sm opacity-0 pointer-events-none group-hover/imagebtn:opacity-100 group-hover/imagebtn:pointer-events-auto"
                                title="Remove Image"
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Title <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <CustomDropdown
  name="title"
  placeholder="-- Select --"
  options={[
    "Mr.",
    "Mrs.",
    "Ms.",
    "Mast."
  ]}
/></div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input type="text" name="firstName" placeholder="First Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Middle Name</label>
                        <div className="relative">
                          <input type="text" name="middleName" placeholder="Middle Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input type="text" name="lastName" placeholder="Last Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">PAN Card No</label>
                        <div className="relative">
                          <input type="text" name="panNumber" placeholder="PAN Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <FileText className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Aadhar Number</label>
                        <div className="relative">
                          <input type="text" name="aadharNumber" placeholder="Aadhar Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <FileText className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Gender <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <CustomDropdown
  name="gender"
  placeholder="-- Select --"
  icon={User}
  options={[
    "Male",
    "Female",
    "Other"
  ]}
/></div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Father/Husband Name</label>
                        <div className="relative">
                          <input type="text" name="relativeName" placeholder="Relative's Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input type="date" name="dob" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium" />
                          <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Age <span className="text-red-500">*</span></label>
                        <div className="flex gap-3 items-center">
                          <div className="relative flex-1">
                            <input type="number" name="age" placeholder="Age" className="w-full px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          </div>
                          <span className="text-sm font-bold text-slate-500 bg-slate-50 px-4 py-3.5 rounded-xl border border-slate-100">Years</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 whitespace-nowrap">Monthly Income Rs. (Approx)</label>
                        <div className="relative">
                          <input type="number" name="monthlyIncome" placeholder="Income Amount" className="w-full px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Local Address */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-visible group hover:shadow-md transition-shadow z-30">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87] rounded-l-3xl"></div>
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
                          <input type="text" name="localHouseName" placeholder="Street Address 1" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Address 2</label>
                        <div className="relative">
                          <input type="text" name="localAddress2" placeholder="Street Address 2 (Optional)" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">PostOffice/Town</label>
                        <input type="text" name="localTown" placeholder="Town Name" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Country <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <CustomDropdown 
  name="localCountry"
  placeholder="-- Select --"
  icon={Globe}
  options={[
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia & Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo (East Africa)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "HongKong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "IRAQ",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldievs",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "OTHER",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "PHILIPINES",
    "Poland",
    "Portugal",
    "Qatar",
    "Republic of Georgia",
    "Republic of Macedonia",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Serbia & Montenegro",
    "Seychelles",
    "SIERRA LEONEAN",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ]}
/>
                          
                          
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">State <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <CustomDropdown 
  name="localState"
  placeholder="-- Select --"
  options={stateOptions}
  value={localStateVal}
  onChange={setLocalStateVal}
/>
                          
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">District/City <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <CustomDropdown
  name="localDistrict"
  placeholder="-- Select --"
  options={getDistrictsForState(localStateVal)}
/></div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                        <input type="text" name="localPincode" placeholder="Postal Code" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone (Home)</label>
                        <div className="relative">
                          <input type="text" name="localPhone" placeholder="Landline" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Office Phone</label>
                        <div className="relative">
                          <input type="text" name="localOfficePhone" placeholder="Office Contact" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Cell Phone <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input type="text" name="localMobile" placeholder="Mobile Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" pattern="[0-9]{10}" maxLength={10} minLength={10} title="Please enter a valid 10-digit mobile number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10); }} />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                        <div className="relative">
                          <input type="email" name="email" placeholder="example@email.com" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
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
                    <input type="checkbox" id="copy-address" checked={isCopying} onChange={handleCopyAddress} className="w-5 h-5 text-[#007a87] rounded-md border-slate-300 focus:ring-[#007a87] cursor-pointer" />
                    <span className="text-base font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors">
                      Copy Local Address to Permanent Address
                    </span>
                  </label>

                  {/* Permanent Address */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-visible group hover:shadow-md transition-shadow z-20">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-[#007a87] rounded-l-3xl"></div>
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
                          <input type="text" name="permHouseName" placeholder="Street Address 1" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Address 2</label>
                        <div className="relative">
                          <input type="text" name="permAddress2" placeholder="Street Address 2 (Optional)" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">PostOffice/Town</label>
                        <input type="text" name="permTown" placeholder="Town Name" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Country <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <CustomDropdown
  placeholder="-- Select --"
  icon={Globe}
  options={[
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia & Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo (East Africa)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "HongKong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "IRAQ",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldievs",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "OTHER",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "PHILIPINES",
    "Poland",
    "Portugal",
    "Qatar",
    "Republic of Georgia",
    "Republic of Macedonia",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Serbia & Montenegro",
    "Seychelles",
    "SIERRA LEONEAN",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ]}
/></div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">State <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <CustomDropdown
  name="permState"
  value={permStateVal}
  onChange={setPermStateVal}
  placeholder="-- Select --"
  options={stateOptions}
/></div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">District/City <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <CustomDropdown
  name="permDistrict"
  value={isCopying ? permDistrictVal : undefined}
  placeholder="-- Select --"
  options={getDistrictsForState(permStateVal)}
/></div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                        <input type="text" name="permPincode" placeholder="Postal Code" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                        <div className="relative">
                          <input type="text" name="permPhone" placeholder="Landline" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-visible group hover:shadow-md transition-shadow z-10">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-red-500 rounded-l-3xl"></div>
                    <div className="flex items-center gap-3 border-b border-red-200/60 pb-4 mb-8">
                      <div className="bg-red-100 p-2 rounded-xl text-red-600">
                        <HeartPulse className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-extrabold text-red-900">Emergency Contact</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      
                      <div className="lg:col-span-3">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Emergency Contact Person</label>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                        <div className="relative">
                          <input type="text" name="emergencyFirstName" placeholder="First Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Middle Name</label>
                        <div className="relative">
                          <input type="text" name="emergencyMiddleName" placeholder="Middle Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                        <div className="relative">
                          <input type="text" name="emergencyLastName" placeholder="Last Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Relation</label>
                        <div className="relative">
                          <CustomDropdown
  name="emergencyRelation"
  placeholder="-- Select --"
  options={[
    "Self",
    "Spouse",
    "Brother",
    "Sister",
    "Friend",
    "Father",
    "Mother",
    "Relative",
    "Son",
    "Daughter",
    "Father in law",
    "Grand father",
    "Grand mother",
    "Husband",
    "Mother in law",
    "Wife",
    "Uncle",
    "Aunty",
    "Brother In Law",
    "Sister In Law",
    "Nephew",
    "Niece",
    "Son In Law",
    "Daughter In Law",
    "Grand Daughter",
    "Grand Son",
    "Major Brother",
    "Major Sister",
    "Major Son",
    "Major Daughter"
  ]}
/></div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Emergency Contact No</label>
                        <div className="relative">
                          <input type="text" name="emergencyContactNo" placeholder="Contact Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" pattern="[0-9]{10}" maxLength={10} minLength={10} title="Please enter a valid 10-digit mobile number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "").slice(0, 10); }} />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="lg:col-span-3 pt-4">
                        <hr className="border-red-100 mb-6" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Name of the Representative</label>
                        <div className="relative">
                          <input type="text" placeholder="Representative Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Representative Relation</label>
                        <div className="relative">
                          <CustomDropdown
  name="permState"
  placeholder="-- Select --"
  options={[
    "Self",
    "Spouse",
    "Brother",
    "Sister",
    "Friend",
    "Father",
    "Mother",
    "Relative",
    "Son",
    "Daughter",
    "Father in law",
    "Grand father",
    "Grand mother",
    "Husband",
    "Mother in law",
    "Wife",
    "Uncle",
    "Aunty",
    "Brother In Law",
    "Sister In Law",
    "Nephew",
    "Niece",
    "Son In Law",
    "Daughter In Law",
    "Grand Daughter",
    "Grand Son",
    "Major Brother",
    "Major Sister",
    "Major Son",
    "Major Daughter"
  ]}
/></div>
                      </div>
                      
                      <div className="hidden lg:block"></div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Patient Document Type</label>
                        <div className="relative">
                          <CustomDropdown
  placeholder="-- Select --"
  options={[
    "Driver's License Frontside",
    "Driver's License Backside",
    "Passport Book",
    "Aadhar card",
    "Election card",
    "Pan card",
    "Birth certificate",
    "Affidavit",
    "Marriage certificate",
    "Visa Details"
  ]}
/></div>
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">File Name</label>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 shadow-sm rounded-xl cursor-pointer hover:bg-slate-50 hover:border-teal-500 transition-all">
                            <Upload className="w-5 h-5 text-[#007a87]" />
                            <span className="text-sm font-bold text-[#002b5c]">Choose File</span>
                            <input 
                              type="file" 
                              name="patientDocument"
                              ref={documentImageInputRef}
                              className="hidden" 
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                setDocumentImageName(file?.name || "No file chosen");
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (ev) => setDocumentImagePreview(ev.target?.result as string);
                                  reader.readAsDataURL(file);
                                } else {
                                  setDocumentImagePreview(null);
                                }
                              }}
                            />
                          </label>
                          
                          {documentImagePreview && (
                            <div className="relative group/imagebtn w-max h-max">
                              <img src={documentImagePreview} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                              <button
                                type="button"
                                onClick={() => {
                                  setDocumentImagePreview(null);
                                  setDocumentImageName("No file chosen");
                                  if (documentImageInputRef.current) documentImageInputRef.current.value = "";
                                }}
                                className="absolute -top-1.5 -right-1.5 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold transition-all shadow-sm opacity-0 pointer-events-none group-hover/imagebtn:opacity-100 group-hover/imagebtn:pointer-events-auto"
                                title="Remove Document"
                              >
                                ✕
                              </button>
                            </div>
                          )}
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
                        <button type="button" onClick={generateCaptcha} className="text-blue-500 hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 p-3 sm:p-3.5 rounded-xl border border-blue-100 shadow-sm shrink-0">
                          <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </div>
                      <input type="text" placeholder="Enter Captcha Text" className="w-full px-5 py-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#007a87] text-center font-medium shadow-sm transition-all mb-8" />
                      
                      <button type="submit" disabled={isSubmitting} className="group w-full py-4 bg-[#003360] text-white font-bold text-lg rounded-xl hover:bg-[#002b5c] transition-all shadow-[0_8px_20px_rgba(0,51,96,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,51,96,0.4)] flex justify-center items-center gap-3 disabled:opacity-70 disabled:pointer-events-none">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Registration
                            <ArrowRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                </form>

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