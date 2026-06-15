import { Save, HeartPulse } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import TrainingProgramsClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminTrainingProgramsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_training_programs' } });

  let pageData: any = { 
    programs: [
      "Arterial Blood Gas Analysis",
      "Basic Clinical Skill Certification Program - level 1",
      "Basic & Advanced ECG",
      "Basic Airway Management",
      "Advanced Airway Management",
      "Jeevan Rekha COLS, AED & First aid",
      "Healthcare Communication",
      "Essentials Basic life support & Essentials of Advanced Cardiac Life Support"
    ]
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  async function saveData(formData: FormData) {
    "use server";
    const rawJson = formData.get("pageJson") as string;
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_academics_training_programs' },
        update: { value: rawJson },
        create: { key: 'page_academics_training_programs', value: rawJson }
      });
      revalidatePath("/admin/academics/training-programs");
      revalidatePath("/training-programs");
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
            Training Programs
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage training programs list.
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

      <TrainingProgramsClientForm initialData={pageData} />
    </form>
    </div>
  );
}
