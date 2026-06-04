import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import GalleryVideosClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminGalleryVideosPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_gallery_videos' } });

  let galleryVideosData: any = {};
  try { if (setting) galleryVideosData = JSON.parse(setting.value); } catch (e) {}

  async function saveGalleryVideosData(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("galleryVideosJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_gallery_videos' },
        update: { value: rawJson },
        create: { key: 'page_gallery_videos', value: rawJson }
      });
      revalidatePath("/admin/patient-visitors/gallery-videos");
      revalidatePath("/gallery-videos");
    } catch (e) {
      console.error("Invalid JSON provided for gallery videos");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Video Gallery</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage categories and links for the hospital video gallery.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveGalleryVideosData}>
          <GalleryVideosClientForm initialData={galleryVideosData} />
        </form>
      </div>
    </div>
  );
}
