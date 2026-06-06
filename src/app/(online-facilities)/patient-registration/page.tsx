import { prisma } from "@/lib/prisma";
import PatientRegistrationClient from "./client-page";

export const metadata = {
  title: "Patient Registration Form | Deenanath Mangeshkar Hospital",
  description: "Register online for hospital services.",
};

export default async function PatientRegistrationPage() {
  let initialData = null;
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "online-facilities-patient-registration" },
    });
    if (setting) {
      initialData = JSON.parse(setting.value);
    }
  } catch (error) {
    console.error("Database connection error on patient registration page:", error);
  }

  return <PatientRegistrationClient initialData={initialData} />;
}
