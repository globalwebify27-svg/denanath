import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AccreditationsClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminAccreditationsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_accreditations' } });

  let accreditationsData: any[] = [];
  try { if (setting) accreditationsData = JSON.parse(setting.value); } catch (e) {}

  async function saveAccreditations(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("accreditationsJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_accreditations' },
        update: { value: rawJson },
        create: { key: 'page_accreditations', value: rawJson }
      });
      revalidatePath("/admin/about/accreditations");
      revalidatePath("/accreditations");
    } catch (e) {
      console.error("Invalid JSON provided for accreditations");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Accreditations</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the list of hospital accreditations and certificates.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveAccreditations}>
          <AccreditationsClientForm initialData={accreditationsData} />
        </form>
      </div>
    </div>
  );
}
