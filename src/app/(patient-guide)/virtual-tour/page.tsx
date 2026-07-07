import { prisma } from "@/lib/prisma";
import VirtualTourClientPage from "./client-page";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_virtual_tour' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function VirtualTourPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_virtual_tour' } });
  
  let pageData: any = {};
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <VirtualTourClientPage pageData={pageData} />;
}
