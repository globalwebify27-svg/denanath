import { Save, HeartPulse , Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import OutPatientClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminOutPatientPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_out_patient' } });

  let outPatientData: any = {};
  try { if (setting) outPatientData = JSON.parse(setting.value); } catch (e) {}

  const headerSettingStr = await prisma.siteSetting.findUnique({ where: { key: 'layout_header' } });
  let isPageActive = true;
  if (headerSettingStr) {
    try {
      const hs = JSON.parse(headerSettingStr.value);
      hs.menus?.forEach((link: any) => {
        link.dropdown?.forEach((sub: any) => {
          if (sub.href === "/out-patient" && sub.isActive === false) isPageActive = false;
        });
      });
    } catch(e){}
  }

  async function saveOutPatientData(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("outPatientJson") as string;
    
    try {
      const parsed = JSON.parse(rawJson);
      parsed.seoMetaTitle = formData.get("seoMetaTitle") || "";
      parsed.seoMetaDescription = formData.get("seoMetaDescription") || "";
      parsed.seoKeywords = formData.get("seoKeywords") || "";
      const finalJson = JSON.stringify(parsed);
      await prisma.siteSetting.upsert({
        where: { key: 'page_out_patient' },
        update: { value: finalJson },
        create: { key: 'page_out_patient', value: finalJson }
      });
      
      const hsStr = await prisma.siteSetting.findUnique({ where: { key: 'layout_header' } });
      if (hsStr) {
        let hs = JSON.parse(hsStr.value);
        if (hs.menus) {
          hs.menus.forEach((link: any) => {
             if (link.dropdown) {
                link.dropdown.forEach((sub: any) => {
                   if (sub.href === "/out-patient") {
                      sub.isActive = formData.get("isActive") === "on";
                   }
                });
             }
          });
          await prisma.siteSetting.update({
             where: { key: 'layout_header' },
             data: { value: JSON.stringify(hs) }
          });
        }
      }

      revalidatePath("/admin/patient-visitors/out-patient");
      revalidatePath("/out-patient");
      revalidatePath("/");
    } catch (e) {
      console.error("Invalid JSON provided for out patient guide");
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={saveOutPatientData} className="space-y-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Patient & Visitors: Out Patient Guide
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the information displayed on the Out Patient Guide page.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <label className="text-sm font-semibold text-slate-700">Show in Navigation Menu:</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="isActive" defaultChecked={isPageActive} className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <SubmitButton text="Save Changes" loadingText="Saving..." />
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <OutPatientClientForm initialData={outPatientData} />
    

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
              <input type="text" name="seoMetaTitle" defaultValue={outPatientData?.seoMetaTitle || ""} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
              <textarea name="seoMetaDescription" defaultValue={outPatientData?.seoMetaDescription || ""} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
              <textarea name="seoKeywords" defaultValue={outPatientData?.seoKeywords || ""} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
            </div>
          </div>
        </div>

</form>
    </div>
  );
}
