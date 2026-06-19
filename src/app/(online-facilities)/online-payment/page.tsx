import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function OnlinePaymentPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_online-facilities_online_payment' } });
  let pageData: any = { title: "Online Payment", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
