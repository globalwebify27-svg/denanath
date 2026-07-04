import { Save, HeartPulse , Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import AssociatesClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminAssociatesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_associates' } });

  let rawData: any = [];
  try { if (setting) rawData = JSON.parse(setting.value); } catch (e) {}
  
  let associatesData: any[] = Array.isArray(rawData) ? rawData : (rawData.items || []);
  let seoData: any = Array.isArray(rawData) ? {} : rawData;

  if (!associatesData || associatesData.length === 0) {
    associatesData = [
    {
      name: "Kamla Mehta Eye Hospital",
      description: "Kamla Mehta eye hospital was started in 1996 in Shirwal, district Satara which free cataract (IOL) surgery. This is in association with World Bank.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
      link: "#"
    },
    {
      name: "Mai Mangeshkar Hospital",
      description: "Mai Mangeshkar Hospital is a 60 bedded hospital situated at Warje, Pune. It is run by joint venture of JPMT (Jnana prabodhini medical trust) and LMMF (Lata Mangeshkar Medical Foundation).",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop",
      link: "#"
    }
  ];
  }

  async function saveAssociates(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("associatesJson") as string;
    
    try {
      const parsedArray = JSON.parse(rawJson);
      const parsed = {
        items: parsedArray,
        seoMetaTitle: formData.get("seoMetaTitle") || "",
        seoMetaDescription: formData.get("seoMetaDescription") || "",
        seoKeywords: formData.get("seoKeywords") || ""
      };
      const finalJson = JSON.stringify(parsed);
      await prisma.siteSetting.upsert({
        where: { key: 'page_associates' },
        update: { value: finalJson },
        create: { key: 'page_associates', value: finalJson }
      });
      revalidatePath("/admin/about/associates");
      revalidatePath("/associates");
    } catch (e) {
      console.error("Invalid JSON provided for associates");
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={saveAssociates} className="space-y-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Associates
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the list of hospital associates and partner organizations.
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

      <AssociatesClientForm initialData={associatesData} />
    

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
              <input type="text" name="seoMetaTitle" defaultValue={seoData?.seoMetaTitle || ""} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
              <textarea name="seoMetaDescription" defaultValue={seoData?.seoMetaDescription || ""} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
              <textarea name="seoKeywords" defaultValue={seoData?.seoKeywords || ""} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
            </div>
          </div>
        </div>

</form>
    </div>
  );
}
