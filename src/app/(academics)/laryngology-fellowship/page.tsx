import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import LaryngologyFellowshipClientPage from "./client-page";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_laryngology_fellowship' } });
    if (setting) {
      const data = JSON.parse(setting.value);
      return {
        title: data.seoMetaTitle || "Laryngology Fellowship | Academics",
        description: data.seoMetaDescription || "Laryngology Fellowship at Deenanath Mangeshkar Hospital",
      };
    }
  } catch (e) {}
  return {
    title: "Laryngology Fellowship | Academics",
    description: "Laryngology Fellowship at Deenanath Mangeshkar Hospital",
  };
}

export default async function LaryngologyFellowshipPage() {
  let initialData = null;
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_laryngology_fellowship' } });
    if (setting) {
      initialData = JSON.parse(setting.value);
    }
  } catch (e) {}

  return <LaryngologyFellowshipClientPage initialData={initialData} />;
}
