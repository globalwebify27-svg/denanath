import { prisma } from "@/lib/prisma";
import SimulationHomeClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminSimulationHomePage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_home' } });

  let pageData: any = { title: "Simulation Home", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <SimulationHomeClientForm initialData={pageData} />
    </div>
  );
}
