"use client";

import { ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function PharmacyClientPage({ data }: { data?: any }) {
  const d = data || {
    title: "Medicines and healthcare essentials, all within your hospital.",
    subtitle: "Deenanath Medical Stores",
    introText: "Reliable access to prescription medicines, home delivery, medical equipment, baby care, medication counselling, optical and Ayurvedic services.",
    enrollmentFormLink: "https://docs.google.com/forms/d/e/1FAIpQLSdjMzzNoXpGfGPzWf-nX26DXKQN7plupHApHtHBFmT0W2CRUg/viewform",
    servicesIntro: "A simple service directory designed to help patients and families quickly find the right pharmacy or store, contact the team, and take the next step.",
    services: [
      { id: 1, title: "Pharmacy – OPD & IPD Medicines", desc: "All prescribed medicines are available for OPD and IPD patients, supporting timely access within the hospital.", contact: "24-hour pharmacy support" },
      { id: 2, title: "Home Delivery of Medicines", desc: "Free home delivery for senior citizens above 60 years and long-term medication patients.", contact: "020-4015 1555 / 9158881604" },
      { id: 3, title: "Surgical & Rental Stores", desc: "Fowler beds, oxygen concentrators, BiPAP, CPAP, suction machines, air beds and more, on sale or rental.", contact: "020-4015 1047" },
      { id: 4, title: "Tender Touch Store", desc: "Neonatal and maternal essentials including diapers, feeding bottles, skincare products and more.", contact: "020-4915 3373" },
      { id: 5, title: "Drug Information & Counselling", desc: "Authentic, unbiased and up-to-date medicine information, medication counselling and professional support.", contact: "Clinical Pharmacy Service\n020 40151050" },
      { id: 6, title: "Optic Store", desc: "One-stop access to spectacles, lenses and eye-care accessories within the hospital.", contact: "020-4015 1230" },
      { id: 7, title: "Ayurved Aushadhalaya & Homeopathy Pharmacy", desc: "Authentic Ayurvedic and Homeopathic medicines and wellness products supporting natural, holistic and patient-centred care.", contact: "020-4015 2012" }
    ],
    homeDeliveryBullets: [
      "Free for senior citizens above 60 years and long-term medication patients.",
      "Pharmacists contact enrolled patients periodically before medicines are finished.",
      "Medicines and consumables are delivered after confirmation with a proper bill.",
      "Payment can be made by debit card, credit card or QR code."
    ],
    homeDeliveryContact: "GS Building: 020-4015 1555 / 9158881604",
    drugInfoIntro: "The centre supports patients, relatives, physicians, pharmacists, nurses and other healthcare professionals with medication-related information and counselling.",
    drugInfoCards: [
      { id: 1, title: "For Patients", desc: "Medication counselling, dose and administration information, adverse-effect information and interaction guidance." },
      { id: 2, title: "For Healthcare Professionals", desc: "Therapeutic-use information, drug queries, drug–drug and drug–food interactions, and nursing support on dosing and dilutions." },
      { id: 3, title: "Qualified Clinical Team", desc: "A qualified team of Clinical Pharmacologists provides the service within the pharmacy setting." }
    ],
    needHelpContact: "020 40151050"
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-teal-500/30">
      
      {/* Header Section */}
      <div className="w-full bg-gradient-to-r from-white to-red-50 relative overflow-hidden pt-16 pb-20 border-b border-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-medium tracking-wide mb-8">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/departments" className="hover:text-red-600 transition-colors">Departments</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-red-600">Pharmacy</span>
          </div>
          
          <div className="max-w-2xl">
            <span className="text-[#E53935] text-xs font-bold tracking-wider uppercase mb-4 block">{d.subtitle}</span>
            <h1 className="text-4xl md:text-5xl leading-[1.1] font-bold text-slate-900 tracking-tight mb-6">
              {d.title}
            </h1>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-xl">
              {d.introText}
            </p>
            {d.enrollmentFormLink && (
              <a 
                href={d.enrollmentFormLink}
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 bg-[#E53935] text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition-colors shadow-sm"
              >
                HOME DELIVERY ENROLLMENT FORM <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <span className="text-[#E53935] text-xs font-bold tracking-wider uppercase mb-3 block">Our Services</span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">One destination. Multiple healthcare needs.</h2>
          <p className="text-slate-500 text-[15px] max-w-2xl">
            {d.servicesIntro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {d.services.map((service: any) => (
            <div key={service.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-[#E53935] font-bold text-lg mb-3">{service.title}</h3>
              <p className="text-slate-600 text-[15px] mb-6">{service.desc}</p>
              {service.contact.split('\n').map((line: string, i: number) => (
                <div key={i} className="font-bold text-slate-900 text-sm mb-1">{line}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Home Delivery Banner Section */}
      <div className="bg-[#F8F9FA] py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Placeholder */}
            <div className="bg-[#E9ECEF] rounded-xl w-full aspect-[4/3] flex items-center justify-center text-slate-400 text-sm font-semibold tracking-widest border border-slate-200/50">
              IMAGE
            </div>
            
            <div>
              <span className="text-[#E53935] text-xs font-bold tracking-wider uppercase mb-3 block">Home Delivery</span>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Skip the counter. Stay on schedule.</h2>
              <ul className="space-y-4 mb-8 text-slate-700 text-[15px]">
                {d.homeDeliveryBullets.map((bullet: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-slate-900 font-bold mt-0.5 text-lg leading-none">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="font-bold text-slate-900 mb-8">{d.homeDeliveryContact}</div>
              {d.enrollmentFormLink && (
                <a 
                  href={d.enrollmentFormLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-[#CD122D] text-white px-6 py-3 rounded-md font-bold text-sm tracking-wide hover:bg-red-700 transition-colors shadow-sm"
                >
                  ENROL FOR HOME DELIVERY
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Drug Information & Counselling Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <span className="text-[#E53935] text-xs font-bold tracking-wider uppercase mb-3 block">Drug Information & Counselling</span>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Medication information when it matters.</h2>
          <p className="text-slate-500 text-[15px] max-w-2xl">
            {d.drugInfoIntro}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {d.drugInfoCards.map((card: any) => (
            <div key={card.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-[#E53935] font-bold text-lg mb-4">{card.title}</h3>
              <p className="text-slate-600 text-[15px] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Need help with medicines? Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-[#CD122D] rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Need help with medicines?</h2>
            <p className="text-red-50 text-[15px] mb-4">Contact the appropriate Deenanath Medical Stores service for guidance.</p>
            <div className="text-white font-bold text-lg flex items-center gap-2">
              {d.needHelpContact}
            </div>
          </div>
          <button className="shrink-0 bg-white text-[#CD122D] px-8 py-3 rounded-md font-bold text-sm tracking-wide hover:bg-slate-50 transition-colors shadow-sm">
            VIEW CONTACTS
          </button>
        </div>
      </div>

    </div>
  );
}
