import { Save, HeartPulse } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import CareersClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function CareersAdminPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_careers' } });

  let careersData: any = {};
  try { if (setting) careersData = JSON.parse(setting.value); } catch (e) {}

  async function saveCareers(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("careersJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_careers' },
        update: { value: rawJson },
        create: { key: 'page_careers', value: rawJson }
      });
      revalidatePath("/admin/careers");
      revalidatePath("/careers");
    } catch (e) {
      console.error("Invalid JSON provided for careers");
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={saveCareers} className="space-y-8">
        
        <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
          <div className="z-10 relative">
            <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
              Careers Management
            </h1>
            <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
              Manage open job requirements, update the department contact directory, and modify page content.
            </p>
          </div>
          <div className="z-10 shrink-0 mt-4 lg:mt-0">
            <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-7 py-3.5 rounded-xl hover:bg-[#006570] hover:shadow-[0_8px_20px_rgba(0,122,135,0.3)] font-bold transition-all duration-300 transform hover:-translate-y-0.5">
              <Save size={20} strokeWidth={2.5} /> Save Changes
            </button>
          </div>
          {/* subtle background decoration */}
          <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
             <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
          </div>
        </div>

        <CareersClientForm initialData={careersData} />
      </form>
    </div>
  );
}
