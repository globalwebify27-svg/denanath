"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ActivitySquare, CheckCircle2, AlertCircle, Phone, Mail, Building2, FileText, IndianRupee } from "lucide-react";

export default function HealthPackagesPage() {
  const patientGuideOptions = [
    { name: "Out Patient Guide", href: "/out-patient", active: false },
    { name: "In Patient Guide", href: "/in-patient", active: false },
    { name: "Health Packages", href: "/health-packages", active: true },
    { name: "Facilities", href: "/facilities", active: false },
    { name: "Patients Stories / Feedbacks", href: "/feedbacks", active: false },
    { name: "Patient Rights & Responsibilities", href: "/patient-rights", active: false },
    { name: "Photos", href: "/gallery-photos", active: false },
    { name: "Videos", href: "/gallery-videos", active: false },
  ];

  const packages = [
    {
      name: "Basic Package",
      cost: "3820.00",
      payable: "3450.00",
      tests: ["Physician Consultation", "Eye Consultation", "Haemogram", "BSL (F & PP)", "Lipid Profile", "Sr. Creatinine", "Urine Routine/Microscopy", "ECG", "Chest X Ray"]
    },
    {
      name: "Senior Citizen",
      cost: "3890.00",
      payable: "3400.00",
      tests: ["Physician Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Sr. Creatinine", "Sr. TSH (Ultra)", "Urine Routine/Microscopy", "Blood Urea Level", "HbA1C", "ECG", "Chest X Ray"]
    },
    {
      name: "Executive - A",
      cost: "6540.00",
      payable: "5900.00",
      tests: ["Physician Consultation", "Eye Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Sr. Creatinine", "HbA1c", "Sr. TSH (Ultra)", "Urine Routine/Microscopy", "Blood Urea Level", "ECG", "Chest X Ray", "TMT(Stress Test)"]
    },
    {
      name: "Executive - B",
      cost: "8740.00",
      payable: "7850.00",
      tests: ["Physician Consultation", "Eye Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Sr. Creatinine", "Urine Routine/Microscopy", "Blood Urea Level", "SGOT", "SGPT", "HbA1c", "Sr. TSH (Ultra)", "ECG", "Chest X Ray", "TMT(Stress Test)", "Sonography (Abd + Pelvis)"]
    },
    {
      name: "Well Woman - I",
      cost: "5100.00",
      payable: "4770.00",
      tests: ["Gynaec Consultation", "HPV-Genotyping (16,18)", "Digital Mammography"]
    },
    {
      name: "Well Woman - II",
      cost: "6900.00",
      payable: "6390.00",
      tests: ["Gynaec Consultation", "HPV Genotyping (16,18)", "Digital Mammography", "Sonography (Abd + Pelvis)"]
    },
    {
      name: "Well Woman - III",
      cost: "5100.00",
      payable: "4590.00",
      tests: ["Gynaec Consultation", "Digital Mammography", "Sonography (Abd + Pelvis)"]
    },
    {
      name: "Well Woman - IV",
      cost: "4200.00",
      payable: "3960.00",
      tests: ["Gynaec Consultation", "HPV Genotyping (16,18)", "Sonography (Abd + Pelvis)"]
    },
    {
      name: "Comprehensive Package",
      cost: "8540.00",
      payable: "7700.00",
      tests: ["Physician Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Liver Function Test (Sr. Bilirubin, SGPT, SGOT, Sr. Alkaline Phosphatase,Sr. Protein)", "Renal Function Test (Blood Urea Level, Sr. Creatinine, Sr. Electrolytes, Sr. Uric Acid, Sr. Calcium, Sr. Phosphorus)", "Urine Routine/Microscopy", "HbA1c", "Sr. TSH (Ultra)", "ECG", "Chest X Ray", "TMT(Stress Test)", "Sonography (Abd + Pelvis)"]
    },
    {
      name: "Super Comprehensive Package",
      cost: "12090.00",
      payable: "10880.00",
      tests: ["Physician Consultation", "Eye Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Liver Function Test (Sr. Bilirubin, SGPT, SGOT, Sr. Alkaline Phosphatase,Sr. Protein)", "Renal Function Test (Blood Urea Level, Sr. Creatinine, Sr. Electrolytes, Sr. Uric Acid, Sr. Calcium, Sr. Phosphorus)", "Urine Routine/Microscopy", "HbA1c", "Sr. Vit B12", "25 OH Vit D", "Thyroid Function Test", "ECG", "Chest X Ray", "TMT(Stress Test)", "Sonography (Abd+Pel)"]
    },
    {
      name: "Super Comprehensive For Senior Citizen",
      cost: "12040.00",
      payable: "10350.00",
      tests: ["Physician Consultation", "Eye Consultation", "Haemogram", "BSL (F &PP)", "Lipid Profile", "Liver Function Test (Sr. Bilirubin, SGPT, SGOT, Sr. Alkaline Phosphatase,Sr. Protein)", "Renal Function Test (Blood Urea Level, Sr. Creatinine, Sr. Electrolytes, Sr. Uric Acid, Sr. Calcium, Sr. Phosphorus)", "Urine Routine/Microscopy", "HbA1c", "Sr. Vit B12", "25 OH Vit D", "Thyroid Function Test", "ECG", "Chest X Ray", "2 D Echo + Colour Doppler", "Sonography (Abd+Pel)"]
    }
  ];

  const companyList = [
    "AAM India Manufacturing Corporation Pvt Ltd",
    "ARAI (The Automotive Research Association of India)",
    "Fleetguard Filters Private Limited",
    "Bajaj Finserve Health Ltd",
    "Indian Oil Corporation Ltd ( IOCL)",
    "Jnana Prabodhini Medical Trust (JPMT)",
    "Maharshi Karve Stree Shikshan Sanstha (MKSS)",
    "Media Ocean India Pvt Ltd",
    "Prayas Health Group",
    "Prayas Energey Group",
    "Sheetal Wireless Technologies Pvt Ltd",
    "SVC Co Operative Bank Ltd",
    "Tata Motors Ltd",
    "Thyssen Krupp Industrial Solutions (India) Pvt Ltd",
    "Wai Technologies Pvt Ltd"
  ];

  const instructions = [
    "Kindly take prior appointment.",
    "For first time registration please bring a photo id proof such as PAN Card, Aadhaar Card, Passport.",
    "Please ensure you have fasted overnight (8 to 10 hrs) prior to the check-up.",
    "Do not consume any alcoholic beverages in any form for 72 hours prior to check-up.",
    "Please bring all your medical prescriptions and previous medical records with you.",
    "Kindly inform the Health Check reception if you have any history of diabetes or cardiac problem.",
    "We kindly request male participants in the TMT test to consider shaving their chest. Your co-operation is appreciated.",
    "We kindly request all corporate clients to bring company letter, employee ID, or any confirmation letter if credit billing is required.",
    "Please wear minimum jewellery on the day of health check-up.",
    "Access your investigation reports electronically on the patient portal the same day or following day.",
    "Any additional tests suggested by the Doctor during the consultation that are not included in the package will incur extra charge."
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
            <span className="text-white">Health Packages</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Health Packages
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
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                    <ActivitySquare className="w-4 h-4" />
                    <span>Patient Guide</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] tracking-tight">
                    Health Packages
                  </h2>
                </div>
                <div className="bg-amber-50 text-amber-800 border border-amber-200 px-4 py-2 rounded-lg font-medium text-sm self-start">
                  w.e.f. 16th Feb 2026
                </div>
              </div>
              <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-10"></div>

              <div className="space-y-12 text-slate-700">
                
                {/* Health Packages Grid */}
                <section>
                  <div className="grid md:grid-cols-2 gap-6">
                    {packages.map((pkg, idx) => (
                      <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full group">
                        <div className="p-5 md:p-6 bg-slate-50 border-b border-slate-100 flex-1">
                          <h3 className="text-xl font-bold text-[#002b5c] mb-4 group-hover:text-[#007a87] transition-colors">{pkg.name}</h3>
                          <ul className="space-y-2 mb-2">
                            {pkg.tests.map((test, testIdx) => (
                              <li key={testIdx} className="flex items-start gap-2 text-sm text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                                <span className="leading-tight">{test}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-5 bg-teal-50/50 flex flex-col sm:flex-row justify-between gap-4 border-t border-teal-100/50">
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Cost</p>
                            <p className="text-sm font-semibold text-slate-400 line-through flex items-center"><IndianRupee className="w-3.5 h-3.5 mr-0.5" /> {pkg.cost}</p>
                          </div>
                          <div className="sm:text-right">
                            <p className="text-xs text-[#007a87] uppercase font-bold tracking-wider mb-1">Payable Cost</p>
                            <p className="text-2xl font-bold text-[#007a87] flex items-center sm:justify-end"><IndianRupee className="w-5 h-5 mr-0.5" /> {pkg.payable}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 pt-8 border-t border-slate-100">
                  {/* Important Instructions */}
                  <section>
                    <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                      <FileText className="w-6 h-6 text-[#007a87]" />
                      Important Instructions
                    </h3>
                    <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                      <ul className="space-y-3">
                        {instructions.map((instruction, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <ChevronRight className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 leading-relaxed">{instruction}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-6 pt-6 border-t border-blue-100">
                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                          For Women
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          Pregnant woman or those suspecting pregnancy should inform us and are advised to avoid X-rays or similar test. It is advisable to refrain from undergoing any health check up during menstruation.
                        </p>
                      </div>
                    </div>
                  </section>

                  <div className="space-y-8">
                    {/* Appointments Contact */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                        <Phone className="w-6 h-6 text-[#007a87]" />
                        Book Appointment
                      </h3>
                      <div className="bg-[#002b5c] text-white rounded-2xl p-6 shadow-lg">
                        <h4 className="text-blue-200 text-sm font-bold uppercase tracking-wider mb-4">Health Check Appointments</h4>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-1" />
                            <div>
                              <p className="font-semibold text-lg">020 – 40151011</p>
                              <p className="font-semibold text-lg">020 – 40151015</p>
                              <p className="font-semibold text-lg">9158885173</p>
                              <p className="text-blue-200 text-sm mt-1">Mon to Sat, 10 a.m. to 6 p.m.</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                            <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                            <a href="mailto:pr@dmhospital.org" className="text-teal-100 hover:text-white transition-colors">pr@dmhospital.org</a>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Corporate Companies */}
                    <section>
                      <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-[#007a87]" />
                        Company List
                      </h3>
                      <div className="bg-white border border-slate-200 rounded-2xl p-5 h-[300px] overflow-y-auto custom-scrollbar">
                        <ul className="space-y-2">
                          {companyList.map((company, idx) => (
                            <li key={idx} className="flex items-start gap-2 border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                              <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                              <span className="text-sm text-slate-600">{company}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
