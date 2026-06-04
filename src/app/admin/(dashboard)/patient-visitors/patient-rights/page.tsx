import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import PatientRightsClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminPatientRightsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_patient_rights' } });

  let patientRightsData: any = {};
  try { if (setting) patientRightsData = JSON.parse(setting.value); } catch (e) {}

  async function savePatientRightsData(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("patientRightsJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_patient_rights' },
        update: { value: rawJson },
        create: { key: 'page_patient_rights', value: rawJson }
      });
      revalidatePath("/admin/patient-visitors/patient-rights");
      revalidatePath("/patient-rights");
    } catch (e) {
      console.error("Invalid JSON provided for patient rights");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Patient Rights</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the Patient Rights & Responsibilities document image.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={savePatientRightsData}>
          <PatientRightsClientForm initialData={patientRightsData} />
        </form>
      </div>
    </div>
  );
}
