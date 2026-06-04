import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import JeevanRekhaClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminJeevanRekhaPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_jeevan_rekha' } });

  let pageData: any = { 
    highlightText: "Be prepared to save a life—because every second counts.",
    introText1: "The DMH Jeevan Rekha Program is a hands-on workshop designed for everyone, even those without a medical background, to confidently respond to emergencies. Learn CPR & AED use, along with first aid for common medical and injury emergencies, bites, and stings through guided practice and real-life simulations.",
    introText2: "With expert trainers and small batches, you gain practical, life-saving skills in just four hours. Register soon—limited seats available.",
    contactInfo: {
      address: "Dr. Indumati Amodkar Simulation Center,\nDeenanath Mangeshkar Hospital and Research Center, Pune",
      phones: ["020-49154402/3/4", "9356684381"],
      emails: ["simcenter@dmhospital.org"]
    },
    announcedPrograms: []
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  async function saveData(formData: FormData) {
    "use server";
    const rawJson = formData.get("pageJson") as string;
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_academics_jeevan_rekha' },
        update: { value: rawJson },
        create: { key: 'page_academics_jeevan_rekha', value: rawJson }
      });
      revalidatePath("/admin/academics/jeevan-rekha");
      revalidatePath("/jeevan-rekha");
    } catch (e) {
      console.error("Invalid JSON");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Jeevan Rekha</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage Jeevan Rekha content and training programs.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveData}>
          <JeevanRekhaClientForm initialData={pageData} />
        </form>
      </div>
    </div>
  );
}
