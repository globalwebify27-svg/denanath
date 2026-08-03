import React from "react";
import { prisma } from "@/lib/prisma";

// Import modular homepage components
import FloatingEmergencyTab from "@/components/home/FloatingEmergencyTab";
import HeroSection from "@/components/home/HeroSection";
import HomeSearchWrapper from "@/components/home/HomeSearchWrapper";
import AboutSection from "@/components/home/AboutSection";
import SpecialtyClinics from "@/components/home/SpecialtyClinics";
import ClinicalHub from "@/components/home/ClinicalHub";
import PatientReviews from "@/components/home/PatientReviews";
import PartnersAccreditation from "@/components/home/PartnersAccreditation";
import Trust_Credibility from "@/components/home/Trust_Credibility";
import DoctorsSection from "@/components/home/Doctors";
import PatientJourney from "@/components/home/Patient";
import CoursesAndPricing from "@/components/home/CoursesAndPricing";
import QuickLinksCTA from "@/components/home/QuickLinksCTA";

export const dynamic = "force-dynamic";

export default async function Home() {
  const settings = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: [
          'home_hero', 
          'home_about', 
          'home_doctors', 
          'home_clinical_hub', 
          'home_trust', 
          'home_patient_journey', 
          'home_reviews', 
          'home_partners', 
          'home_quick_links',
          'home_courses_pricing',
          'home_specialty_clinics'
        ]
      }
    }
  });

  const parsedSettings: Record<string, any> = {};
  for (const s of settings) {
    try {
      parsedSettings[s.key] = JSON.parse(s.value);
    } catch(e) {}
  }

  return (
    <div className="relative overflow-hidden bg-[#f6fafb] min-h-screen">
      {/* Subtle top background gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-[80vh] bg-gradient-to-b from-teal-500/[0.03] to-transparent pointer-events-none z-0"></div>

      {/* 1. FLOATING EMERGENCY TAB */}
      <FloatingEmergencyTab />

      {/* 2. HERO IMAGE STAGE */}
      <HeroSection data={parsedSettings['home_hero']} />

      {/* 3 & 4. FLOATING ACTION STRIP & SEARCH MODAL */}
      <HomeSearchWrapper />

      {/* 5. ABOUT SECTION */}
      <AboutSection data={parsedSettings['home_about']} />

      {/* 6. SPECIALTY CARE CLINICS SECTION */}
      <SpecialtyClinics data={parsedSettings['home_specialty_clinics']} />
      <ClinicalHub data={parsedSettings['home_clinical_hub']} />
      <Trust_Credibility data={parsedSettings['home_trust']} />
      <DoctorsSection data={parsedSettings['home_doctors']} />
      <PatientJourney data={parsedSettings['home_patient_journey']} />

      {/* 7. CLINICAL HUB SECTION (Courses) */}
      <CoursesAndPricing data={parsedSettings['home_courses_pricing']} />
      <QuickLinksCTA data={parsedSettings['home_quick_links']} />

      {/* 8. PATIENT REVIEWS & STORIES */}
      <PatientReviews data={parsedSettings['home_reviews']} />
      
      {/* 9. PARTNERS & ACCREDITATION SECTION */}
      <PartnersAccreditation data={parsedSettings['home_partners']} />
    </div>
  );
}

