import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_hospital_careers' } });
  let pageData: any = { title: "Careers", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
