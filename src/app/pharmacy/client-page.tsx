"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* Dotted grid style used in hero backdrop */
const dottedGrid: React.CSSProperties = {
  backgroundImage: "radial-gradient(#0d9488 1.5px, transparent 1.5px)",
  backgroundSize: "14px 14px",
};

interface HeroSlide {
  id: number | string;
  image: string;
  alt?: string;
}

interface ServiceItem {
  id: number | string;
  title: string;
  desc: string;
  contact?: string;
}

interface DrugCard {
  id: number | string;
  title: string;
  desc: string;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/images/pharmacy-hero.jpg",
    alt: "Pharmacist dispensing medicines to patient at hospital pharmacy counter",
  },
  {
    id: 2,
    image: "/images/pharmacy-slide-2.jpg",
    alt: "Clinical pharmacist checking and organizing medicine inventory",
  },
  {
    id: 3,
    image: "/images/pharmacy-slide-3.jpg",
    alt: "Pharmacists consulting patient at modern hospital dispensary counter",
  },
];

const defaultServices: ServiceItem[] = [
  {
    id: 1,
    title: "Pharmacy – OPD & IPD Medicines",
    desc: "All prescribed medicines are available for OPD and IPD patients, supporting timely access within the hospital.",
    contact: "24-hour pharmacy support",
  },
  {
    id: 2,
    title: "Home Delivery of Medicines",
    desc: "Free home delivery for senior citizens above 60 years and long-term medication patients.",
    contact: "020-4015 1555 / 9158881604",
  },
  {
    id: 3,
    title: "Surgical & Rental Stores",
    desc: "Fowler beds, oxygen concentrators, BiPAP, CPAP, suction machines, air beds and more, on sale or rental.",
    contact: "020-4015 1047",
  },
  {
    id: 4,
    title: "Tender Touch Store",
    desc: "Neonatal and maternal essentials including diapers, feeding bottles, skincare products and more.",
    contact: "020-4915 3373",
  },
  {
    id: 5,
    title: "Drug Information & Counselling",
    desc: "Authentic, unbiased and up-to-date medicine information, medication counselling and professional support.",
    contact: "Clinical Pharmacy Service",
  },
  {
    id: 6,
    title: "Optic Store",
    desc: "One-stop access to spectacles, lenses and eye-care accessories within the hospital.",
    contact: "020-4015 1230",
  },
];

const defaultBullets = [
  "Free for senior citizens above 60 years and long-term medication patients.",
  "Pharmacists contact enrolled patients periodically before medicines are finished.",
  "Medicines and consumables are delivered after confirmation with a proper bill.",
  "Payment can be made by debit card, credit card or QR code.",
];

const defaultDrugCards: DrugCard[] = [
  {
    id: 1,
    title: "For Patients",
    desc: "Medication counselling, dose and administration information, adverse-effect information and interaction guidance.",
  },
  {
    id: 2,
    title: "For Healthcare Professionals",
    desc: "Therapeutic-use information, drug queries, drug–drug and drug–food interactions, and nursing support on dosing and dilutions.",
  },
  {
    id: 3,
    title: "Qualified Clinical Team",
    desc: "A qualified team of Clinical Pharmacologists provides the service within the pharmacy setting.",
  },
];

export default function PharmacyClientPage({ data }: { data?: any }) {
  const d = data || {};

  // Hero Slider State
  const slides: HeroSlide[] =
    d.heroSlides && Array.isArray(d.heroSlides) && d.heroSlides.length > 0
      ? d.heroSlides
      : defaultSlides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Hero Texts
  const heroBadge = d.heroBadge || d.subtitle || "DEENANATH MEDICAL STORES";
  const heroTitle =
    d.heroTitle ||
    d.title ||
    "Medicines and healthcare essentials, all within your hospital.";
  const heroIntro =
    d.heroIntro ||
    d.introText ||
    "Reliable access to prescription medicines, home delivery, medical equipment, baby care, medication counselling, optical and Ayurvedic services.";
  const heroBtnPrimaryText = d.heroBtnPrimaryText || "View Pharmacy Services";
  const heroBtnPrimaryLink = d.heroBtnPrimaryLink || "#services";
  const heroBtnSecondaryText = d.heroBtnSecondaryText || "Contact Store";
  const heroBtnSecondaryLink = d.heroBtnSecondaryLink || "#quickhelp";
  const heroFloatingBadgeTop = d.heroFloatingBadgeTop || "YOUR HEALTH";
  const heroFloatingBadgeBottom = d.heroFloatingBadgeBottom || "OUR PRIORITY";

  // Services
  const servicesTag = d.servicesTag || "OUR SERVICES";
  const servicesTitle =
    d.servicesTitle || "One destination. Multiple healthcare needs.";
  const servicesIntro =
    d.servicesIntro ||
    "A simple service directory designed to help patients and families quickly find the right pharmacy or store, contact the team, and take the next step.";
  const servicesList: ServiceItem[] =
    d.services && Array.isArray(d.services) && d.services.length > 0
      ? d.services
      : defaultServices;

  const ayurvedTitle =
    d.ayurvedCardTitle || "Ayurved Aushadhalaya & Homeopathy Pharmacy";
  const ayurvedDesc =
    d.ayurvedCardDesc ||
    "Authentic Ayurvedic and Homeopathic medicines and wellness products supporting natural, holistic and patient-centred care.";
  const ayurvedContact = d.ayurvedCardContact || "020-4015 2012";

  // Home Delivery
  const homeDeliveryBadge = d.homeDeliveryBadge || "HOME DELIVERY";
  const homeDeliveryTitle =
    d.homeDeliveryTitle || "Skip the counter. Stay on schedule.";
  const bullets: string[] = Array.isArray(d.homeDeliveryBullets)
    ? d.homeDeliveryBullets
    : typeof d.homeDeliveryBullets === "string"
    ? d.homeDeliveryBullets.split("\n").map((s: string) => s.trim()).filter(Boolean)
    : defaultBullets;
  const homeDeliveryContact =
    d.homeDeliveryContact || "GS Building: 020-4015 1555 / 9158881604";
  const homeDeliveryBtnText =
    d.homeDeliveryBtnText || "Enrol for Home Delivery";
  const enrollmentFormLink =
    d.enrollmentFormLink ||
    "https://docs.google.com/forms/d/e/1FAIpQLSdjMzzNoXpGfGPzWf-nX26DXKQN7plupHApHtHBFmT0W2CRUg/viewform";
  const homeDeliveryImage =
    d.homeDeliveryImage || "/images/home-delivery.jpg";

  // Drug Info
  const drugInfoBadge =
    d.drugInfoBadge || "DRUG INFORMATION & COUNSELLING";
  const drugInfoTitle =
    d.drugInfoTitle || "Medication information when it matters.";
  const drugInfoIntro =
    d.drugInfoIntro ||
    "The centre supports patients, relatives, physicians, pharmacists, nurses and other healthcare professionals with medication-related information and counselling.";
  const drugCards: DrugCard[] =
    d.drugInfoCards && Array.isArray(d.drugInfoCards) && d.drugInfoCards.length > 0
      ? d.drugInfoCards
      : defaultDrugCards;

  // Quick Help
  const quickHelpTitle = d.quickHelpTitle || "Need help with medicines?";
  const quickHelpSubtitle =
    d.quickHelpSubtitle ||
    "Contact the appropriate Deenanath Medical Stores service for guidance.";
  const quickHelpBtnText = d.quickHelpBtnText || "Call Now";
  const rawPhone = d.needHelpContact || d.quickHelpPhone || "020 40151050";
  const sanitizedPhone = rawPhone.replace(/[^0-9+]/g, "");

  // Footer
  const footerAddress =
    d.footerAddress ||
    "Deenanath Mangeshkar Hospital & Research Centre, Near Mhatre Bridge, Erandwane, Pune 411004";
  const footerPhone = d.footerPhone || "Tel. +91 20 4015 1000 / 49153000";

  return (
    <>
      {/* Plus Jakarta Sans font */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      <div
        className="bg-[#f8fafc] text-slate-800 antialiased min-h-screen"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <main className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">

          {/* ══════════════════════════════════════════════
              HERO SECTION WITH 2-3 IMAGE SLIDER
          ══════════════════════════════════════════════ */}
          <section className="relative bg-gradient-to-r from-[#d9f2ee] via-[#e5f6f3] to-[#f2faf8] rounded-3xl overflow-hidden border border-teal-100 shadow-sm">
            {/* Decorative cross icon */}
            <div className="absolute top-12 left-1/3 text-teal-300 opacity-40 select-none pointer-events-none">
              <svg className="w-20 h-20 fill-current" viewBox="0 0 24 24">
                <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
              </svg>
            </div>
            {/* Dotted grid backdrop */}
            <div
              className="absolute bottom-8 left-1/3 w-28 h-16 opacity-30 select-none pointer-events-none"
              style={dottedGrid}
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Hero Text */}
              <div className="p-8 sm:p-12 lg:py-16 lg:pl-14 lg:pr-6 lg:col-span-6 z-10">
                <span className="inline-block text-xs font-extrabold tracking-wider text-teal-700 uppercase mb-3">
                  {heroBadge}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-4">
                  {heroTitle}
                </h1>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                  {heroIntro}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href={heroBtnPrimaryLink}
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-[#00695c] hover:bg-[#00574c] text-white text-sm font-semibold rounded-lg shadow-sm transition active:scale-[0.98]"
                  >
                    {heroBtnPrimaryText}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                  <a
                    href={heroBtnSecondaryLink}
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-white border border-teal-600 text-teal-800 hover:bg-teal-50 text-sm font-semibold rounded-lg shadow-sm transition active:scale-[0.98]"
                  >
                    {heroBtnSecondaryText}
                  </a>
                </div>
              </div>

              {/* Hero Image Slider Container */}
              <div
                className="relative lg:col-span-6 h-80 sm:h-96 lg:h-full min-h-[440px] w-full flex items-end justify-end overflow-hidden group select-none"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Slides */}
                {slides.map((slide, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={slide.id || index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        isActive
                          ? "opacity-100 z-[5] pointer-events-auto"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt={slide.alt || "Deenanath Pharmacy"}
                        className={`w-full h-full object-cover object-center transition-transform duration-[5000ms] ease-out ${
                          isActive ? "scale-105" : "scale-100"
                        }`}
                        src={slide.image}
                      />
                    </div>
                  );
                })}

                {/* Subtle feathered edge blend merging image smoothly into left section (Desktop) */}
                <div
                  className="absolute inset-y-0 left-0 w-24 sm:w-28 pointer-events-none z-10 hidden lg:block"
                  style={{
                    background:
                      "linear-gradient(to right, #e5f6f3 0%, rgba(229, 246, 243, 0.8) 25%, rgba(229, 246, 243, 0.25) 65%, transparent 100%)",
                  }}
                />

                {/* Mobile subtle top-to-bottom blend */}
                <div
                  className="absolute inset-x-0 top-0 h-14 pointer-events-none z-10 lg:hidden"
                  style={{
                    background:
                      "linear-gradient(to bottom, #e5f6f3 0%, rgba(229, 246, 243, 0.6) 40%, transparent 100%)",
                  }}
                />

                {/* Floating Badge (Glassmorphic) */}
                <div className="absolute top-6 right-6 sm:right-8 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-white/80 z-20 pointer-events-none transition-all">
                  <p className="text-xs font-black text-teal-800 uppercase tracking-widest">
                    {heroFloatingBadgeTop}
                  </p>
                  <p className="text-[11px] font-bold text-slate-500 tracking-wider">
                    {heroFloatingBadgeBottom}
                  </p>
                </div>

                {/* Slide Indicators / Dots in sleek frosted capsule (NO ARROWS) */}
                {slides.length > 1 && (
                  <div className="absolute bottom-5 inset-x-0 flex items-center justify-center z-20">
                    <div className="bg-slate-900/30 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/20 shadow-md">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentSlide(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className={`transition-all duration-500 rounded-full h-2 ${
                            idx === currentSlide
                              ? "w-6 bg-teal-400 shadow-sm"
                              : "w-2 bg-white/70 hover:bg-white hover:scale-125"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              SERVICES SECTION
          ══════════════════════════════════════════════ */}
          <section className="space-y-6 pt-4" id="services">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                {servicesTag}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 mb-2">
                {servicesTitle}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {servicesIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {servicesList.map((service, index) => (
                <div
                  key={service.id || index}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                        {index % 6 === 0 && (
                          <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {index % 6 === 1 && (
                          <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {index % 6 === 2 && (
                          <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 12h8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {index % 6 === 3 && (
                          <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 3v4m6-4v4m-7 4h8a2 2 0 012 2v7a2 2 0 01-2 2H8a2 2 0 01-2-2v-7a2 2 0 012-2z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {index % 6 === 4 && (
                          <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {index % 6 === 5 && (
                          <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {service.desc}
                    </p>
                  </div>
                  {service.contact && (
                    <div className="pt-2">
                      {service.contact.includes("24-hour") ? (
                        <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-100">
                          <svg className="w-3.5 h-3.5 mr-1.5 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          {service.contact}
                        </span>
                      ) : service.contact.includes("Clinical Pharmacy") ? (
                        <span className="inline-block text-xs font-semibold text-teal-800">
                          {service.contact}
                        </span>
                      ) : (
                        <div className="text-xs font-semibold text-slate-800 flex items-center">
                          <span className="mr-1.5 text-teal-700">📞</span>
                          <span>{service.contact}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Ayurved & Homeopathy Card */}
            {ayurvedTitle && (
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow md:w-1/2 lg:w-1/3">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                    <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {ayurvedTitle}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  {ayurvedDesc}
                </p>
                {ayurvedContact && (
                  <div className="text-xs font-semibold text-slate-800 flex items-center">
                    <span className="mr-1.5 text-teal-700">📞</span>
                    <span>{ayurvedContact}</span>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* ══════════════════════════════════════════════
              HOME DELIVERY SECTION
          ══════════════════════════════════════════════ */}
          <section
            className="bg-gradient-to-br from-[#dcf4ef] via-[#e7f7f3] to-[#daf0ec] rounded-3xl border border-teal-100 overflow-hidden relative shadow-sm"
            id="homedelivery"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Content */}
              <div className="p-8 sm:p-12 lg:col-span-7 z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  {homeDeliveryBadge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 mb-6">
                  {homeDeliveryTitle}
                </h2>
                <ul className="space-y-3 mb-6 text-xs sm:text-sm text-slate-700 font-medium">
                  {bullets.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {homeDeliveryContact && (
                  <div className="text-xs sm:text-sm font-bold text-slate-800 flex items-center mb-6">
                    <span className="mr-2 text-teal-800">📞</span>
                    <span>{homeDeliveryContact}</span>
                  </div>
                )}
                {enrollmentFormLink && (
                  <a
                    href={enrollmentFormLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3.5 bg-[#00695c] hover:bg-[#00574c] text-white text-sm font-semibold rounded-lg shadow-sm transition active:scale-[0.98]"
                  >
                    {homeDeliveryBtnText}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Image */}
              <div className="relative lg:col-span-5 h-72 sm:h-96 lg:h-full min-h-[340px] flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Delivery executive handing prescription package to senior patient"
                  className="w-full h-full object-cover object-center"
                  src={homeDeliveryImage}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/home-delivery.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-teal-900/10 mix-blend-multiply" />
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              DRUG INFORMATION SECTION
          ══════════════════════════════════════════════ */}
          <section className="bg-gradient-to-r from-teal-50/70 via-white to-teal-50/50 rounded-3xl p-6 sm:p-10 border border-teal-100/70 shadow-sm">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                {drugInfoBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 mb-2">
                {drugInfoTitle}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {drugInfoIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {drugCards.map((card, idx) => (
                <div
                  key={card.id || idx}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4">
                    {idx === 0 ? (
                      <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : idx === 1 ? (
                      <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 stroke-current fill-none" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════
              QUICK HELP CALLOUT
          ══════════════════════════════════════════════ */}
          <section
            id="quickhelp"
            className="bg-gradient-to-r from-[#d9f2ee] to-[#c8eee7] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-teal-200 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-teal-700 shadow-sm flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {quickHelpTitle}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm">
                  {quickHelpSubtitle}
                </p>
              </div>
            </div>
            <a
              href={`tel:${sanitizedPhone}`}
              className="inline-flex items-center px-6 py-3 bg-[#00695c] hover:bg-[#00574c] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition whitespace-nowrap active:scale-[0.98]"
            >
              {quickHelpBtnText}
              <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </section>

        </main>

        {/* ══════════════════════════════════════════════
            FOOTER BAR
        ══════════════════════════════════════════════ */}
        <footer className="bg-white border-t border-slate-200 mt-12 py-8">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-slate-600 gap-4">
            <div className="flex items-center text-center md:text-left">
              <svg className="w-5 h-5 text-teal-700 mr-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{footerAddress}</span>
            </div>
            <div className="flex items-center font-medium">
              <svg className="w-4 h-4 text-teal-700 mr-2 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{footerPhone}</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
