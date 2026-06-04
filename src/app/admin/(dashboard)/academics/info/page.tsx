import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import AcademicsInfoClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminAcademicsInfoPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_academics_info' } });

  let pageData: any = { 
    introText: "Deenanath Mangeshkar Hospital & Research Center (DMHRC) is a multi speciality hospital managed by a Public Charitable Trust. It is accredited by National Board of Examinations in Medical Sciences, New Delhi for Post Graduate Training Programme (DNB, DrNB and FNB) across twenty five specialities. Academic Centre is situated on 14th floor Super Speciality Building.",
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
      JSON.parse(rawJson); // validate
      await prisma.siteSetting.upsert({
        where: { key: 'page_academics_info' },
        update: { value: rawJson },
        create: { key: 'page_academics_info', value: rawJson }
      });
      revalidatePath("/admin/academics/info");
      revalidatePath("/academics");
    } catch (e) {
      console.error("Invalid JSON");
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Academics Info</h1>
        <p className="text-[14px] font-[600] text-gray-500">Manage academics information and courses.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 p-8">
        <form action={saveData}>
          <AcademicsInfoClientForm initialData={pageData} />
        </form>
      </div>
    </div>
  );
}
