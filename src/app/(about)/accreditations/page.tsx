import type { Metadata } from "next";
import React from "react";
import { prisma } from "@/lib/prisma";
import AccreditationsClient from "./client-page";

export const dynamic = "force-dynamic";


export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_accreditations' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function AccreditationsPage() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_accreditations' }
  });

  let data = [];
  if (setting && setting.value) {
    try {
      const parsed = JSON.parse(setting.value);
      data = Array.isArray(parsed) ? parsed : (parsed.items || []);
    } catch (e) {
      console.error("Failed to parse accreditations data");
    }
  }

  return <AccreditationsClient data={data} />;
}
