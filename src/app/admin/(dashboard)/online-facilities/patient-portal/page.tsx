import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import PatientPortalClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminPatientPortalPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'online-facilities-patient-portal' } });

  let pageData: any = { 
    pageTitle: "Patient Portal",
    googlePlayUrl: "#",
    appStoreUrl: "#",
    portalFeatures: [
      "View Pathology & Radiology Reports",
      "View Discharge Summary",
      "View OPD Schedule",
      "Book Appointments",
      "Explore Health Packages",
      "Ask Queries directly to Doctors"
    ]
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  async function saveData(formData: FormData) {
    "use server";
    const rawJson = formData.get("pageJson") as string;
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'online-facilities-patient-portal' },
        update: { value: rawJson },
        create: { key: 'online-facilities-patient-portal', value: rawJson }
      });
      revalidatePath("/admin/online-facilities/patient-portal");
      revalidatePath("/patient-portal");
    } catch (e) {
      console.error("Invalid JSON");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Patient Portal</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage Patient Portal page content.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveData}>
          <PatientPortalClientForm initialData={pageData} />
        </form>
      </div>
    </div>
  );
}
