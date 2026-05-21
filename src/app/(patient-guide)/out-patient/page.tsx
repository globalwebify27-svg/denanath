"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, UserCircle2 } from "lucide-react";

export default function PatientGuidePage() {
  const patientGuideOptions = [
    { name: "Out Patient Guide", href: "/out-patient", active: true },
    { name: "In Patient Guide", href: "/in-patient", active: false },
    { name: "Health Packages", href: "/health-packages", active: false },
    { name: "Facilities", href: "/facilities", active: false },
    { name: "Patients Stories / Feedbacks", href: "/feedbacks", active: false },
    { name: "Patient Rights & Responsibilities", href: "/patient-rights", active: false },
    { name: "Photos", href: "/gallery-photos", active: false },
    { name: "Videos", href: "/gallery-videos", active: false },
  ];

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
            <span className="hover:text-white transition-colors cursor-pointer">Patient & Visitors</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Out Patient Guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Out Patient Guide
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
            <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {patientGuideOptions.map((option, idx) => (
                <Link
                  key={idx}
                  href={option.href}
                  data-active={option.active}
                  className={"snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal " + (
                    option.active
                      ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                      : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                  ) + " " + (idx !== patientGuideOptions.length - 1 ? "lg:border-b lg:border-b-slate-50" : "")}
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

          {/* Right Main Content */}
          <div className="w-full flex-1 min-w-0">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-5 sm:p-8 md:p-14">
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <UserCircle2 className="w-4 h-4" />
                  <span>Patient Guide</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Out Patient Guide
                </h2>
                
              </div>

              <div className="space-y-10 mt-8">
                
                {/* Guidelines Section */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6">Guidelines for OPD Patients :</h3>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 sm:p-6 md:p-8">
                    <p className="text-[#002b5c] font-semibold text-lg mb-4">Out Patient Department (OPD) works as follows :</p>
                    
                    <div className="mb-6">
                      <h4 className="font-bold text-[#007a87] mb-4">1. Registration.</h4>
                      <p className="text-slate-700 font-medium mb-4">Information About Patient Registration</p>
                      <ul className="list-none space-y-3 pl-2 md:pl-4">
                        <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>For availing services provided by Deenanath Mangeshkar Hospital, registration of patient is necessary.</span></li>
                        <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Registration is one-time activity whereby a unique MRD number is provided to every patient and patient’s medical information is linked to this number.</span></li>
                        <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>To make Registration Procedure hassle-free please make sure that you have either of these documents ready with you - Passport, PAN card, Adhaar card, Voter ID, Driving Licence.</span></li>
                        <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>DMH considers Registration as important process as Information given during Registration cannot be changed in future under any circumstances. DMH therefore requests you to fill the Registration Form very carefully.</span></li>
                        <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Giving misleading information and/or more than one registration of same person can lead to various problems like: Incomplete history presented to Doctors, problems with medical certificates, problems with Mediclaim approval etc.</span></li>
                        <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Please note that Registration Procedure may take around 8-10 minutes to get completed. Kindly co-operate with the Registration clerk and provide right information to him/her.</span></li>
                        <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>The online registration facility is also available. In that case, after filling out the form online, please come to the registration counter for getting the final MRD NO.</span></li>
                        <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Once the registration is completed, you will be given a card displaying your MRD number. Make sure you provide this number to Hospital personnel during your subsequent visits at DMH.</span></li>
                      </ul>
                    </div>

                    <ul className="list-none space-y-4 font-medium text-[#002b5c]">
                      <li>2. After registration, the patient goes to the respective OPD billing counter.</li>
                      <li>3. Make the receipt for respective consultant and visit to the respective OPD reception for further guidance regarding the consultation.</li>
                    </ul>

                    <ul className="list-none space-y-3 mt-6 pl-2 md:pl-4 border-t border-slate-200 pt-6">
                      <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><div className="w-1.5 h-1.5 rounded-full bg-[#007a87] shrink-0 mt-2.5" /><span>Some of the Outpatient Departments (OPDs) operate on an appointment system. To schedule an appointment, you can call <strong>020-40151100</strong>.</span></li>
                      <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><div className="w-1.5 h-1.5 rounded-full bg-[#007a87] shrink-0 mt-2.5" /><span>Walk-in patients will be accommodated alongside appointment patients; however, priority is given to those with appointments.</span></li>
                      <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><div className="w-1.5 h-1.5 rounded-full bg-[#007a87] shrink-0 mt-2.5" /><span>In addition, some consultants offer private OPD services in the hospital, which are available by appointment only.</span></li>
                      <li className="flex items-start gap-3 text-slate-600 leading-relaxed font-semibold"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-2.5" /><span>Please note that OPDs are closed on Sundays and national holidays</span></li>
                    </ul>
                  </div>
                </section>

                {/* Consultation Room */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6">OP Consultation Room :</h3>
                  <img 
                    src="https://www.dmhospital.org/cms/Media/image/opd-setup.jpg" 
                    alt="OP Consultation Room" 
                    className="w-full max-w-lg rounded-2xl shadow-md border border-slate-200 mb-8"
                  />
                  
                  <p className="text-[#002b5c] font-semibold text-lg mb-6">Following are General OPDs and Superspeciality OPDs :</p>
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                    {/* General OPDs */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      <h4 className="text-lg font-bold text-[#002b5c] mb-4 pb-4 border-b border-slate-100">General OPDs: Main Building :</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {[
                          "General Surgery", "Medicine", "Orthopaedics", "Paediatrics",
                          "ENT", "Dermatology", "Ophthalmology", "Psychiatry",
                          "Dentistry", "Ayurveda", "Homeopathy", "Physiotherapy"
                        ].map((opd, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <ChevronRight className="w-4 h-4 text-teal-600 shrink-0" />
                            <span>{opd}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Superspeciality OPDs */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      <h4 className="text-lg font-bold text-[#002b5c] mb-4 pb-4 border-b border-slate-100">Superspeciality OPDs : SS Building / Annexe Building :</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {[
                          "Oncology", "Neurosurgery", "Paediatric Oncology", "Cardiology",
                          "Ortho Oncology", "Endoscopy", "Heamatology", "Liver Transplant",
                          "Pain Clinic", "Rheumatology", "Palliative Care", "Respiratory Medicine",
                          "Clinical Psychology", "Paediatric Respiratory", "Cancer Genetics", "Infectitious & Travel Clinic",
                          "Radiation Oncology", "Allergic Clinic", "Oncosurgery", "Obesity",
                          "Wound care Clinic (HBOT)", "Endocrinolgy", "Vascular Surgery", "Paediatric Endocrinology",
                          "Spine Clinic", "Diet", "Joint Replacement", "Faetal Medicine",
                          "Foot & Ankle", "IVF", "Plastic Surgery", "NICU Graduate Clinic",
                          "Brachial Plexus", "Paediatric Epilepsy", "Voice Clinic", "Genetics",
                          "Shoulder & Sports", "Blooming Buds (Paediatric Orthopaedics)", "Urology", "Small Steps",
                          "Nephrology", "Nuclear Medicine", "Neurology"
                        ].map((opd, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <ChevronRight className="w-4 h-4 text-teal-600 shrink-0" />
                            <span>{opd}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Charges Table */}
                <section>
                  <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-8">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                      <thead>
                        <tr className="bg-[#1eb2a6] text-white text-sm font-medium">
                          <th className="p-4 whitespace-nowrap font-semibold">Charges</th>
                          <th className="p-4 whitespace-nowrap font-semibold border-l border-white/20">1st Visit (Rs)</th>
                          <th className="p-4 whitespace-nowrap font-semibold border-l border-white/20">Continuum Visit (Rs)</th>
                          <th className="p-4 whitespace-nowrap font-semibold border-l border-white/20">Senior citizen 1st Visit (Rs)</th>
                          <th className="p-4 whitespace-nowrap font-semibold border-l border-white/20">Senior citizen Continuum Visit (Rs)</th>
                          <th className="p-4 whitespace-nowrap font-semibold border-l border-white/20">Cross reference (Rs)</th>
                          <th className="p-4 whitespace-nowrap font-semibold border-l border-white/20">Cross reference Senior citizen (Rs)</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-slate-600 bg-white">
                        {[
                          { label: "Broad Speciality Interventional", v1: "600/-", v2: "350/-", v3: "400/-", v4: "300/-", v5: "450/-", v6: "300/-" },
                          { label: "Broad Speciality Non Interventional", v1: "700/-", v2: "400/-", v3: "450/-", v4: "350/-", v5: "550/-", v6: "350/-" },
                          { label: "Super Speciality Interventional", v1: "800/-", v2: "450/-", v3: "500/-", v4: "400/-", v5: "600/-", v6: "400/-" },
                          { label: "Super Speciality Non Interventional", v1: "900/-", v2: "500/-", v3: "600/-", v4: "450/-", v5: "700/-", v6: "450/-" },
                          { label: "Charity", v1: "10/-", v2: "10/-", v3: "10/-", v4: "10/-", v5: "10/-", v6: "10/-" },
                        ].map((row, i) => (
                          <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-medium text-slate-700">{row.label}</td>
                            <td className="p-4 border-l border-slate-100">{row.v1}</td>
                            <td className="p-4 border-l border-slate-100">{row.v2}</td>
                            <td className="p-4 border-l border-slate-100">{row.v3}</td>
                            <td className="p-4 border-l border-slate-100">{row.v4}</td>
                            <td className="p-4 border-l border-slate-100">{row.v5}</td>
                            <td className="p-4 border-l border-slate-100">{row.v6}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-bold text-[#002b5c] mb-3">Some General Rules:</h4>
                      <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                        <li>Re-registration charges are applicable consultant wise, after a gap of 90 days-1st visit consultation charges are applicable. (Exception Dentistry OPD).</li>
                        <li>Continuum visit charges are applicable to same consultant every after 10 days (Exception Ayurved, Dentistry, Paediatric & NICU Graduate clinic OPD).</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#002b5c] mb-3">Private OPD:</h4>
                      <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
                        Private OPD : Few consultants also run Private OPD in the hospital wherein consultation will be available with prior appointment. 
                        1st Visit Consultation charges are Rs.1000. Continumm Visit chares are Rs.500.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-[#002b5c] mb-3">Exceptional OPD consultation charges:</h4>
                      <p className="text-sm text-slate-600">
                        Exceptional specialities consultation charges are up to Rs. 1500.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
