import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import GalleryVideosClientPage from "./client-page";

export const dynamic = "force-dynamic";


export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_gallery_videos' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function GalleryVideosPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_gallery_videos' } });

  let pageData: any = {};
  try { 
    if (setting) {
      pageData = JSON.parse(setting.value);
    } else {
      // Fallback data
      pageData = {
        categories: [
          "ALL", "PATIENT STORIES", "ICU-VISIT", "COVID-19", "WELLNESS AND LIFESTYLE", "MAAI MOTHER'S MILK BANK"
        ],
        videos: [
          { title: "COVID 19 VACCINE : Why When & How by Dr. Dhananjay Kelkar", category: "COVID-19", url: "https://www.youtube.com/watch?v=VMilo10Hbh4&t=15s" },
          { title: "Covid-19 Home Isolation Instructions by DMH - Marathi", category: "COVID-19", url: "" },
          { title: "Covid-19 Home Isolation Instructions by DMH- English", category: "COVID-19", url: "" },
          { title: "Covid-19 Home Isolation Instructions by DMH- Hindi", category: "COVID-19", url: "" },
          { title: "DMH covid-19 update (for doctors) Part 1: Overview, Prevention & Diagnosis", category: "COVID-19", url: "" },
          { title: "DMH covid-19 update (for doctors) Part 2: Treatment", category: "COVID-19", url: "" },
          { title: "DMH covid-19 update Part 3: Paediatric", category: "COVID-19", url: "" },
          { title: "DMH Jalneti -1", category: "WELLNESS AND LIFESTYLE", url: "" },
          { title: "DMH Jalneti-2 Q & A", category: "WELLNESS AND LIFESTYLE", url: "" },
          { title: "Everything to know about covid-19 Part 1 of 3 : Prevention and Overview by Dr. Dhananjay Kelkar, DMH", category: "COVID-19", url: "" },
          { title: "Everything to know about covid-19 part 2 of 3 : Diagnosis and Treatment by Dr. Dhananjay Kelkar, DMH", category: "COVID-19", url: "" },
          { title: "Everything to know about covid-19 part 3 of 3 : Living with covid by Dr. Dhananjay Kelkar, DMH", category: "COVID-19", url: "" },
          { title: "Guidance Lecture on Corona Virus | Dr. Dhananjay Kelkar", category: "COVID-19", url: "" },
          { title: "ICU-Visit", category: "ICU-VISIT", url: "" },
          { title: "In the shadow of virtual truth… Corona in our minds | Dr Dhananjay Kelkar", category: "COVID-19", url: "" },
          { title: "Maai Mother's Milk Bank", category: "MAAI MOTHER'S MILK BANK", url: "" },
          { title: "MIND over MATTER by Dr.Dhananjay Kelkar", category: "WELLNESS AND LIFESTYLE", url: "" },
          { title: "Patient Stories - Testimonial 1", category: "PATIENT STORIES", url: "" },
          { title: "Patient Stories - Testimonial 2", category: "PATIENT STORIES", url: "" },
          { title: "Patient Stories - Testimonial 3", category: "PATIENT STORIES", url: "" },
          { title: "Rehabilitation guidelines for patients recovering from Covid-19 (in English)", category: "COVID-19", url: "" },
          { title: "Rehabilitation guidelines for patients recovering from Covid-19 (in marathi)", category: "COVID-19", url: "" },
          { title: "Sukshma Yoga And Pranayama", category: "WELLNESS AND LIFESTYLE", url: "" },
          { title: "Work Life Balance by Dr. Dhananjay Kelkar", category: "WELLNESS AND LIFESTYLE", url: "" },
          { title: "माझे गुरु (कै. अप्पासाहेब पेंडसे , डॉ. मेहरू मेहता , मा. लता दीदी ) by Dr. Dhananjay Kelkar MS FRCS", category: "WELLNESS AND LIFESTYLE", url: "" }
        ]
      };
    }
  } catch (e) {}

  return <GalleryVideosClientPage pageData={pageData} />;
}
