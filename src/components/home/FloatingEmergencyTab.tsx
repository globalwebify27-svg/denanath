import React from "react";
import { Ambulance } from "lucide-react";

export default function FloatingEmergencyTab() {
  return (
    <div className="fixed left-0 top-[35%] z-50 hidden md:block">
      <a 
        href="tel:+912040151515" 
        className="bg-[#c70909] text-white flex flex-col items-center py-8 px-6 shadow-2xl transition-all duration-300 border border-l-0 border-white/20 select-none group hover:bg-red-700 rounded-r-2xl hover:pr-8"
      >
        {/* Ambulance Badge at Top */}
        <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center mb-4 bg-white/20 group-hover:scale-110 transition-transform duration-300">
          <Ambulance className="w-5 h-5 text-white" />
        </div>
        {/* Spelled out vertically letter-by-letter */}
        <div className="flex flex-col items-center gap-1.5 text-[10px] font-extrabold tracking-widest uppercase leading-none font-mono">
          <span>E</span>
          <span>M</span>
          <span>E</span>
          <span>R</span>
          <span>G</span>
          <span>E</span>
          <span>N</span>
          <span>C</span>
          <span>Y</span>
        </div>
      </a>
    </div>
  );
}
