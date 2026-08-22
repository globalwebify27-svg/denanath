import { prisma } from "@/lib/prisma";
import EventsClientPage from "./client-page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

function normalizeEventsData(raw: any) {
  if (!raw) return { events: [], seoMetaTitle: "", seoMetaDescription: "", seoKeywords: "" };
  if (Array.isArray(raw.events)) {
    return { ...raw, events: raw.events.filter((e: any) => e.status !== false && e.status !== "false") };
  }
  if (Array.isArray(raw.items)) {
    return { ...raw, events: raw.items.filter((e: any) => e.status !== false && e.status !== "false") };
  }
  if (Array.isArray(raw)) {
    return { events: raw.filter((e: any) => e.status !== false && e.status !== "false"), pageTitle: "", bannerImage: "" };
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
  return { events: [], seoMetaTitle: "", seoMetaDescription: "", seoKeywords: "", pageTitle: "", bannerImage: "" };
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

export default async function EventsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
  
  let rawData: any = {};
  try {
    if (setting) rawData = JSON.parse(setting.value);
  } catch (e) {}
  
  const data = normalizeEventsData(rawData);
  
  // Try to match the event by a slug-like string derived from the title or id
  const matchedEvent = data.events.find((e: any) => {
    const slugFromName = e.title?.replace(/[^a-zA-Z0-9-]/g, '') || "";
    const slugFromName2 = e.title?.replace(/[^a-zA-Z0-9]/g, '') || "";
    return e.id === slug || slugFromName === slug || slugFromName2 === slug || e.slug === slug;
  });

  if (!matchedEvent) {
    return <div className="min-h-screen flex items-center justify-center"><h2>Event Not Found</h2></div>;
  }

  return <EventsClientPage events={[matchedEvent]} pageData={{ pageTitle: data.pageTitle, bannerImage: data.bannerImage }} />;
}
