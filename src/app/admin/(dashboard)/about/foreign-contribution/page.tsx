import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import ForeignContributionClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminForeignContributionPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_foreign_contribution' } });

  let fcraData: any[] = [];
  try { if (setting) fcraData = JSON.parse(setting.value); } catch (e) {}

  async function saveFcra(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("fcraJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_foreign_contribution' },
        update: { value: rawJson },
        create: { key: 'page_foreign_contribution', value: rawJson }
      });
      revalidatePath("/admin/about/foreign-contribution");
      revalidatePath("/foreign-contribution");
    } catch (e) {
      console.error("Invalid JSON provided for FCRA data");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Foreign Contribution</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the quarterly FCRA donor records.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveFcra}>
          <ForeignContributionClientForm initialData={fcraData} />
        </form>
      </div>
    </div>
  );
}
