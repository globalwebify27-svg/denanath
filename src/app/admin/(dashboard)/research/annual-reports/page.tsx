import { prisma } from "@/lib/prisma";
import ClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminAnnualReportsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_annual_reports' } });
  let pageData: any = { title: "Annual Reports", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <ClientForm initialData={pageData} />
    </div>
  );
}
