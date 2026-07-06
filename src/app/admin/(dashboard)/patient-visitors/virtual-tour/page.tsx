import { prisma } from "@/lib/prisma";
import VirtualTourClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminVirtualTourPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_virtual_tour' } });

  let virtualTourData: any = {};
  try { if (setting) virtualTourData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <VirtualTourClientForm initialData={virtualTourData} />
    </div>
  );
}
