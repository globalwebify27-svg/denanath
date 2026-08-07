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
export const revalidate = 0;
export const fetchCache = "force-no-store";

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
    'home_partners',
    'layout_top_header',
    'layout_header',
    'layout_footer'
  ];

  const settings = await prisma.siteSetting.findMany({ 
    where: { key: { in: settingKeys } } 
  });
  
  const defaultTopHeaderData = {
    menus: [
      { name: "Emergency", href: "/emergency", isActive: true, textColor: "#f87171" },
      { name: "Blood Bank", href: "/blood-bank", isActive: true, textColor: "" },
      { name: "Pharmacy", href: "/pharmacy", isActive: true, textColor: "" },
      { name: "Ambulance", href: "/ambulance", isActive: true, textColor: "#f87171" }
    ],
    phoneNumbers: [
      { text: "WhatsApp Us (24/7)", number: "912040151515" },
      { text: "+91 20 4015 1000 (24/7)", number: "+912040151000" }
    ],
    buttons: [
      { text: "Google Play", link: "https://play.google.com/store/apps/details?id=org.dmhospital.app&hl=en", icon: "playstore", isPrimary: true, bgColor: "#000000", hoverColor: "#0f172a" },
      { text: "App Store", link: "https://apps.apple.com/in/app/deenanath-mangeshkar-hospital/id1187525263", icon: "appstore", isPrimary: true, bgColor: "#000000", hoverColor: "#0f172a" }
    ]
  };

  const defaults: Record<string, any> = {
    'layout_top_header': defaultTopHeaderData,
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
    
    // Ensure layout_top_header has custom arrays at the TOP
    if (key === 'layout_top_header') {
       const existing = settingsData[key] || {};
       
       const menus = Array.isArray(existing.menus) ? existing.menus : [];
       const buttons = Array.isArray(existing.buttons) ? existing.buttons : [];
       const phoneNumbers = Array.isArray(existing.phoneNumbers) ? existing.phoneNumbers : [];
       
       // Migrate hardcoded legacy fields if they exist
       if (existing.emergencyText) {
           menus.push({ name: existing.emergencyText, href: existing.emergencyLink || "#", isActive: true, textColor: "#f87171" });
           delete existing.emergencyText;
           delete existing.emergencyLink;
       }
       if (existing.bloodBankText) {
           menus.push({ name: existing.bloodBankText, href: existing.bloodBankLink || "#", isActive: true, textColor: "" });
           delete existing.bloodBankText;
           delete existing.bloodBankLink;
       }
       if (existing.pharmacyText) {
           menus.push({ name: existing.pharmacyText, href: existing.pharmacyLink || "#", isActive: true, textColor: "" });
           delete existing.pharmacyText;
           delete existing.pharmacyLink;
       }
       if (existing.ambulanceText) {
           menus.push({ name: existing.ambulanceText, href: existing.ambulanceLink || "#", isActive: true, textColor: "#f87171" });
           delete existing.ambulanceText;
           delete existing.ambulanceLink;
       }
       
       if (existing.whatsappText) {
           phoneNumbers.push({ text: existing.whatsappText, number: existing.whatsappNumber || "" });
           delete existing.whatsappText;
           delete existing.whatsappNumber;
       }
       if (existing.phoneText) {
           phoneNumbers.push({ text: existing.phoneText, number: existing.phoneNumber || "" });
           delete existing.phoneText;
           delete existing.phoneNumber;
       }
       
       if (existing.playStoreLink) {
           buttons.push({ text: "Google Play", link: existing.playStoreLink, icon: "playstore", isPrimary: true, bgColor: "#000000", hoverColor: "#0f172a" });
           delete existing.playStoreLink;
       }
       if (existing.appStoreLink) {
           buttons.push({ text: "App Store", link: existing.appStoreLink, icon: "appstore", isPrimary: true, bgColor: "#000000", hoverColor: "#0f172a" });
           delete existing.appStoreLink;
       }
       if (Array.isArray(existing.topHeaderMenus)) {
           existing.topHeaderMenus.forEach((item: any) => {
               if (item.isButton) {
                   buttons.push({ text: item.name, link: item.href, isPrimary: true, bgColor: "#0f172a", hoverColor: "#d9232d" });
               } else if (item.isPhone) {
                   phoneNumbers.push({ text: item.name, number: item.href?.replace("tel:", "") || "" });
               } else {
                   menus.push({ name: item.name, href: item.href, isActive: item.isActive !== false });
               }
           });
           delete existing.topHeaderMenus;
       }
       
       settingsData[key] = {
           menus,
           phoneNumbers,
           buttons,
           ...existing
       };
    }
  }

  return (
    <div className="p-8 space-y-8">
      <HomeSettingsClient settingsData={settingsData} />
    </div>
  );
}
