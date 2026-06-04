import { prisma } from "@/lib/prisma";
import EMailLoginDMHUsersClient from "./client-page";

export const metadata = {
  title: "E-Mail Login (DMH Users) | Deenanath Mangeshkar Hospital",
  description: "Access the updated DMH staff email portal securely.",
};

export default async function EMailLoginDMHUsersPage() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "online-facilities-email-login" },
  });

  const initialData = setting ? JSON.parse(setting.value) : null;

  return <EMailLoginDMHUsersClient initialData={initialData} />;
}
