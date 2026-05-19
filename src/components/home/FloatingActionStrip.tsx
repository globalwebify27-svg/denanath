import React from "react";
import { 
  Heart, Stethoscope, Calendar, Search, ArrowRight, FlaskConical, ShieldCheck, Phone, Activity, FileText
} from "lucide-react";

interface FloatingActionStripProps {
  setIsSearchOpen: (open: boolean) => void;
}

export default function FloatingActionStrip({ setIsSearchOpen }: FloatingActionStripProps) {
  return (
    <section className="w-full relative z-40 -mt-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white p-3 sm:p-5 xl:px-10 flex flex-col xl:flex-row items-center justify-between gap-6 xl:gap-8">
        
        {/* Left Icons */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 xl:gap-7 flex-shrink-0">
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <Heart className="w-6 h-6 text-slate-400 group-hover:text-red-600 group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-red-600 transition-colors">Wellness</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <Activity className="w-6 h-6 text-slate-400 group-hover:text-[#007a87] group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-[#007a87] transition-colors">Services</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <Stethoscope className="w-6 h-6 text-slate-400 group-hover:text-[#007a87] group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-[#007a87] transition-colors">Experts</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <Calendar className="w-6 h-6 text-slate-400 group-hover:text-slate-900 group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-slate-900 transition-colors">Appts</span>
          </div>
        </div>

        {/* Center Call to Action Button */}
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="flex-1 w-full max-w-xl xl:max-w-[460px] bg-[#007a87] hover:bg-[#d9232d] text-white rounded-[1.5rem] py-4 px-6 sm:px-8 shadow-[0_8px_30px_rgba(0,122,135,0.2)] hover:shadow-[0_8px_30px_rgba(217,35,45,0.3)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-between group flex-shrink-0"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-base sm:text-lg tracking-tight">Ask a question or find a doctor</h3>
              <p className="text-white/80 text-[11px] sm:text-xs font-medium mt-0.5">Start your assessment or search for specialties</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white text-[#007a87] group-hover:text-[#d9232d] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-all hidden sm:flex">
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>

        {/* Right Icons */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 xl:gap-7 flex-shrink-0">
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <FlaskConical className="w-6 h-6 text-slate-400 group-hover:text-[#007a87] group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-[#007a87] transition-colors">Labs</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <ShieldCheck className="w-6 h-6 text-slate-400 group-hover:text-slate-900 group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-slate-900 transition-colors">Packages</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <FileText className="w-6 h-6 text-slate-400 group-hover:text-[#007a87] group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-[#007a87] transition-colors">Reports</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <Phone className="w-6 h-6 text-slate-400 group-hover:text-red-600 group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-red-600 transition-colors">Contact</span>
          </div>
        </div>

      </div>
    </section>
  );
}
