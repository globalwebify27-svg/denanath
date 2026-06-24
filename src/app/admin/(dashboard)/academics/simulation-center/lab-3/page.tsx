import { prisma } from "@/lib/prisma";
import SimulationLab3ClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminSimulationLab3Page() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab3' } });

  let pageData: any = { title: "Simulation Lab 3", content: "", image: "", gallery: [] };
  try { 
    if (setting) {
      const parsed = JSON.parse(setting.value);
      pageData = { ...pageData, ...parsed };
      if (typeof pageData.gallery === 'string') {
        pageData.gallery = pageData.gallery ? [{ url: pageData.gallery, name: "" }] : [];
      } else if (!Array.isArray(pageData.gallery)) {
        pageData.gallery = pageData.image ? [{ url: pageData.image, name: "" }] : [];
      } else {
        pageData.gallery = pageData.gallery.map((item: any) => typeof item === 'string' ? { url: item, name: "" } : item);
      }
    }
  } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <SimulationLab3ClientForm initialData={pageData} />
    </div>
  );
}
