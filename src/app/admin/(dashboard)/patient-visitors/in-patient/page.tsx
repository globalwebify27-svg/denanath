import { prisma } from "@/lib/prisma";
import InPatientClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminInPatientPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_in_patient' } });

  let inPatientData: any = {};
  try { if (setting) inPatientData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <InPatientClientForm initialData={inPatientData} />
    </div>
  );
}
