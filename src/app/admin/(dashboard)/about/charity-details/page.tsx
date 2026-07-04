import { Save, HeartPulse , Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import CharityDetailsClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminCharityDetailsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_charity_details' } });

  let charityData: any = { 
    badgeText: "Our Commitment to Society",
    heading: "Information Regarding Charity",
    introduction: "Deenanath Mangeshkar Hospital and Research Center actively provides world-class medical treatment to patients from indigent (निर्धन) and weaker sections (दुर्बल) of society. Below is a detailed breakdown of the patients we have recently assisted.",
    records: [] 
  };
  try { 
    if (setting) {
      const parsed = JSON.parse(setting.value);
      if (Array.isArray(parsed)) {
        charityData.records = parsed;
      } else {
        charityData = parsed;
      }
    } 
  } catch (e) {}

  async function saveCharityData(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("charityJson") as string;
    
    try {
      const parsed = JSON.parse(rawJson);
      parsed.seoMetaTitle = formData.get("seoMetaTitle") || "";
      parsed.seoMetaDescription = formData.get("seoMetaDescription") || "";
      parsed.seoKeywords = formData.get("seoKeywords") || "";
      const finalJson = JSON.stringify(parsed);
      await prisma.siteSetting.upsert({
        where: { key: 'page_charity_details' },
        update: { value: finalJson },
        create: { key: 'page_charity_details', value: finalJson }
      });
      revalidatePath("/admin/about/charity-details");
      revalidatePath("/charity-details");
    } catch (e) {
      console.error("Invalid JSON provided for charity data");
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={saveCharityData} className="space-y-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Charity Details
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the hospital's monthly charity patient statistics.
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

      <CharityDetailsClientForm initialData={charityData} />
    

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
              <input type="text" name="seoMetaTitle" defaultValue={charityData?.seoMetaTitle || ""} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
              <textarea name="seoMetaDescription" defaultValue={charityData?.seoMetaDescription || ""} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
              <textarea name="seoKeywords" defaultValue={charityData?.seoKeywords || ""} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
            </div>
          </div>
        </div>

</form>
    </div>
  );
}
