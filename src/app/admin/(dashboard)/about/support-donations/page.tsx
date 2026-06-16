import { Save, HeartPulse } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import SupportDonationsClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminSupportDonationsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_support_donations' } });

  let donationsData: any = {};
  try { if (setting) donationsData = JSON.parse(setting.value); } catch (e) {}
  if (Object.keys(donationsData).length === 0) {
    donationsData = {
        contactPhone: "+912040151000",
        contactDisplayPhone: "(+91) 20 4015 1000",
        introText: "Deenanath Mangeshkar Hospital and Research Center also relies on philanthropy to provide essential health care services in Pune. Gifts may be made to support efforts to help educate patients and families, provide necessary supplies and state-of-the-art equipment and enhancements for patient care needs for people of the community.",
        countOnUsPoints: [
          "100% dedicated to bringing you specialists who are highly trained at some of the best institutions in the country – Our focus remains solely on hiring and training the most highly skilled, talented professionals, expanding our education and screening programs and continuing to invest in the latest life-saving technology.",
          "100% committed to patient safety and long-term recovery – Deenanath Mangeshkar Hospital and Research Center is nationally recognized not only for their quality of care, but for their advanced and proactive approach toward integrated long-term care and support for patients."
        ],
        donateForms: [
          "Money (As Donation or Deposit)",
          "Real Estate ( Open space or a apartment – on rent / sale )"
        ],
        institutionalDonors: [],
        donationInKind: [],
        individualDonors50to1Cr: [],
        individualDonors25to50: [],
        individualDonors1to25: [],
        individualDonorsUpto1: []
      };
  }

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
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={saveDonations} className="space-y-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Support & Donations
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the lists of donors displayed on the Support Hospital page.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <SubmitButton text="Save Changes" loadingText="Saving..." />
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <SupportDonationsClientForm initialData={donationsData} />
    </form>
    </div>
  );
}
