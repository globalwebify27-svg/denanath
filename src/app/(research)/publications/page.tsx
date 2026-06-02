"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Microscope } from "lucide-react";

export default function PublicationsPage() {
  const [showAll2025, setShowAll2025] = useState(false);
  const options = [
    {
        "name": "About Us",
        "href": "/research-about",
        "active": false
    },
    {
        "name": "Training And Events",
        "href": "/training-events",
        "active": false
    },
    {
        "name": "Awards",
        "href": "/awards",
        "active": false
    },
    {
        "name": "Newsletter Articles",
        "href": "/newsletter-articles",
        "active": false
    },
    {
        "name": "Publications",
        "href": "/publications",
        "active": true
    },
    {
        "name": "Annual Reports",
        "href": "/annual-reports",
        "active": false
    },
    {
        "name": "Sponsors & CROs",
        "href": "/sponsors-cros",
        "active": false
    },
    {
        "name": "Contact Us",
        "href": "/research-contact",
        "active": false
    }
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
            <span className="hover:text-white transition-colors cursor-pointer">Research</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Publications</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Publications
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
                  <Microscope className="w-4 h-4" />
                  <span>Research</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Publications
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="space-y-12">
                
                {/* 2025-2026 Publications */}
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-[#002b5c] flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                      </span>
                      April 2025 – March 2026
                    </h3>
                    <div className="hidden md:block px-4 py-1.5 rounded-full bg-[#003360] text-white text-sm font-bold shadow-sm">
                      Latest Publications
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-[#007a87] mb-6 flex items-center gap-2">
                    A] National Publications
                  </h4>
                  
                  <div className="space-y-6">
                    {/* Publication Item 1 */}
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
                      <p className="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
                        Closing the implementation gap: Process outcomes following a structured intraoperative bundle for emergency laparotomy.
                      </p>
                      <p className="text-slate-600 text-sm mb-3">
                        <span className="font-semibold text-slate-800">Baliga J, Iau P, Kavishwar P, Joseph J, Sebastian A.</span> (March 2026)
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <span className="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
                          Indian Journal of Anaesthesia. 70(3):477-484.
                        </span>
                        <a href="https://doi.org/10.4103/ija.ija_1716_25" target="_blank" rel="noopener noreferrer" className="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1">
                          DOI: 10.4103/ija.ija_1716_25
                        </a>
                      </div>
                    </div>

                    {/* Publication Item 2 */}
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
                      <p className="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
                        Intraperitoneal Chemotherapy as a Maintenance Treatment for Advanced Ovarian Cancer: Early Experience from Tertiary Care Center in India.
                      </p>
                      <p className="text-slate-600 text-sm mb-3">
                        <span className="font-semibold text-slate-800">Jagatap M, Tamhankar AS, Tamhankar T, Kulkarni P.</span> (February 2026)
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <span className="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
                          Indian Journal of Medical and Paediatric Oncology.
                        </span>
                        <a href="https://doi.org/10.1055/s-0045-1815747" target="_blank" rel="noopener noreferrer" className="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1">
                          DOI: 10.1055/s-0045-1815747
                        </a>
                      </div>
                    </div>

                    {/* Publication Item 3 */}
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
                      <p className="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
                        Tapia Syndrome: Clinical Presentation, Diagnosis and Management of 40 Patients During Covid-19 Pandemic.
                      </p>
                      <p className="text-slate-600 text-sm mb-3">
                        <span className="font-semibold text-slate-800">Gandhi S, Saindani S.</span> (February 2026)
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                        <span className="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
                          Acta Scientific Otolaryngology. 8(2):19-22.
                        </span>
                        <a href="https://doi.org/10.31080/ASOL.2026.08.0790" target="_blank" rel="noopener noreferrer" className="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1">
                          DOI: 10.31080/ASOL.2026.08.0790
                        </a>
                      </div>
                    </div>
                  </div>

                  {showAll2025 && (
                    <div className="space-y-6 mt-6 animate-in slide-in-from-top-4 fade-in duration-500">
                      {/* Publication Item 4 */}
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
                        <p className="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
                          Changing Paradigm for Reducing Proteinuria and Slowing Renal Insufficiency in People with Diabetic Kidney Disease.
                        </p>
                        <p className="text-slate-600 text-sm mb-3">
                          <span className="font-semibold text-slate-800">Bale C, Biradar V, Mulay A.</span> (January-June 2026)
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                          <span className="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
                            Chronicle of Diabetes Research and Practice. 5(1):6-9.
                          </span>
                          <a href="https://doi.org/10.4103/cdrp.cdrp_24_25" target="_blank" rel="noopener noreferrer" className="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1">
                            DOI: 10.4103/cdrp.cdrp_24_25
                          </a>
                        </div>
                      </div>

                      {/* Publication Item 5 */}
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
                        <p className="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
                          Benign Spindle Cell Neoplasm of the Helix: A Rare Cutaneous Ear Tumor.
                        </p>
                        <p className="text-slate-600 text-sm mb-3">
                          <span className="font-semibold text-slate-800">Saindani S, Gandhi S, Nair V.</span> (January 2026)
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                          <span className="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
                            Acta Scientific Otolaryngolog. 8(1):03-05.
                          </span>
                        </div>
                      </div>

                      {/* Publication Item 6 */}
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
                        <p className="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
                          Tuberculous tenosynovitis of wrist–a diagnostic uncertainty.
                        </p>
                        <p className="text-slate-600 text-sm mb-3">
                          <span className="font-semibold text-slate-800">Udayakumar D, Gauri Nandana A, Kishore B, Jamal A, Udaya V.</span> (January 2026)
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                          <span className="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
                            International Journal of Research in Orthopaedics. 12(1):242-244.
                          </span>
                          <a href="https://dx.doi.org/10.18203/issn.2455-4510.IntJResOrthop20254236" target="_blank" rel="noopener noreferrer" className="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1">
                            DOI: 10.18203/issn.2455-4510.IntJResOrthop20254236
                          </a>
                        </div>
                      </div>
                      
                      {/* Publication Item 7 */}
                      <div className="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
                        <p className="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
                          Delta (Δ) Albumin as a Predictor of Adverse Outcomes in Long Duration Head and Neck Surgeries-Prospective Observational Study.
                        </p>
                        <p className="text-slate-600 text-sm mb-3">
                          <span className="font-semibold text-slate-800">Pandey AR, Jaiswal S, Dwivedi V, Rath A, Dubey RK, Gupta BK, Singh Y.</span> (January 2026)
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                          <span className="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
                            Indian Journal of Otolaryngology and Head & Neck Surgery. 1-8.
                          </span>
                          <a href="https://doi.org/10.1007/s12070-025-06309-3" target="_blank" rel="noopener noreferrer" className="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1">
                            DOI: 10.1007/s12070-025-06309-3
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <button 
                      onClick={() => setShowAll2025(!showAll2025)}
                      className="w-full md:w-auto px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
                    >
                      {showAll2025 ? "View Less Publications" : "View All 2025-2026 Publications"}
                      <ChevronRight className={`w-4 h-4 transition-transform ${showAll2025 ? "-rotate-90" : "rotate-90"}`} />
                    </button>
                  </div>
                </div>

                <div className="h-px bg-slate-200 w-full my-12"></div>

                {/* 2024-2025 Publications Summary Block */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none"></div>
                  <h3 className="text-2xl font-extrabold text-[#002b5c] mb-3 relative z-10">Archive: 2017 – 2025</h3>
                  <p className="text-slate-600 max-w-xl mx-auto mb-8 relative z-10 leading-relaxed">
                    Explore our extensive history of clinical research, including hundreds of national and international publications across various medical disciplines.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                    {["2024 - 2025", "2023 - 2024", "2022 - 2023", "2021 - 2022", "2020 - 2021", "2019 - 2020", "2018 - 2019", "2017 - 2018"].map((year, idx) => (
                      <a key={idx} href="#" className="bg-white border border-slate-200 p-4 rounded-xl font-bold text-[#007a87] hover:bg-[#003360] hover:text-white hover:border-[#003360] hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:-translate-y-1 transition-all shadow-sm flex items-center justify-center text-sm md:text-base">
                        {year}
                      </a>
                    ))}
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
