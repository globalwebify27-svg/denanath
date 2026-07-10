import type { Metadata } from "next";
import React from "react";
import { prisma } from "@/lib/prisma";
import DepartmentDetailsClientPage from "./client-page";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_doctors_department_details' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function DepartmentDetailsPage() {
  let pageData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_doctors_department_details' } });
    if (setting && setting.value) pageData = JSON.parse(setting.value);
  } catch (error) {}

  const departments = await prisma.department.findMany({
    where: { status: true },
    orderBy: { name: 'asc' }
  });

  return <DepartmentDetailsClientPage pageData={pageData} departments={departments} />;
}
