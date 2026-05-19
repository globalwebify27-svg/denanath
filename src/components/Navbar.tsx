"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart, Menu, X, Phone, Calendar, Lock,
  Stethoscope, Clock, Building, HelpCircle, ArrowRight
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Specialties", href: "/departments", icon: Building },
    { name: "Our Doctors", href: "/doctors", icon: Stethoscope },
    { name: "Support Facilities", href: "/facilities", icon: Clock },
    { name: "Wellness Packages", href: "/health-packages", icon: Heart },
  ];

  return (
    <header className="w-full z-50 flex flex-col">
      {/* Tier 2: Teal Utility Bar */}
      <div className="hidden md:block w-full bg-[#007a87] text-white text-[11px] py-2 px-4 sm:px-6 lg:px-8 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-center gap-2 md:gap-0">
          <div className="flex items-center gap-5 text-white/90">
            <Link href="/doctors" className="hover:text-white transition-colors">Find a Doctor</Link>
            <span className="opacity-30">|</span>
            <Link href="/facilities" className="hover:text-white transition-colors">Blogs</Link>
            <span className="opacity-30">|</span>
            <Link href="/patient-guide" className="hover:text-white transition-colors">My Reports</Link>
            <span className="opacity-30">|</span>
            <Link href="/facilities" className="hover:text-white transition-colors">Research</Link>
            <span className="opacity-30">|</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>

          <div className="flex items-center gap-5 text-[11px] font-bold">
            <a 
              href="https://wa.me/912040151515" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-green-300 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.59 1.977 14.113.953 11.487.953c-5.432 0-9.855 4.37-9.859 9.802-.001 1.77.475 3.5 1.378 5.011L2.01 21.84l6.163-1.603z"/>
              </svg>
              <span>WhatsApp Us (24/7)</span>
            </a>
            <span className="opacity-30">|</span>
            <a href="tel:+912040151000" className="flex items-center gap-1 hover:text-teal-200 transition-colors">
              <Phone className="w-3 h-3" />
              <span>+91 20 4015 1000 (24/7)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main White Header sticky wrapper */}
      <nav
        className={`w-full bg-white border-b border-slate-200 py-3.5 z-40 transition-all ${scrolled ? "fixed top-0 left-0 shadow-md backdrop-blur-md bg-white/95" : "relative"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* DMH Logo & 25 Years Anniversary Badge */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-3 group focus:outline-none">
                <div className="relative flex items-center justify-center w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 p-1 transition-all">
                  <img
                    src="/logo.png"
                    alt="DMH Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[15px] font-black tracking-tight leading-none text-[#002b5c]">
                    DEENANATH
                  </span>
                  <span className="text-[8.5px] font-extrabold tracking-widest leading-none uppercase mt-0.5 text-[#007a87]">
                    Mangeshkar Hospital
                  </span>
                </div>
              </Link>

              {/* Elegant Vertical Divider and 25 Years Stamp (Exactly like Max Healthcare) */}
              <div className="hidden md:flex items-center ml-5 pl-5 border-l border-slate-200">
                <div className="flex flex-col text-left select-none">
                  <span className="text-[11px] font-black text-amber-600 tracking-wider uppercase leading-none">
                    25 YEARS
                  </span>
                  <span className="text-[7.5px] font-black text-slate-400 tracking-widest uppercase mt-0.5 leading-none">
                    Of Clinical Trust & Care
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7">
              <Link href="/departments" className="text-xs font-black text-slate-700 hover:text-[#007a87] uppercase tracking-wider transition-colors">
                Hospitals
              </Link>
              <Link href="/departments" className="text-xs font-black text-slate-700 hover:text-[#007a87] uppercase tracking-wider transition-colors">
                Treatments
              </Link>
              <Link href="/departments" className="text-xs font-black text-slate-700 hover:text-[#007a87] uppercase tracking-wider transition-colors">
                Services
              </Link>
              <Link href="/facilities" className="text-xs font-black text-slate-700 hover:text-[#007a87] uppercase tracking-wider transition-colors">
                Academics
              </Link>
              <Link href="/contact" className="text-xs font-black text-slate-700 hover:text-[#007a87] uppercase tracking-wider transition-colors">
                Quick Enquiry
              </Link>
            </div>

            {/* Right Action Stack */}
            <div className="hidden lg:flex items-center gap-4">
              <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <Link
                href="/appointments"
                className="bg-[#d9232d] hover:bg-[#b81d24] text-white px-5 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>Book an Appointment</span>
              </Link>
            </div>

            {/* Mobile Actions Trigger */}
            <div className="lg:hidden flex items-center gap-3">
              <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
                <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md bg-slate-50 border border-slate-200 text-slate-700 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div
          className={`lg:hidden absolute inset-x-0 top-full bg-white border-b border-slate-200 overflow-hidden transition-all duration-300 ease-in-out shadow-lg ${mobileMenuOpen ? "max-h-[500px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
            }`}
        >
          <div className="px-4 space-y-1">
            <Link
              href="/departments"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50"
            >
              <span>Hospitals</span>
            </Link>
            <Link
              href="/departments"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50"
            >
              <span>Treatments</span>
            </Link>
            <Link
              href="/departments"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50"
            >
              <span>Services</span>
            </Link>
            <Link
              href="/facilities"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50"
            >
              <span>Academics</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50"
            >
              <span>Quick Enquiry</span>
            </Link>

            {/* Utility links for mobile */}
            <div className="pt-3 border-t border-slate-100 mt-3 space-y-1">
              <p className="px-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Quick Tools</p>
              <div className="grid grid-cols-2 gap-1 text-[11px] font-semibold text-slate-600">
                <Link href="/doctors" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-slate-50 rounded-lg">Find a Doctor</Link>
                <Link href="/facilities" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-slate-50 rounded-lg">Blogs</Link>
                <Link href="/patient-guide" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-slate-50 rounded-lg">My Reports</Link>
                <Link href="/facilities" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-slate-50 rounded-lg">Research</Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 hover:bg-slate-50 rounded-lg col-span-2">Contact Us</Link>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 mt-3 flex flex-col gap-2">
              <a 
                href="https://wa.me/912040151515" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold transition-colors"
              >
                <span>WhatsApp Us (24/7)</span>
              </a>
              
              <Link
                href="/appointments"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 rounded-lg bg-[#d9232d] hover:bg-[#b81d24] text-white font-bold text-center text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}