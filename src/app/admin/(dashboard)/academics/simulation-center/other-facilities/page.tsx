import { prisma } from "@/lib/prisma";
import OtherFacilitieson14thFloorClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminOtherFacilitieson14thFloorPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_other_facilities' } });

  let pageData: any = { title: "Other Facilities on 14th Floor", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <OtherFacilitieson14thFloorClientForm initialData={pageData} />
    </div>
  );
}
