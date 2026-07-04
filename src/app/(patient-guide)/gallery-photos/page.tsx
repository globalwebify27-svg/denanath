import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import GalleryPhotosClientPage from "./client-page";

export const dynamic = "force-dynamic";


export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_gallery_photos' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function GalleryPhotosPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_gallery_photos' } });

  let pageData: any = {};
  try { 
    if (setting) {
      pageData = JSON.parse(setting.value);
    } else {
      // Fallback data
      pageData = {
        categories: [
          "ALL", "DMH", "DMH MAIN BUILDING", "SUPER SPECIALITY BUILDING", "WORLD THYROID DAY 2024", "WORLD DIABETES DAY 2025"
        ],
        photos: [
          { title: "Deenanath Mangeshkar", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/dmangeshkar1.jpg" },
          { title: "Dr. APJ Abdul Kalam Visit", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/abdul-kalam.jpg" },
          { title: "Sachin Tendulkar Visit", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/tendulkar.jpg" },
          { title: "Obesity Clinic Inauguration", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/obesity-clinic-inauguration.jpg" },
          { title: "8th March Women's Day", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/8th%20march.JPG" },
          { title: "Advance Wound Care", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/adv%20wound%20care3.JPG" },
          { title: "Event Photo 1", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/DSC_0064.JPG" },
          { title: "Event Photo 2", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/feb.jpg" },
          { title: "Event Photo 3", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/oct.jpg" },
          { title: "Event Photo 4", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/4th%20april.jpg" },
          { title: "Event Photo 5", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/26th%20april.jpg" },
          { title: "Dr. Arundhati Khare", category: "DMH", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/Dr.Arundhati-Khare.jpg" },
          { title: "WTD 2024 Event Photo 1", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%20(4).jpg" },
          { title: "WTD 2024 Event Photo 2", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%20(5).jpg" },
          { title: "WTD 2024 Event Photo 3", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%20(6).jpg" },
          { title: "WTD 2024 Event Photo 4", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/1_WTD%20(8).jpg" },
          { title: "WTD 2024 Event Photo 5", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%2024%20(2).jpg" },
          { title: "WTD 2024 Event Photo 6", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%2024%20(3).jpg" },
          { title: "WTD 2024 Event Photo 7", category: "WORLD THYROID DAY 2024", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/WTD%2024.jpg" },
          { title: "WDD 2025 Event Photo 1", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0007%20(1).jpg" },
          { title: "WDD 2025 Event Photo 2", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0017.jpg" },
          { title: "WDD 2025 Event Photo 3", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0045.jpg" },
          { title: "WDD 2025 Event Photo 4", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0069%20(1).jpg" },
          { title: "WDD 2025 Event Photo 5", category: "WORLD DIABETES DAY 2025", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/IMG-20251130-WA0091.jpg" },
          { title: "GS_ Private B (Deluxe Room)", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Private%20B%20(Deluxe%20Room).JPG" },
          { title: "GS_Non AC Day Care", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Non%20AC%20Day%20Care.jpg" },
          { title: "GS_Private C (Non AC)", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Private%20C%20(Non%20AC).JPG" },
          { title: "GS_Private D (Small AC Room)", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Private%20D%20(Small%20AC%20Room).JPG" },
          { title: "GS_Semi Private Room", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_Semi%20Private%20Room.JPG" },
          { title: "GS_SUPER_DELUX_A", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS_SUPER_DELUX_A.JPG" },
          { title: "GS_SUPER_DELUX_B", category: "DMH MAIN BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/GS.SUPER_DELUX_B.JPG" },
          { title: "SS_Day Care", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS%20Day%20Care.jpg" },
          { title: "SS_Private A", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS%20Private%20A.JPG" },
          { title: "SS_Private B", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS_Private%20B.JPG" },
          { title: "SS_Semi Private A (Only For Gynaec)", category: "SUPER SPECIALITY BUILDING", url: "https://www.dmhospital.org/Images/PhotoGallery/medium/SS_Semi%20Private%20A%20(Only%20For%20Gynaec).JPG" }
        ]
      };
    }
  } catch (e) {}

  return <GalleryPhotosClientPage pageData={pageData} />;
}
