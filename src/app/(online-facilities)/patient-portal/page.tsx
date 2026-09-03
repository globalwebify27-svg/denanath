import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";


export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_online-facilities_patient_portal' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

import { redirect } from "next/navigation";

export default async function PatientPortalPage() {
  redirect("https://phr.dmhospital.org/PatientPortal/login");
}
