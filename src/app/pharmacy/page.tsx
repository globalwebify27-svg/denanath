import type { Metadata } from "next";
import PharmacyClientPage from "./client-page";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_pharmacy' } });
  let data: any = null;
  try { if (setting?.value) data = JSON.parse(setting.value); } catch (e) {}
  
  return {
    title: data?.seoMetaTitle || "Deenanath Medical Stores | DMH",
    description: data?.seoMetaDescription || "Medicines and healthcare essentials, all within your hospital.",
    ...(data?.seoKeywords ? { keywords: data.seoKeywords } : {}),
  };
}

export default async function PharmacyPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_pharmacy' } });
  let data: any = null;
  try { if (setting?.value) data = JSON.parse(setting.value); } catch (e) {}

  return <PharmacyClientPage data={data} />;
}
