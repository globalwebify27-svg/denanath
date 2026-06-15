import { Save, HeartPulse } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import FeedbacksClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminFeedbacksPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_feedbacks' } });

  let feedbacksData: any = {};
  try { if (setting) feedbacksData = JSON.parse(setting.value); } catch (e) {}

  async function saveFeedbacksData(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("feedbacksJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_feedbacks' },
        update: { value: rawJson },
        create: { key: 'page_feedbacks', value: rawJson }
      });
      revalidatePath("/admin/patient-visitors/feedbacks");
      revalidatePath("/feedbacks");
    } catch (e) {
      console.error("Invalid JSON provided for feedbacks");
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={saveFeedbacksData} className="space-y-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Patients Stories / Feedbacks
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage patient testimonials and feedback stories.
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

      <FeedbacksClientForm initialData={feedbacksData} />
    </form>
    </div>
  );
}
