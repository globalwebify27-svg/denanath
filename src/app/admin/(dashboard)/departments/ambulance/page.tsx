import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import AmbulanceClientForm from "./client-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Ambulance - DMH Admin",
};

export default async function AdminAmbulancePage() {
  let page = await prisma.dynamicPage.findFirst({
    where: { slug: "ambulance" },
  });

  if (!page) {
    page = await prisma.dynamicPage.create({
      data: {
        title: "Ambulance",
        slug: "ambulance",
        navbarMenu: "Top Header",
        content: "<p>Call Ambulance : 020 40151540</p>",
        status: true,
      },
    });
  }

  return (
    <AmbulanceClientForm
      initialData={{
        id: page.id,
        title: page.title,
        slug: page.slug,
        navbarMenu: page.navbarMenu,
        content: page.content,
        status: page.status,
        seoMetaTitle: page.seoMetaTitle || "",
        seoMetaDescription: page.seoMetaDescription || "",
        seoKeywords: page.seoKeywords || "",
      }}
    />
  );
}
