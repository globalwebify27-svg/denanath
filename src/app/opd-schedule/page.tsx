import { Metadata } from "next";
import OpdScheduleClientPage from "./client-page";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_opd_schedule' } });
  if (setting) {
    try {
      const parsed = JSON.parse(setting.value);
      return {
        title: parsed.seoMetaTitle || "OPD Schedule | Deenanath Mangeshkar Hospital",
        description: parsed.seoMetaDescription || "View the OPD schedule for doctors at Deenanath Mangeshkar Hospital.",
        keywords: parsed.seoKeywords || "",
      }
    } catch(e){}
  }
  return { 
    title: "OPD Schedule | Deenanath Mangeshkar Hospital",
    description: "View the OPD schedule for doctors at Deenanath Mangeshkar Hospital." 
  }
}

export default async function OpdSchedulePage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_opd_schedule' } });
  
  let data: any = { 
    pageTitle: "Hospital OPD Schedule",
    subtitle: "Timetable",
    heroTitle: "OPD Schedule",
    heroBreadcrumb: "OPD Schedule",
    filterSpecialtyLabel: "Filter By Specialty:",
    filterDoctorLabel: "Filter By Doctor:"
  };
  
  try {
    if (setting) data = JSON.parse(setting.value);
  } catch (e) {}

  return <OpdScheduleClientPage initialData={data} />;
}
