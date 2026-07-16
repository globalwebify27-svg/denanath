"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Search } from "lucide-react";

export default function CustomDropdown({ name, options, placeholder = "-- Select --", icon: Icon, required, defaultValue = "", value, className = "", onChange }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

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

  const filteredOptions = options.filter((opt: string) => opt.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={`relative w-full ${isOpen ? "z-50" : "z-10"}`} ref={dropdownRef}>
      <input type="hidden" name={name} value={selected} required={required && !selected} />
      <div 
        className={`w-full bg-white border border-slate-200 text-slate-700 font-normal leading-[31px] ${isOpen ? 'rounded-t-xl rounded-b-none border-b-transparent' : 'rounded-xl'} py-3.5 px-4 cursor-pointer flex items-center justify-between transition-all shadow-sm hover:border-teal-400 ${Icon ? "pl-11" : ""} ${className}`}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setSearchQuery("");
        }}
      >
        {Icon && <Icon className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />}
        <span className="truncate text-[18px] leading-[31px] font-normal">{selected || placeholder}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-b-xl shadow-lg border border-slate-200 border-t-0 max-h-60 overflow-y-auto z-50 py-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:rounded-full flex flex-col">
          <div className="sticky top-0 bg-white px-3 py-2 border-b border-slate-100 z-10 shrink-0">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Type the name..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                onClick={(e) => e.stopPropagation()} 
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-medium text-slate-700" 
              />
            </div>
          </div>
          <div className="overflow-y-auto">
            <div 
              className="px-4 py-2 hover:bg-emerald-50 cursor-pointer text-slate-500 font-normal transition-colors text-[18px] leading-[31px]"
              onClick={() => { setSelected(""); setIsOpen(false); if (onChange) onChange(""); }}
            >
              {placeholder}
            </div>
            {filteredOptions.length > 0 ? filteredOptions.map((opt: string, i: number) => (
              <div 
                key={i}
                className={`px-4 py-2 hover:bg-emerald-50 cursor-pointer font-normal transition-colors text-[18px] leading-[31px] ${selected === opt ? "bg-emerald-50 text-emerald-800" : "text-slate-700"}`}
                onClick={() => { setSelected(opt); setIsOpen(false); if (onChange) onChange(opt); }}
              >
                {opt}
              </div>
            )) : (
              <div className="px-4 py-3 text-slate-400 text-sm italic text-center">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
