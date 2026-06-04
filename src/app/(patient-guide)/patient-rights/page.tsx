import { prisma } from "@/lib/prisma";
import PatientRightsClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function PatientRightsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_patient_rights' } });

  let pageData: any = {};
  try { 
    if (setting) {
      pageData = JSON.parse(setting.value);
    } else {
      // Fallback data
      pageData = {
        imageUrl: "https://www.dmhospital.org/cms/Media/image/patients-rights-responsibility.jpg"
      };
    }
  } catch (e) {}

  return <PatientRightsClientPage pageData={pageData} />;
}
