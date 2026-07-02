"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomDropdown({ name, options, placeholder = "-- Select --", icon: Icon, required, defaultValue = "", className = "" }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <input type="hidden" name={name} value={selected} required={required && !selected} />
      <div 
        className={`w-full bg-white border border-slate-200 text-slate-700 font-medium rounded-xl py-3.5 px-4 cursor-pointer flex items-center justify-between transition-all shadow-sm hover:border-teal-400 ${Icon ? "pl-11" : ""} ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {Icon && <Icon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />}
        <span className="truncate text-[18px]">{selected || placeholder}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 max-h-60 overflow-y-auto z-[60] py-2 custom-scrollbar">
          <div 
            className="px-4 py-2.5 hover:bg-teal-50 cursor-pointer text-slate-500 font-medium transition-colors text-[18px]"
            onClick={() => { setSelected(""); setIsOpen(false); }}
          >
            {placeholder}
          </div>
          {options.map((opt: string, i: number) => (
            <div 
              key={i}
              className={`px-4 py-2.5 hover:bg-teal-50 cursor-pointer font-medium transition-colors text-[18px] ${selected === opt ? "bg-teal-50 text-teal-700" : "text-slate-600"}`}
              onClick={() => { setSelected(opt); setIsOpen(false); }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
