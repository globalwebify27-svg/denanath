import { prisma } from "@/lib/prisma";
import ClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminOnlinePaymentPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_online-facilities_online_payment' } });
  let pageData: any = { title: "Online Payment", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <ClientForm initialData={pageData} />
    </div>
  );
}
