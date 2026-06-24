import { prisma } from "@/lib/prisma";
import OtherFacilitieson14thFloorClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminOtherFacilitieson14thFloorPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_other_facilities' } });

  let pageData: any = { title: "Other Facilities on 14th Floor", content: "", image: "", gallery: [] };
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
      <OtherFacilitieson14thFloorClientForm initialData={pageData} />
    </div>
  );
}
