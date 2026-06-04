import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import PatientRegistrationClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminPatientRegistrationPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'online-facilities-patient-registration' } });

  let pageData: any = { 
    pageTitle: "Patient Registration Form",
    introText: "Registration is a process by which patient is enrolled into the records of the hospital. This is required to provide seamless hospital services to the patient and to keep track of various services that are availed by the patient. This is also the first step to generate a medical record of the patient in which all medical details of the patient are documented. ",
    introHighlight: "This facility is to be used only by patient coming first time to this hospital."
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  async function saveData(formData: FormData) {
    "use server";
    const rawJson = formData.get("pageJson") as string;
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'online-facilities-patient-registration' },
        update: { value: rawJson },
        create: { key: 'online-facilities-patient-registration', value: rawJson }
      });
      revalidatePath("/admin/online-facilities/patient-registration");
      revalidatePath("/patient-registration");
    } catch (e) {
      console.error("Invalid JSON");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Patient Registration</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage Patient Registration page content.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveData}>
          <PatientRegistrationClientForm initialData={pageData} />
        </form>
      </div>
    </div>
  );
}
