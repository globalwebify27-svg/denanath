import React, { useState } from "react";
import Link from "next/link";
import { 
  Globe, FlaskConical, Heart, Home as HomeIcon, ShieldAlert, ChevronRight, ArrowRight 
} from "lucide-react";

export default function ClinicalHub() {
  const [activeHub, setActiveHub] = useState(0);

  const hubItems = [
    {
      id: "01",
      title: "International Desk",
      Icon: Globe,
      activeClass: "border-l-4 border-l-[#007a87] text-[#007a87] bg-white shadow-[0_15px_30px_-10px_rgba(0,122,135,0.12)] border-slate-200",
      inactiveClass: "border-l-4 border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-[#007a87] hover:shadow-md border-slate-100"
    },
    {
      id: "02",
      title: "DMH Diagnostics",
      Icon: FlaskConical,
      activeClass: "border-l-4 border-l-blue-600 text-blue-600 bg-white shadow-[0_15px_30px_-10px_rgba(37,99,235,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-blue-600 hover:shadow-md border-slate-100"
    },
    {
      id: "03",
      title: "Wellness Packages",
      Icon: Heart,
      activeClass: "border-l-4 border-l-amber-600 text-amber-600 bg-white shadow-[0_15px_30px_-10px_rgba(217,119,6,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-amber-600 hover:shadow-md border-slate-100"
    },
    {
      id: "04",
      title: "DMH @ Home",
      Icon: HomeIcon,
      activeClass: "border-l-4 border-l-purple-600 text-purple-600 bg-white shadow-[0_15px_30px_-10px_rgba(147,51,234,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-purple-600 hover:shadow-md border-slate-100"
    },
    {
      id: "05",
      title: "Trauma & ER Desk",
      Icon: ShieldAlert,
      activeClass: "border-l-4 border-l-red-600 text-red-600 bg-white shadow-[0_15px_30px_-10px_rgba(220,38,38,0.12)] border-slate-200",
      inactiveClass: "border-l-transparent text-slate-700 bg-white/70 hover:bg-white hover:text-red-600 hover:shadow-md border-slate-100"
    }
  ];

  const hubDetails = [
    {
      title: "International Desk",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
      description: "Dedicated global support tailored for international patients. We provide custom medical itineraries, language translation services, visa coordination, and luxury lodging guides to ensure a comfortable stay.",
      Icon: Globe,
      features: [
        "Personalized multi-lingual support coordinators",
        "Assistance with visa processing & travel logistics",
        "Curated luxury lodging & local transport arrangements"
      ],
      ctaText: "Access Global Support",
      ctaLink: "/patient-guide",
      colorTheme: {
        border: "border-teal-100",
        bg: "bg-teal-50/30",
        iconPod: "bg-teal-50 text-teal-600",
        textAccent: "text-teal-600",
        bullet: "bg-teal-500",
        btn: "bg-[#007a87] hover:bg-[#007a87]/90 focus:ring-teal-500"
      }
    },
    {
      title: "DMH Diagnostics",
      image: "https://images.unsplash.com/photo-1579154204601-01588f35116f?auto=format&fit=crop&q=80&w=600",
      description: "NABL-accredited diagnostic laboratory and imaging services utilizing high-precision medical machinery. Book clinical pathology, advanced radiology, MRI, CT scans, and other profiles with instant online report retrieval.",
      Icon: FlaskConical,
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
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
      description: "Take charge of your health with preventive care screening programs. We offer multi-profile physicals, age-custom checkups, corporate screening packages, and dedicated wellness consultations.",
      Icon: Heart,
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
      title: "DMH @ Home",
      image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600",
      description: "Access high-quality clinical care from the comfort of your home. Services include experienced visiting nurses, dedicated physical recovery therapy, home blood collection, and professional elder care assistance.",
      Icon: HomeIcon,
      features: [
        "Post-operative care & visiting nurses",
        "Home collection for all diagnostics & lab profiles",
        "Elder care assistance & physical therapy support"
      ],
      ctaText: "Book Home Services",
      ctaLink: "/facilities",
      colorTheme: {
        border: "border-purple-100",
        bg: "bg-purple-50/30",
        iconPod: "bg-purple-50 text-purple-600",
        textAccent: "text-purple-600",
        bullet: "bg-purple-500",
        btn: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
      }
    },
    {
      title: "Trauma & ER Desk",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=600",
      description: "A state-of-the-art level-1 emergency response department operating 24 hours a day. Outfitted with cardiac monitors, ventilators, emergency response vehicles, and specialized trauma surgeons.",
      Icon: ShieldAlert,
      features: [
        "24/7 direct access line to trauma department",
        "Advanced cardiac care & acute stroke protocols",
        "Quick ambulance dispatch & emergency response team"
      ],
      ctaText: "Emergency Hotline: +91 20 4015 1515",
      ctaLink: "tel:+912040151515",
      colorTheme: {
        border: "border-red-100",
        bg: "bg-red-50/30",
        iconPod: "bg-red-50 text-red-600",
        textAccent: "text-red-600",
        bullet: "bg-red-500",
        btn: "bg-red-600 hover:bg-red-700 focus:ring-red-500"
      }
    }
  ];

  const currentHub = hubDetails[activeHub];
  const ShowcaseIcon = currentHub.Icon;
  const theme = currentHub.colorTheme;

  return (
    <section className="w-full bg-gradient-to-br from-[#f0f7f7] via-white to-[#f5fbfb] py-20 sm:py-24 border-t border-b border-slate-100 relative z-30 mt-28">
      {/* Dynamic Background Patterns (lifeline SVG in light teal color) */}
      <div className="absolute inset-0 bg-[radial-gradient(#007a8703_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="absolute right-0 bottom-0 top-0 w-full max-w-lg text-[#007a87]/5 pointer-events-none select-none flex items-center justify-end -z-10">
        <svg viewBox="0 0 400 200" fill="none" className="w-full stroke-current" strokeWidth="2.5">
          <path d="M0,100 L120,100 L135,80 L150,120 L165,20 L185,180 L200,90 L215,110 L230,100 L400,100" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Modern Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full bg-white text-[#007a87] text-[10px] font-bold tracking-widest uppercase border border-slate-200 shadow-sm">
            Clinical Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-[#002b5c] tracking-tight mt-6">
            Our Specialized <span className="font-semibold">Clinical Hub</span>
          </h2>
          <p className="text-slate-600 text-sm font-light leading-relaxed mt-4">
            Interact with our specialized wings and emergency response desks below to explore custom diagnostics, global assistance, and homecare.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Vertical Control Desk */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 justify-center">
            {hubItems.map((hub, idx) => {
              const HubIcon = hub.Icon;
              const isActive = activeHub === idx;
              return (
                <button
                  key={hub.id}
                  onClick={() => setActiveHub(idx)}
                  onMouseEnter={() => setActiveHub(idx)}
                  className={`w-full text-left flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
                    isActive ? hub.activeClass : hub.inactiveClass
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold tracking-widest ${isActive ? "opacity-100" : "text-slate-400"}`}>
                      {hub.id}
                    </span>
                    <HubIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-bold tracking-tight">
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
            <div className={`h-full border border-slate-200 bg-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-stretch transition-all duration-500 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)]`}>
              
              {/* Subtle decorative grid background inside the card */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Left text portion (60% width on md/lg screen sizes) */}
              <div className="relative z-10 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.iconPod} shadow-inner`}>
                      <ShowcaseIcon className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Selected Department</span>
                      <h3 className="text-lg font-bold text-[#002b5c] tracking-tight">{currentHub.title}</h3>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed font-light">
                    {currentHub.description}
                  </p>

                  <div className="space-y-3 pt-1">
                    <h4 className="text-[10px] font-bold text-[#002b5c] uppercase tracking-wider">Key Benefits & Protocols</h4>
                    <ul className="space-y-2">
                      {currentHub.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-slate-700 text-xs">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${theme.bullet}`} />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-start">
                  {currentHub.ctaLink.startsWith("tel:") ? (
                    <a 
                      href={currentHub.ctaLink}
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest text-white transition-all duration-300 shadow-md ${theme.btn}`}
                    >
                      <span>{currentHub.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link 
                      href={currentHub.ctaLink}
                      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest text-white transition-all duration-300 shadow-md ${theme.btn}`}
                    >
                      <span>{currentHub.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Right image portion (40% width on md/lg screens) */}
              <div className="relative z-10 w-full md:w-[220px] lg:w-[280px] min-h-[200px] md:min-h-0 rounded-2xl overflow-hidden shadow-md border border-slate-100 shrink-0">
                <img 
                  src={currentHub.image} 
                  alt={currentHub.title}
                  className="w-full h-full object-cover object-center absolute inset-0 transition-transform duration-700 hover:scale-105"
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
