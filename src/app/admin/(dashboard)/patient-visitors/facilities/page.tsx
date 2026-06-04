import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import FacilitiesClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminFacilitiesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_facilities' } });

  let facilitiesData: any = {};
  try { if (setting) facilitiesData = JSON.parse(setting.value); } catch (e) {}

  async function saveFacilitiesData(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("facilitiesJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_facilities' },
        update: { value: rawJson },
        create: { key: 'page_facilities', value: rawJson }
      });
      revalidatePath("/admin/patient-visitors/facilities");
      revalidatePath("/facilities");
    } catch (e) {
      console.error("Invalid JSON provided for facilities");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Facilities</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the information about hospital facilities, billing rules, and timings.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveFacilitiesData}>
          <FacilitiesClientForm initialData={facilitiesData} />
        </form>
      </div>
    </div>
  );
}
