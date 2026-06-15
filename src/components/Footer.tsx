"use client";

import React from "react";
import Link from "next/link";
import { Heart, Phone, Mail, MapPin, ExternalLink, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#005f6b] to-[#003d45] text-[#e0f2f1] text-sm overflow-hidden z-30 border-t border-white/10">
      
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#d9232d]/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Decorative Waveform (Lifeline / Heartbeat SVG) in the background */}
      <div className="absolute right-0 bottom-4 w-full max-w-lg text-white/5 pointer-events-none select-none -z-10">
        <svg viewBox="0 0 800 200" fill="none" className="w-full h-auto stroke-current" strokeWidth="2.5">
          <path d="M0,100 L250,100 L270,80 L290,120 L310,20 L335,180 L355,90 L375,110 L395,100 L800,100" />
        </svg>
      </div>

      {/* 1. Primary Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Logo & Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="flex items-center justify-center w-48 h-12 rounded-lg bg-white shadow-xl p-1.5 ring-4 ring-white/10 group-hover:scale-105 transition-transform">
                <img 
                  src="/images/Png Logo.png" 
                  alt="Deenanath Mangeshkar Hospital Logo" 
                  className="w-full h-full object-contain"
                />
              </div>

            </Link>
            <p className="text-xs text-[#b2dfdb] leading-relaxed font-light">
              Deenanath Mangeshkar Hospital and Research Center is Pune&apos;s leading clinical landmark, combining state-of-the-art diagnostics with legendary medical experts and warm, ethical care.
            </p>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a7ffeb] animate-ping" />
              <span>Managed by Lata Mangeshkar Foundation</span>
            </div>
          </div>

          {/* Quick Channels Column 1 */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] relative">
              Quick Channels
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#a7ffeb] rounded-full" />
            </h4>
            <ul className="space-y-3.5 text-xs pt-2">
              {[
                { label: "About Us", href: "/about-hospital" },
                { label: "Patient & Visitors", href: "/out-patient" },
                { label: "Doctors & Departments", href: "/doctor-details" },
                { label: "Research", href: "/research-about" },
                { label: "Academics", href: "/academics" },
                { label: "Online Facilities", href: "/email-login" }
              ].map((item, idx) => (
                <li key={idx} className="group flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#a7ffeb] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  <Link href={item.href} className="text-[#b2dfdb] hover:text-white transition-colors leading-normal font-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Channels Column 2 */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] relative select-none opacity-0">
              Quick Channels
            </h4>
            <ul className="space-y-3.5 text-xs pt-2">
              {[
                { label: "Book Appointment", href: "/book-appointment" },
                { label: "Find a Doctor", href: "/doctor-details" },
                { label: "Blogs", href: "/blogs" },
                { label: "My Reports", href: "/patient-guide" },
                { label: "Careers", href: "/careers" },
                { label: "Contact Us", href: "/contact-us" }
              ].map((item, idx) => (
                <li key={idx} className="group flex items-center gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-[#a7ffeb] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0" />
                  <Link href={item.href} className="text-[#b2dfdb] hover:text-white transition-colors leading-normal font-light">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Map Column */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] relative">
              Campus Address
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#a7ffeb] rounded-full" />
            </h4>
            <div className="space-y-4 text-xs pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-[#a7ffeb] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[#b2dfdb] font-light">
                  Near Mhatre Bridge, Erandwane, Pune, Maharashtra – 411004, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-[#a7ffeb] shrink-0" />
                <a href="tel:+912040151000" className="text-[#b2dfdb] hover:text-white transition-colors font-light">
                  +91 20 4015 1000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-[#a7ffeb] shrink-0" />
                <a href="mailto:info@dmhospital.org" className="text-[#b2dfdb] hover:text-white transition-colors font-light">
                  info@dmhospital.org
                </a>
              </div>
              <div className="pt-2">
                <a 
                  href="https://maps.google.com/?q=Deenanath+Mangeshkar+Hospital+Pune" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-xs font-semibold shadow-sm group/btn"
                >
                  <ExternalLink className="w-4 h-4 text-[#a7ffeb] group-hover/btn:scale-110 transition-transform" />
                  <span>Get Campus Directions</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Copyright & Heartbeat */}
      <div className="w-full bg-[#00343a] py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-xs text-[#80cbc4] font-medium">
          <div className="text-center md:text-left">
            © {new Date().getFullYear()} Deenanath Mangeshkar Hospital and Research Center. All rights reserved.
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span>Delivering Clinical Excellence with</span>
            <Heart className="w-4.5 h-4.5 text-red-400 fill-red-400 animate-pulse" />
            <span className="text-[#e0f2f1]">Human Warmth</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
