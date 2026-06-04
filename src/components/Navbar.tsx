"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

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
    { name: "Home", href: "/" },
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
        { name: "Out Patient guide", href: "/out-patient" },
        { name: "In patient guide", href: "/in-patient" },
        { name: "Health Packages", href: "/health-packages" },
        { name: "Facilities", href: "/facilities" },
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
        { name: "Department Details", href: "/department-details" },
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
    { name: "Contact Us", href: "/contact-us" },
  ];

  const toggleMobileDropdown = (name: string) => {
    if (expandedMobileMenu === name) {
      setExpandedMobileMenu(null);
    } else {
      setExpandedMobileMenu(name);
    }
  };

  return (
    <header className="w-full z-50 flex flex-col font-sans select-none">
      {/* Tier 1: Teal Utility Bar */}
      <div className="hidden xl:block w-full bg-[#007a87] text-white text-[11px] py-2 px-4 font-medium border-b border-teal-600/30">
        <div className="max-w-[96%] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-white/90">
            <Link href="/doctor-details" className="hover:text-white transition-colors">Find a Doctor</Link>
            <span className="opacity-30">|</span>
            <Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link>
            <span className="opacity-30">|</span>
            <Link href="/patient-guide" className="hover:text-white transition-colors">My Reports</Link>
            <span className="opacity-30">|</span>
            <Link href="/research-about" className="hover:text-white transition-colors">Research</Link>
            <span className="opacity-30">|</span>
            <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
          </div>

          <div className="flex items-center gap-4 font-bold tracking-wide">
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

      {/* Main White Header */}
      <nav
        className={`w-full bg-white border-b border-slate-200 py-3 z-40 transition-all duration-200 ${
          scrolled ? "fixed top-0 left-0 shadow-lg backdrop-blur-md bg-white/95" : "relative"
        }`}
      >
        <div className="max-w-[96%] mx-auto">
          <div className="flex justify-between items-center">

            {/* DMH Logo Section */}
            <div className="flex items-center shrink-0 max-w-[70%] xl:max-w-[25%]">
              <Link href="/" className="flex items-center gap-1.5 group focus:outline-none">
                <div className="relative flex items-center justify-center w-[102px] h-[102px] rounded-lg bg-slate-50 border border-slate-100 p-1 shrink-0">
                  <img
                    src="/logo.png"
                    alt="DMH Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col text-left whitespace-nowrap">
                  <span className="text-[22px] font-black tracking-tight leading-none text-[#002b5c] pb-[3px]">
                    DEENANATH
                  </span>
                  <span className="text-[10px] font-extrabold tracking-[0.2em] leading-none uppercase mt-0.5 text-[#007a87]">
                    Mangeshkar Hospital
                  </span>
                </div>
              </Link>

              {/* Anniversary Badge - Hidden on small laptops to save horizontal space */}
              <div className="hidden 2xl:flex items-center ml-3 pl-3 border-l border-slate-200 whitespace-nowrap shrink-0">
                <div className="flex flex-col text-left">
                  <span className="text-[22px] font-black text-amber-600 tracking-wider uppercase leading-none pb-[3px]">
                    25 YEARS
                  </span>
                  <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mt-0.5 leading-none">
                    Of Trust & Care
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links (Responsive Flex & Fluid Gap) */}
            <div className="hidden xl:flex items-center justify-center flex-1 mr-2 ml-8 xl:ml-12 2xl:ml-16 gap-[0.6vw] 2xl:gap-3.5 max-w-[60%]">
              {navLinks.map((link, idx) => (
                <div key={idx} className="relative group py-2">
                  <Link 
                    href={link.href} 
                    className="text-[10px] 2xl:text-[11px] leading-[18px] font-black text-slate-700 hover:text-[#007a87] uppercase tracking-wider transition-colors flex items-center gap-0.5 whitespace-nowrap"
                  >
                    <span>{link.name}</span>
                    {link.dropdown && <ChevronDown className="w-2.5 h-2.5 opacity-60 group-hover:rotate-180 transition-transform shrink-0" />}
                  </Link>

                  {/* Dropdown Box Alignment Fix */}
                  {link.dropdown && (
                    <div className={`absolute top-full pt-2 hidden group-hover:block w-64 z-50 animate-fadeIn ${
                      idx > 4 ? "right-0" : "left-0"
                    }`}>
                      <div className="bg-white rounded-lg shadow-xl border border-slate-100 py-1.5 overflow-hidden">
                        {link.dropdown.map((subLink, sIdx) => (
                          <Link
                            key={sIdx}
                            href={subLink.href}
                            className="block px-4 py-2 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-[#007a87] border-b border-slate-50 last:border-0 transition-colors"
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
            <div className="hidden xl:flex items-center gap-2 xl:gap-3 shrink-0 max-w-[20%] justify-end">
              <button className="p-1 text-slate-500 hover:text-slate-900 transition-colors shrink-0">
                <svg className="w-[18px] h-[18px] stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <Link
                href="/book-appointment"
                className="bg-[#d9232d] hover:bg-[#b81d24] leading-[18px] text-white px-3 2xl:px-4 py-2 rounded-md font-bold text-[10px] 2xl:text-[11px] uppercase tracking-wider flex items-center gap-1 transition-all shadow-sm whitespace-nowrap shrink-0"
              >
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Mobile / Tablet View Trigger (Triggers under 1280px Screen width) */}
            <div className="xl:hidden flex items-center gap-3 shrink-0">
              <button className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors">
                <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-md bg-slate-50 border border-slate-200 text-slate-700 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

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
                      className="w-full flex justify-between items-center px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50"
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
                          className="block px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-[#007a87]"
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
                    className="flex items-center px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50"
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
              
              <Link
                href="/book-appointment"
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