"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Globe, RefreshCw, Upload, Info, User, Calendar, MapPin, Phone, Mail, FileText, ArrowRight, ShieldCheck, HeartPulse } from "lucide-react";

const COUNTRIES = [
  "India",
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Denmark",
  "Dominica",
  "Egypt",
  "Ethiopia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Italy",
  "Japan",
  "Jordan",
  "Kenya",
  "Kuwait",
  "Lebanon",
  "Malaysia",
  "Mexico",
  "Morocco",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Oman",
  "Pakistan",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam",
  "Yemen",
  "Zimbabwe"
].sort((a, b) => {
  if (a === "India") return -1;
  if (b === "India") return 1;
  return a.localeCompare(b);
});

const STATES_INDIA = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
].sort();

const CITIES_MAHARASHTRA = [
  "Pune",
  "Mumbai",
  "Nagpur",
  "Thane",
  "Nashik",
  "Aurangabad (Chhatrapati Sambhajinagar)",
  "Solapur",
  "Amravati",
  "Navi Mumbai",
  "Kolhapur",
  "Nanded",
  "Sangli",
  "Jalgaon",
  "Akola",
  "Latur",
  "Dhule",
  "Ahmednagar",
  "Chandrapur",
  "Parbhani",
  "Jalna",
  "Satara",
  "Alibag",
  "Ratnagiri",
  "Sindhudurg",
  "Wardha",
  "Bhandara",
  "Gondia",
  "Gadchiroli",
  "Washim",
  "Hingoli",
  "Yavatmal",
  "Buldhana",
  "Nandurbar",
  "Osmanabad (Dharashiv)",
  "Beed"
].sort((a, b) => {
  if (a === "Pune") return -1;
  if (b === "Pune") return 1;
  return a.localeCompare(b);
});

const CITIES_BY_STATE: Record<string, string[]> = {
  "Maharashtra": CITIES_MAHARASHTRA,
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi"],
  "Karnataka": ["Bengaluru (Bangalore)", "Mysore", "Hubli", "Dharwad", "Mangalore", "Belgaum", "Gulbarga", "Davangere"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Vellore"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Tirupati"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh"],
  "West Bengal": ["Kolkata", "Howrah", "Darjeeling", "Asansol", "Siliguri", "Durgapur", "Kharagpur"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Allahabad", "Noida", "Aligarh", "Bareilly"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Bihar Sharif"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  "Haryana": ["Faridabad", "Gurugram (Gurgaon)", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Alappuzha", "Palakkad"]
};

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

  // Local address states
  const [localAddress1, setLocalAddress1] = useState("");
  const [localAddress2, setLocalAddress2] = useState("");
  const [localTown, setLocalTown] = useState("");
  const [localCountry, setLocalCountry] = useState("India");
  const [localState, setLocalState] = useState("Maharashtra");
  const [localCity, setLocalCity] = useState("Pune");
  const [localPincode, setLocalPincode] = useState("");

  // Permanent address states
  const [permAddress1, setPermAddress1] = useState("");
  const [permAddress2, setPermAddress2] = useState("");
  const [permTown, setPermTown] = useState("");
  const [permCountry, setPermCountry] = useState("India");
  const [permState, setPermState] = useState("Maharashtra");
  const [permCity, setPermCity] = useState("Pune");
  const [permPincode, setPermPincode] = useState("");

  // Copy checkbox state
  const [copyChecked, setCopyChecked] = useState(false);

  const handleCopyCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCopyChecked(checked);
    if (checked) {
      setPermAddress1(localAddress1);
      setPermAddress2(localAddress2);
      setPermTown(localTown);
      setPermCountry(localCountry);
      setPermState(localState);
      setPermCity(localCity);
      setPermPincode(localPincode);
    }
  };

  const updateLocalAddress1 = (val: string) => {
    setLocalAddress1(val);
    if (copyChecked) setPermAddress1(val);
  };
  const updateLocalAddress2 = (val: string) => {
    setLocalAddress2(val);
    if (copyChecked) setPermAddress2(val);
  };
  const updateLocalTown = (val: string) => {
    setLocalTown(val);
    if (copyChecked) setPermTown(val);
  };
  const updateLocalPincode = (val: string) => {
    setLocalPincode(val);
    if (copyChecked) setPermPincode(val);
  };
  const updateLocalCountry = (val: string) => {
    setLocalCountry(val);
    if (copyChecked) setPermCountry(val);
    if (val !== "India") {
      setLocalState("");
      setLocalCity("");
      if (copyChecked) {
        setPermState("");
        setPermCity("");
      }
    } else {
      setLocalState("Maharashtra");
      setLocalCity("Pune");
      if (copyChecked) {
        setPermState("Maharashtra");
        setPermCity("Pune");
      }
    }
  };
  const updateLocalState = (val: string) => {
    setLocalState(val);
    if (copyChecked) setPermState(val);
    const cities = CITIES_BY_STATE[val] || [];
    const defaultCity = cities[0] || "";
    setLocalCity(defaultCity);
    if (copyChecked) setPermCity(defaultCity);
  };
  const updateLocalCity = (val: string) => {
    setLocalCity(val);
    if (copyChecked) setPermCity(val);
  };

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
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input name="firstName" type="text" placeholder="First Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                          <input name="localAddress1" type="text" value={localAddress1} onChange={(e) => updateLocalAddress1(e.target.value)} placeholder="Street Address 1" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Address 2</label>
                        <div className="relative">
                          <input name="localAddress2" type="text" value={localAddress2} onChange={(e) => updateLocalAddress2(e.target.value)} placeholder="Street Address 2 (Optional)" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">PostOffice/Town</label>
                        <input name="localTown" type="text" value={localTown} onChange={(e) => updateLocalTown(e.target.value)} placeholder="Town Name" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Country <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="localCountry" value={localCountry} onChange={(e) => updateLocalCountry(e.target.value)} className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
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
                          {localCountry === "India" ? (
                            <select name="localState" value={localState} onChange={(e) => updateLocalState(e.target.value)} className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                              <option value="">-- Select --</option>
                              {STATES_INDIA.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          ) : (
                            <input type="text" name="localState" value={localState} onChange={(e) => { setLocalState(e.target.value); if (copyChecked) setPermState(e.target.value); }} placeholder="Enter State" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          )}
                          {localCountry === "India" && (
                            <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">District/City <span className="text-red-500">*</span></label>
                        <div className="relative">
                          {localCountry === "India" ? (
                            <select name="localCity" value={localCity} onChange={(e) => updateLocalCity(e.target.value)} className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer">
                              <option value="">-- Select --</option>
                              {(CITIES_BY_STATE[localState] || ["Other"]).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          ) : (
                            <input type="text" name="localCity" value={localCity} onChange={(e) => { setLocalCity(e.target.value); if (copyChecked) setPermCity(e.target.value); }} placeholder="Enter City" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          )}
                          {localCountry === "India" && (
                            <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                        <input name="localPincode" type="text" value={localPincode} onChange={(e) => updateLocalPincode(e.target.value)} placeholder="Postal Code" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone (Home)</label>
                        <div className="relative">
                          <input name="localPhone" type="tel" maxLength={10} pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} placeholder="Landline" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Office Phone</label>
                        <div className="relative">
                          <input name="localOfficePhone" type="tel" maxLength={10} pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} placeholder="Office Contact" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Cell Phone <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <input name="localMobile" type="tel" required maxLength={10} pattern="[0-9]{10}" title="Please enter a valid 10-digit mobile number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} placeholder="Mobile Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
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
                    <input name="copyAddress" type="checkbox" id="copy-address" checked={copyChecked} onChange={handleCopyCheckboxChange} className="w-5 h-5 text-[#007a87] rounded-md border-slate-300 focus:ring-[#007a87] cursor-pointer" />
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
                          <input name="permAddress1" type="text" value={permAddress1} disabled={copyChecked} onChange={(e) => setPermAddress1(e.target.value)} placeholder="Street Address 1" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Address 2</label>
                        <div className="relative">
                          <input name="permAddress2" type="text" value={permAddress2} disabled={copyChecked} onChange={(e) => setPermAddress2(e.target.value)} placeholder="Street Address 2 (Optional)" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed" />
                          <MapPin className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">PostOffice/Town</label>
                        <input name="permTown" type="text" value={permTown} disabled={copyChecked} onChange={(e) => setPermTown(e.target.value)} placeholder="Town Name" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Country <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="permCountry" value={permCountry} disabled={copyChecked} onChange={(e) => {
                            const val = e.target.value;
                            setPermCountry(val);
                            if (val !== "India") {
                              setPermState("");
                              setPermCity("");
                            } else {
                              setPermState("Maharashtra");
                              setPermCity("Pune");
                            }
                          }} className="w-full appearance-none px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed">
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
                          {permCountry === "India" ? (
                            <select name="permState" value={permState} disabled={copyChecked} onChange={(e) => {
                              const val = e.target.value;
                              setPermState(val);
                              const cities = CITIES_BY_STATE[val] || [];
                              setPermCity(cities[0] || "");
                            }} className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed">
                              <option value="">-- Select --</option>
                              {STATES_INDIA.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          ) : (
                            <input type="text" name="permState" value={permState} disabled={copyChecked} onChange={(e) => setPermState(e.target.value)} placeholder="Enter State" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed" />
                          )}
                          {permCountry === "India" && (
                            <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">District/City <span className="text-red-500">*</span></label>
                        <div className="relative">
                          {permCountry === "India" ? (
                            <select name="permCity" value={permCity} disabled={copyChecked} onChange={(e) => setPermCity(e.target.value)} className="w-full appearance-none px-4 py-3.5 pl-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium cursor-pointer disabled:bg-slate-50 disabled:cursor-not-allowed">
                              <option value="">-- Select --</option>
                              {(CITIES_BY_STATE[permState] || ["Other"]).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          ) : (
                            <input type="text" name="permCity" value={permCity} disabled={copyChecked} onChange={(e) => setPermCity(e.target.value)} placeholder="Enter City" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed" />
                          )}
                          {permCountry === "India" && (
                            <ChevronRight className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Pincode</label>
                        <input name="permPincode" type="text" value={permPincode} disabled={copyChecked} onChange={(e) => setPermPincode(e.target.value)} placeholder="Postal Code" className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400 disabled:bg-slate-50 disabled:cursor-not-allowed" />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                        <div className="relative">
                          <input name="permPhone" type="tel" maxLength={10} pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} placeholder="Landline" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
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
                        <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                        <div className="relative">
                          <input name="emFirstName" type="text" placeholder="First Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
                          <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                        <div className="relative">
                          <input name="emLastName" type="text" placeholder="Last Name" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
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
                          <input name="emPhone" type="tel" maxLength={10} pattern="[0-9]{10}" title="Please enter a valid 10-digit phone number" onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, ''); }} placeholder="Contact Number" className="w-full px-4 py-3.5 pl-11 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white shadow-sm transition-all text-slate-700 font-medium placeholder-slate-400" />
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
                  <p className="text-sm text-slate-500 font-medium">© 2020-2021 Deenanath Mangeshkar Hospital and Research Center</p>
                </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}
