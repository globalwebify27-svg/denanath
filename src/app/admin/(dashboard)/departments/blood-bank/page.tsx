import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import BloodBankClientForm from "./client-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Blood Bank - DMH Admin",
};

export default async function AdminBloodBankPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_blood_bank' } });

  let pageData: any = null;
  try { 
    if (setting && setting.value) {
      pageData = JSON.parse(setting.value);
    }
  } catch (e) {}

  return <BloodBankClientForm initialData={pageData} />;
}
