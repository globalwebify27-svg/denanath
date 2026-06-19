import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function DoctorDetailsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_doctors_doctor_details' } });
  let pageData: any = { title: "Doctor Details", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
