import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import NbemsCoursesClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminNbemsCoursesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_nbems' } });

  let pageData: any = { 
    introText: "The courses mentioned here are for NBEMS (National Board of Examinations in Medical Sciences) students who are currently pursuing or completed DNB, MD and fellowship program. Please click on the individual course for more details. If you are keen to register for any of the course, then please go the payment tab on the main page.",
    noteText: "* Please note that payment gateway charges will be applicable. The charges may vary from 0.50% to 2% of the transaction amount depending on your mode of payment. No charges on UPI transaction.",
    announcedPrograms: []
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  async function saveData(formData: FormData) {
    "use server";
    const rawJson = formData.get("pageJson") as string;
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_academics_nbems' },
        update: { value: rawJson },
        create: { key: 'page_academics_nbems', value: rawJson }
      });
      revalidatePath("/admin/academics/nbems-courses");
      revalidatePath("/nbems-courses");
    } catch (e) {
      console.error("Invalid JSON");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">NBEMS Courses</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage NBEMS courses and announced programs.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveData}>
          <NbemsCoursesClientForm initialData={pageData} />
        </form>
      </div>
    </div>
  );
}
