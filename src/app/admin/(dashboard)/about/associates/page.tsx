import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AssociatesClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminAssociatesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_associates' } });

  let associatesData: any[] = [];
  try { if (setting) associatesData = JSON.parse(setting.value); } catch (e) {}

  async function saveAssociates(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("associatesJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_associates' },
        update: { value: rawJson },
        create: { key: 'page_associates', value: rawJson }
      });
      revalidatePath("/admin/about/associates");
      revalidatePath("/associates");
    } catch (e) {
      console.error("Invalid JSON provided for associates");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Associates</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the list of hospital associates and partner organizations.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveAssociates}>
          <AssociatesClientForm initialData={associatesData} />
        </form>
      </div>
    </div>
  );
}
