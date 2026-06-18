import { prisma } from "@/lib/prisma";
import SimulationLab2ClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminSimulationLab2Page() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab2' } });

  let pageData: any = { title: "Simulation Lab 2", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <SimulationLab2ClientForm initialData={pageData} />
    </div>
  );
}
