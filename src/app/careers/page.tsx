import { prisma } from "@/lib/prisma";
import CareersClient from "./CareersClient";
import { jobsList, fallbackContacts } from "./careersData";

export const dynamic = "force-dynamic";

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

  // Supply fallback jobs if not present or empty
  if (!data.jobs || data.jobs.length === 0) {
    data.jobs = jobsList;
  }

  // Supply fallback contacts if not present or empty
  if (!data.contacts || data.contacts.length === 0) {
    data.contacts = fallbackContacts;
  }

  return <CareersClient data={data} />;
}
