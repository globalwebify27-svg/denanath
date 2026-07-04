import type { Metadata } from "next";
import React from "react";
import { prisma } from "@/lib/prisma";
import NbemsCoursesClient from "./client-page";

export const dynamic = "force-dynamic";


export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_nbems' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function NBEMSCoursesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_nbems' } });

  let pageData: any = { 
    introText: "The courses mentioned here are for **NBEMS (National Board of Examinations in Medical Sciences)** students who are currently pursuing or completed DNB, MD and fellowship program. Please click on the individual course for more details. If you are keen to register for any of the course, then please go the payment tab on the main page.",
    noteText: "* Please note that payment gateway charges will be applicable. The charges may vary from 0.50% to 2% of the transaction amount depending on your mode of payment. No charges on UPI transaction.",
    announcedPrograms: []
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <NbemsCoursesClient initialData={pageData} />;
}
