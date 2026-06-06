import { prisma } from "@/lib/prisma";
import ContactUsClient from "./client-page";

export const dynamic = "force-dynamic";

export default async function ContactUsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_contact' } });
  let contactData: any = null;
  try { if (setting) contactData = JSON.parse(setting.value); } catch (e) {}

  return <ContactUsClient initialData={contactData} />;
}
