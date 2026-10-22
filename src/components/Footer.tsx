"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Phone, Mail, MapPin, ExternalLink, ArrowRight } from "lucide-react";

export default function Footer({ 
  latestEvent, 
  footerSettings, 
  appButtons 
}: { 
  latestEvent?: any; 
  footerSettings?: any; 
  appButtons?: any[]; 
}) {
  const [dynamicLinks, setDynamicLinks] = useState<any[]>([]);

  const defaultPlayStoreLink = "https://play.google.com/store/apps/details?id=org.dmhospital.app&hl=en";
  const defaultAppStoreLink = "https://apps.apple.com/in/app/deenanath-mangeshkar-hospital/id1187525263";

  const allButtons = appButtons || footerSettings?.buttons || [];
  const playStoreBtn = allButtons.find((b: any) => b.icon === "playstore" || b.text?.toLowerCase().includes("google play") || b.text?.toLowerCase().includes("playstore"));
  const appStoreBtn = allButtons.find((b: any) => b.icon === "appstore" || b.text?.toLowerCase().includes("app store") || b.text?.toLowerCase().includes("appstore"));

  const playStoreLink = playStoreBtn?.link || defaultPlayStoreLink;
  const appStoreLink = appStoreBtn?.link || defaultAppStoreLink;
  const isPlayActive = playStoreBtn ? playStoreBtn.isActive !== false : true;
  const isAppActive = appStoreBtn ? appStoreBtn.isActive !== false : true;

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
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_1.6fr_1.3fr] gap-6 lg:gap-8 xl:gap-9">
          
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-[10px] font-semibold text-white whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a7ffeb] animate-ping shrink-0" />
                <span className="whitespace-nowrap">{footerSettings?.managedBy ?? "Managed by Lata Mangeshkar Medical Foundation"}</span>
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
            <div className="pt-3">
              <Link href={latestEvent ? `/eventsdetails/${latestEvent.slug || latestEvent.id || latestEvent.title?.replace(/[^a-zA-Z0-9-]/g, '')}` : '/eventsdetails/RCScourse17'} className="group flex flex-col gap-2.5 max-w-[140px]">
                <div className="w-full h-14 rounded-lg overflow-hidden border border-white/20 bg-black/20 shrink-0">
                  <img 
                    src={latestEvent?.featuredImage || (latestEvent && latestEvent.gallery && latestEvent.gallery.length > 0 ? latestEvent.gallery[0] : "/images/unnamed (7).webp")} 
                    alt={latestEvent?.title || "Diabetes Nursing Conference 2026"} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    style={{ objectPosition: 'center 35%' }}
                  />
                </div>
                <span className="text-[#b2dfdb] group-hover:text-[#a7ffeb] transition-colors text-xs font-medium leading-snug line-clamp-3" title={latestEvent?.title || "Diabetes Nursing Conference 2026"}>
                  {latestEvent?.title || "Diabetes Nursing Conference 2026"}
                </span>
              </Link>
            </div>
          </div>

          {/* Quick Channels Combined Columns (2 columns on mobile, tablet & desktop) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-6">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] relative">
              Quick Channels
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#a7ffeb] rounded-full" />
            </h4>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 pt-2">
              {/* Quick Channels Column 1 */}
              <ul className="space-y-3 sm:space-y-3.5 text-xs">
                {(() => {
                  let quick1 = footerSettings?.quickChannels1 || [
                    { label: "About Us", href: "/about-hospital" },
                    { label: "Patient & Visitors", href: "/out-patient" },
                    { label: "Doctors & Departments", href: "/doctors-profile" },
                    { label: "Research", href: "/research-about" },
                    { label: "Academics", href: "/academics" },
                    { label: "Online Facilities", href: "/email-login" },
                    { label: "Book Appointment", href: "/Appointment" },
                    { label: "Testimonials", href: "/#testimonials" },
                    { label: "Photo Gallery", href: "/gallery-photos" },
                    { label: "Video Gallery", href: "/gallery-videos" },
                    { label: "Emergency", href: "/emergency" }
                  ];
                  
                  // Inject Footer Menu Pages
                  const footerPages = dynamicLinks.filter((p: any) => p.navbarMenu === "Footer" && p.status);
                  if (footerPages.length > 0) {
                    const injectedMap = new Map();
                    footerPages.forEach((p: any) => {
                      injectedMap.set(p.title.toLowerCase(), {
                        label: p.title,
                        href: `/${p.slug}`,
                        isActive: true
                      });
                    });
                    quick1 = quick1.map((item: any) => {
                      const key = item.label.toLowerCase();
                      if (injectedMap.has(key)) {
                        const rep = injectedMap.get(key);
                        injectedMap.delete(key);
                        
                        return rep;
                      }
                      return item;
                    });
                    quick1 = [...quick1, ...Array.from(injectedMap.values())];
                  }
                  
                  return quick1;
                })().filter((item: any) => item.isActive !== false).map((item: any, idx: number) => (
                  <li key={idx} className="group flex items-start gap-1.5 sm:gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-[#a7ffeb] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0 mt-0.5" />
                    <Link href={item.href} className="text-[#b2dfdb] hover:text-white transition-colors leading-snug sm:leading-normal font-light break-words">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Quick Channels Column 2 */}
              <ul className="space-y-3 sm:space-y-3.5 text-xs">
                {(() => {
                  let quick2 = footerSettings?.quickChannels2 || [
                    { label: "Pharmacy", href: "/pharmacy" },
                    { label: "Ambulance", href: "/ambulance" },
                    { label: "Blood Bank", href: "/blood-bank" },
                    { label: "Careers", href: "/careers" },
                    { label: "Contact Us", href: "/contact-us" },
                    { label: "Event/News", href: "/events" },
                    { label: "OPD Schedule", href: "/out-patient-department" },
                    { label: "EC Approval", href: "/ec-approval" },
                    { label: "Site Map", href: "/site-map" },
                    { label: "Disclaimer", href: "/disclaimer" }
                  ];
                  
                  const footerCol2Pages = dynamicLinks.filter((p: any) => p.navbarMenu === "Footer Column 2" && p.status);
                  if (footerCol2Pages.length > 0) {
                    const injectedMap = new Map();
                    footerCol2Pages.forEach((p: any) => {
                      injectedMap.set(p.title.toLowerCase(), {
                        label: p.title,
                        href: `/${p.slug}`,
                        isActive: true
                      });
                    });
                    quick2 = quick2.map((item: any) => {
                      const key = item.label.toLowerCase();
                      if (injectedMap.has(key)) {
                        const rep = injectedMap.get(key);
                        injectedMap.delete(key);
                        
                        return rep;
                      }
                      return item;
                    });
                    quick2 = [...quick2, ...Array.from(injectedMap.values())];
                  }
                  return quick2;
                })().filter((item: any) => item.isActive !== false).map((item: any, idx: number) => (
                  <li key={idx} className="group flex items-start gap-1.5 sm:gap-2">
                    <ArrowRight className="w-3.5 h-3.5 text-[#a7ffeb] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 shrink-0 mt-0.5" />
                    <Link href={item.href} className="text-[#b2dfdb] hover:text-white transition-colors leading-snug sm:leading-normal font-light break-words">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Map Column */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-6">
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

              {/* App Store & Google Play Store Buttons */}
              {(isPlayActive || isAppActive) && (
                <div className="pt-2 flex items-center gap-2.5 flex-wrap">
                  {isPlayActive && (
                    <a
                      href={playStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/40 transition-all hover:-translate-y-0.5 hover:shadow-lg shadow-sm group"
                    >
                      <svg viewBox="0 0 1024 1024" className="w-4 h-4 shrink-0">
                        <path fill="#00E676" d="M104.5 125.1v773.8c0 14.3 8.3 26.6 20.4 32.5l398.8-419.4L104.5 125.1z" />
                        <path fill="#FF3D00" d="M523.7 512l153.9-161.8L160.7 53.6c-17.7-10.2-38.9-8-56.2 3.8l419.2 454.6z" />
                        <path fill="#FFC107" d="M677.6 350.2l198.5 114.6c24 13.9 24 48.7 0 62.6L677.6 642l-153.9-130 153.9-161.8z" />
                        <path fill="#00B0FF" d="M523.7 512L104.5 898.9c17.3 11.8 38.5 14 56.2 3.8L677.6 642 523.7 512z" />
                      </svg>
                      <div className="flex flex-col text-left leading-none">
                        <span className="text-[7px] text-[#b2dfdb] uppercase font-medium tracking-wider">GET IT ON</span>
                        <span className="text-[10px] font-bold text-white mt-0.5">Google Play</span>
                      </div>
                    </a>
                  )}
                  {isAppActive && (
                    <a
                      href={appStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-lg border border-white/15 hover:border-white/40 transition-all hover:-translate-y-0.5 hover:shadow-lg shadow-sm group"
                    >
                      <svg viewBox="0 0 1024 1024" className="w-3.5 h-3.5 shrink-0 fill-white">
                        <path d="M789.2 642.4c-0.4 46 39.4 61.2 39.8 61.4-0.4 0.8-6.2 21.2-20.6 42.4-12.8 19-26.2 38-47.2 38.4-21 0.4-27.4-12.4-51.6-12.4s-31.4 12-51.2 12.8c-20.6 0.8-36.2-20.4-49.4-39.2-30.8-44.6-53.8-126-22.2-181 15.6-27.2 43.6-44.4 74-44.8 20.2-0.4 39.4 13.6 52 13.6 12.6 0 35.8-16.6 60.2-14.2 10.2 0.4 39 4.2 57.6 31.4-1.6 1-34.4 20-34.4 59.8zM651.8 221c11.6-14 19.4-33.6 17.2-53.2-16.6 0.6-37.4 11-49.4 25.2-9.6 11.2-18.8 31.2-16.2 50.4 18.6 1.4 36.8-8.4 48.4-22.4z" />
                      </svg>
                      <div className="flex flex-col text-left leading-none">
                        <span className="text-[7px] text-[#b2dfdb] uppercase font-medium tracking-wider">Download on the</span>
                        <span className="text-[10px] font-bold text-white mt-0.5">App Store</span>
                      </div>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 2. Copyright & Heartbeat */}
      <div className="w-full bg-[#00343a] py-6 px-4 sm:px-6 lg:px-8 border-t border-white/10 relative z-10">
        <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 text-xs text-[#80cbc4] font-medium">
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
