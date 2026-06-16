import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-[#f6fafb] relative z-20 pt-12 md:pt-16 pb-10 md:pb-12 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <div className="relative">
            {/* Decorative background element */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-slate-100 to-teal-50 rounded-[2.5rem] transform -rotate-3 scale-105 -z-10"></div>
            
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
              <img 
                src="/images/hospital12.png" 
                alt="Deenanath Mangeshkar Hospital and Research Center Facility" 
                className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Floating Badge on Image */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white flex items-center gap-4">
                <div className="w-12 h-12 bg-[#007a87] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-inner">
                  25
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Years of</p>
                  <p className="text-sm font-black text-slate-900 leading-tight">Clinical Trust</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 mb-6 w-max">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-widest uppercase">NABH Accredited</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-6">
              World-class care.<br/>
              <span className="font-semibold text-[#002b5c]">Right here in Pune.</span>
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed mb-8">
              Deenanath Mangeshkar Hospital and Research Center is a premier multi-specialty establishment dedicated to providing exceptional medical care. We combine state-of-the-art facilities with renowned medical experts to ensure comprehensive, compassionate treatment for every patient.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <Link 
                href="/about-hospital" 
                className="px-8 py-4 bg-slate-900 hover:bg-[#d9232d] text-white rounded-xl text-sm font-semibold transition-all shadow-lg hover:shadow-[0_8px_30px_rgba(217,35,45,0.3)] flex items-center gap-2 group"
              >
                <span>Discover Our Legacy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex items-center gap-4">
                 <div className="flex -space-x-3">
                    <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=1" alt="Doctor" />
                    <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=2" alt="Doctor" />
                    <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=3" alt="Doctor" />
                 </div>
                 <div className="text-xs">
                   <p className="font-bold text-slate-900">400+</p>
                   <p className="text-slate-500 font-medium">Expert Doctors</p>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
