import { prisma } from "@/lib/prisma";
import DynamicPagesClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function PagesListPage() {
  let initialPages: any[] = [];

  try {
    const allPages = await prisma.dynamicPage.findMany({
      orderBy: { createdAt: "desc" },
    });

    initialPages = allPages
      .filter(p => !["Top Header", "Header", "Footer", "Footer Column 2"].includes(p.navbarMenu))
      .map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        navbarMenu: p.navbarMenu,
        status: p.status,
        createdAt: p.createdAt.toISOString(),
      }));
  } catch (error) {
    console.error("Failed to fetch initial pages:", error);
  }

  return <DynamicPagesClient initialPages={initialPages} />;
}
