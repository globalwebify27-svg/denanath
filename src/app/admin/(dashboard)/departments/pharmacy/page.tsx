import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PharmacyClientForm from "./client-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Pharmacy - DMH Admin",
};

export default async function AdminPharmacyPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_pharmacy' } });

  let pageData: any = null;
  try { 
    if (setting && setting.value) {
      pageData = JSON.parse(setting.value);
    }
  } catch (e) {}

  return <PharmacyClientForm initialData={pageData} />;
}
