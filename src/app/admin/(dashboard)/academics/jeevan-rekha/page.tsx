import { Save, HeartPulse , Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
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
      const parsed = JSON.parse(rawJson);
      parsed.seoMetaTitle = formData.get("seoMetaTitle") || "";
      parsed.seoMetaDescription = formData.get("seoMetaDescription") || "";
      parsed.seoKeywords = formData.get("seoKeywords") || "";
      const finalJson = JSON.stringify(parsed);
      await prisma.siteSetting.upsert({
        where: { key: 'page_academics_jeevan_rekha' },
        update: { value: finalJson },
        create: { key: 'page_academics_jeevan_rekha', value: finalJson }
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
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Jeevan Rekha
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage Jeevan Rekha content and training programs.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <SubmitButton text="Save Changes" loadingText="Saving..." />
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <JeevanRekhaClientForm initialData={pageData} />
    

        {/* Card: SEO Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
            <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
              <Search size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">SEO Settings</h2>
              <p className="text-[13px] text-slate-500 font-medium">Manage search engine optimization meta tags.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Title</label>
              <input type="text" name="seoMetaTitle" defaultValue={pageData?.seoMetaTitle || ""} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
              <textarea name="seoMetaDescription" defaultValue={pageData?.seoMetaDescription || ""} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
              <textarea name="seoKeywords" defaultValue={pageData?.seoKeywords || ""} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
            </div>
          </div>
        </div>

</form>
    </div>
  );
}
