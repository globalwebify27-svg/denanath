import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Patients Stories / Feedbacks</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage patient testimonials and feedback stories.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveFeedbacksData}>
          <FeedbacksClientForm initialData={feedbacksData} />
        </form>
      </div>
    </div>
  );
}
