import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SupportDonationsClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminSupportDonationsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_support_donations' } });

  let donationsData: any = {};
  try { if (setting) donationsData = JSON.parse(setting.value); } catch (e) {}

  async function saveDonations(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("donationsJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_support_donations' },
        update: { value: rawJson },
        create: { key: 'page_support_donations', value: rawJson }
      });
      revalidatePath("/admin/about/support-donations");
      revalidatePath("/supportHospitalDonations");
    } catch (e) {
      console.error("Invalid JSON provided for donations");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Support & Donations</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage the lists of donors displayed on the Support Hospital page.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveDonations}>
          <SupportDonationsClientForm initialData={donationsData} />
        </form>
      </div>
    </div>
  );
}
