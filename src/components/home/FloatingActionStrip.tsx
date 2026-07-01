import React from "react";
import { 
  Stethoscope, Search, ArrowRight, Activity, FileText, Ambulance, Building2, HeartPulse
} from "lucide-react";
import Link from "next/link";

interface FloatingActionStripProps {
  setIsSearchOpen: (open: boolean) => void;
}

export default function FloatingActionStrip({ setIsSearchOpen }: FloatingActionStripProps) {
  return (
    <section className="w-full relative z-40 -mt-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-2xl rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white p-3 sm:p-5 xl:px-10 flex flex-col xl:flex-row items-center justify-between gap-6 xl:gap-8">
        
        {/* Left Icons */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 xl:gap-6 flex-shrink-0">
          <Link href="/departments" className="flex flex-col items-center gap-1.5 group cursor-pointer w-16 sm:w-20 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <Stethoscope className="w-6 h-6 text-slate-400 group-hover:text-[#007a87] group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-[#007a87] transition-colors leading-tight">Doctors &<br/>Departments</span>
          </Link>
          <Link href="/services" className="flex flex-col items-center gap-1.5 group cursor-pointer w-16 sm:w-20 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <Ambulance className="w-6 h-6 text-slate-400 group-hover:text-[#007a87] group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-[#007a87] transition-colors leading-tight">OPD<br/>Schedules</span>
          </Link>
          <Link href="/health-packages" className="flex flex-col items-center gap-1.5 group cursor-pointer w-16 sm:w-20 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <Activity className="w-6 h-6 text-slate-400 group-hover:text-[#007a87] group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-[#007a87] transition-colors leading-tight">Health<br/>Packages</span>
          </Link>
        </div>

        {/* Center Call to Action Button */}
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="flex-1 w-full max-w-xl xl:max-w-[420px] bg-[#007a87] hover:bg-[#d9232d] text-white rounded-[1.5rem] py-4 px-4 sm:px-6 shadow-[0_8px_30px_rgba(0,122,135,0.2)] hover:shadow-[0_8px_30px_rgba(217,35,45,0.3)] transition-all duration-300 hover:-translate-y-1 flex items-center justify-between group flex-shrink-0"
        >
          <div className="flex items-start sm:items-center gap-3 text-left">
            <div className="w-9 h-9 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors flex-shrink-0">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm sm:text-base leading-snug tracking-tight break-words">
                Ask a question or find a doctor
              </h3>
              <p className="text-white/80 text-[10px] sm:text-xs font-medium mt-1 leading-snug break-words">
                Start your assessment or search for specialties
              </p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white text-[#007a87] group-hover:text-[#d9232d] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-all hidden sm:flex shrink-0 ml-2">
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>

        {/* Right Icons */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 xl:gap-6 flex-shrink-0">
          <Link href="/out-patient" className="flex flex-col items-center gap-1.5 group cursor-pointer w-16 sm:w-20 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <Building2 className="w-6 h-6 text-slate-400 group-hover:text-[#007a87] group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-[#007a87] transition-colors leading-tight">Patient &<br/>Visitors</span>
          </Link>
          <Link href="/book-appointment" className="flex flex-col items-center gap-1.5 group cursor-pointer w-16 sm:w-20 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <HeartPulse className="w-6 h-6 text-slate-400 group-hover:text-[#007a87] group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-[#007a87] transition-colors leading-tight">Request<br/>Appointment</span>
          </Link>
          <Link href="/patient-portal" className="flex flex-col items-center gap-1.5 group cursor-pointer w-16 sm:w-20 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center group-hover:bg-slate-50 transition-all">
              <FileText className="w-6 h-6 text-slate-400 group-hover:text-[#007a87] group-hover:scale-110 transition-all duration-300" />
            </div>
            <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.05em] text-slate-400 group-hover:text-[#007a87] transition-colors leading-tight">Patient<br/>Portal</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
