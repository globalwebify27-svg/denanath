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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.4fr] gap-12 lg:gap-16">
          
          {/* Logo & Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="flex items-center justify-center w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] xl:max-w-[380px] h-auto py-3 px-4 rounded-xl bg-white shadow-xl ring-4 ring-white/10 group-hover:scale-[1.02] transition-transform">
                <img 
                  src="/images/Untitled design11.png" 
                  alt="Deenanath Mangeshkar Hospital & Research Center" 
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <div className="w-full space-y-6">
              <p className="text-xs text-[#b2dfdb] leading-relaxed font-light">
                Deenanath Mangeshkar Hospital and Research Center is Pune&apos;s leading clinical landmark, combining state-of-the-art diagnostics with legendary medical experts and warm, ethical care.
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a7ffeb] animate-ping" />
                <span>Managed by Lata Mangeshkar Foundation</span>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:border-[#1877F2] hover:-translate-y-1 transition-all group shadow-sm" aria-label="Facebook">
                  <svg className="w-5 h-5 text-[#b2dfdb] group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24">
                    <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.05.28-1.73 1.76-1.73z" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-black hover:border-black hover:-translate-y-1 transition-all group shadow-sm" aria-label="X (Twitter)">
                  <svg className="w-4 h-4 text-[#b2dfdb] group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#FF0000] hover:border-[#FF0000] hover:-translate-y-1 transition-all group shadow-sm" aria-label="YouTube">
                  <svg className="w-5 h-5 text-[#b2dfdb] group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0077b5] hover:border-[#0077b5] hover:-translate-y-1 transition-all group shadow-sm" aria-label="LinkedIn">
                  <svg className="w-4 h-4 text-[#b2dfdb] group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
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
                { label: "Online Facilities", href: "/email-login" },
                { label: "Book Appointment", href: "/book-appointment" }
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
                { label: "Emergency", href: "/emergency" },
                { label: "Pharmacy", href: "/pharmacy" },
                { label: "Ambulance", href: "/ambulance" },
                { label: "Blood Bank", href: "/blood-bank" },
                { label: "Job & Vacancy", href: "/careers" },
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

              {/* Events / News Section */}
              <div className="pt-8">
                <h4 className="text-white font-medium text-[15px] mb-4">
                  Events / News
                </h4>
                <div className="flex items-center gap-4">
                  <div className="w-[70px] h-[36px] shrink-0 rounded-md overflow-hidden border border-white/80 bg-black/20">
                    <img 
                      src="/images/unnamed (7).webp" 
                      alt="Diabetes Nursing Conference 2026" 
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <Link href="/events" className="text-[#b2dfdb] hover:text-[#a7ffeb] transition-colors text-[13px] leading-snug">
                    Diabetes Nursing<br />Conference 2026
                  </Link>
                </div>
                <div className="mt-5 border-b border-dashed border-white/20 w-11/12"></div>
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
