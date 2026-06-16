import { prisma } from "@/lib/prisma";
import CharityDetailsClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function CharityDetailsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_charity_details' } });

  let charityData: any = { 
    badgeText: "Our Commitment to Society",
    heading: "Information Regarding Charity",
    introduction: "Deenanath Mangeshkar Hospital and Research Center actively provides world-class medical treatment to patients from indigent (निर्धन) and weaker sections (दुर्बल) of society. Below is a detailed breakdown of the patients we have recently assisted.",
    records: [] 
  };
  try { 
    if (setting) {
      const parsed = JSON.parse(setting.value);
      if (Array.isArray(parsed)) {
        charityData.records = parsed;
      } else {
        charityData = parsed;
      }
    } else {
      // Fallback data
      charityData.records = [
        { id: 1, month: "April 2026", indigent: "81", weaker: "520" },
        { id: 2, month: "March 2026", indigent: "95", weaker: "553" },
        { id: 3, month: "February 2026", indigent: "152", weaker: "563" },
        { id: 4, month: "January 2026", indigent: "353", weaker: "942" },
        { id: 5, month: "December 2025", indigent: "1109", weaker: "1094" },
        { id: 6, month: "November 2025", indigent: "1421", weaker: "840" },
        { id: 7, month: "October 2025", indigent: "1333", weaker: "759" },
        { id: 8, month: "September 2025", indigent: "1307", weaker: "803" },
      ];
    }
  } catch (e) {}

  return <CharityDetailsClientPage charityData={charityData} />;
}
