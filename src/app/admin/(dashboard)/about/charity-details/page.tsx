import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import CharityDetailsClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminCharityDetailsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_charity_details' } });

  let charityData: any[] = [];
  try { if (setting) charityData = JSON.parse(setting.value); } catch (e) {}

  async function saveCharityData(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("charityJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_charity_details' },
        update: { value: rawJson },
        create: { key: 'page_charity_details', value: rawJson }
      });
      revalidatePath("/admin/about/charity-details");
      revalidatePath("/charity-details");
    } catch (e) {
      console.error("Invalid JSON provided for charity data");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Charity Details</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the hospital's monthly charity patient statistics.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveCharityData}>
          <CharityDetailsClientForm initialData={charityData} />
        </form>
      </div>
    </div>
  );
}
