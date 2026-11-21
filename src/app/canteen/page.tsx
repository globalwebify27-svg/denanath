import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CanteenClientPage from "./client-page";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_canteen' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    title: seoData.seoMetaTitle || "Canteen & Catering Facilities - Deenanath Mangeshkar Hospital",
    description: seoData.seoMetaDescription || "Quality, hygienic, and nutritious catering facilities for patients, relatives, doctors, and staff at Deenanath Mangeshkar Hospital, Pune.",
    keywords: seoData.seoKeywords || "canteen facilities, dmh canteen, hospital food, patient diet, catering services, dietetics and nutrition, pune hospital canteen",
  };
}

export default async function CanteenPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_canteen' } });
  let data: any = null;
  try { 
    if (setting?.value) data = JSON.parse(setting.value); 
  } catch (e) {}

  return <CanteenClientPage initialData={data} />;
}
