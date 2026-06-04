import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Simulation Center</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage simulation center overview content.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveData}>
          <SimulationCenterClientForm initialData={pageData} />
        </form>
      </div>
    </div>
  );
}
