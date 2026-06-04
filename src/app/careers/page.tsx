"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Building2, Briefcase, GraduationCap, Clock, FileText, Send, Phone, Mail, AlertCircle, Calendar, ArrowRight, Stethoscope, HeartPulse, Pill, X, Upload, User, ShieldCheck, RefreshCw } from "lucide-react";

const jobsList = [
  {
    title: "Catering Guest Coordinator",
    qualification: "BHMCT/ IHMCT- Specialization F&B",
    experience: "Min. 2 years of Experience in F&B industry",
    description: "Guest coordination, complaints & queries resolving, maintain TAT for order delivery.",
    duty: "Rotational Shifts"
  },
  {
    title: "Housekeeping Supervisor",
    qualification: "Dip. In Hotel Management/ BHMCT",
    experience: "2+ years of Experience",
    description: "manpower handling, duty rostering & leave management.",
    duty: "Rotational Shifts"
  },
  {
    title: "Blood Bank Technician",
    qualification: "DMLT/ BSC in Blood transfusion / PGDMLT",
    experience: "1 to 3 years in Blood Bank/ Centre",
    description: "Blood grouping, cross matching, component separation and blood donation camps",
    duty: "Rotational shifts"
  },
  {
    title: "Dialysis Technician",
    qualification: "Diploma/ BSC in dialysis technology",
    experience: "1 to 3 years- preferably in hospital set up",
    description: "Haemodialysis, plasmapheresis, CRRT",
    duty: "Rotational shifts"
  },
  {
    title: "Biomedical Technician",
    qualification: "ITI Electrician/ Diploma in electrical engineering",
    experience: "1 to 2 years in maintenance department",
    description: "House wiring, UPS systems, Breakdown maintenance, electrical equipment maintenance",
    duty: "Rotational shifts"
  },
  {
    title: "Front Desk Executive",
    qualification: "BSc, BA, BCA, BBA or any other field graduate /post graduate",
    experience: "Fresher",
    description: "Patient/ guest coordination, front desk handling, queries resolving, call handling, etc.",
    duty: "Rotational shifts"
  },
  {
    title: "Pharmacy Retail / Jr. Trainee Pharmacist",
    qualification: "B. Pharm - Fresher/D. Pharm with 1 Year Experience",
    requirement: "Registration and PPP CARD Compulsory",
    description: "For Hospital Retail unit, Dispensing medicine, handling customer’s quires, Patient counseling, maintain inventory & record Keeping."
  },
  {
    title: "Admin Executive",
    qualification: "BDS/BHMS/BAMS with MBA in Hospital Administration",
    experience: "3+ years in similar role",
    description: "Coordination and supervision, Preparation of surgery list, maintenance of equipment, General administrative duties, Staff coordination.",
    duty: "Rotational Shifts"
  },
  {
    title: "Billing Cashier OPD Counter Staff",
    qualification: "BCom, BBA, BAF, MCom",
    experience: "Fresher",
    description: "managing and processing patient billing and payments, maintaining records of financial transactions.",
    duty: "Rotational Shifts"
  },
  {
    title: "Staff Nurse",
    qualification: "ANM, GNM, BSc- Nursing, PBBSc / Ward Care Nurse",
    experience: "Fresher",
    requirement: "MNC Registration Compulsory or applied for the MNC registration."
  },
  {
    title: "Patient Assistant Charity MSW",
    qualification: "MSW with medical and psychiatry specialization",
    experience: "2 to 5 Years",
    description: "This person will be responsible for supporting our charity programs. We are looking for experienced MSW who can manage data and records, communicate effectively with beneficiaries and team members, and ensure all activities are properly documented. The ideal candidate should be caring organized and able to handle day-to-day tasks smoothly."
  },
  {
    title: "Patient Assistant (Part time)",
    qualification: "Graduation pursuing students",
    experience: "Fresher",
    description: "Barcode Stickering and Scanning.",
    duty: "9am to 1pm or 1pm to 5pm"
  },
  {
    title: "Hostel Warden (Residential post)",
    qualification: "Any Graduate",
    experience: "Min. 2 years of experience",
    description: "To up keep infrastructure and safe environment, handling gate pass or night pass, physical support, pleasant experience.",
    duty: "24/7"
  },
  {
    title: "Microbiologist",
    qualification: "MBBS MD Microbiology",
    experience: "1 to 5 years of experience",
    description: "Interpretation, reporting and signing of routine aerobic culture results, smears with routine. Interpretation, reporting and signing AFB and fungal culture results. Verification of serology tests (routine and special).Interpretation of serology results and signing serology reports"
  },
  {
    title: "Physician Assistant",
    qualification: "BAMS + MS",
    experience: "0 to 1 years of experience",
    description: "Has experience in General Surgery, Transplant Surgery, and Onco Surgery. Freshers can also apply."
  },
  {
    title: "Project Technical Assistant",
    designation: "Project Technical Assistant / Technical Officer -III",
    duration: "Till the end of the project or max of 36 months (subject to renewal at 12 months; and availability of funds)",
    qualification: "3 years graduate degree in relevant subject / field + 3 years post qualification experience or PG in relevant subject / field"
  },
  {
    title: "Quality Improvement Associate",
    subtitle: "Quality NABH/A2C",
    qualification: "BHMS/BAMS With MBA (Hospital Administration)",
    experience: "More than 5 Years",
    description: "To support and strengthen Hospital’s quality and accreditation initiatives. The Ideal candidate should have keen interest in quality management approaches, process optimization, patient safety and continuous improvement aligned with NABH and A2C Standards."
  },
  {
    title: "Purchase Office Assistant",
    qualification: "BCom",
    experience: "1-5 Years",
    description: "Support Day-to-day purchase activities and vendor coordination. Maintain Purchase records, follow up on orders and assist with documentation"
  },
  {
    title: "Staff Doctor",
    qualification: "MBBS",
    experience: "2 to 4 Years Experience. Has experience in OPD handling"
  },
  {
    title: "Neuro Monitoring Technologist",
    qualification: "BSc in Neuroelectro physiology / Diploma in Neurology",
    experience: "1 to 4 Years",
    description: "The person at this position would be responsible for carrying out assigned clinical duties efficiently with regards to Intraoperative Monitoring (IOM) of patients undergoing Neuro and Spine surgeries that includes pre-operative assessment, IOM and post-operative findings review and report preparation."
  },
  {
    title: "Junior Hr Executive",
    qualification: "MBA HR",
    experience: "Minimum 2 Years",
    description: "We are hiring proactive and detail orientated Junior Hr Executive for recruitment process including Sourcing candidates through job portals, screening profiles, scheduling interviews, managing on boarding activities and documentation. Salary discussion and explaining benefits to candidate to successfully close open positions, manage in-house background verification process for shortlisted candidates, working in a group environment."
  },
  {
    title: "Consultant Preventive Medicine",
    qualification: "MBBS +PSM/MPH",
    experience: "2 - 5 yrs. Experience in non-communicable diseases, maternal and adolescent health, diabetes, hypertension, cardiovascular diseases, obesity, and women’s cancers etc.",
    preference: "Female"
  },
  {
    title: "Nuclear Medicine Technologist",
    qualification: "BSc/MSc Physics + PG Diploma in Nuclear Medicine (Approved by AERB) BSc/MSc Nuclear Medicine.",
    experience: "0 to 5 Years",
    description: "This position would be responsible for dealing with unsealed sources of radioisotopes for diagnosis and treatment and ensure the implementation of the protocols of the department as per the standards set by the management. To maintain records required for AERB in pre-defined format, make templates of PET CT reports, prepare radiopharmaceuticals for various scans like PSMA, DOTA etc."
  },
  {
    title: "Biomedical Engineer",
    qualification: "B.Tech / B.E, Diploma Course in biomedical/Instrumentation",
    experience: "0 to 3 Years",
    description: "The role includes maintenance, calibration, installation of medical devices and periodic performance evaluation with specialized duties focused on dialysis machines, USG machines, ICU Units and all accessories and disposables related to Medical Equipments."
  },
  {
    title: "MRD Quality Auditor",
    qualification: "BHMS/BAMS + MBA",
    experience: "5+ years",
    description: "Documentation before/ after discharge, Training to clinical staff, Documentation -clinical areas OPD and IPD, Timely meetings."
  },
  {
    title: "Optometrist",
    qualification: "BSc/ MSc Optometrist",
    experience: "1 to 5 Years",
    description: "The person at this position would be responsible for carrying out and assisting consultants in various examinations of patients and various types of procedures. To see patients in the OPD for refraction, Intra Ocular Pressure (IOP), slit lamp examination, power check, visual acuity testing (for all age group), color vision assessment, etc. and maintain software entries."
  },
  {
    title: "System Engineer",
    qualification: "B.E. / M.E. Computer Science, BCA/MCA, B.Sc./M.Sc. Computer Science, BCS/MCS",
    experience: "5 + Years",
    description: "To manage and monitor all installed systems and infrastructure, install, configure, test and maintain operating systems, application software and system management tools, maintain security, backup, and redundancy strategies, monitor and test application performance for potential bottlenecks, identify possible solutions, and work with developers to implement those fixes."
  }
];

export default function CareersPage() {
  const options: any[] = [];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [applyingJob, setApplyingJob] = useState<any>(null);

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
            <span className="text-white">Careers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Careers
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
              Active Requirements at DMH
            </h2>
            <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm text-[#007a87]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#002b5c] mb-1">How to Apply</h3>
                  <p className="text-slate-600 font-medium">Please send an email with your CV, mentioning the <strong className="text-slate-800">Job Title</strong> in the subject line.</p>
                </div>
              </div>
              <a href="mailto:jobs@dmhospital.org" className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#003360] hover:bg-[#003360] text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap">
                <Send className="w-5 h-5" />
                jobs@dmhospital.org
              </a>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-16">
            {jobsList.map((job, idx) => (
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
                    onClick={() => setApplyingJob(job)}
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
              <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 mb-1">Admin Staff</h4>
                <p className="text-sm font-medium text-slate-600">020-40151615 / 1616 / 1660</p>
              </div>
              
              <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-3">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 mb-1">Paramedical (Technician)</h4>
                <p className="text-sm font-medium text-slate-600">020-40151660 / 1664</p>
              </div>
              
              <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 mb-1">Doctors / Physiotherapist</h4>
                <p className="text-sm font-medium text-slate-600">020-40151616</p>
              </div>
              
              <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-3">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 mb-1">MPW</h4>
                <p className="text-sm font-medium text-slate-600">020-40151677</p>
              </div>
              
              <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mb-3">
                  <HeartPulse className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 mb-1">Nursing Staff</h4>
                <p className="text-sm font-medium text-slate-600">020-40151645 / 1698</p>
              </div>
              
              <div className="bg-white p-5 rounded-2xl border border-slate-100 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                  <Pill className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-800 mb-1">Pharmacy</h4>
                <p className="text-sm font-medium text-slate-600">020-40151699</p>
              </div>
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
                onClick={() => setApplyingJob(null)}
                className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all duration-300 hover:rotate-180 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-0 overflow-y-auto bg-slate-50">
              <form className="p-6 sm:p-8 space-y-6">
                
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
                        <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-3 pl-4 pr-10 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all cursor-pointer" required>
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
                        <input type="text" placeholder="Enter your first name" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                        <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Middle Name</label>
                      <div className="relative">
                        <input type="text" placeholder="Enter middle name" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" />
                        <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Surname <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type="text" placeholder="Enter surname" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                        <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Date of Birth <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all" required />
                        <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Gender <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-10 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all cursor-pointer" required>
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
                        <input type="tel" placeholder="Mobile Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                        <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email ID <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
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
                        <input type="text" placeholder="e.g. B.Sc Nursing" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                        <FileText className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Joining Status <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-10 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all cursor-pointer" required>
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
                        <input type="text" placeholder="Amount" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-9 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Expected Salary <span className="text-red-500">*</span></label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 font-bold text-slate-400">₹</span>
                        <input type="text" placeholder="Amount" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-9 pr-4 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all placeholder-slate-400" required />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Resume / CV (PDF Max 2MB) <span className="text-red-500">*</span></label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-teal-50/50 hover:border-teal-400 transition-colors group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-teal-500 mb-3 transition-colors" />
                        <p className="mb-1 text-sm text-slate-600 font-semibold group-hover:text-teal-700"><span className="font-bold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-slate-500">PDF Document (Max. 2MB)</p>
                      </div>
                      <input type="file" className="hidden" accept=".pdf" required />
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
                          ogOu3d
                        </div>
                        <button type="button" className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors border border-blue-100">
                          <RefreshCw className="w-5 h-5" />
                        </button>
                      </div>
                      <input 
                        type="text" 
                        placeholder="Enter the code above"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 text-center text-slate-700 font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm transition-all"
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="group w-full mt-8 bg-[#003360] hover:bg-[#002b5c] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-[0_8px_20px_rgba(0,51,96,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(0,51,96,0.4)] flex items-center justify-center gap-2"
                    >
                      Submit Application
                      <ArrowRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
