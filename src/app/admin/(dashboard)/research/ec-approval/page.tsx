import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import ECApprovalClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminECApprovalPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_ec_approval' } });
  
  let data: any = { title: "Official Approval Information", content: "", gallery: [], links: [] }; // Default
  try {
    if (setting) data = JSON.parse(setting.value);
  } catch(e) {}

  async function saveData(formData: FormData) {
    "use server";
    
    try {
      const parsed = {
        title: formData.get("title") || "Official Approval Information",
        content: formData.get("content") || "",
        seoMetaTitle: formData.get("seoMetaTitle") || "",
        seoMetaDescription: formData.get("seoMetaDescription") || "",
        seoKeywords: formData.get("seoKeywords") || "",
        gallery: JSON.parse((formData.get("gallery") as string) || "[]"),
        links: JSON.parse((formData.get("links") as string) || "[]")
      };
      
      const finalJson = JSON.stringify(parsed);
      
      await prisma.siteSetting.upsert({
        where: { key: 'page_ec_approval' },
        update: { value: finalJson },
        create: { key: 'page_ec_approval', value: finalJson }
      });
      
      revalidatePath("/admin/research/ec-approval");
      revalidatePath("/ec-approval");
    } catch (e) {
      console.error("Failed to save EC Approval data", e);
      throw e;
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-32">
      <ECApprovalClientForm initialData={data} saveAction={saveData} />
    </div>
  );
}
