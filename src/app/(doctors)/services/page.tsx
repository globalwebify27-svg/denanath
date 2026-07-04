import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";


export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_doctors_services' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function ServicesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_doctors_services' } });
  let pageData: any = { title: "Services", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  const services = await prisma.service.findMany({
    orderBy: { title: 'asc' }
  });

  return <ClientPage pageData={pageData} services={services} />;
}
 