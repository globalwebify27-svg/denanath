import { prisma } from "@/lib/prisma";
import { Home } from "lucide-react";
import HomeSettingsClient from "./HomeSettingsClient";

// Import defaults
import { defaultHeroData } from "@/components/home/HeroSection";
import { defaultAboutData } from "@/components/home/AboutSection";
import { defaultSpecialtyClinicsData } from "@/components/home/SpecialtyClinics";
import { defaultClinicalHubData } from "@/components/home/ClinicalHub";
import { defaultTrustData } from "@/components/home/Trust_Credibility";
import { defaultDoctorsData } from "@/components/home/Doctors";
import { defaultPatientJourneyData } from "@/components/home/Patient";
import { defaultCoursesPricingData } from "@/components/home/CoursesAndPricing";
import { defaultQuickLinksData } from "@/components/home/QuickLinksCTA";
import { defaultPatientReviewsData } from "@/components/home/PatientReviews";
import { defaultPartnersData } from "@/components/home/PartnersAccreditation";

export const dynamic = "force-dynamic";

export default async function AdminHomeSettingsPage() {
  const settingKeys = [
    'page_home',
    'home_hero', 
    'home_about', 
    'home_specialty_clinics',
    'home_clinical_hub', 
    'home_trust', 
    'home_doctors', 
    'home_patient_journey', 
    'home_courses_pricing',
    'home_quick_links',
    'home_reviews', 
    'home_partners'
  ];

  const settings = await prisma.siteSetting.findMany({ 
    where: { key: { in: settingKeys } } 
  });
  
  const defaults: Record<string, any> = {
    'home_hero': defaultHeroData,
    'home_about': defaultAboutData,
    'home_specialty_clinics': defaultSpecialtyClinicsData,
    'home_clinical_hub': defaultClinicalHubData,
    'home_trust': defaultTrustData,
    'home_doctors': defaultDoctorsData,
    'home_patient_journey': defaultPatientJourneyData,
    'home_courses_pricing': defaultCoursesPricingData,
    'home_quick_links': defaultQuickLinksData,
    'home_reviews': defaultPatientReviewsData,
    'home_partners': defaultPartnersData
  };

  const settingsData: Record<string, any> = {};
  for (const key of settingKeys) {
    const s = settings.find(set => set.key === key);
    if (s && s.value) {
      try {
        const parsed = JSON.parse(s.value);
        if (Object.keys(parsed).length > 0) {
           settingsData[key] = parsed;
        } else {
           settingsData[key] = defaults[key] || {};
        }
      } catch (e) {
        settingsData[key] = defaults[key] || {};
      }
    } else {
      settingsData[key] = defaults[key] || {};
    }
  }

  return (
    <div className="p-8 space-y-8">
      <HomeSettingsClient settingsData={settingsData} />
    </div>
  );
}
