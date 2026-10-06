import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import EmergencyClientForm from "./client-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Emergency - DMH Admin",
};

export default async function AdminEmergencyPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_emergency' } });

  let pageData: any = null;
  try { 
    if (setting && setting.value) {
      pageData = JSON.parse(setting.value);
    }
  } catch (e) {}

  return <EmergencyClientForm initialData={pageData} />;
}
