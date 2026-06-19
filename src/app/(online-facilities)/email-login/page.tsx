import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function EMailLoginPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_online-facilities_email_login' } });
  let pageData: any = { title: "E-Mail Login", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
