import { prisma } from "@/lib/prisma";
import OnlinePaymentClient from "./client-page";

export const metadata = {
  title: "Online Payment | Deenanath Mangeshkar Hospital and Research Center",
  description: "Secure online payment facility for DMH patients.",
};

export default async function OnlinePaymentPage() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: "online-facilities-online-payment" },
  });

  const initialData = setting ? JSON.parse(setting.value) : null;

  return <OnlinePaymentClient initialData={initialData} />;
}
