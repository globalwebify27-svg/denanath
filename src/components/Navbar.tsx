"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Phone, ChevronDown, Globe } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (langCode: string) => {
    if (langCode === 'en') {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      document.cookie = `googtrans=/en/${langCode}; domain=${window.location.hostname}; path=/;`;
    }
    window.location.reload();
  };

  const navLinks = [
    {
      name: "About Us",
      href: "/about-hospital",
      dropdown: [
        { name: "About Hospital", href: "/about-hospital" },
        { name: "Associates", href: "/associates" },
        { name: "Accreditations", href: "/accreditations" },
        { name: "Support Hospital / Donations", href: "/supportHospitalDonations" },
        { name: "Unique features of DMH", href: "/unique-features" },
        { name: "Foreign Contribution", href: "/foreign-contribution" },
        { name: "Charity Details", href: "/charity-details" },
      ],
    },
    {
      name: "Patient & Visitors",
      href: "/out-patient",
      dropdown: [
        { name: "Out Patient Guide", href: "/out-patient" },
        { name: "In Patient Guide", href: "/in-patient" },
        { name: "Health Packages", href: "/health-packages" },
        { name: "Facilities", href: "/facilities" },
        { name: "Virtual Tour", href: "/virtual-tour" },
        { name: "Patients Stories / Feedbacks", href: "/feedbacks" },
        { name: "Patient Rights & Responsibilities", href: "/patient-rights" },
        { name: "Photos", href: "/gallery-photos" },
        { name: "Videos", href: "/gallery-videos" },
      ],
    },
    {
      name: "Doctors & Departments",
      href: "/doctor-details",
      dropdown: [
        { name: "Doctor Details", href: "/doctor-details" },
        { name: "Department Details", href: "/departments" },
        { name: "Services", href: "/services" },
      ],
    },
    {
      name: "Research",
      href: "/research-about",
      dropdown: [
        { name: "About Us", href: "/research-about" },
        { name: "Training And Events", href: "/training-events" },
        { name: "Awards", href: "/awards" },
        { name: "Newsletter Articles", href: "/newsletter-articles" },
        { name: "Publications", href: "/publications" },
        { name: "Annual Reports", href: "/annual-reports" },
        { name: "Sponsors & CROs", href: "/sponsors-cros" },
        { name: "Contact Us", href: "/research-contact" },
      ],
    },
    {
      name: "Academics",
      href: "/academics",
      dropdown: [
        { name: "Academics", href: "/academics" },
        { name: "Simulation Center", href: "/simulation-center" },
      ],
    },
    {
      name: "Online Facilities",
      href: "/email-login",
      dropdown: [
        { name: "E-Mail Login (DMH Users)", href: "/email-login" },
        { name: "Online Payment", href: "/online-payment" },
        { name: "Patient Portal", href: "/patient-portal" },
        { name: "Patient Registration Form", href: "/patient-registration" },
      ],
    },

    {
      name: "Contact Us",
      href: "/contact-us",
    },
  ];

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
      <div className="hidden xl:block w-full bg-[#007a87] text-white text-[8px] 2xl:text-[11px] py-1.5 px-1 2xl:px-4 font-medium border-b border-teal-600/30">
        <div className="max-w-full 2xl:max-w-[96%] mx-auto px-1 flex justify-between items-center">
          <div className="flex items-center gap-0.5 2xl:gap-4 text-white/90">
            <Link href="/emergency" className="hover:text-red-300 transition-colors font-bold text-red-400">Emergency</Link>
            <span className="opacity-30">|</span>
            <Link href="/blood-bank" className="hover:text-white transition-colors">Blood&nbsp;&nbsp;Bank</Link>
            <span className="opacity-30">|</span>
            <Link href="/pharmacy" className="hover:text-white transition-colors">Pharmacy</Link>
            <span className="opacity-30">|</span>
            <Link href="/ambulance" className="hover:text-red-300 transition-colors font-bold text-red-400">Ambulance</Link>
          </div>

          <div className="flex items-center gap-0.5 2xl:gap-4 font-bold tracking-wide">
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
            <span className="opacity-30">|</span>
            <div className="relative group flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors py-1 px-2">
              <Globe className="w-4 h-4" />
              <span>Select Language</span>
              <div className="absolute top-full right-0 hidden group-hover:block w-32 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden text-slate-700 z-50 notranslate">
                <div className="flex flex-col text-[11px] 2xl:text-[12px] font-bold">
                  <div onClick={() => changeLanguage('en')} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer">English</div>
                  <div onClick={() => changeLanguage('hi')} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Hindi</div>
                  <div onClick={() => changeLanguage('mr')} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Marathi</div>
                  <div onClick={() => changeLanguage('gu')} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Gujarati</div>
                  <div onClick={() => changeLanguage('kn')} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Kannada</div>
                  <div onClick={() => changeLanguage('ta')} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Tamil</div>
                  <div onClick={() => changeLanguage('ar')} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">Arabic</div>
                  <div onClick={() => changeLanguage('de')} className="px-4 py-2.5 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50">German</div>
                </div>
              </div>
            </div>
            <span className="opacity-30">|</span>
            <div className="flex items-center gap-1 2xl:gap-2">
              <a 
                href="https://play.google.com/store/apps/details?id=org.dmhospital.app&hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 bg-black hover:bg-slate-900 border border-slate-700/50 px-1 py-0.5 rounded transition-all hover:scale-105"
              >
                <svg viewBox="0 0 1024 1024" className="w-3.5 h-3.5">
                  <path fill="#00E676" d="M104.5 125.1v773.8c0 14.3 8.3 26.6 20.4 32.5l398.8-419.4L104.5 125.1z" />
                  <path fill="#FF3D00" d="M523.7 512l153.9-161.8L160.7 53.6c-17.7-10.2-38.9-8-56.2 3.8l419.2 454.6z" />
                  <path fill="#FFC107" d="M677.6 350.2l198.5 114.6c24 13.9 24 48.7 0 62.6L677.6 642l-153.9-130 153.9-161.8z" />
                  <path fill="#00B0FF" d="M523.7 512L104.5 898.9c17.3 11.8 38.5 14 56.2 3.8L677.6 642 523.7 512z" />
                </svg>
                <div className="flex flex-col items-start leading-[1] text-left mt-0.5">
                  <span className="text-[5px] text-slate-300 font-medium uppercase tracking-wider">Get it on</span>
                  <span className="text-[10px] text-white font-semibold">Google Play</span>
                </div>
              </a>

              <a 
                href="https://apps.apple.com/in/app/deenanath-mangeshkar-hospital/id1187525263" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 bg-black hover:bg-slate-900 border border-slate-700/50 px-1 py-0.5 rounded transition-all hover:scale-105"
              >
                <svg viewBox="0 0 384 512" className="w-3.5 h-3.5 fill-white">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                </svg>
                <div className="flex flex-col items-start leading-[1] text-left mt-0.5">
                  <span className="text-[5px] text-slate-300 font-medium">Download on the</span>
                  <span className="text-[10px] text-white font-semibold">App Store</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main White Header */}
      <nav
        className={`w-full bg-white border-b border-slate-200 py-3 z-40 transition-all duration-200 ${
          scrolled ? "fixed top-0 left-0 shadow-lg backdrop-blur-md bg-white/95" : "relative"
        }`}
      >
        <div className="max-w-[98%] 2xl:max-w-[96%] mx-auto">
          <div className="flex justify-between items-center">

            {/* DMH Logo Section */}
            <div className="flex items-center shrink-0 gap-2 sm:gap-4 lg:gap-6">
              <Link href="/" className="flex items-center gap-1 sm:gap-2 group focus:outline-none">
                <div className="relative flex items-center justify-start w-[180px] sm:w-[220px] xl:w-[280px] 2xl:w-[380px] h-[40px] sm:h-[55px] xl:h-[65px] shrink-0 transition-all">
                  <img
                    src="/images/Untitled design11.png"
                    alt="DMH Logo"
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
              </Link>
              <div className="relative flex items-center justify-start w-[70px] sm:w-[100px] xl:w-[140px] 2xl:w-[180px] h-[30px] sm:h-[45px] xl:h-[55px] shrink transition-all">
                <img
                  src="/images/Screenshot 2026-07-02 221435_transparent.png"
                  alt="Accreditation"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center justify-end flex-1 mx-0 2xl:mx-3 gap-1 2xl:gap-2 transition-all">
              {navLinks.map((link, idx) => (
                <div key={idx} className="relative group py-2">
                  <Link 
                    href={link.href} 
                    className="text-[8.5px] xl:text-[9.5px] 2xl:text-[11.5px] leading-[18px] font-bold text-slate-700 hover:text-[#007a87] uppercase tracking-wider transition-colors flex items-center gap-0.5 whitespace-nowrap px-0.5 2xl:px-1"
                  >
                    <span>{link.name}</span>
                    {link.dropdown && <ChevronDown className="w-2.5 h-2.5 2xl:w-3 2xl:h-3 opacity-60 group-hover:rotate-180 transition-transform shrink-0" />}
                  </Link>

                  {/* Dropdown Box */}
                  {link.dropdown && (
                    <div className={`absolute top-full pt-2 hidden group-hover:block w-56 2xl:w-64 z-50 animate-fadeIn ${
                      idx > 4 ? "right-0" : "left-0"
                    }`}>
                      <div className="bg-white rounded-lg shadow-xl border border-slate-100 py-1.5 overflow-hidden">
                        {link.dropdown.map((subLink, sIdx) => (
                          <Link
                            key={sIdx}
                            href={subLink.href}
                            className="block px-4 py-2 text-[13px] 2xl:text-[14px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#007a87] border-b border-slate-50 last:border-0 transition-colors whitespace-normal"
                          >
                            {subLink.name}
                          </Link>
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
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors shrink-0"
                aria-label="Toggle Search"
              >
                <svg className="w-4 md:w-5 h-4 md:h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <div className="relative group flex items-center cursor-pointer text-slate-500 hover:text-slate-900 transition-colors py-1.5 px-1.5">
                <Globe className="w-4 md:w-5 h-4 md:h-5" />
                <div className="absolute top-full right-0 hidden group-hover:block w-32 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden text-slate-700 z-50 notranslate mt-3">
                  <div className="flex flex-col text-[12px] font-bold">
                    <div onClick={() => changeLanguage('en')} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer text-left">English</div>
                    <div onClick={() => changeLanguage('hi')} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Hindi</div>
                    <div onClick={() => changeLanguage('mr')} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Marathi</div>
                    <div onClick={() => changeLanguage('gu')} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Gujarati</div>
                    <div onClick={() => changeLanguage('kn')} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Kannada</div>
                    <div onClick={() => changeLanguage('ta')} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Tamil</div>
                    <div onClick={() => changeLanguage('ar')} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">Arabic</div>
                    <div onClick={() => changeLanguage('de')} className="px-4 py-3 hover:bg-[#007a87] hover:text-white transition-colors cursor-pointer border-t border-slate-50 text-left">German</div>
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
          <div className="px-4 space-y-1">
            {navLinks.map((link, idx) => (
              <div key={idx} className="border-b border-slate-50 last:border-0 pb-1">
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
                      {link.dropdown.map((subLink, sIdx) => (
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
              <a 
                href="https://wa.me/912040151515" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-bold transition-colors"
              >
                <span>WhatsApp Us (24/7)</span>
              </a>
              

            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}