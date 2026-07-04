import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { redirect } from 'next/navigation';


export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_doctors' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function DoctorsRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const dept = params.department;
  
  if (dept && typeof dept === 'string') {
    redirect(`/doctor-details?department=${encodeURIComponent(dept)}`);
  } else {
    redirect('/doctor-details');
  }
}
