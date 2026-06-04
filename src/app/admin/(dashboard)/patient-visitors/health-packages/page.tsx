import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import HealthPackagesClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminHealthPackagesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_health_packages' } });

  let healthPackagesData: any = {};
  try { if (setting) healthPackagesData = JSON.parse(setting.value); } catch (e) {}

  async function saveHealthPackagesData(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("healthPackagesJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_health_packages' },
        update: { value: rawJson },
        create: { key: 'page_health_packages', value: rawJson }
      });
      revalidatePath("/admin/patient-visitors/health-packages");
      revalidatePath("/health-packages");
    } catch (e) {
      console.error("Invalid JSON provided for health packages");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Health Packages</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the hospital's preventive health packages, pricing, and inclusions.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveHealthPackagesData}>
          <HealthPackagesClientForm initialData={healthPackagesData} />
        </form>
      </div>
    </div>
  );
}
