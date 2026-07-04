import { Save, HeartPulse , Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import AcademicsInfoClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminAcademicsInfoPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_info' } });

  let pageData: any = { 
    introText: "Deenanath Mangeshkar Hospital and Research Center (DMHRC) is a multi speciality hospital managed by a Public Charitable Trust. It is accredited by National Board of Examinations in Medical Sciences, New Delhi for Post Graduate Training Programme (DNB, DrNB and FNB) across twenty five specialities. Academic Centre is situated on 14th floor Super Speciality Building.",
    pgProgrammes: [
      { title: "DNB, DrNB AND FNB", desc: "Accredited by NBEMS", items: [] },
      { 
        title: "Fellowship Programme:", 
        desc: "", 
        items: [
          "NNF in Neonatology",
          "IAP in Neonatology",
          "IACTA – Cardiac Anaesthesia",
          "Indian Diploma in Critical Care Medicine (IDCCM)",
          "Indian Fellowship in Critical Care Medicine (IFCCM)"
        ] 
      },
      { title: "Laryngology Fellowship", desc: "RCS Senior Clinical Fellowship Scheme", items: [] },
      { title: "Vasant & Nirmala Oswal Centre", desc: "Post graduate training and education (RCS accredited)", items: [] }
    ],
    shortTermFellowships: [
      "Fellowship in Advanced Obstetric Ultrasonography",
      "Laryngology Speech Language Pathology",
      "Gynaecological Endoscopy fellowship course",
      "Fellowship in Endoscopy procedures",
      "Fellowship in MSK (Radiology)",
      "Infection Disease Fellowship",
      "Neuro Radiology Fellowship",
      "Fellowship in Abdominal Radiology Under ICRI",
      "Fellowship in Interventional Radiology Under ICRI",
      "Fellowship in Epilepsy",
      "Fellowship in Shoulder Arthroscopy",
      "Fellowship in Arthroplasty",
      "Fellowship in Surgical and Oncologic Pathology"
    ],
    teachingInstitutions: [
      { inst: "Maharshi Karve Stree Shikshan Sanstha", desc: "runs B.Sc. Nursing course." },
      { inst: "Symbiosis Institute of Health Sciences", desc: "for courses in Medical Technology" },
      { inst: "Deccan Education Society", desc: "for training in Physiotherapy" },
      { inst: "Modern College, Pune", desc: "for Internship to Pharm D Students" }
    ],
    dnbSpecialities: [
      { srNo: "1", speciality: "General Surgery", accreditedFrom: "2005" },
      { srNo: "2", speciality: "Anaesthesiology", accreditedFrom: "2006" },
      { srNo: "3", speciality: "Obstetrics & Gynaecology", accreditedFrom: "2006" },
      { srNo: "4", speciality: "General Medicine", accreditedFrom: "2006" },
      { srNo: "5", speciality: "Orthopaedics", accreditedFrom: "2006" },
      { srNo: "6", speciality: "Ophthalmology", accreditedFrom: "2006" },
      { srNo: "7", speciality: "Paediatrics", accreditedFrom: "2007" },
      { srNo: "8", speciality: "Radio Diagnosis", accreditedFrom: "2007" },
      { srNo: "9", speciality: "ENT", accreditedFrom: "2008" },
      { srNo: "10", speciality: "Emergency Medicine", accreditedFrom: "2015" },
      { srNo: "11", speciality: "Immunohematology and Blood Transfusion", accreditedFrom: "2024" }
    ],
    drnbSpecialities: [
      { srNo: "1", speciality: "Urology", accreditedFrom: "2006" },
      { srNo: "2", speciality: "Cardiology", accreditedFrom: "2006" },
      { srNo: "3", speciality: "Critical Care Medicine", accreditedFrom: "2008" },
      { srNo: "4", speciality: "Plastic Surgery", accreditedFrom: "2009" },
      { srNo: "5", speciality: "Gastroenterology", accreditedFrom: "2017" },
      { srNo: "6", speciality: "Neurology", accreditedFrom: "2017" },
      { srNo: "7", speciality: "Surgical Oncology", accreditedFrom: "2018" },
      { srNo: "8", speciality: "Medical Oncology", accreditedFrom: "2018" },
      { srNo: "9", speciality: "Nephrology", accreditedFrom: "2018" },
      { srNo: "10", speciality: "Neurosurgery", accreditedFrom: "2018" },
      { srNo: "11", speciality: "Clinical Hematology", accreditedFrom: "2021" }
    ],
    fnbSpecialities: [
      { srNo: "1", speciality: "Sports Medicine", accreditedFrom: "2017" },
      { srNo: "2", speciality: "Arthroplasty", accreditedFrom: "2019" },
      { srNo: "3", speciality: "Spine Surgery", accreditedFrom: "2019" }
    ],
    awards: [
      { department: "Urology", year: "2010", studentName: "Dr. Pankaj Joshi" },
      { department: "Obstetrics & Gynaecology", year: "2011", studentName: "Dr. Parvati Tharwani" },
      { department: "Orthopaedic", year: "2012", studentName: "Dr. Ankit Gujrathi" },
      { department: "Obstetrics & Gynaecology", year: "2012", studentName: "Dr. Madhavi Bahulikar" },
      { department: "Obstetrics & Gynaecology", year: "2013", studentName: "Dr. Priyanka Garg" },
      { department: "General Surgery", year: "2017", studentName: "Dr. Rahi Karmarkar" },
      { department: "Family Medicine", year: "2017", studentName: "Dr. Rama Joshirao" },
      { department: "Pathology", year: "2017", studentName: "Dr. Pallavi Saraf" },
      { department: "IAP NICU Fellowship", year: "2018", studentName: "Dr. Arpit Gupta" },
      { department: "IACTA Fellowship", year: "-", studentName: "Dr. Jyoti Gaidu – Stood first in India" }
    ],
    statistics: [
      { value: "761", label: "Admitted" },
      { value: "586", label: "Appeared" },
      { value: "553", label: "Passed" },
      { value: "94%", label: "Overall Result" },
      { value: "554", label: "Thesis Accepted" }
    ]
  };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  async function saveData(formData: FormData) {
    "use server";
    const rawJson = formData.get("pageJson") as string;
    try {
      const parsed = JSON.parse(rawJson);
      parsed.seoMetaTitle = formData.get("seoMetaTitle") || "";
      parsed.seoMetaDescription = formData.get("seoMetaDescription") || "";
      parsed.seoKeywords = formData.get("seoKeywords") || "";
      const finalJson = JSON.stringify(parsed);
      await prisma.siteSetting.upsert({
        where: { key: 'page_academics_info' },
        update: { value: finalJson },
        create: { key: 'page_academics_info', value: finalJson }
      });
      revalidatePath("/admin/academics/info");
      revalidatePath("/academics");
    } catch (e) {
      console.error("Invalid JSON");
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={saveData} className="space-y-8">
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Academics Info
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage academics information and courses.
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

      <AcademicsInfoClientForm initialData={pageData} />
    

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
              <input type="text" name="seoMetaTitle" defaultValue={pageData?.seoMetaTitle || ""} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
              <textarea name="seoMetaDescription" defaultValue={pageData?.seoMetaDescription || ""} rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
              <textarea name="seoKeywords" defaultValue={pageData?.seoKeywords || ""} rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
            </div>
          </div>
        </div>

</form>
    </div>
  );
}
