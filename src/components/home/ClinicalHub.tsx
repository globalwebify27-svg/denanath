"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Globe, FlaskConical, Heart, Home as HomeIcon, ShieldAlert, ChevronRight, ArrowRight, Microscope, Building2, GraduationCap, Users, BookOpen, Award 
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Globe, FlaskConical, Heart, HomeIcon, ShieldAlert, ChevronRight, ArrowRight, Microscope, Building2, GraduationCap, Users, BookOpen, Award
};
export const defaultClinicalHubData = {
  tagline: "Clinical Excellence",
  title: 'Our Specialized <span class="font-semibold">Clinical Hub</span>',
  description: "Interact with our specialized wings and emergency response desks below to explore custom diagnostics, global assistance, and homecare.",
  hubItems: [
    {
      id: "01",
      title: "DMH Diagnostics",
      iconString: "FlaskConical",
      themeColor: "#2563eb",
      activeClass: "border-l-4 border-l-blue-600 text-blue-600 bg-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-blue-600 hover:shadow-md border-slate-100"
    },
    {
      id: "02",
      title: "Wellness Packages",
      iconString: "Heart",
      themeColor: "#d97706",
      activeClass: "border-l-4 border-l-amber-600 text-amber-600 bg-white shadow-[0_15px_30px_-10px_rgba(217,119,6,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-amber-600 hover:shadow-md border-slate-100"
    },
    {
      id: "03",
      title: "Unique Clinics",
      iconString: "Microscope",
      themeColor: "#0d9488",
      activeClass: "border-l-4 border-l-teal-600 text-teal-600 bg-white shadow-[0_15px_30px_-10px_rgba(13,148,136,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-teal-600 hover:shadow-md border-slate-100"
    },
    {
      id: "04",
      title: "Facilities",
      iconString: "Building2",
      themeColor: "#4f46e5",
      activeClass: "border-l-4 border-l-indigo-600 text-indigo-600 bg-white shadow-[0_15px_30px_-10px_rgba(79,70,229,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-indigo-600 hover:shadow-md border-slate-100"
    },
    {
      id: "05",
      title: "Academics",
      iconString: "GraduationCap",
      themeColor: "#7c3aed",
      activeClass: "border-l-4 border-l-violet-600 text-violet-600 bg-white shadow-[0_15px_30px_-10px_rgba(124,58,237,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-violet-600 hover:shadow-md border-slate-100"
    },
    {
      id: "06",
      title: "Associates",
      iconString: "Users",
      themeColor: "#0891b2",
      activeClass: "border-l-4 border-l-cyan-600 text-cyan-600 bg-white shadow-[0_15px_30px_-10px_rgba(8,145,178,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-cyan-600 hover:shadow-md border-slate-100"
    },
    {
      id: "07",
      title: "Research",
      iconString: "BookOpen",
      themeColor: "#059669",
      activeClass: "border-l-4 border-l-emerald-600 text-emerald-600 bg-white shadow-[0_15px_30px_-10px_rgba(5,150,105,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-emerald-600 hover:shadow-md border-slate-100"
    },
    {
      id: "08",
      title: "Accreditation",
      iconString: "Award",
      themeColor: "#dc2626",
      activeClass: "border-l-4 border-l-red-600 text-red-600 bg-white shadow-[0_15px_30px_-10px_rgba(220,38,38,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-red-600 hover:shadow-md border-slate-100"
    }
  ],
  hubDetails: [
    {
      title: "DMH Diagnostics",
      image: "/images/hospital (2).webp",
      description: "NABL-accredited diagnostic laboratory and imaging services utilizing high-precision medical machinery. Book clinical pathology, advanced radiology, MRI, CT scans, and other profiles with instant online report retrieval.",
      iconString: "FlaskConical",
      themeColor: "#2563eb",
      featuresHeader: "Key Benefits & Protocols",
      features: [
        "Advanced high-precision laboratories and imaging",
        "Online test booking with secure patient login",
        "Digital health reports delivered via SMS & portal"
      ],
      ctaText: "Book Laboratory Tests",
      ctaLink: "/facilities",
      colorTheme: {
        border: "border-blue-100",
        bg: "bg-blue-50/30",
        iconPod: "bg-blue-50 text-blue-600",
        textAccent: "text-blue-600",
        bullet: "bg-blue-500",
        btn: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
      }
    },
    {
      title: "Wellness Packages",
      image: "/images/unnamed (10).webp",
      description: "Take charge of your health with preventive care screening programs. We offer multi-profile physicals, age-custom checkups, corporate screening packages, and dedicated wellness consultations.",
      iconString: "Heart",
      themeColor: "#d97706",
      featuresHeader: "Key Benefits & Protocols",
      features: [
        "Executive & corporate health checkup programs",
        "Comprehensive diagnostics & physical consultations",
        "Lifestyle modifications & nutrition coach guides"
      ],
      ctaText: "Explore Health Packages",
      ctaLink: "/health-packages",
      colorTheme: {
        border: "border-amber-100",
        bg: "bg-amber-50/30",
        iconPod: "bg-amber-50 text-amber-600",
        textAccent: "text-amber-600",
        bullet: "bg-amber-500",
        btn: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500"
      }
    },
    {
      title: "Unique Clinics",
      image: "/images/unnamed (16).webp",
      description: "Dedicated specialty clinics providing focused and comprehensive care for complex and rare conditions, staffed by our most experienced multi-disciplinary teams.",
      iconString: "Microscope",
      themeColor: "#0d9488",
      featuresHeader: "Key Benefits & Protocols",
      features: [
        "Specialized voice and swallow clinics",
        "Comprehensive pediatric and adult obesity management",
        "Dedicated advanced wound care and hyperbaric center"
      ],
      ctaText: "Explore Unique Clinics",
      ctaLink: "/unique-clinics",
      colorTheme: {
        border: "border-teal-100",
        bg: "bg-teal-50/30",
        iconPod: "bg-teal-50 text-teal-600",
        textAccent: "text-teal-600",
        bullet: "bg-teal-500",
        btn: "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
      }
    },
    {
      title: "Facilities",
      image: "/images/unnamed (18).webp",
      description: "Our world-class infrastructure is designed with a patient-first approach, combining cutting-edge medical technology with comforting, state-of-the-art healing environments.",
      iconString: "Building2",
      themeColor: "#4f46e5",
      featuresHeader: "Key Benefits & Protocols",
      features: [
        "Advanced modular operation theaters with latest tech",
        "Spacious, luxury private rooms and deluxe suites",
        "Centralized ICUs with high-dependency care units"
      ],
      ctaText: "View Facilities",
      ctaLink: "/facilities",
      colorTheme: {
        border: "border-indigo-100",
        bg: "bg-indigo-50/30",
        iconPod: "bg-indigo-50 text-indigo-600",
        textAccent: "text-indigo-600",
        bullet: "bg-indigo-500",
        btn: "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
      }
    },
    {
      title: "Academics",
      image: "/images/unnamed (9).webp",
      description: "Explore our comprehensive academic programs including NBEMS courses, fellowship programs, simulation-based training, and continuing medical education designed to nurture the next generation of healthcare professionals.",
      iconString: "GraduationCap",
      themeColor: "#7c3aed",
      featuresHeader: "Key Benefits & Programs",
      features: [
        "NBEMS-accredited postgraduate & fellowship courses",
        "State-of-the-art simulation center for hands-on training",
        "Continuing medical education & training programs"
      ],
      ctaText: "Explore Academics",
      ctaLink: "/academics",
      colorTheme: {
        border: "border-violet-100",
        bg: "bg-violet-50/30",
        iconPod: "bg-violet-50 text-violet-600",
        textAccent: "text-violet-600",
        bullet: "bg-violet-500",
        btn: "bg-violet-600 hover:bg-violet-700 focus:ring-violet-500"
      }
    },
    {
      title: "Associates",
      image: "/images/unnamed (10).webp",
      description: "Our network of distinguished associate hospitals and partner institutions extends our reach and ensures that world-class healthcare is accessible to communities across the region.",
      iconString: "Users",
      themeColor: "#0891b2",
      featuresHeader: "Key Highlights",
      features: [
        "Network of trusted associate hospitals & clinics",
        "Seamless patient referral & transfer coordination",
        "Shared expertise & collaborative medical programs"
      ],
      ctaText: "View Associates",
      ctaLink: "/associates",
      colorTheme: {
        border: "border-cyan-100",
        bg: "bg-cyan-50/30",
        iconPod: "bg-cyan-50 text-cyan-600",
        textAccent: "text-cyan-600",
        bullet: "bg-cyan-500",
        btn: "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500"
      }
    },
    {
      title: "Research",
      image: "/images/unnamed (16).webp",
      description: "Our dedicated research wing drives innovation in clinical and translational research. We publish in leading journals, host training events, and collaborate with global sponsors and CROs.",
      iconString: "BookOpen",
      themeColor: "#059669",
      featuresHeader: "Key Highlights",
      features: [
        "Published research in leading medical journals",
        "Active clinical trials & translational research programs",
        "Collaboration with global sponsors & CROs"
      ],
      ctaText: "Explore Research",
      ctaLink: "/research-about",
      colorTheme: {
        border: "border-emerald-100",
        bg: "bg-emerald-50/30",
        iconPod: "bg-emerald-50 text-emerald-600",
        textAccent: "text-emerald-600",
        bullet: "bg-emerald-500",
        btn: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500"
      }
    },
    {
      title: "Accreditation",
      image: "/images/unnamed (18).webp",
      description: "Our hospital proudly holds accreditations from leading national and international bodies, reflecting our unwavering commitment to quality, patient safety, and clinical excellence.",
      iconString: "Award",
      themeColor: "#dc2626",
      featuresHeader: "Key Highlights",
      features: [
        "NABH & NABL accredited for quality & safety standards",
        "International accreditations ensuring global benchmarks",
        "Continuous quality improvement & patient safety programs"
      ],
      ctaText: "View Accreditations",
      ctaLink: "/accreditations",
      colorTheme: {
        border: "border-red-100",
        bg: "bg-red-50/30",
        iconPod: "bg-red-50 text-red-600",
        textAccent: "text-red-600",
        bullet: "bg-red-500",
        btn: "bg-red-600 hover:bg-red-700 focus:ring-red-500"
      }
    }
  ]
};

export default function ClinicalHub({ data = defaultClinicalHubData }: { data?: any }) {
  if (!data || Object.keys(data).length === 0) data = defaultClinicalHubData;
  const [activeHub, setActiveHub] = useState(0);
  const [hoveredHub, setHoveredHub] = useState<number | null>(null);

  const hubItems = data.hubItems || defaultClinicalHubData.hubItems;

  const hubDetails = data.hubDetails || defaultClinicalHubData.hubDetails;

  const currentHub = hubDetails[activeHub];
  const ShowcaseIcon = iconMap[currentHub.iconString] || Globe;
  const theme = currentHub.colorTheme;

  return (
    <section className="w-full bg-gradient-to-br from-[#f0f7f7] via-white to-[#f5fbfb] py-[20px] md:py-10 border-t border-slate-100 relative z-30 mt-0">
      {/* Dynamic Background Patterns (lifeline SVG in light teal color) */}
      <div className="absolute inset-0 bg-[radial-gradient(#007a8703_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="absolute right-0 bottom-0 top-0 w-full max-w-lg text-[#007a87]/5 pointer-events-none select-none flex items-center justify-end -z-10">
        <svg viewBox="0 0 400 200" fill="none" className="w-full stroke-current" strokeWidth="2.5">
          <path d="M0,100 L120,100 L135,80 L150,120 L165,20 L185,180 L200,90 L215,110 L230,100 L400,100" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Modern Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-white text-[#007a87] text-[10px] font-bold tracking-widest uppercase border border-slate-200 shadow-sm">
            {data.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-[#002b5c] tracking-tight mt-6" dangerouslySetInnerHTML={{__html: data.title}}></h2>
          <p className="text-slate-600 text-base sm:text-lg font-normal leading-[31px] mt-4">{data.description}</p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Vertical Control Desk */}
          {/* Left Navigation Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-2 justify-center">
            {hubItems.map((hub: any, idx: number) => {
              const HubIcon = iconMap[hub.iconString] || Globe;
              const isActive = activeHub === idx;
              const isHovered = hoveredHub === idx;
              const themeColor = hub.themeColor;
              
              let dynamicStyle: React.CSSProperties = {};
              
              if (themeColor) {
                if (isActive) {
                  dynamicStyle = {
                    borderLeftColor: themeColor,
                    color: themeColor,
                    backgroundColor: 'white',
                    boxShadow: `0 15px 30px -10px ${themeColor}20`,
                    borderLeftWidth: '4px'
                  };
                } else {
                   dynamicStyle = {
                    borderLeftColor: 'transparent',
                    color: isHovered ? themeColor : '#334155',
                    backgroundColor: isHovered ? 'white' : 'rgba(255,255,255,0.7)',
                    boxShadow: isHovered ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
                    borderLeftWidth: '4px'
                   };
                }
              }

              return (
                <button
                  key={hub.id}
                  onClick={() => setActiveHub(idx)}
                  onMouseEnter={() => setHoveredHub(idx)}
                  onMouseLeave={() => setHoveredHub(null)}
                  className={`w-full text-left flex items-center justify-between px-5 py-[15px] rounded-2xl border transition-all duration-300 transform-gpu ${
                    themeColor ? (isActive ? 'border-slate-200' : 'border-slate-100') : (isActive ? hub.activeClass : hub.inactiveClass)
                  }`}
                  style={dynamicStyle}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold tracking-widest ${isActive ? "opacity-100" : "text-slate-400"}`}>
                      {hub.id}
                    </span>
                    <HubIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-lg font-bold tracking-tight">
                      {hub.title}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? "translate-x-1 opacity-100" : "opacity-0"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Premium Dynamic Detail Showcase with Split Image Layout */}
          <div className="lg:col-span-8">
            <div className={`h-full border border-slate-200 bg-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-stretch transition-all duration-300 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] min-h-[380px] transform-gpu`}>
              
              {/* Subtle decorative grid background inside the card */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Left text portion (60% width on md/lg screen sizes) */}
              <div className="relative z-10 flex-1 flex flex-col justify-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div 
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${currentHub.themeColor ? '' : theme?.iconPod}`}
                      style={currentHub.themeColor ? { backgroundColor: `${currentHub.themeColor}15`, color: currentHub.themeColor } : {}}
                    >
                      <ShowcaseIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Selected Department</span>
                      <h3 className="text-lg font-bold text-[#002b5c] tracking-tight">{currentHub.title}</h3>
                    </div>
                  </div>

                  <div 
                    className="text-slate-600 text-base sm:text-lg font-normal leading-[31px] prose prose-slate prose-p:leading-[31px] max-w-none"
                    dangerouslySetInnerHTML={{ __html: currentHub.description }}
                  />

                  <div className="space-y-3 pt-1">
                    <h4 className="text-[10px] font-bold text-[#002b5c] uppercase tracking-wider">
                      {currentHub.featuresHeader || "Key Benefits & Protocols"}
                    </h4>
                    <ul className="space-y-2">
                      {currentHub.features.map((feature: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-slate-600 text-base sm:text-lg font-normal leading-[31px]">
                          <span 
                            className={`w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0 ${currentHub.themeColor ? '' : theme?.bullet}`} 
                            style={currentHub.themeColor ? { backgroundColor: currentHub.themeColor } : {}}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Right image portion (40% width on md/lg screens) */}
              <div className="relative z-10 w-full md:w-[220px] lg:w-[280px] min-h-[200px] md:min-h-0 rounded-2xl overflow-hidden shadow-md border border-slate-100 shrink-0">
                <img 
                  src={currentHub.image} 
                  alt={currentHub.title}
                  className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-500 hover:scale-105"
                />
                {/* Subtle brand overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
