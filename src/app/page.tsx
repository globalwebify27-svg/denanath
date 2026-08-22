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
import { getHomeCourses } from "@/app/actions/get-home-courses";

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

  const { leftCourses, rightCourses } = await getHomeCourses();

  return (
    <div className="relative overflow-hidden bg-[#f6fafb] min-h-screen">
      {/* Subtle top background gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-[80vh] bg-gradient-to-b from-teal-500/[0.03] to-transparent pointer-events-none z-0"></div>

      {/* 1. FLOATING EMERGENCY TAB */}
      <FloatingEmergencyTab />

      {/* 2. HERO IMAGE STAGE */}
      {parsedSettings['home_hero']?.isActive !== false && <HeroSection data={parsedSettings['home_hero']} />}

      {/* 3 & 4. FLOATING ACTION STRIP & SEARCH MODAL */}
      <HomeSearchWrapper />

      {/* 5. ABOUT SECTION */}
      {parsedSettings['home_about']?.isActive !== false && <AboutSection data={parsedSettings['home_about']} />}

      {/* 6. SPECIALTY CARE CLINICS SECTION */}
      {parsedSettings['home_specialty_clinics']?.isActive !== false && <SpecialtyClinics data={parsedSettings['home_specialty_clinics']} />}
      {parsedSettings['home_clinical_hub']?.isActive !== false && <ClinicalHub data={parsedSettings['home_clinical_hub']} />}
      {parsedSettings['home_trust']?.isActive !== false && <Trust_Credibility data={parsedSettings['home_trust']} />}
      {parsedSettings['home_doctors']?.isActive !== false && <DoctorsSection data={parsedSettings['home_doctors']} />}
      {parsedSettings['home_patient_journey']?.isActive !== false && <PatientJourney data={parsedSettings['home_patient_journey']} />}

      {/* 7. CLINICAL HUB SECTION (Courses) */}
      {parsedSettings['home_courses_pricing']?.isActive !== false && (
        <CoursesAndPricing 
          data={parsedSettings['home_courses_pricing']} 
          initialLeftCourses={leftCourses} 
          initialRightCourses={rightCourses} 
        />
      )}
      {parsedSettings['home_quick_links']?.isActive !== false && <QuickLinksCTA data={parsedSettings['home_quick_links']} />}

      {/* 8. PATIENT REVIEWS & STORIES */}
      {parsedSettings['home_reviews']?.isActive !== false && <PatientReviews data={parsedSettings['home_reviews']} />}
      
      {/* 9. PARTNERS & ACCREDITATION SECTION */}
      {parsedSettings['home_partners']?.isActive !== false && <PartnersAccreditation data={parsedSettings['home_partners']} />}
    </div>
  );
}

