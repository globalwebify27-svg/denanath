"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Building, Building2, Pill, Droplets, Users, Coffee, Activity, Ambulance, Copy, AlertTriangle, Glasses, Ticket, FileText, MapPin, Phone, Clock, Info, CheckCircle2, CreditCard } from "lucide-react";

export default function FacilitiesPage() {
  const patientGuideOptions = [
    { name: "Out Patient Guide", href: "/out-patient", active: false },
    { name: "In Patient Guide", href: "/in-patient", active: false },
    { name: "Health Packages", href: "/health-packages", active: false },
    { name: "Facilities", href: "/facilities", active: true },
    { name: "Patients Stories / Feedbacks", href: "/feedbacks", active: false },
    { name: "Patient Rights & Responsibilities", href: "/patient-rights", active: false },
    { name: "Photos", href: "/gallery-photos", active: false },
    { name: "Videos", href: "/gallery-videos", active: false },
  ];

  const facilities = [
    {
      title: "Reception (GS Building)",
      icon: <Building className="w-6 h-6" />,
      time: "24 Hours",
      location: "Ground Floor Center Core GS Building",
      phone: "020 - 40151000 (General Enquiry)",
      details: ["Information about Consultants / Doctors", "Coffee / Tea Tokens"]
    },
    {
      title: "Reception (SS Building)",
      icon: <Building2 className="w-6 h-6" />,
      time: "24 Hours",
      location: "Ground Floor Center Core SS Building",
      phone: "020 - 49153000 (General Enquiry)",
      details: ["Information about Consultants / Doctors", "Coffee / Tea Tokens"]
    },
    {
      title: "Pharmacy",
      icon: <Pill className="w-6 h-6" />,
      time: "24 Hours",
      location: "Ground Floor (Between B & C Wing, Main Bldg) | Ground Floor (New Bldg)",
      phone: "(020) 40151040, 40151041 | (020) 49153009, 49153443",
      details: ["24x7 hours Pharmacy (Day & Night)"]
    },
    {
      title: "Blood Bank",
      icon: <Droplets className="w-6 h-6" />,
      time: "24 Hours",
      location: "Ground Floor SS Building",
      phone: "+91 20 49153081 / 49153089",
      details: ["FDA approved regional blood bank transfusion center.", "Blood components: RBC, FFP, Random/Single Donor Platelet, Cryo Precipitate, Peripheral Blood Stemcells, Plasma pherisis, Granulocyte apheresis.", "Ultra modern equipments like chemiluminescence, irradiation, Snap freezer."]
    },
    {
      title: "Public Relation Department",
      icon: <Users className="w-6 h-6" />,
      time: "Standard Hours",
      location: "GS Building Ground Floor C Wing",
      phone: "020-40151011 / 40151015",
      details: ["Attend to complaints and suggestions", "Medical Certificates", "Insurance Claim Forms and related issues", "Periodical / Routine Medical Checkups"]
    },
    {
      title: "Canteen",
      icon: <Coffee className="w-6 h-6" />,
      time: "Standard Hours",
      location: "Basement C Wing (1941 / 1942)",
      phone: "-",
      details: ["Well-equipped Catering Facility for Patients, Relatives, Doctors & Staff.", "Provides quality and hygienically safe food."]
    },
    {
      title: "Health Checkup",
      icon: <Activity className="w-6 h-6" />,
      time: "Standard Hours",
      location: "Public Relation Dept - GS Building Ground Floor C Wing",
      phone: "020-40151011, 020-40151015",
      details: ["Know your health status with several Health Check-up packages.", "Done quickly, efficiently and offered at discounted rates."]
    },
    {
      title: "Ambulance / Hospital Attendant",
      icon: <Ambulance className="w-6 h-6" />,
      time: "24 Hours",
      location: "Ground Floor A Wing (Emergency Dept.)",
      phone: "020-40151540, 40151027",
      details: ["For going home and emergencies."]
    },
    {
      title: "Photo-Copy / Xerox",
      icon: <Copy className="w-6 h-6" />,
      time: "Standard Hours",
      location: "Ground Floor C Wing",
      phone: "020-40151022",
      details: ["For one A4 Size photocopy Rs. 1/- is charged."]
    },
    {
      title: "Mortuary",
      icon: <Info className="w-6 h-6" />,
      time: "24 Hours",
      location: "GS Building Basement C Wing",
      phone: "Admission Dept: 020- 40151020",
      details: ["For all relevant documentation and formalities contact Admission Department (Ground Floor B wing)."]
    },
    {
      title: "Emergency",
      icon: <AlertTriangle className="w-6 h-6" />,
      time: "24 Hours",
      location: "Ground Floor A Wing",
      phone: "020-40151027, 40151065",
      details: []
    },
    {
      title: "Optician Shop",
      icon: <Glasses className="w-6 h-6" />,
      time: "08:00 a.m. to 04:30 p.m.",
      location: "Second Floor B wing",
      phone: "020-40151070",
      details: []
    },
    {
      title: "Pass Counter",
      icon: <Ticket className="w-6 h-6" />,
      time: "Standard Hours",
      location: "SS Building Ground Floor",
      phone: "New Reg: 020-49153006 | OPD: 49153005 | IPD: 49153018",
      details: ["Entry to the SS Building is only with a valid pass."]
    }
  ];

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1024 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        const scrollPos = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Patient & Visitors</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Facilities</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            Facilities
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
            <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {patientGuideOptions.map((option, idx) => (
                <Link
                  key={idx}
                  href={option.href}
                  data-active={option.active}
                  className={"snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal " + (
                    option.active
                      ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                      : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                  ) + " " + (idx !== patientGuideOptions.length - 1 ? "lg:border-b lg:border-b-slate-50" : "")}
                >
                  <span>{option.name}</span>
                  <ChevronRight 
                    className={"hidden lg:block w-4 h-4 transition-transform duration-300 " + (
                      option.active 
                        ? "text-[#007a87] translate-x-1" 
                        : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#002b5c]"
                    )} 
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-14">
              
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>Patient Guide</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Facilities Offered
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              <div className="space-y-12 text-slate-700">

                {/* Billing Section (Prominent) */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-[#007a87]" />
                    Billing Facilities
                  </h3>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* IPD Billing */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <h4 className="font-bold text-lg text-[#007a87] mb-4 border-b border-slate-200 pb-2">IPD Billing</h4>
                      
                      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-slate-100 text-slate-700 font-semibold">
                            <tr><th className="px-4 py-3">Building & Floor</th><th className="px-4 py-3">Timing</th></tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            <tr className="hover:bg-slate-50"><td className="px-4 py-2">GS 2nd Floor</td><td className="px-4 py-2">08:00 a.m to 10:00 p.m</td></tr>
                            <tr className="hover:bg-slate-50"><td className="px-4 py-2">GS Ground Floor - ER</td><td className="px-4 py-2">10:00 p.m to 08:00 a.m</td></tr>
                            <tr className="hover:bg-slate-50"><td className="px-4 py-2">GS 4th Floor</td><td className="px-4 py-2">10:00 a.m to 06:30 p.m</td></tr>
                            <tr className="hover:bg-slate-50"><td className="px-4 py-2">SS Ground Floor</td><td className="px-4 py-2 font-medium text-teal-600">24x7 x 365 days</td></tr>
                            <tr className="hover:bg-slate-50"><td className="px-4 py-2">SS 8th Floor</td><td className="px-4 py-2">09:30 a.m to 06:00 p.m</td></tr>
                            <tr className="hover:bg-slate-50"><td className="px-4 py-2">SS 10th Floor</td><td className="px-4 py-2">09:30 a.m to 06:00 p.m</td></tr>
                            <tr className="hover:bg-slate-50"><td className="px-4 py-2">SS 2nd Floor</td><td className="px-4 py-2">09:30 a.m to 06:00 p.m</td></tr>
                            <tr className="hover:bg-slate-50"><td className="px-4 py-2">SS 3rd Floor</td><td className="px-4 py-2">09:30 a.m to 06:00 p.m</td></tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> <span>Estimate of bill may change due to the type of room you are selecting.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> <span>We accept payment by cash (upto 2 lacs), Demand Draft, Debit/Credit Cards, NEFT/RTGS, UPI payments, Gateway payments. Cheque is the last option.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> <span>Please do all procedures related to cashless billing on the day of admission.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> <span>Please check your outstanding bill once in two days at the billing department.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> <span>For expensive treatments and surgeries (Cardiac, Neuro, Joint Replacements, etc.) you may need to deposit advance.</span></li>
                        <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> <span>Refunds are paid by cheque/NEFT where the amount is more than Rs 19999/- only.</span></li>
                      </ul>
                    </div>

                    {/* OPD Billing */}
                    <div className="bg-teal-50/50 p-6 rounded-2xl border border-teal-100 shadow-sm flex flex-col">
                      <h4 className="font-bold text-lg text-[#007a87] mb-4 border-b border-teal-200/50 pb-2">OPD Billing</h4>
                      <ul className="space-y-4 text-sm flex-1">
                        <li className="flex items-start gap-3">
                          <span className="font-bold text-teal-600 bg-teal-100 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-xs">1</span>
                          <span>OPD Billing Timings are 8am to 8pm and for Emergency Dept, billing counter runs 24hrs.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-bold text-teal-600 bg-teal-100 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-xs">2</span>
                          <span>For all Specialities consultation with the same doctor is free within 10 days of 1st paid consultation. Follow up charges will be applicable after 10 days. For Dental, consultation with the same doctor is free for 3 months of 1st paid consultation.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-bold text-teal-600 bg-teal-100 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-xs">3</span>
                          <span>Re-registration charges are applicable consultant wise, i.e. if a patient visits a particular consultant after a gap of 90 days, 1st visit consultation are applicable.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-bold text-teal-600 bg-teal-100 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-xs">4</span>
                          <span>Few of the consultants also run private OPD in the hospital where in consultants could be seen with prior appointment. There would be no fixed consultation fees. Doctor will have the discretion to charge anything upto rs 750/-.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-bold text-teal-600 bg-teal-100 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-xs">5</span>
                          <span>Refunds are normally paid by cheque only where amounts are more than 19,990/-.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="font-bold text-teal-600 bg-teal-100 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-xs">6</span>
                          <span>We accept payment by Cash / Credit & Debit Card / Demand Draft / NEFT / RTGS / UPI payments / Gateway Payments.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Other Facilities Grid */}
                <section>
                  <h3 className="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
                    <Building className="w-6 h-6 text-[#007a87]" />
                    Other Key Facilities
                  </h3>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facilities.map((facility, idx) => (
                      <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-[0_8px_30px_rgba(217,35,45,0.12)] hover:border-[#D9232D]/30 transition-all duration-300 group flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#007a87] flex items-center justify-center shrink-0 group-hover:bg-[#D9232D] group-hover:text-white transition-all duration-300 group-hover:shadow-[0_4px_12px_rgba(217,35,45,0.3)]">
                            {facility.icon}
                          </div>
                          <h4 className="font-bold text-[#002b5c] leading-tight group-hover:text-[#D9232D] transition-colors">{facility.title}</h4>
                        </div>
                        
                        <div className="space-y-3 mb-4 text-sm flex-1">
                          {facility.time !== "-" && (
                            <div className="flex items-start gap-2">
                              <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span className="font-medium text-teal-600">{facility.time}</span>
                            </div>
                          )}
                          {facility.location !== "-" && (
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span className="text-slate-600">{facility.location}</span>
                            </div>
                          )}
                          {facility.phone !== "-" && (
                            <div className="flex items-start gap-2">
                              <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                              <span className="text-slate-600">{facility.phone}</span>
                            </div>
                          )}
                        </div>

                        {facility.details.length > 0 && (
                          <div className="pt-4 border-t border-slate-100">
                            <ul className="space-y-2">
                              {facility.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-start gap-2 text-xs text-slate-500">
                                  <ChevronRight className="w-3 h-3 text-teal-400 shrink-0 mt-0.5" />
                                  <span className="leading-tight">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
