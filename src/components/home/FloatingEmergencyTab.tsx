import React from "react";
import { Ambulance } from "lucide-react";

export default function FloatingEmergencyTab() {
  return (
    <div className="fixed left-6 bottom-6 z-50 flex items-center justify-center">
      {/* Pulse Ring */}
      <span className="absolute inline-flex h-[52px] w-[52px] sm:h-[60px] sm:w-[60px] rounded-full bg-red-500 opacity-40 animate-ping pointer-events-none"></span>

      <a 
        href="tel:+912040151515" 
        className="relative z-10 bg-[#c70909] text-white flex items-center p-3 sm:p-4 shadow-[0_10px_40px_rgba(199,9,9,0.4)] transition-all duration-500 ease-out border border-white/20 select-none group hover:bg-red-700 rounded-full w-[52px] sm:w-[60px] hover:w-[150px] sm:hover:w-[170px] overflow-hidden"
      >
        <div className="flex items-center justify-center min-w-[28px] group-hover:scale-110 transition-transform duration-300">
          <Ambulance className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
        
        <div className="whitespace-nowrap ml-3 font-bold uppercase tracking-widest text-[12px] sm:text-[13px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
          Emergency
        </div>
      </a>
    </div>
  );
}
