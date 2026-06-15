import { Save, HeartPulse } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import SimulationCenterClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminSimulationCenterPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_simulation_center' } });

  let pageData: any = { 
    introText1: "Medical simulation is the modern day methodology for training healthcare professionals through the use of advanced educational technology with a goal of improving the safety, effectiveness and efficiency of healthcare services.",
    introText2: "Simulation is the future for training of medical graduates & post graduates including nurses and paramedics as it serves as a bridge between classroom learning and real-life clinical experience. Dr. Indumati Amodkar simulation center which is based at 14th floor - super speciality building of Deenanath hospital, has been developed with an aim to create a pool of skilled and efficient healthcare providers."
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  async function saveData(formData: FormData) {
    "use server";
    const rawJson = formData.get("pageJson") as string;
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_academics_simulation_center' },
        update: { value: rawJson },
        create: { key: 'page_academics_simulation_center', value: rawJson }
      });
      revalidatePath("/admin/academics/simulation-center");
      revalidatePath("/simulation-center");
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
            Simulation Center
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage simulation center overview content.
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

      <SimulationCenterClientForm initialData={pageData} />
    </form>
    </div>
  );
}
