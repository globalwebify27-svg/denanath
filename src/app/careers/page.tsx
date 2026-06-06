import { prisma } from "@/lib/prisma";
import CareersClient from "./CareersClient";

export const dynamic = "force-dynamic";

const fallbackContacts = [
  { iconType: "building", title: "Admin Staff", phone: "020-40151615 / 1616 / 1660" },
  { iconType: "stethoscope1", title: "Paramedical (Technician)", phone: "020-40151660 / 1664" },
  { iconType: "stethoscope2", title: "Doctors / Physiotherapist", phone: "020-40151616" },
  { iconType: "briefcase", title: "MPW", phone: "020-40151677" },
  { iconType: "heart", title: "Nursing Staff", phone: "020-40151645 / 1698" },
  { iconType: "pill", title: "Pharmacy", phone: "020-40151699" }
];

export default async function CareersPage() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_careers' }
  });

  let data: any = {};
  if (setting) {
    try {
      data = JSON.parse(setting.value);
    } catch (e) {
      console.error("Failed to parse page_careers JSON", e);
    }
  }

  // Supply fallback contacts if not present
  if (!data.contacts || data.contacts.length === 0) {
    data.contacts = fallbackContacts;
  }

  return <CareersClient data={data} />;
}
