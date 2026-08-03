import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const defaultAboutData = {
  badgeText: "NABH Accredited",
  title: "World-class care.",
  subtitle: "Right here in Pune.",
  description: "Deenanath Mangeshkar Hospital & Research Center is a charitable, multi-specialty hospital located in the heart of Pune, India. Founded in 2001, today it is one of the largest hospital in Pune, with 800 beds. Deenanath Mangeshkar Hospital offers state-of-the-art diagnostic, therapeutic and intensive care facilities in a one-stop medical center.",
  image: "/images/hospital12.png",
  imageBadgeNum: "25",
  imageBadgeText1: "Years of",
  imageBadgeText2: "Clinical Trust",
  buttons: [
    { text: "Discover Our Legacy", link: "/about-hospital", isPrimary: true, bgColor: "#0f172a", hoverColor: "#d9232d" },
    { text: "Research & Publication", link: "/research-about", isPrimary: false, bgColor: "#ffffff", hoverColor: "#f8fafc" }
  ],
  statsNumber: "400+",
  statsText: "Expert Doctors",
  statsImages: ["/images/585_Pic.jpg", "/images/10_Pic.jpg", "/images/57_Pic.jpg"]
};

export default function AboutSection({ data = defaultAboutData }: { data?: any }) {
  if (!data || Object.keys(data).length === 0) data = defaultAboutData;

  return (
    <section className="w-full bg-gradient-to-b from-white to-[#f6fafb] relative z-20 pt-[20px] md:pt-16 pb-[20px] md:pb-12 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <div className="relative">
            {/* Decorative background element */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-slate-100 to-teal-50 rounded-[2.5rem] transform -rotate-3 scale-105 -z-10"></div>
            
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
              <img 
                src={data.image} 
                alt="Deenanath Mangeshkar Hospital and Research Center Facility" 
                className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Floating Badge on Image */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white flex items-center gap-4">
                <div className="w-12 h-12 bg-[#007a87] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-inner">
                  {data.imageBadgeNum}
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">{data.imageBadgeText1}</p>
                  <p className="text-sm font-black text-slate-900 leading-tight">{data.imageBadgeText2}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 mb-6 w-max">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-widest uppercase">{data.badgeText}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-6">
              {data.title}<br/>
              <span className="font-semibold text-[#002b5c]">{data.subtitle}</span>
            </h2>
            
            <div 
              className="text-slate-600 text-[18px] font-normal leading-[31px] mb-8"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
            
            <div className="flex flex-col xl:flex-row items-start xl:items-center gap-6 flex-wrap">
              {data.buttons ? (
                data.buttons.map((btn: any, idx: number) => {
                  const isPrimary = btn.isPrimary !== false;
                  const defaultBg = isPrimary ? '#0f172a' : '#ffffff';
                  const defaultHover = isPrimary ? '#d9232d' : '#f8fafc';
                  const textColor = isPrimary ? '#ffffff' : '#0f172a';

                  return (
                    <Link 
                      key={idx}
                      href={btn.link} 
                      style={{
                        '--btn-bg': btn.bgColor || defaultBg,
                        '--btn-hover': btn.hoverColor || defaultHover,
                        '--btn-text': textColor
                      } as React.CSSProperties}
                      className="px-8 py-4 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2 group shrink-0 bg-[var(--btn-bg)] text-[var(--btn-text)] hover:bg-[var(--btn-hover)] border border-[var(--btn-bg)]"
                    >
                      <span>{btn.text}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  );
                })
              ) : (
                <>
                  <Link 
                    href={data.primaryButtonLink || "/"} 
                    className="px-8 py-4 bg-slate-900 hover:bg-[#d9232d] text-white rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-[0_8px_30px_rgba(217,35,45,0.3)] flex items-center gap-2 group shrink-0"
                  >
                    <span>{data.primaryButtonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href={data.secondaryButtonLink || "/"} 
                    className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-900 rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2 group shrink-0"
                  >
                    <span>{data.secondaryButtonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
              
              <div className="flex items-center gap-4 shrink-0 mt-2 xl:mt-0">
                 <div className="flex -space-x-3">
                    {data.statsImages && data.statsImages.map((src: string, idx: number) => (
                      <img key={idx} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src={src} alt="Doctor" />
                    ))}
                 </div>
                 <div className="text-xs">
                   <p className="font-bold text-slate-900">{data.statsNumber}</p>
                   <p className="text-slate-500 font-medium">{data.statsText}</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
