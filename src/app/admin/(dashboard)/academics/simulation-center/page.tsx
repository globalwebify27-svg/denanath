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

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <SimulationCenterClientForm initialData={pageData} />
    </div>
  );
}
