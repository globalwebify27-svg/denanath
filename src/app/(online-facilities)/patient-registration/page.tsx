import { prisma } from "@/lib/prisma";
import PatientRegistrationClient from "./client-page";

export const metadata = {
  title: "Patient Registration Form | Deenanath Mangeshkar Hospital",
  description: "Register online for hospital services.",
};

export default async function PatientRegistrationPage() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "online-facilities-patient-registration" },
  });

  const initialData = setting ? JSON.parse(setting.value) : null;

  return <PatientRegistrationClient initialData={initialData} />;
}
