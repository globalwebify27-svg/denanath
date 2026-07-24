'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Sparkles, ChevronsRight, ChevronDown, ChevronRight, PhoneCall, Search, Map } from 'lucide-react';

export default function SiteMapPage() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'About Us': true,
  });

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const sitemapSections = [
    {
      title: 'About Us',
      links: [
        { label: 'About Hospital', href: '/about-hospital' },
        { label: 'Associates', href: '/associates' },
        { label: 'Accreditations', href: '/accreditations' },
        { label: 'Support Hospital / Donations', href: '/supportHospitalDonations' },
        { label: 'Unique Features Of DMH', href: '/unique-features' },
        { label: 'Foreign Contribution', href: '/foreign-contribution' },
        { label: 'Charity Details', href: '/charity-details' },
      ],
    },
    {
      title: 'Doctors & Departments',
      links: [
        { label: 'Doctor Details', href: '/doctor-details' },
        { label: 'Department Details', href: '/department-details' },
        { label: 'Services', href: '/services' },
      ],
    },
    {
      title: 'Medical Services',
      links: [
        { label: 'Cathlab Pricing', href: '/cathlab-pricing' },
        { label: 'Implant Pricing', href: '/implant-pricing' },
        { label: 'Health Packages', href: '/health-packages' },
        { label: 'Emergency', href: '/emergency' },
        { label: 'Pharmacy', href: '/pharmacy' },
      ],
    },
    {
      title: 'Patient & Visitors',
      links: [
        { label: 'Patient Guide Home', href: '/patient-guide' },
        { label: 'OPD Schedule', href: '/opd-schedule' },
        { label: 'Book Appointment', href: '/manage-appointments' },
        { label: 'In-Patient Services', href: '/in-patient' },
        { label: 'Out-Patient Services', href: '/out-patient' },
        { label: 'Patient Rights', href: '/patient-rights' },
        { label: 'Patient & Visitors', href: '/patient-visitors' },
        { label: 'Facilities', href: '/facilities' },
        { label: 'Feedbacks', href: '/feedbacks' },
      ],
    },
    {
      title: 'Online Facilities',
      links: [
        { label: 'Patient Portal', href: '/patient-portal' },
        { label: 'Patient Registration', href: '/patient-registration' },
        { label: 'Online Payment', href: '/online-payment' },
        { label: 'Email Login', href: '/email-login' },
      ],
    },
    {
      title: 'Academics',
      links: [
        { label: 'Academics', href: '/academics' },
        { label: 'Simulation Center', href: '/simulation-center' },
      ],
    },
    {
      title: 'Research',
      links: [
        { label: 'Research About', href: '/research-about' },
        { label: 'Publications', href: '/publications' },
        { label: 'Annual Reports', href: '/annual-reports' },
        { label: 'Awards & Recognitions', href: '/awards' },
        { label: 'Training Events', href: '/training-events' },
        { label: 'Newsletter Articles', href: '/newsletter-articles' },
        { label: 'Sponsors & CROs', href: '/sponsors-cros' },
        { label: 'Research Contact', href: '/research-contact' },
        { label: 'Virtual Tour', href: '/virtual-tour' },
      ],
    },
    {
      title: 'Media & Events',
      links: [
        { label: 'Events', href: '/events' },
        { label: 'Gallery - Photos', href: '/gallery-photos' },
        { label: 'Gallery - Videos', href: '/gallery-videos' },
      ],
    },
    {
      title: 'Contact Us',
      links: [
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Careers', href: '/careers' },
        { label: 'Disclaimer', href: '/disclaimer' },
        { label: 'EC Approval', href: '/ec-approval' },
        { label: 'Site Map', href: '/site-map' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30 w-full flex flex-col">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Site Map</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Site Map</h1>
        </div>
      </div>

      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
          
          <div className="mb-10">
            <div style={{ fontSize: '14px' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
              <Map className="w-4 h-4" />
              <span>Website Directory</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
              Site Map
            </h2>
          </div>

          <div className="space-y-4 max-w-3xl border-l border-slate-100 pl-4 md:pl-8 ml-2">
            
            {/* Home Link at root */}
            <div className="flex items-center text-slate-500 group relative">
              <div className="absolute -left-[25px] md:-left-[41px] w-4 h-px bg-slate-200" />
              <div className="absolute -left-[29px] md:-left-[45px] w-2 h-2 rounded-full bg-slate-200 group-hover:bg-[#007a87] transition-colors" />
              <Link href="/" className="text-slate-600 font-medium tracking-wide hover:text-[#007a87] transition-colors flex items-center">
                <Home className="w-4 h-4 mr-2 text-[#007a87]" />
                Home
              </Link>
            </div>

            {/* Dynamic Sections */}
            {sitemapSections.map((section, idx) => (
              <div key={idx} className="flex flex-col relative">
                <div className="absolute -left-[25px] md:-left-[41px] top-4 w-4 h-px bg-slate-200" />
                <div className={`absolute -left-[29px] md:-left-[45px] top-[12px] w-2 h-2 rounded-full transition-colors ${openSections[section.title] ? 'bg-[#007a87]' : 'bg-slate-200 group-hover:bg-[#007a87]'}`} />
                
                <button 
                  onClick={() => toggleSection(section.title)}
                  className="flex items-center text-slate-700 group text-left focus:outline-none py-1 mt-1"
                >
                  <span className="font-bold text-lg tracking-tight group-hover:text-[#007a87] transition-colors">
                    {section.title}
                  </span>
                  {openSections[section.title] ? (
                    <ChevronDown className="w-4 h-4 ml-2 text-[#007a87]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 ml-2 text-slate-400 group-hover:text-[#007a87] transition-colors" />
                  )}
                </button>

                {/* Expandable Links */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openSections[section.title] ? 'max-h-[2000px] opacity-100 mt-2 mb-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="pl-4 md:pl-6 space-y-2 border-l-2 border-slate-50 ml-[7px] py-2">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx} className="flex items-center group relative">
                        <div className="absolute -left-[24px] md:-left-[32px] w-3 h-px bg-slate-200" />
                        <Link 
                          href={link.href}
                          className="text-slate-600 hover:text-[#007a87] font-medium text-sm md:text-[15px] transition-colors py-1 flex items-center"
                        >
                          <ChevronsRight className="w-3.5 h-3.5 mr-2 text-slate-300 group-hover:text-[#007a87] shrink-0 transition-colors" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
