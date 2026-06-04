import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import UniqueFeaturesClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminUniqueFeaturesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_unique_features' } });

  let featuresData: any[] = [];
  try { if (setting) featuresData = JSON.parse(setting.value); } catch (e) {}

  async function saveFeatures(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("featuresJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_unique_features' },
        update: { value: rawJson },
        create: { key: 'page_unique_features', value: rawJson }
      });
      revalidatePath("/admin/about/unique-features");
      revalidatePath("/unique-features");
    } catch (e) {
      console.error("Invalid JSON provided for unique features");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Unique Features</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the hospital's unique features displayed on the About Us section.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveFeatures}>
          <UniqueFeaturesClientForm initialData={featuresData} />
        </form>
      </div>
    </div>
  );
}
