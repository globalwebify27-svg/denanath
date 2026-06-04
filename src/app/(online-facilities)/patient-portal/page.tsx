import { prisma } from "@/lib/prisma";
import PatientPortalClient from "./client-page";

export const metadata = {
  title: "Patient Portal | Deenanath Mangeshkar Hospital",
  description: "Access your medical records and appointments securely.",
};

export default async function PatientPortalPage() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "online-facilities-patient-portal" },
  });

  const initialData = setting ? JSON.parse(setting.value) : null;

  return <PatientPortalClient initialData={initialData} />;
}
