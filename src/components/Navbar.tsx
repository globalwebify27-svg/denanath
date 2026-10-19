"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Phone, ChevronDown, ChevronRight, Globe, Check } from "lucide-react";
import Link from "next/link";

import { baseNavLinks } from "@/lib/navConfig";
import { SUPPORTED_LANGUAGES, getActiveLanguage, setLanguageCookie, getLanguageByCode } from "@/lib/languageConfig";

export default function Navbar({ topHeaderSettings, headerSettings }: { topHeaderSettings?: any, headerSettings?: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const [expandedMobileSubMenu, setExpandedMobileSubMenu] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [liveSuggestions, setLiveSuggestions] = useState<any[]>([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [dynamicLinks, setDynamicLinks] = useState<any[]>([]);

  useEffect(() => {
    const handleDocClick = () => setIsLangOpen(false);
    window.addEventListener("click", handleDocClick);
    
    // Fetch dynamic pages
    fetch('/api/dynamic-pages')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
           setDynamicLinks(data.filter((page: any) => page.status));
        }
      })
      .catch(err => console.error("Error fetching dynamic pages:", err));

    return () => window.removeEventListener("click", handleDocClick);
  }, []);

  useEffect(() => {
    if (!isSearchOpen || searchQuery.trim().length < 2) {
      setLiveSuggestions([]);
      setIsSearchingLive(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearchingLive(true);
      fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`)
        .then(res => res.json())
        .then(data => {
          const combined: any[] = [];
          if (Array.isArray(data?.pages)) {
            data.pages.slice(0, 3).forEach((p: any) => combined.push({
              title: p.title,
              category: p.category,
              href: p.href,
              type: "page"
            }));
          }
          if (Array.isArray(data?.doctors)) {
            data.doctors.slice(0, 2).forEach((d: any) => combined.push({
              title: d.name,
              category: d.specialty,
              href: d.profileHref,
              type: "doctor"
            }));
          }
          if (Array.isArray(data?.departments)) {
            data.departments.slice(0, 2).forEach((dept: any) => combined.push({
              title: dept.name,
              category: "Department",
              href: dept.href,
              type: "department"
            }));
          }
          setLiveSuggestions(combined.slice(0, 5));
          setIsSearchingLive(false);
        })
        .catch(() => setIsSearchingLive(false));
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileSearchOpen(false);
      setLiveSuggestions([]);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    // Sync active language state
    setSelectedLang(getActiveLanguage());

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    setLanguageCookie(langCode);

    // If switching to English, reload to reset DOM completely to clean English baseline
    if (!langCode || langCode === 'en') {
      window.location.reload();
      return;
    }

    // Trigger Google Translate engine via its internal select combo
    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    } else {
      window.location.reload();
    }
  };

  // baseNavLinks is now imported from @/lib/navConfig

  // Inject Main Header Menu Pages
  let rawNavLinks = [...(headerSettings?.menus || baseNavLinks)];
  const mainHeaderPages = dynamicLinks.filter((p: any) => p.navbarMenu === "Header" && p.status);
  if (mainHeaderPages.length > 0) {
    const injectedMap = new Map();
    mainHeaderPages.forEach((p: any) => {
      injectedMap.set(p.title.toLowerCase(), {
        name: p.title,
        href: `/${p.slug}`,
        isActive: true,
        dropdown: []
      });
    });

    // Replace existing links with dynamic ones to preserve order, and remove them from map
    rawNavLinks = rawNavLinks.map((link: any) => {
      const key = link.name.toLowerCase();
      if (injectedMap.has(key)) {
        const replacement = injectedMap.get(key);
        replacement.dropdown = link.dropdown; // Preserve sub-dropdowns from base
        injectedMap.delete(key);
        return replacement;
      }
      return link;
    });

    // Append any completely new dynamic menus at the end
    rawNavLinks = [...rawNavLinks, ...Array.from(injectedMap.values())];
  }

  const navLinks = rawNavLinks
    .filter((link: any) => link.isActive !== false)
    .map((link: any) => {
      const pagesForMenu = dynamicLinks.filter(p => p.navbarMenu === link.name && p.status);
      const filteredDropdown = link.dropdown ? link.dropdown.filter((subLink: any) => subLink.isActive !== false) : [];
      
      let newDropdown = [...filteredDropdown];
      if (pagesForMenu.length > 0) {
        const injectedMap = new Map();
        pagesForMenu.forEach(p => {
          injectedMap.set(p.title.toLowerCase(), { name: p.title, href: `/${p.slug}`, isActive: true });
        });
        
        newDropdown = newDropdown.map((subLink: any) => {
          const key = subLink.name.toLowerCase();
          if (injectedMap.has(key)) {
            const rep = injectedMap.get(key);
            injectedMap.delete(key);
            return rep;
          }
          return subLink;
        });
        
        newDropdown = [...newDropdown, ...Array.from(injectedMap.values())];
      }
      
      // Filter and sanitize any sub-sub items inside subLink.dropdown
      newDropdown = newDropdown.map((subLink: any) => {
        const filteredSubSub = subLink.dropdown
          ? subLink.dropdown.filter((subSub: any) => subSub.isActive !== false)
          : [];
        let subHref = subLink.href;
        if (filteredSubSub.length > 0 && (!subHref || subHref === "#")) {
          subHref = filteredSubSub[0].href;
        }
        return {
          ...subLink,
          href: subHref,
          dropdown: filteredSubSub.length > 0 ? filteredSubSub : undefined,
        };
      });

      let updatedHref = link.href;
      // If this menu has a dropdown, ensure the parent href points to the first ACTIVE child.
      // This prevents the parent link from redirecting to a 404 if the original first child is inactive.
      if (newDropdown.length > 0) {
         updatedHref = newDropdown[0].href;
      }
      
      return { ...link, href: updatedHref, dropdown: newDropdown.length > 0 ? newDropdown : undefined };
    });

  const toggleMobileDropdown = (name: string) => {
    if (expandedMobileMenu === name) {
      setExpandedMobileMenu(null);
    } else {
      setExpandedMobileMenu(name);
    }
  };

  const toggleMobileSubDropdown = (name: string) => {
    if (expandedMobileSubMenu === name) {
      setExpandedMobileSubMenu(null);
    } else {
      setExpandedMobileSubMenu(name);
    }
  };

  return (
    <header className="w-full z-50 flex flex-col select-none" style={{ fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        body { top: 0 !important; }
        iframe.skiptranslate { display: none !important; }
        #goog-gt-tt { display: none !important; }
        .goog-te-spinner-pos { display: none !important; }
        html.translated-ltr body, html.translated-rtl body { opacity: 1 !important; visibility: visible !important; }
      `}} />
      {/* Tier 1: Teal Utility Bar */}
      {topHeaderSettings?.isActive !== false && (
        <div className="block w-full bg-[#007a87] text-white text-[10px] md:text-[8px] 2xl:text-[11px] py-1.5 px-2 md:px-1 2xl:px-4 font-medium border-b border-teal-600/30">
        <div className="max-w-full 2xl:max-w-[96%] mx-auto px-1 flex justify-between items-center flex-wrap gap-1 md:gap-4 xl:gap-0">
          <div className="flex items-center flex-wrap gap-1.5 md:gap-0.5 2xl:gap-4 text-white/90">
              {(() => {
                let topHeaderMenus = [...(topHeaderSettings?.menus || [
                  { name: "Emergency", href: "/emergency", textColor: "#f87171" },
                  { name: "Blood Bank", href: "/blood-bank" },
                  { name: "Pharmacy", href: "/pharmacy" },
                  { name: "Ambulance", href: "/ambulance", textColor: "#f87171" }
                ])];
                const topHeaderPages = dynamicLinks.filter((p: any) => p.navbarMenu === "Top Header" && p.status);
                if (topHeaderPages.length > 0) {
                  const injectedMap = new Map();
                  topHeaderPages.forEach((p: any) => {
                    injectedMap.set(p.title.toLowerCase(), {
                      name: p.title,
                      href: `/${p.slug}`,
                      isActive: true
                    });
                  });
                  topHeaderMenus = topHeaderMenus.map((link: any) => {
                    const key = link.name.toLowerCase();
                      if (injectedMap.has(key)) {
                        const rep = injectedMap.get(key);
                        injectedMap.delete(key);
                        if (link.textColor) rep.textColor = link.textColor; // Preserve original color
                        return rep;
                      }
                    return link;
                  });
                  topHeaderMenus = [...topHeaderMenus, ...Array.from(injectedMap.values())];
                }
              
              return topHeaderMenus
                 .filter((link: any) => link.isActive !== false)
                 .map((link: any) => ({
                   text: link.name,
                   link: link.href || "#",
                   cls: "hover:text-white transition-colors font-bold",
                   textColor: link.textColor
                 }));
            })().filter((item: any) => item && item.text).map((item: any, idx: number, arr: any[]) => (
              <React.Fragment key={idx}>
                <Link 
                  href={item.link} 
                  target="_self"
                  className={item.cls}
                  style={item.textColor ? { color: item.textColor } : {}}
                >
                  {item.text}
                </Link>
                {idx < arr.length - 1 && <span className="opacity-30">|</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center flex-wrap gap-1 2xl:gap-4 font-bold tracking-wide">
            {/* Phone Numbers */}
            {(topHeaderSettings?.phoneNumbers || []).filter((ph: any) => ph.isActive !== false && ph.text).length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
            {(topHeaderSettings?.phoneNumbers || [])
              .filter((ph: any) => ph.isActive !== false && ph.text)
              .map((ph: any, idx: number, arr: any[]) => {
                const isWhatsApp = ph.text.toLowerCase().includes("whatsapp");
                const waNumber = ph.number ? ph.number.replace(/[^0-9]/g, '') : '';
                return (
                  <React.Fragment key={`extra-ph-${idx}`}>
                    <a 
                      href={isWhatsApp && waNumber ? `https://wa.me/${waNumber}` : (ph.number ? `tel:${ph.number}` : "#")} 
                      target={isWhatsApp ? "_blank" : undefined}
                      rel={isWhatsApp ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-1 hover:text-teal-200 transition-colors"
                    >
                      {isWhatsApp ? (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                      ) : (
                        <Phone className="w-3 h-3" />
                      )}
                      <span>{ph.text}</span>
                    </a>
                    {idx < arr.length - 1 && <span className="inline opacity-30">|</span>}
                  </React.Fragment>
                );
              })}
              </div>
            )}

            {/* Top Bar Language Selector */}
            <div 
              className="relative group hidden md:flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors py-1 px-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10"
              onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); }}
              title="Change Language / भाषा निवडा"
            >
              <Globe className="w-3.5 h-3.5 text-teal-300 shrink-0" />
              <span className="hidden md:inline font-bold text-xs tracking-wide text-white">
                {getLanguageByCode(selectedLang).nativeLabel}
              </span>
              <ChevronDown className={`w-3 h-3 text-white/70 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />

              <div 
                className={`absolute top-full right-0 ${isLangOpen ? 'block' : 'hidden'} group-hover:block w-44 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden text-slate-700 z-50 notranslate mt-1.5 animate-fadeIn`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="py-1 flex flex-col text-[12px]">
                  {SUPPORTED_LANGUAGES.map((lang, idx) => {
                    const isSelected = selectedLang === lang.code;
                    return (
                      <div
                        key={lang.code}
                        onClick={() => { changeLanguage(lang.code); setIsLangOpen(false); }}
                        className={`px-3.5 py-2 flex items-center justify-between transition-colors cursor-pointer ${
                          idx > 0 ? 'border-t border-slate-50' : ''
                        } ${
                          isSelected
                            ? 'bg-[#007a87] text-white font-bold'
                            : 'hover:bg-slate-100 text-slate-700 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span>{lang.nativeLabel}</span>
                          <span className={`text-[10px] ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                            ({lang.label})
                          </span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1.5" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="hidden md:flex items-center gap-1 2xl:gap-2">
              {(topHeaderSettings?.buttons || [])
                .filter((btn: any) => btn.isActive !== false && btn.text)
                .map((btn: any, idx: number) => (
                <a 
                  key={`extra-btn-${idx}`}
                  href={btn.link || "#"} 
                  target={btn.icon ? "_blank" : undefined}
                  rel={btn.icon ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-1 border px-2 py-0.5 rounded transition-all shadow-sm ${
                     btn.icon ? 'bg-black hover:bg-slate-900 border-slate-700/50 hover:scale-105' : 'bg-[#d9232d] hover:bg-red-700 text-white border-red-800/50 font-semibold uppercase tracking-wide ml-1'
                  }`}
                  style={!btn.icon ? { backgroundColor: btn.bgColor || "#d9232d" } : {}}
                  onMouseOver={(e) => {
                     if (!btn.icon && btn.hoverColor) e.currentTarget.style.backgroundColor = btn.hoverColor;
                  }}
                  onMouseOut={(e) => {
                     if (!btn.icon) e.currentTarget.style.backgroundColor = btn.bgColor || "#d9232d";
                  }}
                >
                  {btn.icon === "playstore" ? (
                    <svg viewBox="0 0 1024 1024" className="w-3.5 h-3.5 shrink-0">
                      <path fill="#00E676" d="M104.5 125.1v773.8c0 14.3 8.3 26.6 20.4 32.5l398.8-419.4L104.5 125.1z" />
                      <path fill="#FF3D00" d="M523.7 512l153.9-161.8L160.7 53.6c-17.7-10.2-38.9-8-56.2 3.8l419.2 454.6z" />
                      <path fill="#FFC107" d="M677.6 350.2l198.5 114.6c24 13.9 24 48.7 0 62.6L677.6 642l-153.9-130 153.9-161.8z" />
                      <path fill="#00B0FF" d="M523.7 512L104.5 898.9c17.3 11.8 38.5 14 56.2 3.8L677.6 642 523.7 512z" />
                    </svg>
                  ) : btn.icon === "appstore" ? (
                    <svg viewBox="0 0 1024 1024" className="w-3.5 h-3.5 shrink-0">
                      <path fill="#fff" d="M789.2 642.4c-0.4 46 39.4 61.2 39.8 61.4-0.4 0.8-6.2 21.2-20.6 42.4-12.8 19-26.2 38-47.2 38.4-21 0.4-27.4-12.4-51.6-12.4s-31.4 12-51.2 12.8c-20.6 0.8-36.2-20.4-49.4-39.2-30.8-44.6-53.8-126-22.2-181 15.6-27.2 43.6-44.4 74-44.8 20.2-0.4 39.4 13.6 52 13.6 12.6 0 35.8-16.6 60.2-14.2 10.2 0.4 39 4.2 57.6 31.4-1.6 1-34.4 20-34.4 59.8zM651.8 221c11.6-14 19.4-33.6 17.2-53.2-16.6 0.6-37.4 11-49.4 25.2-9.6 11.2-18.8 31.2-16.2 50.4 18.6 1.4 36.8-8.4 48.4-22.4z" />
                    </svg>
                  ) : btn.icon ? (
                    <img src={btn.icon} alt="" className="w-3.5 h-3.5 object-contain shrink-0" />
                  ) : null}
                  {btn.icon ? (
                    <div className="flex flex-col items-start leading-[1] text-left mt-0.5">
                      <span className="text-[5px] text-slate-300 font-medium uppercase tracking-wider">{btn.icon === "playstore" ? "Get it on" : "Download on the"}</span>
                      <span className="text-[10px] text-white font-semibold">{btn.text}</span>
                    </div>
                  ) : (
                    btn.text
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Main White Header */}
      <nav
        className={`w-full bg-white border-b border-slate-200 py-2 sm:py-3 px-2 sm:px-4 z-40 transition-all duration-200 ${
          scrolled ? "fixed top-0 left-0 shadow-lg backdrop-blur-md bg-white/95" : "relative"
        }`}
      >
        <div className="max-w-full 2xl:max-w-[96%] mx-auto">
          <div className="flex justify-between items-center gap-1 sm:gap-2">

            {/* DMH Logo Section */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="flex items-center group focus:outline-none shrink-0">
                <div className="relative flex items-center justify-start w-[130px] min-[360px]:w-[150px] min-[400px]:w-[175px] sm:w-[220px] xl:w-[280px] 2xl:w-[380px] h-[34px] min-[360px]:h-[38px] sm:h-[55px] xl:h-[65px] shrink-0 transition-all">
                  {(headerSettings?.logo !== "") && (
                    <img
                      src={headerSettings?.logo || "/images/Untitled design11.png"}
                      alt="DMH Logo"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  )}
                </div>
              </Link>

              {/* Desktop 25 Years Image (Snug, Equal Spacing) */}
              {(headerSettings?.yearsImage !== "") && (
                <div className="hidden xl:flex items-center justify-center shrink-0 px-0.5 xl:px-1 2xl:px-1.5 -ml-1 xl:-ml-2 2xl:-ml-3 mr-0.5 xl:mr-1">
                  <div className="relative flex items-center justify-center w-[110px] 2xl:w-[150px] h-[45px] 2xl:h-[55px] shrink-0 transition-all">
                    <img
                      src={headerSettings?.yearsImage || "/images/ChatGPT Image Jul 27, 2026, 05_05_55 PM (1)_transparent.png"}
                      alt="Years Image"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Mobile 25 Years Image (Centered between logo and triggers) */}
            <div className="flex xl:hidden flex-1 justify-center items-center px-1 sm:px-2 min-w-0">
              {(headerSettings?.yearsImage !== "") && (
                <div className="relative flex items-center justify-center w-[48px] min-[360px]:w-[58px] min-[400px]:w-[70px] sm:w-[95px] h-[24px] min-[360px]:h-[28px] sm:h-[42px] shrink-0 transition-all">
                  <img
                    src={headerSettings?.yearsImage || "/images/ChatGPT Image Jul 27, 2026, 05_05_55 PM (1)_transparent.png"}
                    alt="Years Image"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center justify-end flex-1 gap-1 xl:gap-1.5 2xl:gap-3 transition-all ">
              {navLinks.map((link: any, idx: number) => (
                <div key={idx} className="relative group py-2">
                  <Link 
                    href={link.href || "#"} 
                    className="text-[8.5px] xl:text-[9.5px] 2xl:text-[11.5px] leading-[18px] font-bold text-slate-700 hover:text-[#007a87] uppercase tracking-wider transition-colors flex items-center gap-0.5 px-0.5 2xl:px-1 whitespace-nowrap"
                  >
                    <span>{link.name || "Menu Item"}</span>
                    {link.dropdown && link.dropdown.length > 0 && <ChevronDown className="w-2.5 h-2.5 2xl:w-3 2xl:h-3 opacity-60 group-hover:rotate-180 transition-transform shrink-0" />}
                  </Link>

                  {/* Dropdown Box */}
                  {link.dropdown && (
                    <div className={`absolute top-full pt-2 hidden group-hover:block w-56 2xl:w-64 z-50 animate-fadeIn ${
                      idx > 4 ? "right-0" : "left-0"
                    }`}>
                      <div className="bg-white rounded-lg shadow-xl border border-slate-100 py-1.5 overflow-visible">
                        {link.dropdown.map((subLink: any, sIdx: number) => {
                          const hasSubSub = subLink.dropdown && subLink.dropdown.length > 0;
                          return (
                            <div key={sIdx} className="w-full relative group/sub">
                              <Link
                                href={subLink.href || "#"}
                                className="flex items-center justify-between px-4 py-2 text-[13px] 2xl:text-[14px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#007a87] border-b border-slate-50 last:border-0 transition-colors whitespace-normal"
                              >
                                <span>{subLink.name || "Sub Menu"}</span>
                                {hasSubSub && (
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/sub:text-[#007a87] group-hover/sub:translate-x-0.5 shrink-0 ml-1.5 transition-all" />
                                )}
                              </Link>

                              {/* Flyout Sub-Sub Menu */}
                              {hasSubSub && (
                                <div className={`absolute top-0 hidden group-hover/sub:block w-56 2xl:w-64 z-50 animate-fadeIn ${
                                  idx > 4 ? "right-full mr-1" : "left-full ml-1"
                                }`}>
                                  <div className="bg-white rounded-lg shadow-xl border border-slate-100 py-1.5 overflow-hidden">
                                    {subLink.dropdown.map((subSubLink: any, ssIdx: number) => (
                                      <div key={ssIdx} className="w-full">
                                        <Link
                                          href={subSubLink.href || "#"}
                                          className="block px-4 py-2 text-[12.5px] 2xl:text-[13.5px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#007a87] border-b border-slate-50 last:border-0 transition-colors whitespace-normal"
                                        >
                                          {subSubLink.name || "Sub-Sub Menu"}
                                        </Link>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Action Stack */}
            <div className="hidden xl:flex items-center gap-0.5 2xl:gap-2 shrink-0 justify-end relative">
              <button 
                suppressHydrationWarning={true}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                aria-label="Toggle Search"
              >
                <svg className="w-[18px] h-[18px] 2xl:w-[20px] 2xl:h-[20px] stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Mobile / Tablet View Trigger (Triggers under 1280px Screen width) */}
            <div className="xl:hidden flex items-center gap-1 sm:gap-1.5 md:gap-3 shrink-0">
              <button 
                suppressHydrationWarning={true}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1 sm:p-1.5 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                aria-label="Toggle Search"
              >
                <svg className="w-4 sm:w-4.5 md:w-5 h-4 sm:h-4.5 md:h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Main Bar Language Selector (Tablet/Mobile Header) */}
              <div 
                className="relative group flex items-center gap-0.5 sm:gap-1 cursor-pointer text-slate-600 hover:text-slate-900 transition-colors py-0.5 sm:py-1 px-1 sm:px-1.5 rounded-lg hover:bg-slate-100 shrink-0"
                onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); }}
                title="Change Language / भाषा निवडा"
              >
                <Globe className="w-3.5 sm:w-4 md:w-5 h-3.5 sm:h-4 md:h-5 text-[#007a87] shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-1 py-0.5 rounded bg-teal-50 text-[#007a87] border border-teal-200">
                  {selectedLang}
                </span>
                <div 
                  className={`absolute top-full right-0 ${isLangOpen ? 'block' : 'hidden'} group-hover:block w-44 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden text-slate-700 z-50 notranslate mt-2 animate-fadeIn`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1 flex flex-col text-[12px] max-h-[60vh] overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((lang, idx) => {
                      const isSelected = selectedLang === lang.code;
                      return (
                        <div
                          key={lang.code}
                          onClick={() => { changeLanguage(lang.code); setIsLangOpen(false); }}
                          className={`px-3.5 py-2 flex items-center justify-between transition-colors cursor-pointer ${
                            idx > 0 ? 'border-t border-slate-50' : ''
                          } ${
                            isSelected
                              ? 'bg-[#007a87] text-white font-bold'
                              : 'hover:bg-slate-100 text-slate-700 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{lang.nativeLabel}</span>
                            <span className={`text-[10px] ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                              ({lang.label})
                            </span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1.5" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 sm:p-1.5 md:p-2 rounded-md bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shrink-0 flex items-center justify-center"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4 sm:w-4.5 md:w-5 h-4 sm:h-4.5 md:h-5" /> : <Menu className="w-4 sm:w-4.5 md:w-5 h-4 sm:h-4.5 md:h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Popup Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-2 right-2 sm:left-auto sm:right-6 mt-1.5 z-[60] animate-fadeIn flex justify-end">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-2.5 w-full sm:w-[420px] max-w-[420px] relative overflow-hidden">
              <form onSubmit={handleSearch} className="flex items-center">
                <input 
                  type="text" 
                  placeholder="Search doctors, simulation, charity, etc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-50 outline-none text-sm text-slate-800 px-3.5 py-2.5 rounded-l-xl border border-transparent focus:border-slate-200 transition-all font-medium"
                />
                <button type="submit" className="px-4 py-2.5 bg-[#007a87] text-white rounded-r-xl hover:bg-teal-700 transition-colors border border-[#007a87] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>

              {/* Quick Live Suggestions */}
              {searchQuery.trim().length >= 2 && (
                <div className="mt-2.5 pt-2 border-t border-slate-100 max-h-64 overflow-y-auto">
                  {isSearchingLive ? (
                    <div className="py-3 text-center text-xs text-slate-400 font-medium">
                      Searching hospital records...
                    </div>
                  ) : liveSuggestions.length > 0 ? (
                    <div className="space-y-1">
                      {liveSuggestions.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            router.push(item.href);
                            setIsSearchOpen(false);
                            setSearchQuery("");
                            setLiveSuggestions([]);
                          }}
                          className="w-full text-left p-2 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-between group"
                        >
                          <div className="truncate pr-2">
                            <span className="text-xs font-bold text-slate-800 group-hover:text-[#007a87] block truncate">
                              {item.title}
                            </span>
                            <span className="text-[10px] text-[#007a87] font-semibold uppercase tracking-wider block">
                              {item.category}
                            </span>
                          </div>
                          <span className="text-slate-300 group-hover:text-[#007a87] shrink-0 text-xs">→</span>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={handleSearch}
                        className="w-full text-center py-2 text-[11px] font-bold text-[#007a87] hover:bg-slate-50 rounded-lg transition-colors border-t border-slate-100 mt-1 block"
                      >
                        Press Enter to see all results
                      </button>
                    </div>
                  ) : (
                    <div className="py-3 text-center text-xs text-slate-400">
                      No quick matches. Press Enter to search everywhere.
                    </div>
                  )}
                </div>
              )}

              <button 
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                  setLiveSuggestions([]);
                }}
                className="absolute -top-2 -right-2 bg-white border border-slate-200 text-slate-400 hover:text-slate-700 rounded-full p-1 shadow-md transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile / Tablet Drawer */}
        <div
          className={`xl:hidden absolute inset-x-0 top-full bg-white border-b border-slate-200 overflow-y-auto transition-all duration-300 ease-in-out shadow-xl ${
            mobileMenuOpen ? "max-h-[85vh] opacity-100 py-3" : "max-h-0 opacity-0 py-0 pointer-events-none"
          }`}
        >
          <div className="bg-slate-50 py-3 sm:py-4 px-3 sm:px-4 pb-20 relative" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="flex flex-col">
              {navLinks.map((link: any, idx: number) => (
                <div key={idx} className="flex flex-col border-b border-slate-200/60 last:border-0 relative">
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(link.name)}
                      className="w-full flex justify-between items-center px-3 py-2.5 rounded-lg text-[13px] font-semibold uppercase tracking-wider text-slate-700 hover:bg-slate-50"
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform ${
                          expandedMobileMenu === link.name ? "rotate-180 text-[#007a87]" : ""
                        }`}
                      />
                    </button>
                    
                    <div
                      className={`pl-4 space-y-0.5 overflow-hidden transition-all duration-200 ${
                        expandedMobileMenu === link.name ? "max-h-[1500px] opacity-100 mt-1 mb-2" : "max-h-0 opacity-0"
                      }`}
                    >
                      {link.dropdown.map((subLink: any, sIdx: number) => {
                        const hasSubSub = subLink.dropdown && subLink.dropdown.length > 0;
                        const subKey = `${link.name}-${subLink.name}`;
                        const isSubExpanded = expandedMobileSubMenu === subKey;
                        return (
                          <div key={sIdx} className="flex flex-col">
                            {hasSubSub ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => toggleMobileSubDropdown(subKey)}
                                  className="w-full flex justify-between items-center px-3 py-2 text-[13px] md:text-[14px] font-semibold text-slate-700 hover:text-[#007a87]"
                                >
                                  <span>{subLink.name}</span>
                                  <ChevronDown
                                    className={`w-3.5 h-3.5 transform transition-transform ${
                                      isSubExpanded ? "rotate-180 text-[#007a87]" : "text-slate-400"
                                    }`}
                                  />
                                </button>
                                {isSubExpanded && (
                                  <div className="pl-4 space-y-0.5 border-l-2 border-teal-200/50 ml-3 my-1">
                                    {subLink.dropdown.map((subSub: any, ssIdx: number) => (
                                      <Link
                                        key={ssIdx}
                                        href={subSub.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-3 py-1.5 text-[12px] md:text-[13px] font-medium text-slate-600 hover:text-[#007a87]"
                                      >
                                        {subSub.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                href={subLink.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 text-[13px] md:text-[14px] font-semibold text-slate-600 hover:text-[#007a87]"
                              >
                                {subLink.name}
                              </Link>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-3 py-2.5 rounded-lg text-[13px] font-semibold uppercase tracking-wider text-slate-700 hover:bg-slate-50"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Bottom Panel Actions inside Mobile Drawer */}
            <div className="pt-3 border-t border-slate-100 mt-3 flex flex-col gap-2">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-[#007a87]" />
                    <span>Select Language / भाषा निवडा</span>
                  </div>
                  <span className="text-[10px] bg-teal-100 text-[#007a87] px-2 py-0.5 rounded-full font-bold">
                    {getLanguageByCode(selectedLang).label}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-semibold">
                  {SUPPORTED_LANGUAGES.map((lang) => {
                    const isSelected = selectedLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => { changeLanguage(lang.code); setMobileMenuOpen(false); }}
                        className={`px-2.5 py-2 rounded-lg text-center transition-all flex items-center justify-between text-[11px] font-bold ${
                          isSelected
                            ? 'bg-[#007a87] text-white border-2 border-[#005a63] shadow-md'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm'
                        }`}
                      >
                        <span>{lang.nativeLabel}</span>
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1" />
                        ) : (
                          <span className="text-[9px] text-slate-400 uppercase font-medium">{lang.code}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* App Store & Google Play Store Buttons for Mobile Drawer */}
              {(topHeaderSettings?.buttons || []).filter((btn: any) => btn.isActive !== false && btn.text).length > 0 && (
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>Download DMH Mobile App</span>
                    <span className="text-[10px] text-[#007a87] font-extrabold uppercase px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200">
                      Free App
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {(topHeaderSettings?.buttons || [])
                      .filter((btn: any) => btn.isActive !== false && btn.text)
                      .map((btn: any, idx: number) => (
                      <a 
                        key={`drawer-app-btn-${idx}`}
                        href={btn.link || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`flex items-center gap-2 border px-2.5 py-2 rounded-lg transition-all shadow-sm ${
                           btn.icon ? 'bg-black hover:bg-slate-900 border-slate-800' : 'bg-[#d9232d] hover:bg-red-700 text-white border-red-800/50 font-semibold uppercase tracking-wide'
                        }`}
                        style={!btn.icon ? { backgroundColor: btn.bgColor || "#d9232d" } : {}}
                      >
                        {btn.icon === "playstore" ? (
                          <svg viewBox="0 0 1024 1024" className="w-4 h-4 shrink-0">
                            <path fill="#00E676" d="M104.5 125.1v773.8c0 14.3 8.3 26.6 20.4 32.5l398.8-419.4L104.5 125.1z" />
                            <path fill="#FF3D00" d="M523.7 512l153.9-161.8L160.7 53.6c-17.7-10.2-38.9-8-56.2 3.8l419.2 454.6z" />
                            <path fill="#FFC107" d="M677.6 350.2l198.5 114.6c24 13.9 24 48.7 0 62.6L677.6 642l-153.9-130 153.9-161.8z" />
                            <path fill="#00B0FF" d="M523.7 512L104.5 898.9c17.3 11.8 38.5 14 56.2 3.8L677.6 642 523.7 512z" />
                          </svg>
                        ) : btn.icon === "appstore" ? (
                          <svg viewBox="0 0 1024 1024" className="w-4 h-4 shrink-0">
                            <path fill="#fff" d="M789.2 642.4c-0.4 46 39.4 61.2 39.8 61.4-0.4 0.8-6.2 21.2-20.6 42.4-12.8 19-26.2 38-47.2 38.4-21 0.4-27.4-12.4-51.6-12.4s-31.4 12-51.2 12.8c-20.6 0.8-36.2-20.4-49.4-39.2-30.8-44.6-53.8-126-22.2-181 15.6-27.2 43.6-44.4 74-44.8 20.2-0.4 39.4 13.6 52 13.6 12.6 0 35.8-16.6 60.2-14.2 10.2 0.4 39 4.2 57.6 31.4-1.6 1-34.4 20-34.4 59.8zM651.8 221c11.6-14 19.4-33.6 17.2-53.2-16.6 0.6-37.4 11-49.4 25.2-9.6 11.2-18.8 31.2-16.2 50.4 18.6 1.4 36.8-8.4 48.4-22.4z" />
                          </svg>
                        ) : btn.icon ? (
                          <img src={btn.icon} alt="" className="w-4 h-4 object-contain shrink-0" />
                        ) : null}
                        {btn.icon ? (
                          <div className="flex flex-col items-start leading-[1.1] text-left">
                            <span className="text-[7px] text-slate-300 font-medium uppercase tracking-wider">{btn.icon === "playstore" ? "Get it on" : "Download on the"}</span>
                            <span className="text-[11px] text-white font-bold">{btn.text}</span>
                          </div>
                        ) : (
                          <span className="text-[11px] font-bold">{btn.text}</span>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <a 
                href={topHeaderSettings?.whatsappNumber ? `https://wa.me/${topHeaderSettings.whatsappNumber}` : "https://wa.me/912040151000"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold transition-colors"
              >
                <span>{topHeaderSettings?.whatsappText || "WhatsApp Us (24/7)"}</span>
              </a>
              
            </div>
          </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
