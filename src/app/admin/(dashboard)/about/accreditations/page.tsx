import { Save, HeartPulse } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AccreditationsClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminAccreditationsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_accreditations' } });

  let accreditationsData: any[] = [];
  try { if (setting) accreditationsData = JSON.parse(setting.value); } catch (e) {}
  if (!accreditationsData || (Array.isArray(accreditationsData) ? accreditationsData.length === 0 : Object.keys(accreditationsData).length === 0)) {
    accreditationsData = [
    {
      id: 1,
      title: "National Accreditation Board for Hospitals and Healthcare Providers (NABH)",
      certNumber: "H-2019-0663",
      certType: "NABH",
      theme: "red",
      policy: "Deenanath Mangeshkar Hospital believes in highest professional competence with a human touch and will deliver excellent medical treatment to everyone. We will follow rational and ethical medical practices implicitly. We are committed to medico-social services.",
      linkText: "NABH accreditation certificate",
      link: "#"
    },
    {
      id: 2,
      title: "National Accreditation Board for Testing and Calibration Laboratories (NABL)",
      certNumber: "MC-2177",
      certType: "NABL",
      theme: "blue",
      policy: "The laboratory will strive to provide diagnostic services of best quality to its patients through a competent, motivated team of laboratory staff at a reasonable cost, for an accurate and timely diagnosis on an ethical basis and will be committed to achieve continual quality improvement.",
      linkText: "NABL accreditation certificate",
      link: "#"
    },
    {
      id: 3,
      title: "National Accreditation Board for Hospitals and Healthcare Providers (NABH)",
      certNumber: "EC-CT-2018-0012",
      certType: "NABH",
      theme: "red",
      policy: "We strive to promote scientifically sound and ethical health research in the best interest of patient care.",
      linkText: "NABH accreditation certificate",
      link: "#"
    }
  ];
  }

  async function saveAccreditations(formData: FormData) {
    "use server";
    
    const rawJson = formData.get("accreditationsJson") as string;
    
    try {
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_accreditations' },
        update: { value: rawJson },
        create: { key: 'page_accreditations', value: rawJson }
      });
      revalidatePath("/admin/about/accreditations");
      revalidatePath("/accreditations");
    } catch (e) {
      console.error("Invalid JSON provided for accreditations");
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={saveAccreditations} className="space-y-8">
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Accreditations
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the list of hospital accreditations and certificates.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 md:mt-0">
          <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-7 py-3.5 rounded-xl hover:bg-[#006570] hover:shadow-[0_8px_20px_rgba(0,122,135,0.3)] font-bold transition-all duration-300 transform hover:-translate-y-0.5">
            <Save size={20} strokeWidth={2.5} /> Save Changes
          </button>
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <AccreditationsClientForm initialData={accreditationsData} />
    </form>
    </div>
  );
}
