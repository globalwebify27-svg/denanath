import { Save, HeartPulse } from "lucide-react";
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
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={saveData} className="space-y-8">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Jeevan Rekha
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage Jeevan Rekha content and training programs.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 md:mt-0">
          <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-7 py-3.5 rounded-xl hover:bg-[#006570] hover:shadow-[0_8px_20px_rgba(0,122,135,0.3)] font-bold transition-all duration-300 transform hover:-translate-y-0.5">
            <Save size={20} strokeWidth={2.5} /> Save Changes
          </button>
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <JeevanRekhaClientForm initialData={pageData} />
    </form>
    </div>
  );
}
