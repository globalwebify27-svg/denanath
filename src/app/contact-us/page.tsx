import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_hospital_contact_us' } });
  let pageData: any = { title: "Contact Us", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
