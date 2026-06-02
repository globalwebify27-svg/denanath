"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Microscope, Building2, Briefcase } from "lucide-react";

export default function SponsorsCROsPage() {
  const sponsors = [
    "Abbott Vascular", "Adventrix Pharmaceutical Ltd.", "Amgen Inc", "Astellas Pharma", "Astra Zeneca",
    "Aveo Pharma Limited", "Bayer Healthcare Ag.", "Bharat Serum &Vaccines Ltd", "Biocon International",
    "Boehringer Ingelheim", "Boston Scientific", "Bristol & Myers Research & Development", "Bristol-Myers Squibb India Pvt. Ltd.",
    "Cadila Pharmaceutical Inc.", "Celltrion Healthcare", "Cipla Ltd", "Curetech Ltd.", "Daichi Sankyo Company Ltd.",
    "Dr Reddy’s Laboratories", "Eisai Inc.", "Eli Lilly & Company Ltd.", "Emcure Biotech Ltd.", "Forest Research Institute",
    "Fortis Escorts Heart Institute", "Fresenius Kabi Oncology Limited.", "G.W.Pharma Ltd", "Gilead Galapagos, EV",
    "Gennova Biopharmaceuticals Ltd..", "Glaxosmithkline (GSK)", "Hexal Ag Sandoz", "Hoffmann-La Roche.",
    "Inspiration Biopharmaceuticals", "Insys Therapeutics Inc.", "International Clinical Research H. Lundbeck",
    "J.W. Medical System", "Johnson & Johnson Pharmaceutical Research & Development.", "Leo Pharma", "Lundbeck A/S",
    "Lupin Bioresearch Centre", "Meril Life Sciences", "Merk Sharp & Dohme Corp", "Novartis Ltd", "Novo Nordisk Ltd",
    "Pfizer Inc", "Roche Inc", "Samsung Bioepis", "Sun Pharma", "Torrent Pharma", "V Life Sciences", "Wockhardt Bio Ag",
    "Watson Pharma", "Zimmer Ltd"
  ];

  const cros = [
    "Accutest Research Laboratories", "Boston Medtech", "Cinigene International Ltd.", "Clininvent Research Pvt. Ltd.",
    "Covance", "i3 Research Limited", "Icon clinical research", "Igate Clinical Research International Inc.",
    "Lambda Therapeutic Research limited.", "Manipal Acunova Ltd.", "Max Neeman International Ltd.", "Novartis",
    "Oncology Services India Ltd.", "Parexel International Ltd.", "PharmaNet Clinical Services", "Pharm-Olam International",
    "Pharmaceutical Product Development (PPD) International", "PRA International", "Quintiles Research Pvt. Ltd",
    "Reliance Life Science", "SIRO Clinpharm Pvt.Ltd", "Veeda Clinical Research"
  ];

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
        "active": false
    },
    {
        "name": "Annual Reports",
        "href": "/annual-reports",
        "active": false
    },
    {
        "name": "Sponsors & CROs",
        "href": "/sponsors-cros",
        "active": true
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
            <span className="text-white">Sponsors & CROs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Sponsors & CROs
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
                  Sponsors & CROs
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="space-y-12">
                {/* Sponsors Section */}
                <div>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#002b5c]">
                      Clinical Trial Research – Sponsors
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sponsors.map((sponsor, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] transition-all group cursor-default">
                        <div className="w-2 h-2 rounded-full bg-teal-400 group-hover:bg-[#D9232D] group-hover:scale-150 transition-all duration-300"></div>
                        <span className="text-slate-700 font-medium group-hover:text-[#007a87] transition-colors">{sponsor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CROs Section */}
                <div>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-[#007a87]" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#002b5c]">
                      Contract Research Organizations (CROs)
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cros.map((cro, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] transition-all group cursor-default">
                        <div className="w-2 h-2 rounded-full bg-teal-400 group-hover:bg-[#D9232D] group-hover:scale-150 transition-all duration-300"></div>
                        <span className="text-slate-700 font-medium group-hover:text-[#007a87] transition-colors">{cro}</span>
                      </div>
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