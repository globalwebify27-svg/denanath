"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Phone, Mail, MapPin, ExternalLink, ArrowRight } from "lucide-react";

export default function Footer({ latestEvent, footerSettings }: { latestEvent?: any, footerSettings?: any }) {
  const [dynamicLinks, setDynamicLinks] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/dynamic-pages', { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
           setDynamicLinks(data);
        }
      })
      .catch(err => console.error("Error fetching dynamic pages for footer:", err));
  }, []);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.8fr_0.8fr_1.3fr] gap-6 lg:gap-8 xl:gap-9">
          
          {/* Logo & Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="flex items-center justify-center w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] xl:max-w-[380px] h-auto py-3 px-4 rounded-xl bg-white shadow-xl ring-4 ring-white/10 group-hover:scale-[1.02] transition-transform">
                <img 
                  src={footerSettings?.logo ?? "/images/Untitled design11.png"} 
                  alt="Deenanath Mangeshkar Hospital & Research Center" 
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <div className="w-full space-y-6">
              <p className="text-xs text-[#b2dfdb] leading-relaxed font-light">
                {footerSettings?.description ?? "Deenanath Mangeshkar Hospital and Research Center is Pune's leading clinical landmark, combining state-of-the-art diagnostics with legendary medical experts and warm, ethical care."}
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a7ffeb] animate-ping" />
                <span>{footerSettings?.managedBy ?? "Managed by Lata Mangeshkar Foundation"}</span>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4 flex-wrap">
                {footerSettings?.socialLinks?.filter((l: any) => l.isActive !== false).map((link: any, idx: number) => {
                  let svgIcon;
                  const platform = (link.platform || '').toLowerCase();
                  if (platform.includes('facebook')) {
                    svgIcon = <svg className="w-5 h-5 text-[#b2dfdb] group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.05.28-1.73 1.76-1.73z" /></svg>;
                  } else if (platform.includes('twitter') || platform === 'x') {
                    svgIcon = <svg className="w-4 h-4 text-[#b2dfdb] group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
                  } else if (platform.includes('youtube')) {
                    svgIcon = <svg className="w-5 h-5 text-[#b2dfdb] group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>;
                  } else if (platform.includes('linkedin')) {
                    svgIcon = <svg className="w-4 h-4 text-[#b2dfdb] group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>;
                  } else if (platform.includes('instagram')) {
                    svgIcon = <svg className="w-4 h-4 text-[#b2dfdb] group-hover:text-white fill-current transition-colors" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>;
                  } else {
                    svgIcon = <ExternalLink className="w-5 h-5 text-[#b2dfdb] group-hover:text-white transition-colors" />;
                  }

                  let hoverClass = 'hover:bg-[#007a87] hover:border-[#007a87]';
                  if (platform.includes('facebook')) hoverClass = 'hover:bg-[#1877F2] hover:border-[#1877F2]';
                  else if (platform.includes('twitter') || platform === 'x') hoverClass = 'hover:bg-black hover:border-black';
                  else if (platform.includes('youtube')) hoverClass = 'hover:bg-[#FF0000] hover:border-[#FF0000]';
                  else if (platform.includes('linkedin')) hoverClass = 'hover:bg-[#0077b5] hover:border-[#0077b5]';
                  else if (platform.includes('instagram')) hoverClass = 'hover:bg-[#E4405F] hover:border-[#E4405F]';
                  else if (platform.includes('thread')) hoverClass = 'hover:bg-black hover:border-black';

                  return (
                    <a key={idx} href={link.href || "#"} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center ${hoverClass} hover:-translate-y-1 transition-all group shadow-sm`} aria-label={link.platform || "Social Link"}>
                      {svgIcon}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Events / News Column (Placed between Logo and Quick Links) */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] relative">
              Events / News
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#a7ffeb] rounded-full" />
            </h4>
            <div className="pt-2">
              <Link href="/events" className="group flex flex-col gap-2.5 max-w-[140px]">
                <div className="w-full h-14 rounded-lg overflow-hidden border border-white/20 bg-black/20 shrink-0">
                  <img 
                    src={latestEvent && latestEvent.gallery && latestEvent.gallery.length > 0 ? latestEvent.gallery[0] : "/images/unnamed (7).webp"} 
                    alt={latestEvent?.title || "Diabetes Nursing Conference 2026"} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <span className="text-[#b2dfdb] group-hover:text-[#a7ffeb] transition-colors text-xs font-medium leading-snug line-clamp-3" title={latestEvent?.title || "Diabetes Nursing Conference 2026"}>
                  {latestEvent?.title || "Diabetes Nursing Conference 2026"}
                </span>
              </Link>
            </div>
          </div>

          {/* Quick Channels Column 1 */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] relative">
              Quick Channels
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#a7ffeb] rounded-full" />
            </h4>
            <ul className="space-y-3.5 text-xs pt-2">
              {(() => {
                let quick1 = footerSettings?.quickChannels1 || [
                  { label: "About Us", href: "/about-hospital" },
                  { label: "Patient & Visitors", href: "/out-patient" },
                  { label: "Doctors & Departments", href: "/doctor-details" },
                  { label: "Research", href: "/research-about" },
                  { label: "Academics", href: "/academics" },
                  { label: "Online Facilities", href: "/email-login" },
                  { label: "Book Appointment", href: "/book-appointment" },
                  { label: "Testimonials", href: "/#testimonials" },
                  { label: "Photo Gallery", href: "/gallery-photos" },
                  { label: "Video Gallery", href: "/gallery-videos" }
                ];
                
                // Inject Footer Menu Pages
                const footerPages = dynamicLinks.filter((p: any) => p.navbarMenu === "Footer" && p.status);
                if (footerPages.length > 0) {
                  const injected = footerPages.map((p: any) => ({
                    label: p.title,
                    href: `/${p.slug}`,
                    isActive: true
                  }));
                  quick1 = [...quick1, ...injected];
                }
                
                return quick1;
              })().filter((item: any) => item.isActive !== false).map((item: any, idx: number) => (
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
          <div className="space-y-6 mt-[-34px] sm:mt-0">
            <h4 className="hidden sm:block text-white font-bold text-xs uppercase tracking-[0.2em] relative select-none opacity-0">
              Quick Channels
            </h4>
            <ul className="space-y-3.5 text-xs pt-0 sm:pt-2">
              {(footerSettings?.quickChannels2 || [
                { label: "Emergency", href: "/emergency" },
                { label: "Pharmacy", href: "/pharmacy" },
                { label: "Ambulance", href: "/ambulance" },
                { label: "Blood Bank", href: "/blood-bank" },
                { label: "Careers", href: "/careers" },
                { label: "Contact Us", href: "/contact-us" },
                { label: "OPD Schedule", href: "/opd-schedule" },
                { label: "EC Approval", href: "/ec-approval" },
                { label: "Site Map", href: "/site-map" },
                { label: "Disclaimer", href: "/disclaimer" }
              ]).filter((item: any) => item.isActive !== false).map((item: any, idx: number) => (
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
              {(!footerSettings || footerSettings.address !== "") && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-4.5 h-4.5 text-[#a7ffeb] shrink-0 mt-0.5" />
                  <span className="leading-relaxed text-[#b2dfdb] font-light">
                    {footerSettings?.address ?? "Near Mhatre Bridge, Erandwane, Pune, Maharashtra – 411004, India"}
                  </span>
                </div>
              )}
              {(!footerSettings || footerSettings.phone !== "") && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4.5 h-4.5 text-[#a7ffeb] shrink-0" />
                  <a href={`tel:${footerSettings?.phone ?? "+91 20 4015 1000"}`} className="text-[#b2dfdb] hover:text-white transition-colors font-light">
                    {footerSettings?.phone ?? "+91 20 4015 1000"}
                  </a>
                </div>
              )}
              {(!footerSettings || footerSettings.email !== "") && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4.5 h-4.5 text-[#a7ffeb] shrink-0" />
                  <a href={`mailto:${footerSettings?.email ?? "info@dmhospital.org"}`} className="text-[#b2dfdb] hover:text-white transition-colors font-light">
                    {footerSettings?.email ?? "info@dmhospital.org"}
                  </a>
                </div>
              )}
              {(!footerSettings || footerSettings.mapLink !== "") && (
                <div className="pt-2">
                  <a 
                    href={footerSettings?.mapLink ?? "https://maps.google.com/?q=Deenanath+Mangeshkar+Hospital+Pune"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all text-xs font-semibold shadow-sm group/btn"
                  >
                    <ExternalLink className="w-4 h-4 text-[#a7ffeb] group-hover/btn:scale-110 transition-transform" />
                    <span>Get Campus Directions</span>
                  </a>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 2. Copyright & Heartbeat */}
      <div className="w-full bg-[#00343a] py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-xs text-[#80cbc4] font-medium">
          <div className="text-center md:text-left">
            {(!footerSettings || footerSettings.copyrightText !== "") && (
              <>© {new Date().getFullYear()} {footerSettings?.copyrightText ?? "Deenanath Mangeshkar Hospital and Research Center. All rights reserved."}</>
            )}
          </div>
          <div className="flex items-center justify-center gap-1.5">
            <span>{footerSettings?.heartbeatText1 ?? "Delivering Clinical Excellence with"}</span>
            <Heart className="w-4.5 h-4.5 text-red-400 fill-red-400 animate-pulse" />
            <span className="text-[#e0f2f1]">{footerSettings?.heartbeatText2 ?? "Human Warmth"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
