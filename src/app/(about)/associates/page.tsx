import { prisma } from "@/lib/prisma";
import AssociatesClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function AssociatesPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_associates' } });

  let associatesData: any[] = [];
  try { 
    if (setting) {
      associatesData = JSON.parse(setting.value);
    } else {
      // Fallback data if not seeded yet
      associatesData = [
        {
          id: 1,
          name: "Kamla Mehta Eye Hospital",
          description: "Kamla Mehta eye hospital was started in 1996 in Shirwal, district Satara which free cataract (IOL) surgery. This is in association with World Bank.",
          image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
          link: "#"
        },
        {
          id: 2,
          name: "Mai Mangeshkar Hospital",
          description: "Mai Mangeshkar Hospital is a 60 bedded hospital situated at Warje, Pune. It is run by joint venture of JPMT (Jnana prabodhini medical trust) and LMMF (Lata Mangeshkar Medical Foundation).",
          image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=800&auto=format&fit=crop",
          link: "#"
        }
      ];
    }
  } catch (e) {}

  return <AssociatesClientPage associates={associatesData} />;
}
