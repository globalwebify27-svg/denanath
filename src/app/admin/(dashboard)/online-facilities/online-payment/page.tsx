import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import OnlinePaymentClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminOnlinePaymentPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'online-facilities-online-payment' } });

  let pageData: any = { 
    pageTitle: "Online Payment",
    securityText: "256-bit Secure Encrypted Payment"
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  async function saveData(formData: FormData) {
    "use server";
    const rawJson = formData.get("pageJson") as string;
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'online-facilities-online-payment' },
        update: { value: rawJson },
        create: { key: 'online-facilities-online-payment', value: rawJson }
      });
      revalidatePath("/admin/online-facilities/online-payment");
      revalidatePath("/online-payment");
    } catch (e) {
      console.error("Invalid JSON");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Online Payment</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage Online Payment page content.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveData}>
          <OnlinePaymentClientForm initialData={pageData} />
        </form>
      </div>
    </div>
  );
}
