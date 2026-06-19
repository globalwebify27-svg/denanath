import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function PatientPortalPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_online-facilities_patient_portal' } });
  let pageData: any = { title: "Patient Portal", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
