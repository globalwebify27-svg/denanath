import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import HomeCourseClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminHomeCoursePage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  const defaultLeftCourses = [
    { id: "left-1", title: "Practice Course for Practical Exam - Emergency Medicine", link: "", linkText: "View Details", content: "", gallery: [] },
    { id: "left-2", title: "Breastfeeding Masterclass 2nd August 2026", link: "", linkText: "View Details", content: "", gallery: [] },
    { id: "left-3", title: "AIHA from IH Lab to Clinical Practice 7th August 2026", link: "", linkText: "View Details", content: "", gallery: [] },
    { id: "left-4", title: "Joint Replacement : Core Skills In Knee Replacement Surgery 18th July 2026", link: "", linkText: "View Details", content: "", gallery: [] },
    { id: "left-5", title: "Orthopaedics : Clubfoot Course 26_July_2026", link: "", linkText: "View Details", content: "", gallery: [] },
    { id: "left-6", title: "Critical Edge - Comprehensive ICU Exam Preparatory Course_May 2026 to Oct 2026", link: "", linkText: "View Details", content: "", gallery: [] },
    { id: "left-7", title: "Neuro Radiology Fellowship", link: "/neuro-radiology-fellowship", linkText: "View Details", content: "", gallery: [] },
    { id: "left-8", title: "Oncology Imaging Fellowship", link: "", linkText: "View Details", content: "", gallery: [] },
    { id: "left-9", title: "Fellowship in Musculoskeletal Imaging", link: "", linkText: "View Details", content: "", gallery: [] }
  ];

  const defaultRightCourses = [
    { id: "right-1", title: "Senior Registrar Vacancy Pathology", link: "https://www.dmhospital.org/cms/Media/file/Senior_Registrar_Vacancy_Pathology.pdf", linkText: "View Form", content: "", gallery: [] },
    { id: "right-2", title: "Autism Coach Brochure", link: "https://www.dmhospital.org/cms/Media/file/Autism-Coach-Brochure-2025.pdf", linkText: "View Form", content: "", gallery: [] },
    { id: "right-3", title: "Befriending Parkinsons Program", link: "https://www.dmhospital.org/cms/Media/file/befriending-parkinsons.pdf", linkText: "View Form", content: "", gallery: [] },
    { id: "right-4", title: "Yoga Classes Schedule", link: "/yoga-centre", linkText: "View Form", content: "", gallery: [] },
    { id: "right-5", title: "Eye Donation form", link: "https://www.dmhospital.org/cms/Media/file/eye_donation_form.pdf", linkText: "View Form", content: "", gallery: [] },
    { id: "right-6", title: "Garbha-Swasthya Helpline", link: "", linkText: "View Form", content: "", gallery: [] },
    { id: "right-7", title: "Organ Donation & Transplantation", link: "", linkText: "View Form", content: "", gallery: [] }
  ];

  let data: any = { 
    leftCourses: defaultLeftCourses, 
    rightCourses: defaultRightCourses 
  }; 
  
  try {
    if (setting) {
      data = JSON.parse(setting.value);
      data.leftCourses = (data.leftCourses || []).map((c: any, i: number) => ({ ...c, id: c.id || `left-legacy-${i}` }));
      data.rightCourses = (data.rightCourses || []).map((c: any, i: number) => ({ ...c, id: c.id || `right-legacy-${i}` }));
    }
  } catch(e) {}

  async function saveData(formData: FormData) {
    "use server";
    
    try {
      const parsed = {
        leftCourses: JSON.parse(formData.get("leftCourses") as string || "[]"),
        rightCourses: JSON.parse(formData.get("rightCourses") as string || "[]"),
      };
      
      const finalJson = JSON.stringify(parsed);
      
      await prisma.siteSetting.upsert({
        where: { key: 'home_courses' },
        update: { value: finalJson },
        create: { key: 'home_courses', value: finalJson }
      });
      
      revalidatePath("/");
      revalidatePath("/admin/home-settings/home-course");
    } catch (e) {
      console.error("Failed to save Home Courses data", e);
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-32">
      <form id="home-course-form" action={saveData}>
        {/* Hidden inputs are inside the Client Form */}
      </form>
      <HomeCourseClientForm initialData={data} />
    </div>
  );
}
