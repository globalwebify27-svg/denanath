import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const defaultPartnersData = {
  card1: {
    image: "/images/unnamed (13).webp",
    title: "DMH - A Trusted Healthcare Partner",
    description: "&ldquo;Combining professional competence with a human touch to deliver ethical, rational care and medico-social services.&rdquo;",
    links: [
      { text: "Associates Hospital", url: "/about-hospital" },
      { text: "Charity", url: "/charity" },
      { text: "Basic Infrastructure", url: "/basic-infrastructure" },
      { text: "Room Photo", url: "/room-photo" },
      { text: "Pillar of Support", url: "/pillar-of-support" },
      { text: "Academics", url: "/academics" },
      { text: "Values", url: "/values" },
    ]
  },
  card2: {
    image: "/images/unnamed (14).webp",
    title: "I'm A Patient",
    description: "Your safety is our priority with Pune's pioneering Emergency Medical Service, combining international-standard infrastructure and expert care when every second counts.",
    links: [
      { text: "Patient Rights & Responsibilities", url: "/patient-rights" },
      { text: "Hospital Admission Guide", url: "/patient-guide" },
      { text: "Patient & Visitor Experience", url: "/patient-guide" },
      { text: "Patient Guide", url: "/patient-guide" },
      { text: "Virtual Tour", url: "/virtual-tour" },
      { text: "Indoor Map", url: "/indoor-map" },
      { text: "Patient Stories", url: "/patient-stories" },
    ]
  },
  banner: {
    title: "Best Hospital In Pune, India",
    description: "DMH is NABH and NABL accredited, ensuring patient safety, quality standards, clinical excellence, & ethical healthcare delivery.",
    buttonText: "Accreditation & Quality",
    buttonUrl: "/accreditations",
    logos: [
      "/images/nabh-logo-23.png",
      "/images/NABL-LOGO.png"
    ]
  }
};

export default function PartnersAccreditation({ data = defaultPartnersData }: { data?: any }) {
  if (!data || Object.keys(data).length === 0) data = defaultPartnersData;
  const card1 = data.card1 || defaultPartnersData.card1;
  const card2 = data.card2 || defaultPartnersData.card2;
  const banner = data.banner || defaultPartnersData.banner;

  return (
    <section className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 py-[20px] md:py-0" style={{ marginBottom: '40px' }}>
      {/* Subtle background waves behind the cards, keeping the main page background light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -top-10 left-10 w-[45%] h-[120%] text-[#002b5c]/5 fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 C30,40 70,40 100,100 Z" />
        </svg>
        <svg className="absolute -bottom-10 right-10 w-[55%] h-[120%] text-[#c70909]/5 fill-current" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,100 C30,50 70,30 100,100 Z" />
        </svg>
      </div>

      <div className="relative z-10 space-y-8">
        
        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: DMH - A Trusted Healthcare Partner */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,43,92,0.06)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group flex flex-col">
            
            {/* Image Banner Header */}
            <div className="h-48 sm:h-56 w-full relative overflow-hidden">
              <img 
                src={card1.image} 
                alt={card1.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay for smooth blending into the card */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
            </div>

            <div className="relative z-10 space-y-3 p-6 pt-2 sm:p-8 sm:pt-4 flex-1 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#002b5c] tracking-tight">
                {card1.title}
              </h3>
              <p className="text-slate-500 text-[16px] font-normal leading-[31px]" dangerouslySetInnerHTML={{__html: card1.description}}>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                {card1.links.map((link: any, i: number) => (
                  <Link 
                    key={i}
                    href={link.url} 
                    className="inline-flex items-center gap-3 text-slate-700 hover:text-[#002b5c] text-xs font-bold transition-colors group/link"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#002b5c] text-white flex items-center justify-center group-hover/link:bg-[#007a87] transition-colors shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </span>
                    <span>{link.text}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Card 2: I'm A Patient */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(199,9,9,0.04)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group flex flex-col">
            
            {/* Image Banner Header */}
            <div className="h-48 sm:h-56 w-full relative overflow-hidden">
              <img 
                src={card2.image} 
                alt={card2.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-top"
              />
              {/* Gradient overlay for smooth blending into the card */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
            </div>

            <div className="relative z-10 space-y-3 p-6 pt-2 sm:p-8 sm:pt-4 flex-1 flex flex-col">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#002b5c] tracking-tight">
                {card2.title}
              </h3>
              <p className="text-slate-500 text-[16px] font-normal leading-[31px]" dangerouslySetInnerHTML={{__html: card2.description}}>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                {card2.links.map((link: any, i: number) => (
                  <Link 
                    key={i}
                    href={link.url} 
                    className="inline-flex items-center gap-3 text-slate-700 hover:text-red-600 text-xs font-bold transition-colors group/link"
                  >
                    <span className="w-7 h-7 rounded-full bg-[#c70909] text-white flex items-center justify-center group-hover/link:bg-red-700 transition-colors shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </span>
                    <span>{link.text}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>

        <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50/50 rounded-3xl px-6 sm:px-8 py-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
          
          {/* Subtle background elements for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,122,135,0.03),transparent_40%)] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            
            {/* Left Side: Hexagonal Clipboard Icon & Text */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row items-center text-center sm:text-left gap-5">
              
              {/* Hexagon Clipboard Icon Pod */}
              <div className="relative w-16 h-18 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center filter drop-shadow-sm">
                {/* Inner White polygon */}
                <svg className="absolute inset-0 w-full h-full text-white" viewBox="0 0 100 115" fill="currentColor">
                  <polygon points="50,5 95,31 95,84 50,110 5,84 5,31" />
                </svg>
                {/* Outline border polygon in Brand Teal */}
                <svg className="absolute inset-0 w-full h-full text-[#007a87]" viewBox="0 0 100 115" fill="none" stroke="currentColor" strokeWidth="4">
                  <polygon points="50,2 98,30 98,85 50,113 2,85 2,30" />
                </svg>
                {/* Clipboard Icon */}
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#002b5c] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>

              <div className="space-y-1">
                <div 
                  className="text-lg sm:text-xl font-extrabold text-[#002b5c] tracking-tight leading-snug prose prose-sm prose-p:leading-snug prose-p:m-0 prose-p:font-extrabold"
                  dangerouslySetInnerHTML={{__html: banner.title}}
                />
                <div 
                  className="text-slate-500 text-[16px] font-normal leading-[31px] max-w-xl prose prose-sm prose-p:leading-[31px] prose-p:m-0"
                  dangerouslySetInnerHTML={{__html: banner.description}}
                />
              </div>

            </div>

            {/* Right Side: Button and Stamps */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-6 lg:justify-end w-full overflow-hidden">
              
              <Link 
                href={banner.buttonUrl} 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#007a87] text-white hover:bg-[#c70909] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg text-center"
              >
                <span>{banner.buttonText}</span>
                <ArrowRight className="w-4 h-4 flex-shrink-0" />
              </Link>

              {/* Rendered SVG Logos of NABH and NABL */}
              <div className="flex items-center gap-4 flex-shrink-0">
                {banner.logos.map((logo: string, idx: number) => (
                  <div key={idx} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white flex items-center justify-center shadow-sm p-2 overflow-hidden">
                    <img src={logo} alt="Accreditation" className="w-full h-full object-contain scale-[0.85]" />
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}