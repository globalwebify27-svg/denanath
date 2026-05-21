"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Building2 } from "lucide-react";

export default function PatientGuidePage() {
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
                  Facilities
                </h2>
                
              </div>

              <div className="space-y-6 mt-8">\n  <ul className="list-none space-y-3 mb-6">\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Out Patient guide</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>In patient guide</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Health Packages</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Facilities</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Patients Stories / Feedbacks</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Patient Rights & Responsibilities</span></li>\n</ul>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">FACILITIES OFFERED</h3>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">1 (a). RECEPTION : 24 Hours.</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Location : Ground Floor Center Core GS Building</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">General Enquiry (020 - 40151000)</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Information about Consultants / Doctors</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Coffee / Tea Tokens</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">1 (b). RECEPTION : 24 Hours</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Location : Ground Floor Center Core SS Building</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">General Enquiry (020 - 49153000)</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Information about Consultants / Doctors</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Coffee / Tea Tokens</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">2 (a). BILLING IPD :</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">1.Estimate of bill may change due to the type of room you are selecting.</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">2.We accept payment by cash (upto 2 lacs), Demand Draft, Debit/Credit Cards, NEFT/RTGS, UPI payments, Gateway payments. Cheque is the last option of the payment.</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">3.Please do all procedures related to cashless billing on the day of admission.</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">4.Please check your outstanding bill once in two days at the billing department.</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">5.For expensive treatments and surgeries (Cardiac, Neuro, Joint Replacements, Organ Transplants etc.) you may need to deposit advance.</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">6.Refunds are paid by cheque/NEFT where the amount is more then Rs 19999/- only.</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">2 (b). BILLING OPD :</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">1. OPD Billing Timings are 8am to 8pm and for Emergency Dept, billing counter runs 24hrs</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">2. For all Specialities consultaion with the same doctor is free within 10 days of 1st paid consultaion. Follow up charges will be applicable after 10 days and the same rule of free consultation is applicable for the next visit 3. For Dental, consultation with the same doctor is free for 3 months of 1st paid consultation.</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">3. Re-registration charges are applicable consultant wise, i.e. if a patient visits a particular consultant after a gap of 90 days, 1st visit consultation are applicable.</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">4. Few of the consultants also run private OPD in the hospital where in consultants could be seen with prior appointment. There would be no fixed consultation fees. Doctor will have the discretion to charge anything upto rs 750/-</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">5. Refunds are normally paid by cheque only where amounts are more then 19,990/-</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">6. We accept payment by Cash/Credit & Debit Card/Demand Draft/NEFT/RTGS/UPI payments/Gateway Payments</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">3. PHARMACY: 24 Hours</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">1. 24x7 hours Pharmacy (Day & Night)</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">2. Locations:</p>\n  <ul className="list-none space-y-3 mb-6">\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>a. Ground Floor, Between B & C Wing, Main Building</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Contact: (020) 40151040, 40151041</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>b. Ground Floor, New Building</span></li>\n    <li className="flex items-start gap-3 text-slate-600 leading-relaxed"><ChevronRight className="w-5 h-5 text-[#007a87] shrink-0 mt-0.5" /><span>Contact: (020) 49153009, 49153443</span></li>\n</ul>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">4. BLOOD BANK: 24 Hours</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Location: Ground Floor SS Building ( +91 20 49153081 / 49153089 )</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Deenanath Mangeshkar Hospital and Research Center Blood Bank is a FDA approved regional blood bank transfusion center. Blood components like RBC,Fresh Frozen Plasma, Random Donar Platelet, Single Donar Platelet and Cryo Precipitate, Peripheral Blood Stemcells (leucopheresis), Plasma pherisis, Granulocyte apheresis are available on 24/7 x 365 basis. It is ultra modern Blood Bank with state of the art equipments like chemiluminescence, irradiation, Snap freezer and leucoreduction technologies</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">5. PUBLIC RELATION DEPARTMENT:</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Location: GS Building Ground Floor C Wing ( 020-40151011/40151015)
		We are committed to provide best quality services. If u have any problems about our services, Public Relation Department is always there to attend to your complaints and suggestions.</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">This department will also help you for the following:</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Medical Certificates</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Insurance Claim Forms and all related issues</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Periodical / Routine Medical Checkups</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">6. CANTEEN:</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Location: Basement C Wing ( 1941 / 1942 )</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">The Hospital has a well-equipped Catering Facility for Patients, their Relatives, Doctors & Staff and even for any walk in person. The primary aspect of canteen is to provide quality and hygienically safe food to all who come in.</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">7. HEALTH CHECKUP:</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Location: Public Relation Department - GS Building Ground Floor C Wing ( 020-40151011, 020-40151015 )</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Know your health status - We have several Health Check-up packages. Please contact Public Relation department to select a suitable package for you.</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Health checkup is done quickly, efficiently and it is offered at discounted rates.</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">8. AMBULANCE / HOSPITAL ATTENDANT FOR GOING HOME: 24 Hours</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Ground Floor A Wing (Emergency Dept.) (020-40151540, 40151027 )</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">9. PHOTO-COPY / XEROX:</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Location: Ground Floor C Wing (020-40151022 )</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">For one A4 Size photocopy Rs. 1/- is charged.</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">10. MORTUARY: 24 Hours</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Location: GS Building Basement C Wing</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">For all relevant documentation and formalities - please contact Admission Department (Ground Floor B wing - 020- 40151020)</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">11. EMERGENCY: 24 Hours</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Location: Ground Floor A Wing (020-40151027, 40151065)</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">12. OPTICIAN SHOP</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Location: Second Floor B wing (020-40151070)</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Timings - 8.00 Hrs to 16:30 Hrs</p>\n  <h3 className="text-2xl font-bold text-[#002b5c] mt-8 mb-4">13. PASS COUNTER</h3>\n  <p className="text-slate-600 leading-relaxed font-light text-base">SS Building Ground Floor</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">New Registration- Pass Counter 1 (020-49153006)</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">OPD PASS - Pass Counter 2 (020-49153005)</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">IPD PASS - Pass Counter 3 (020-49153018)</p>\n  <p className="text-slate-600 leading-relaxed font-light text-base">Entry to the SS Building is only with a valid pass. Kindly Contact the Pass Counter for further details.</p>\n</div>\n

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
