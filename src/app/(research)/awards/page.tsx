import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function AwardsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_awards' } });
  let pageData: any = { title: "Awards", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
