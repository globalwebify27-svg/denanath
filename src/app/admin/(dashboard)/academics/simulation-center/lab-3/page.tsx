import { prisma } from "@/lib/prisma";
import SimulationLab3ClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminSimulationLab3Page() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab3' } });

  let pageData: any = { title: "Simulation Lab 3", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <SimulationLab3ClientForm initialData={pageData} />
    </div>
  );
}
