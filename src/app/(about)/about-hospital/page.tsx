import type { Metadata } from "next";
import React from "react";
import { prisma } from "@/lib/prisma";
import AboutHospitalClient from "./client-page";

export const dynamic = "force-dynamic";


export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_about_hospital' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function AboutHospitalPage() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_about_hospital' }
  });

  let data = {};
  if (setting && setting.value) {
    try {
      data = JSON.parse(setting.value);
    } catch (e) {
      console.error("Failed to parse about-hospital data");
    }
  }

  return <AboutHospitalClient data={data} />;
}
