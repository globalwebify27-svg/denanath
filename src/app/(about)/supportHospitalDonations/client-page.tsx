"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronRight, Phone, Heart, ArrowRight, Building2 } from "lucide-react";

export default function SupportDonationsClientPage({ donationsData }: { donationsData: any }) {
  const aboutOptions = [
    { name: "About Hospital", href: "/about-hospital", active: false },
    { name: "Associates", href: "/associates", active: false },
    { name: "Accreditations", href: "/accreditations", active: false },
    { name: "Support Hospital / Donations", href: "/supportHospitalDonations", active: true },
    { name: "Unique features of DMH", href: "/unique-features", active: false },
    { name: "Foreign Contribution", href: "/foreign-contribution", active: false },
    { name: "Charity Details", href: "/charity-details", active: false },
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

  const {
    contactPhone = "+912040151000",
    contactDisplayPhone = "(+91) 20 4015 1000",
    introText = "Deenanath Mangeshkar Hospital also relies on philanthropy to provide essential health care services in Pune. Gifts may be made to support efforts to help educate patients and families, provide necessary supplies and state-of-the-art equipment and enhancements for patient care needs for people of the community.",
    countOnUsPoints = [
      "100% dedicated to bringing you specialists who are highly trained at some of the best institutions in the country – Our focus remains solely on hiring and training the most highly skilled, talented professionals, expanding our education and screening programs and continuing to invest in the latest life-saving technology.",
      "100% committed to patient safety and long-term recovery – Deenanath Mangeshkar Hospital is nationally recognized not only for their quality of care, but for their advanced and proactive approach toward integrated long-term care and support for patients."
    ],
    donateForms = [
      "Money (As Donation or Deposit)",
      "Real Estate ( Open space or a apartment – on rent / sale )"
    ],
    institutionalDonors = [],
    donationInKind = [],
    individualDonors50to1Cr = [],
    individualDonors25to50 = [],
    individualDonors1to25 = [],
    individualDonorsUpto1 = []
  } = donationsData || {};

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
            <Link href="/about-hospital" className="hover:text-white transition-colors">About Us</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Support Hospital / Donations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Support Hospital / Donations</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
            <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
              {aboutOptions.map((option, idx) => (
                <Link
                  key={idx}
                  href={option.href}
                  data-active={option.active}
                  className={`snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal ${
                    option.active
                      ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                      : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
                  } ${idx !== aboutOptions.length - 1 ? "lg:border-b lg:border-b-slate-50" : ""}`}
                >
                  <span>{option.name}</span>
                  <ChevronRight 
                    className={`hidden lg:block w-4 h-4 transition-transform duration-300 ${
                      option.active 
                        ? "text-[#007a87] translate-x-1" 
                        : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#002b5c]"
                    }`} 
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10 md:p-12">
              
              {/* Introduction & Contact */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>Support Hospital / Donations</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Support Hospital / Donations
                </h2>
                
                <div className="flex items-center gap-3 text-[#007a87] bg-teal-50 border border-teal-100 p-4 rounded-xl mb-8">
                  <Phone className="w-6 h-6 shrink-0" />
                  <p className="text-sm md:text-base font-semibold">
                    Please call Deenanath Mangeshkar Hospital at <a href={`tel:${contactPhone}`} className="underline hover:text-teal-700">{contactDisplayPhone}</a> for more information or to make a credit card donation.
                  </p>
                </div>
                
                <p className="text-slate-600 leading-relaxed font-light mb-6 whitespace-pre-wrap">
                  {introText}
                </p>

                <p className="text-slate-700 font-medium mb-4">
                  Your contributions will help us, You can count on us to be:
                </p>
                <ul className="space-y-4 mb-8">
                  {countOnUsPoints.map((point: string, idx: number) => {
                    const parts = point.includes(" - ") ? point.split(" - ") : (point.includes(" – ") ? point.split(" – ") : [point]);
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <p className="text-slate-600 leading-relaxed text-sm">
                          {parts.length > 1 ? (
                            <>
                              <strong className="text-slate-700">{parts[0]}</strong> – {parts.slice(1).join(" - ")}
                            </>
                          ) : (
                            <>{point}</>
                          )}
                        </p>
                      </li>
                    );
                  })}
                </ul>

                <h3 className="text-xl font-bold text-[#002b5c] mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#007a87]" />
                  You can donate in form of
                </h3>
                <ul className="space-y-3 mb-10 border-l-2 border-teal-100 pl-4 py-1">
                  {donateForms.map((form: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      {form}
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-extrabold text-[#002b5c] border-b pb-4 mb-8">
                  Donations received
                </h2>
              </div>

              {/* Donor Tables Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* Institutional Donors */}
                <div className="border border-slate-200 bg-white flex flex-col h-[600px]">
                  <div className="bg-[#1eb7a6] text-white shrink-0">
                    <div className="py-2.5 px-4 text-center font-bold text-sm tracking-wide">
                      Institutional Donors
                    </div>
                    <div className="flex border-t border-white/20 text-sm font-semibold">
                      <div className="w-16 py-2 text-center border-r border-white/20 shrink-0">Sr.No</div>
                      <div className="flex-1 py-2 px-4">Donor Name</div>
                    </div>
                  </div>
                  <div className="overflow-y-auto flex-1 custom-scrollbar">
                    {institutionalDonors.map((donor: string, idx: number) => (
                      <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                        <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                        <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                      </div>
                    ))}
                    {institutionalDonors.length === 0 && (
                      <div className="p-4 text-center text-slate-400 text-sm">No data available</div>
                    )}
                  </div>
                </div>

                {/* Donation in Kind */}
                <div className="border border-slate-200 bg-white flex flex-col h-[600px]">
                  <div className="bg-[#1eb7a6] text-white shrink-0">
                    <div className="py-2.5 px-4 text-center font-bold text-sm tracking-wide">
                      Donation in Kind
                    </div>
                    <div className="flex border-t border-white/20 text-sm font-semibold">
                      <div className="w-16 py-2 text-center border-r border-white/20 shrink-0">Sr.No</div>
                      <div className="flex-1 py-2 px-4">Donor Name</div>
                    </div>
                  </div>
                  <div className="overflow-y-auto flex-1 custom-scrollbar">
                    {donationInKind.map((donor: string, idx: number) => (
                      <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                        <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                        <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                      </div>
                    ))}
                    {donationInKind.length === 0 && (
                      <div className="p-4 text-center text-slate-400 text-sm">No data available</div>
                    )}
                  </div>
                </div>

                {/* Individual Donors */}
                <div className="border border-slate-200 bg-white flex flex-col h-[600px]">
                  <div className="bg-[#1eb7a6] text-white shrink-0">
                    <div className="py-2.5 px-4 text-center font-bold text-sm tracking-wide">
                      Individual Donors
                    </div>
                    <div className="flex border-t border-white/20 text-sm font-semibold">
                      <div className="w-16 py-2 text-center border-r border-white/20 shrink-0">Sr.No</div>
                      <div className="flex-1 py-2 px-4">Donor Name</div>
                    </div>
                  </div>
                  
                  <div className="overflow-y-auto flex-1 custom-scrollbar relative">
                    {/* Category 1 */}
                    {individualDonors50to1Cr.length > 0 && (
                      <>
                        <div className="bg-slate-50 text-slate-500 font-semibold py-3 px-4 text-[13px] text-center border-b border-slate-200 sticky top-0 z-20 shadow-sm">
                          Donation Rs. 50 Lakh to 1 crore
                        </div>
                        {individualDonors50to1Cr.map((donor: string, idx: number) => (
                          <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                            <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                            <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Category 2 */}
                    {individualDonors25to50.length > 0 && (
                      <>
                        <div className="bg-slate-50 text-slate-500 font-semibold py-3 px-4 text-[13px] text-center border-y border-slate-200 sticky top-0 z-20 shadow-sm">
                          Donation Rs. 25 Lakh to 50 Lakh
                        </div>
                        {individualDonors25to50.map((donor: string, idx: number) => (
                          <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                            <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                            <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Category 3 */}
                    {individualDonors1to25.length > 0 && (
                      <>
                        <div className="bg-slate-50 text-slate-500 font-semibold py-3 px-4 text-[13px] text-center border-y border-slate-200 sticky top-0 z-20 shadow-sm">
                          Donation Rs. 1 Lakh to 25 Lakh
                        </div>
                        {individualDonors1to25.map((donor: string, idx: number) => (
                          <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                            <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                            <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Category 4 */}
                    {individualDonorsUpto1.length > 0 && (
                      <>
                        <div className="bg-slate-50 text-slate-500 font-semibold py-3 px-4 text-[13px] text-center border-y border-slate-200 sticky top-0 z-20 shadow-sm">
                          Donation upto Rs.1 Lakh
                        </div>
                        {individualDonorsUpto1.map((donor: string, idx: number) => (
                          <div key={idx} className="flex border-b border-slate-100 text-[13px] hover:bg-slate-50 transition-colors">
                            <div className="w-16 py-3 border-r border-slate-100 text-center text-slate-400 shrink-0">{idx + 1}</div>
                            <div className="flex-1 py-3 px-4 text-slate-600">{donor}</div>
                          </div>
                        ))}
                      </>
                    )}
                    
                    {individualDonors50to1Cr.length === 0 && individualDonors25to50.length === 0 && individualDonors1to25.length === 0 && individualDonorsUpto1.length === 0 && (
                      <div className="p-4 text-center text-slate-400 text-sm">No data available</div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
