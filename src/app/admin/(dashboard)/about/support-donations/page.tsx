import { Save, HeartPulse , Search } from "lucide-react";
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
      const parsed = JSON.parse(rawJson);
      parsed.seoMetaTitle = formData.get("seoMetaTitle") || "";
      parsed.seoMetaDescription = formData.get("seoMetaDescription") || "";
      parsed.seoKeywords = formData.get("seoKeywords") || "";
      const finalJson = JSON.stringify(parsed);
      await prisma.siteSetting.upsert({
        where: { key: 'page_support_donations' },
        update: { value: finalJson },
        create: { key: 'page_support_donations', value: finalJson }
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
    

        {/* Card: SEO Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
            <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
              <Search size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">SEO Settings</h2>
              <p className="text-[13px] text-slate-500 font-medium">Manage search engine optimization meta tags.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Title</label>
              <input type="text" name="seoMetaTitle" defaultValue={donationsData?.seoMetaTitle || ""} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
              <textarea name="seoMetaDescription" defaultValue={donationsData?.seoMetaDescription || ""} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
              <textarea name="seoKeywords" defaultValue={donationsData?.seoKeywords || ""} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
            </div>
          </div>
        </div>

</form>
    </div>
  );
}
