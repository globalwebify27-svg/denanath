"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  Stethoscope,
  HeartHandshake,
  Microscope,
  GraduationCap,
  Globe,
  Briefcase,
  Phone,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

const MENU_ITEMS = [
  {
    name: "Overview",
    icon: <LayoutDashboard size={20} />,
    href: "/admin"
  },
  {
    name: "About Us",
    icon: <Building2 size={20} />,
    links: [
      { name: "About Hospital", href: "/admin/about/about-hospital" },
      { name: "Associates", href: "/admin/about/associates" },
      { name: "Accreditations", href: "/admin/about/accreditations" },
      { name: "Support / Donations", href: "/admin/about/support-donations" },
      { name: "Unique Features", href: "/admin/about/unique-features" },
      { name: "Foreign Contribution", href: "/admin/about/foreign-contribution" },
      { name: "Charity Details", href: "/admin/about/charity-details" },
    ]
  },
  {
    name: "Patient & Visitors",
    icon: <HeartHandshake size={20} />,
    links: [
      { name: "Out Patient Guide", href: "/admin/patient-visitors/out-patient" },
      { name: "In Patient Guide", href: "/admin/patient-visitors/in-patient" },
      { name: "Health Packages", href: "/admin/patient-visitors/health-packages" },
      { name: "Facilities", href: "/admin/patient-visitors/facilities" },
      { name: "Patient Stories", href: "/admin/patient-visitors/feedbacks" },
      { name: "Patient Rights", href: "/admin/patient-visitors/patient-rights" },
      { name: "Photos", href: "/admin/patient-visitors/gallery-photos" },
      { name: "Videos", href: "/admin/patient-visitors/gallery-videos" },
    ]
  },
  {
    name: "Doctors & Depts",
    icon: <Stethoscope size={20} />,
    links: [
      { name: "Doctors Directory", href: "/admin/doctors" },
      { name: "Departments", href: "/admin/departments" },
      { name: "Services", href: "/admin/services" },
    ]
  },
  {
    name: "Research",
    icon: <Microscope size={20} />,
    links: [
      { name: "About Us", href: "/admin/research/about" },
      { name: "Training And Events", href: "/admin/research/training-events" },
      { name: "Awards", href: "/admin/research/awards" },
      { name: "Newsletter Articles", href: "/admin/research/newsletter-articles" },
      { name: "Publications", href: "/admin/research/publications" },
      { name: "Annual Reports", href: "/admin/research/annual-reports" },
      { name: "Sponsors & CROs", href: "/admin/research/sponsors-cros" },
      { name: "Contact Us", href: "/admin/research/research-contact" },
    ]
  },
  {
    name: "Academics",
    icon: <GraduationCap size={20} />,
    links: [
      { name: "Academics Info", href: "/admin/academics/info" },
      { name: "Simulation Center", href: "/admin/academics/simulation-center" },
      { name: "NBEMS Courses", href: "/admin/academics/nbems-courses" },
      { name: "Jeevan Rekha", href: "/admin/academics/jeevan-rekha" },
      { name: "Training Programs", href: "/admin/academics/training-programs" },
    ]
  },
  {
    name: "Online Facilities",
    icon: <Globe size={20} />,
    links: [
      { name: "E-Mail Login", href: "/admin/online-facilities/email-login" },
      { name: "Online Payment", href: "/admin/online-facilities/online-payment" },
      { name: "Patient Portal", href: "/admin/online-facilities/patient-portal" },
      { name: "Patient Registration", href: "/admin/online-facilities/patient-registration" },
    ]
  },
  {
    name: "Careers",
    icon: <Briefcase size={20} />,
    links: [
      { name: "Job Postings", href: "/admin/careers" },
    ]
  },
  {
    name: "Contact",
    icon: <Phone size={20} />,
    links: [
      { name: "Contact Submissions", href: "/admin/contact" },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Doctors & Depts": true // Keep the primary one open by default
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSection = (name: string) => {
    setOpenSections(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Container */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 bg-[#111111] text-gray-300 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="bg-white p-5 shrink-0 flex items-center gap-2">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 p-1 shrink-0">
            <img
              src="/logo.png"
              alt="DMH Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col text-left whitespace-nowrap">
            <span className="text-[13px] font-black tracking-tight leading-none text-[#002b5c]">
              DEENANATH
            </span>
            <span className="text-[7.5px] font-extrabold tracking-[0.05em] leading-none uppercase mt-0.5 text-[#007a87]">
              Mangeshkar Hospital
            </span>
            <span className="text-[7.5px] font-extrabold tracking-[0.05em] leading-none uppercase mt-0.5 text-[#007a87]">
              & Research Center
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-1 mt-4">
          {MENU_ITEMS.map((section) => {
            const hasChildren = section.links && section.links.length > 0;
            const isOpen = openSections[section.name];
            
            const isActiveSection = hasChildren 
              ? section.links!.some(link => pathname.startsWith(link.href))
              : (section.href === "/admin" ? pathname === "/admin" : pathname.startsWith(section.href!));

            if (!hasChildren) {
              return (
                <Link
                  key={section.name}
                  href={section.href!}
                  onClick={() => setIsMobileOpen(false)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg transition-colors mb-1 ${
                    isActiveSection 
                      ? 'bg-[#007a87] text-white font-bold shadow-md' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5 font-semibold'
                  }`}
                >
                  <span className={isActiveSection ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}>
                    {section.icon}
                  </span>
                  <span className="text-sm tracking-wide">{section.name}</span>
                </Link>
              );
            }

            return (
              <div key={section.name} className="mb-1">
                <button
                  onClick={() => toggleSection(section.name)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isActiveSection && !isOpen 
                      ? 'bg-[#007a87] text-white font-bold' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={isActiveSection && !isOpen ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}>
                      {section.icon}
                    </span>
                    <span className="text-sm tracking-wide">{section.name}</span>
                  </div>
                  <div className="text-gray-500">
                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-1 mb-3 space-y-1 pl-11">
                    {section.links!.map((link) => {
                      const isActive = link.href === "/admin" 
                        ? pathname === "/admin" 
                        : (pathname === link.href || pathname.startsWith(link.href + "/"));
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive 
                              ? 'bg-[#007a87] text-white shadow-md' 
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Interactions Section (Logout) */}
        <div className="p-4 shrink-0 mt-auto">
          <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-3 px-2">
            Interactions
          </div>
          <Link
            href="/admin/login"
            className="flex items-center gap-3 p-3 text-sm font-semibold text-[#ff4444] bg-[#ff4444]/10 hover:bg-[#ff4444]/20 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            Logout
          </Link>
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}
