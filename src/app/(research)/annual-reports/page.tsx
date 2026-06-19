import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function AnnualReportsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_annual_reports' } });
  let pageData: any = { title: "Annual Reports", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
