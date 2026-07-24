import { prisma } from "@/lib/prisma";
import EventsClientPage from "./client-page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

function normalizeEventsData(raw: any) {
  if (!raw) return { events: [], seoMetaTitle: "", seoMetaDescription: "", seoKeywords: "" };
  if (Array.isArray(raw.events)) {
    return raw;
  }
  // If it's the old single-event format, wrap it
  if (raw.title) {
    const { seoMetaTitle, seoMetaDescription, seoKeywords, ...eventData } = raw;
    return {
      seoMetaTitle: seoMetaTitle || "",
      seoMetaDescription: seoMetaDescription || "",
      seoKeywords: seoKeywords || "",
      events: [
        {
          id: "event-legacy",
          ...eventData
        }
      ]
    };
  }
  return { events: [], seoMetaTitle: "", seoMetaDescription: "", seoKeywords: "" };
}

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
  if (setting) {
    try {
      const parsed = JSON.parse(setting.value);
      const normalized = normalizeEventsData(parsed);
      return {
        title: normalized.seoMetaTitle || "Events - DMH",
        description: normalized.seoMetaDescription || "",
        keywords: normalized.seoKeywords || "",
      }
    } catch(e){}
  }
  return { title: "Events - DMH" }
}

export default async function EventsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
  
  let rawData: any = {};
  try {
    if (setting) rawData = JSON.parse(setting.value);
  } catch (e) {}
  
  const data = normalizeEventsData(rawData);

  return <EventsClientPage events={data.events || []} />;
}
