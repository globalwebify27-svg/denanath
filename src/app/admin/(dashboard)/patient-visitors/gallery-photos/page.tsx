import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import GalleryPhotosClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPhotosPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_gallery_photos' } });

  let galleryPhotosData: any = {};
  try { if (setting) galleryPhotosData = JSON.parse(setting.value); } catch (e) {}

  async function saveGalleryPhotosData(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("galleryPhotosJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_gallery_photos' },
        update: { value: rawJson },
        create: { key: 'page_gallery_photos', value: rawJson }
      });
      revalidatePath("/admin/patient-visitors/gallery-photos");
      revalidatePath("/gallery-photos");
    } catch (e) {
      console.error("Invalid JSON provided for gallery photos");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Photo Gallery</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage categories and upload images for the hospital photo gallery.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveGalleryPhotosData}>
          <GalleryPhotosClientForm initialData={galleryPhotosData} />
        </form>
      </div>
    </div>
  );
}
