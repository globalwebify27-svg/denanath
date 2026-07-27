import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import VasantNirmalaOswalCentreClientPage from "./client-page";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_oswal_centre' } });
    if (setting) {
      const data = JSON.parse(setting.value);
      return {
        title: data.seoMetaTitle || "Vasant & Nirmala Oswal Centre | Academics",
        description: data.seoMetaDescription || "Vasant & Nirmala Oswal Centre For Post Graduate Training & Education at Deenanath Mangeshkar Hospital",
      };
    }
  } catch (e) {}
  return {
    title: "Vasant & Nirmala Oswal Centre | Academics",
    description: "Vasant & Nirmala Oswal Centre For Post Graduate Training & Education at Deenanath Mangeshkar Hospital",
  };
}

export default async function VasantNirmalaOswalCentrePage() {
  let initialData = null;
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_oswal_centre' } });
    if (setting) {
      initialData = JSON.parse(setting.value);
    }
  } catch (e) {}

  return <VasantNirmalaOswalCentreClientPage initialData={initialData} />;
}
