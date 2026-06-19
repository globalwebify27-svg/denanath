import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function AboutUsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_about' } });
  let pageData: any = { title: "About Us", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
