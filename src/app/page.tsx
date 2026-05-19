"use client";

import React, { useState } from "react";
import { useHospital } from "@/context/HospitalContext";

// Import modular homepage components
import FloatingEmergencyTab from "@/components/home/FloatingEmergencyTab";
import HeroSection from "@/components/home/HeroSection";
import FloatingActionStrip from "@/components/home/FloatingActionStrip";
import SearchModal from "@/components/home/SearchModal";
import AboutSection from "@/components/home/AboutSection";
import SpecialtyClinics from "@/components/home/SpecialtyClinics";
import ClinicalHub from "@/components/home/ClinicalHub";
import PatientReviews from "@/components/home/PatientReviews";
import PartnersAccreditation from "@/components/home/PartnersAccreditation";

export default function Home() {
  const { doctors, departments } = useHospital();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="relative overflow-hidden bg-[#f6fafb] min-h-screen pb-24">
      {/* Subtle top background gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-[80vh] bg-gradient-to-b from-teal-500/[0.03] to-transparent pointer-events-none z-0"></div>

      {/* 1. FLOATING EMERGENCY TAB */}
      <FloatingEmergencyTab />

      {/* 2. HERO IMAGE STAGE */}
      <HeroSection />

      {/* 3. FLOATING ACTION STRIP */}
      <FloatingActionStrip setIsSearchOpen={setIsSearchOpen} />

      {/* 4. SEARCH MODAL OVERLAY */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        doctors={doctors}
        departments={departments}
      />

      {/* 5. ABOUT SECTION */}
      <AboutSection />

      {/* 6. SPECIALTY CARE CLINICS SECTION */}
      <SpecialtyClinics />

      {/* 7. CLINICAL HUB SECTION */}
      <ClinicalHub />

      {/* 8. PATIENT REVIEWS & STORIES */}
      <PatientReviews />

      {/* 9. PARTNERS & ACCREDITATION SECTION */}
      <PartnersAccreditation />
    </div>
  );
}