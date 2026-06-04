import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import InPatientClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminInPatientPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_in_patient' } });

  let inPatientData: any = {};
  try { if (setting) inPatientData = JSON.parse(setting.value); } catch (e) {}

  async function saveInPatientData(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("inPatientJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_in_patient' },
        update: { value: rawJson },
        create: { key: 'page_in_patient', value: rawJson }
      });
      revalidatePath("/admin/patient-visitors/in-patient");
      revalidatePath("/in-patient");
    } catch (e) {
      console.error("Invalid JSON provided for in patient guide");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">In Patient Guide</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the information displayed on the In Patient Guide page.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveInPatientData}>
          <InPatientClientForm initialData={inPatientData} />
        </form>
      </div>
    </div>
  );
}
