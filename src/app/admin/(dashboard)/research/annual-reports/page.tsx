import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AnnualReportsClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminResearchAnnualReportsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_annual_reports' } });

  let pageData: any = { reports: [] };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  async function saveData(formData: FormData) {
    "use server";
    const rawJson = formData.get("pageJson") as string;
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_research_annual_reports' },
        update: { value: rawJson },
        create: { key: 'page_research_annual_reports', value: rawJson }
      });
      revalidatePath("/admin/research/annual-reports");
      revalidatePath("/annual-reports");
    } catch (e) {
      console.error("Invalid JSON");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Research - Annual Reports</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the list of annual reports.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveData}>
          <AnnualReportsClientForm initialData={pageData} />
        </form>
      </div>
    </div>
  );
}
