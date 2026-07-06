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
    <div className={`relative w-full ${isOpen ? "z-50" : "z-10"}`} ref={dropdownRef}>
      <input type="hidden" name={name} value={selected} required={required && !selected} />
      <div 
        className={`w-full bg-white border border-slate-200 text-slate-700 font-medium ${isOpen ? 'rounded-t-xl rounded-b-none border-b-transparent' : 'rounded-xl'} py-3.5 px-4 cursor-pointer flex items-center justify-between transition-all shadow-sm hover:border-teal-400 ${Icon ? "pl-11" : ""} ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {Icon && <Icon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />}
        <span className="truncate text-[18px]">{selected || placeholder}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-lg border border-slate-200 border-t-0 max-h-60 overflow-y-auto z-50 py-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full">
          <div 
            className="px-4 py-2 hover:bg-emerald-50 cursor-pointer text-slate-500 font-medium transition-colors text-[18px]"
            onClick={() => { setSelected(""); setIsOpen(false); }}
          >
            {placeholder}
          </div>
          {options.map((opt: string, i: number) => (
            <div 
              key={i}
              className={`px-4 py-2 hover:bg-emerald-50 cursor-pointer font-medium transition-colors text-[18px] ${selected === opt ? "bg-emerald-50 text-emerald-800" : "text-slate-700"}`}
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
