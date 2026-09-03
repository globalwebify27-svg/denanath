"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Phone, ChevronDown, Globe } from "lucide-react";
import Link from "next/link";
import { applyOfflineTranslation } from "@/lib/offlineTranslate";
import { baseNavLinks } from "@/lib/navConfig";

export default function Navbar({ topHeaderSettings, headerSettings }: { topHeaderSettings?: any, headerSettings?: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileSearchOpen(false);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    // Patch DOM to prevent React crashes from Google Translate modifications
    if (typeof Node === 'function' && Node.prototype) {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function (child: any) {
        if (child.parentNode !== this) {
          if (console) {
            console.warn('Cannot remove a child from a different parent', child, this);
          }
          return child;
        }
        return originalRemoveChild.apply(this, arguments as any);
      };
      
      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function (newNode: any, referenceNode: any) {
        if (referenceNode && referenceNode.parentNode !== this) {
          if (console) {
            console.warn('Cannot insert before a reference node from a different parent', referenceNode, this);
          }
          return newNode;
        }
        return originalInsertBefore.apply(this, arguments as any);
      };
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Google Translate Initialization
    if (!(window as any).googleTranslateElementInit) {
      const addScript = document.createElement("script");
      addScript.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      document.body.appendChild(addScript);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,mr,ar,gu,kn,ta,de",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    }

    // Apply offline/client translation fallback on load if offline or before Google Translate loads
    try {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2,3})/);
      if (match && match[1] && match[1] !== 'en') {
        setTimeout(() => applyOfflineTranslation(match[1]), 50);
      }
    } catch (e) {}

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (langCode: string) => {
    const hostname = window.location.hostname;
    const rootDomain = hostname.split('.').slice(-2).join('.');

    if (langCode === 'en') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${hostname}; path=/;`;
      if (rootDomain && rootDomain !== hostname) {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${rootDomain}; path=/;`;
      }
    } else {
      const val = `/en/${langCode}`;
      document.cookie = `googtrans=${val}; path=/; max-age=31536000;`;
      document.cookie = `googtrans=${val}; domain=${hostname}; path=/; max-age=31536000;`;
      if (rootDomain && rootDomain !== hostname) {
        document.cookie = `googtrans=${val}; domain=.${rootDomain}; path=/; max-age=31536000;`;
      }
    }

    try {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        combo.value = langCode;
        combo.dispatchEvent(new Event('change'));
      }
    } catch (e) {
      console.error("Error triggering direct translation:", e);
    }

    // Apply offline client dictionary translation immediately
    applyOfflineTranslation(langCode);

    setTimeout(() => {
      if (navigator.onLine) {
        window.location.reload();
      }
    }, 150);
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
        replacement.href = link.href; // Preserve the original built-in link
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
            rep.href = subLink.href; // Preserve the original built-in link
            return rep;
          }
          return subLink;
        });
        
        newDropdown = [...newDropdown, ...Array.from(injectedMap.values())];
      }
      
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

  return (
    <header className="w-full z-50 flex flex-col select-none" style={{ fontFamily: '"Plus Jakarta Sans", "Plus Jakarta Sans Fallback", sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        body { top: 0 !important; }
        iframe.skiptranslate { display: none !important; }
        #goog-gt-tt { display: none !important; }
        .goog-te-spinner-pos { display: none !important; }
        html.translated-ltr body, html.translated-rtl body { opacity: 1 !important; visibility: visible !important; }
      `}} />
      <div id="google_translate_element" style={{ position: 'absolute', opacity: 0, zIndex: -1, width: 0, height: 0, overflow: 'hidden' }}></div>
      {/* Tier 1: Teal Utility Bar */}
      {topHeaderSettings?.isActive !== false && (
        <div className="block w-full bg-[#007a87] text-white text-[10px] md:text-[8px] 2xl:text-[11px] py-1.5 px-2 md:px-1 2xl:px-4 font-medium border-b border-teal-600/30">
        <div className="max-w-full 2xl:max-w-[96%] mx-auto px-1 flex justify-between items-center flex-wrap gap-1 md:gap-4 xl:gap-0">
          <div className="flex items-center gap-1.5 md:gap-0.5 2xl:gap-4 text-white/90">
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
                      rep.href = link.href; // Preserve the original built-in link
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
                  className={item.cls}
                  style={item.textColor ? { color: item.textColor } : {}}
                >
                  {item.text}
                </Link>
                {idx < arr.length - 1 && <span className="opacity-30">|</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-0.5 2xl:gap-4 font-bold tracking-wide">
            {/* Phone Numbers */}
            {(topHeaderSettings?.phoneNumbers || []).filter((ph: any) => ph.isActive !== false && ph.text).length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
            {(topHeaderSettings?.phoneNumbers || [])
              .filter((ph: any) => ph.isActive !== false && ph.text)
              .map((ph: any, idx: number, arr: any[]) => {
                const isFirst = idx === 0;
                return (
                  <React.Fragment key={`extra-ph-${idx}`}>
                    <a 
                      href={ph.number ? `tel:${ph.number}` : "#"} 
                      className={`${isFirst ? "hidden md:flex" : "flex"} items-center gap-1 hover:text-teal-200 transition-colors`}
                    >
                      <Phone className="w-3 h-3" />
                      <span className="hidden md:inline">{ph.text}</span>
                      <span className="md:hidden">
                        {ph.text}
                      </span>
                    </a>
                    {idx < arr.length - 1 && <span className={`${isFirst ? "hidden md:inline" : "inline"} opacity-30`}>|</span>}
                  </React.Fragment>
                );
              })}
              </div>
            )}

            <div 
              className="relative group hidden md:flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors py-1 px-2"
              onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); }}
            >
              <Globe className="w-4 h-4" />
              <span className="hidden md:inline">Select Language</span>
              <div 
                className={`absolute top-full right-0 ${isLangOpen ? 'block' : 'hidden'} group-hover:block w-32 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden text-slate-700 z-50 notranslate`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex flex-col text-[11px] 2xl:text-[12px] font-bold">
                  <div onClick={() => { changeLanguage('en'); setIsLangOpen(false); }} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer">English</div>
                  <div onClick={() => { changeLanguage('hi'); setIsLangOpen(false); }} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Hindi</div>
                  <div onClick={() => { changeLanguage('mr'); setIsLangOpen(false); }} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Marathi</div>
                  <div onClick={() => { changeLanguage('gu'); setIsLangOpen(false); }} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Gujarati</div>
                  <div onClick={() => { changeLanguage('kn'); setIsLangOpen(false); }} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Kannada</div>
                  <div onClick={() => { changeLanguage('ta'); setIsLangOpen(false); }} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Tamil</div>
                  <div onClick={() => { changeLanguage('ar'); setIsLangOpen(false); }} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Arabic</div>
                  <div onClick={() => { changeLanguage('de'); setIsLangOpen(false); }} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">German</div>
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
                  className={`flex items-center gap-1 border px-2.5 py-0.5 rounded transition-all shadow-sm ${
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
                    <svg viewBox="0 0 1024 1024" className="w-3.5 h-3.5">
                      <path fill="#00E676" d="M104.5 125.1v773.8c0 14.3 8.3 26.6 20.4 32.5l398.8-419.4L104.5 125.1z" />
                      <path fill="#FF3D00" d="M523.7 512l153.9-161.8L160.7 53.6c-17.7-10.2-38.9-8-56.2 3.8l419.2 454.6z" />
                      <path fill="#FFC107" d="M677.6 350.2l198.5 114.6c24 13.9 24 48.7 0 62.6L677.6 642l-153.9-130 153.9-161.8z" />
                      <path fill="#00B0FF" d="M523.7 512L104.5 898.9c17.3 11.8 38.5 14 56.2 3.8L677.6 642 523.7 512z" />
                    </svg>
                  ) : btn.icon === "appstore" ? (
                    <svg viewBox="0 0 1024 1024" className="w-3.5 h-3.5">
                      <path fill="#fff" d="M789.2 642.4c-0.4 46 39.4 61.2 39.8 61.4-0.4 0.8-6.2 21.2-20.6 42.4-12.8 19-26.2 38-47.2 38.4-21 0.4-27.4-12.4-51.6-12.4s-31.4 12-51.2 12.8c-20.6 0.8-36.2-20.4-49.4-39.2-30.8-44.6-53.8-126-22.2-181 15.6-27.2 43.6-44.4 74-44.8 20.2-0.4 39.4 13.6 52 13.6 12.6 0 35.8-16.6 60.2-14.2 10.2 0.4 39 4.2 57.6 31.4-1.6 1-34.4 20-34.4 59.8zM651.8 221c11.6-14 19.4-33.6 17.2-53.2-16.6 0.6-37.4 11-49.4 25.2-9.6 11.2-18.8 31.2-16.2 50.4 18.6 1.4 36.8-8.4 48.4-22.4z" />
                    </svg>
                  ) : btn.icon ? (
                    <img src={btn.icon} alt="" className="w-3.5 h-3.5 object-contain" />
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
        className={`w-full bg-white border-b border-slate-200 py-3 z-40 transition-all duration-200 ${
          scrolled ? "fixed top-0 left-0 shadow-lg backdrop-blur-md bg-white/95" : "relative"
        }`}
      >
        <div className="max-w-[98%] 2xl:max-w-[96%] mx-auto">
          <div className="flex justify-between items-center">

            {/* DMH Logo Section */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="flex items-center group focus:outline-none shrink-0">
                <div className="relative flex items-center justify-start w-[180px] sm:w-[230px] xl:w-[280px] 2xl:w-[380px] h-[40px] sm:h-[55px] xl:h-[65px] shrink-0 transition-all">
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
            <div className="flex xl:hidden flex-1 justify-center items-center px-2">
              {(headerSettings?.yearsImage !== "") && (
                <div className="relative flex items-center justify-center w-[70px] sm:w-[100px] h-[30px] sm:h-[45px] shrink-0 transition-all">
                  <img
                    src={headerSettings?.yearsImage || "/images/ChatGPT Image Jul 27, 2026, 05_05_55 PM (1)_transparent.png"}
                    alt="Years Image"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center justify-end flex-1 gap-1 xl:gap-1.5 2xl:gap-3 transition-all whitespace-nowrap">
              {navLinks.map((link: any, idx: number) => (
                <div key={idx} className="relative group py-2">
                  <Link 
                    href={link.href || "#"} 
                    className="text-[8.5px] xl:text-[9.5px] 2xl:text-[11.5px] leading-[18px] font-bold text-slate-700 hover:text-[#007a87] uppercase tracking-wider transition-colors flex items-center gap-0.5 whitespace-nowrap px-0.5 2xl:px-1"
                  >
                    <span>{link.name || "Menu Item"}</span>
                    {link.dropdown && link.dropdown.length > 0 && <ChevronDown className="w-2.5 h-2.5 2xl:w-3 2xl:h-3 opacity-60 group-hover:rotate-180 transition-transform shrink-0" />}
                  </Link>

                  {/* Dropdown Box */}
                  {link.dropdown && (
                    <div className={`absolute top-full pt-2 hidden group-hover:block w-56 2xl:w-64 z-50 animate-fadeIn ${
                      idx > 4 ? "right-0" : "left-0"
                    }`}>
                      <div className="bg-white rounded-lg shadow-xl border border-slate-100 py-1.5 overflow-hidden">
                        {link.dropdown.map((subLink: any, sIdx: number) => (
                          <li key={sIdx} className="w-full list-none">
                            <Link key={sIdx}
                            href={subLink.href || "#"}
                            className="block px-4 py-2 text-[13px] 2xl:text-[14px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#007a87] border-b border-slate-50 last:border-0 transition-colors whitespace-normal"
                          >
                            {subLink.name || "Sub Menu"}
                          </Link>
                          </li>
                        ))}
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
            <div className="xl:hidden flex items-center gap-1.5 md:gap-3 shrink-0">
              <button 
                suppressHydrationWarning={true}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                aria-label="Toggle Search"
              >
                <svg className="w-4 md:w-5 h-4 md:h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <div 
                className="relative group flex items-center cursor-pointer text-slate-500 hover:text-slate-900 transition-colors py-1.5 px-1.5"
                onClick={(e) => { e.stopPropagation(); setIsLangOpen(!isLangOpen); }}
              >
                <Globe className="w-4 md:w-5 h-4 md:h-5" />
                <div 
                  className={`absolute top-full right-0 ${isLangOpen ? 'block' : 'hidden'} group-hover:block w-36 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden text-slate-700 z-50 notranslate mt-2`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col text-[13px] font-bold max-h-[60vh] overflow-y-auto">
                    <div onClick={() => { changeLanguage('en'); setIsLangOpen(false); }} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer text-left">English</div>
                    <div onClick={() => { changeLanguage('hi'); setIsLangOpen(false); }} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Hindi</div>
                    <div onClick={() => { changeLanguage('mr'); setIsLangOpen(false); }} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Marathi</div>
                    <div onClick={() => { changeLanguage('gu'); setIsLangOpen(false); }} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Gujarati</div>
                    <div onClick={() => { changeLanguage('kn'); setIsLangOpen(false); }} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Kannada</div>
                    <div onClick={() => { changeLanguage('ta'); setIsLangOpen(false); }} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Tamil</div>
                    <div onClick={() => { changeLanguage('ar'); setIsLangOpen(false); }} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Arabic</div>
                    <div onClick={() => { changeLanguage('de'); setIsLangOpen(false); }} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">German</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 md:p-2 rounded-md bg-slate-50 border border-slate-200 text-slate-700 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4 md:w-5 h-4 md:h-5" /> : <Menu className="w-4 md:w-5 h-4 md:h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Popup Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full right-2 sm:right-6 mt-1 z-[60] animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-2 w-[280px] sm:w-[350px] relative">
              <form onSubmit={handleSearch} className="flex items-center">
                <input 
                  type="text" 
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-50 outline-none text-sm text-slate-700 px-4 py-2.5 rounded-l-lg border border-transparent focus:border-slate-200 transition-all"
                />
                <button type="submit" className="px-4 py-2.5 bg-[#007a87] text-white rounded-r-lg hover:bg-teal-700 transition-colors border border-[#007a87]">
                  <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
              <button 
                type="button"
                onClick={() => setIsSearchOpen(false)}
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
            mobileMenuOpen ? "max-h-[85vh] opacity-100 py-4" : "max-h-0 opacity-0 py-0 pointer-events-none"
          }`}
        >
          <div className="flex-grow overflow-y-auto bg-slate-50 py-4 pb-24 h-full relative" style={{ WebkitOverflowScrolling: 'touch' }}>
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
                        expandedMobileMenu === link.name ? "max-h-96 opacity-100 mt-1 mb-2" : "max-h-0 opacity-0"
                      }`}
                    >
                      {link.dropdown.map((subLink: any, sIdx: number) => (
                        <Link
                          key={sIdx}
                          href={subLink.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-[13px] md:text-[14px] font-semibold text-slate-600 hover:text-[#007a87]"
                        >
                          {subLink.name}
                        </Link>
                      ))}
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
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                  <Globe className="w-4 h-4 text-[#007a87]" />
                  <span>Select Language / भाषा चुनें</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px] font-semibold">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'Hindi' },
                    { code: 'mr', label: 'Marathi' },
                    { code: 'gu', label: 'Gujarati' },
                    { code: 'kn', label: 'Kannada' },
                    { code: 'ta', label: 'Tamil' },
                    { code: 'ar', label: 'Arabic' },
                    { code: 'de', label: 'German' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => { changeLanguage(lang.code); setMobileMenuOpen(false); }}
                      className="px-2 py-1.5 rounded bg-white hover:bg-[#007a87] hover:text-white border border-slate-200 transition-colors text-center shadow-sm"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <a 
                href={topHeaderSettings?.whatsappNumber ? `https://wa.me/${topHeaderSettings.whatsappNumber}` : "https://wa.me/912040151515"} 
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
