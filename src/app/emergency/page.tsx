import type { Metadata } from "next";
import EmergencyClientPage from "./client-page";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_emergency' } });
  let data: any = null;
  try { if (setting?.value) data = JSON.parse(setting.value); } catch (e) {}
  
  return {
    title: data?.seoMetaTitle || "Emergency Department | DMH",
    description: data?.seoMetaDescription || "ANANT WAMAN SHANBHAG DEPARTMENT OF EMERGENCY MEDICINE - 24x7 Emergency Care",
  };
}

export default async function EmergencyPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_emergency' } });
  let data: any = null;
  try { if (setting?.value) data = JSON.parse(setting.value); } catch (e) {}

  return <EmergencyClientPage data={data} />;
}
