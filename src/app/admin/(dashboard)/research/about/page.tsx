import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AboutClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminResearchAboutPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_about' } });

  let pageData: any = {};
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  async function saveData(formData: FormData) {
    "use server";
    const rawJson = formData.get("pageJson") as string;
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_research_about' },
        update: { value: rawJson },
        create: { key: 'page_research_about', value: rawJson }
      });
      revalidatePath("/admin/research/about");
      revalidatePath("/research-about");
    } catch (e) {
      console.error("Invalid JSON");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Research - About Us</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the content for the Research About Us page.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveData}>
          <AboutClientForm initialData={pageData} />
        </form>
      </div>
    </div>
  );
}
