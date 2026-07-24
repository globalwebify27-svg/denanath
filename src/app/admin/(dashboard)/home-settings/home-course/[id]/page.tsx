import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import CourseForm from "./CourseForm";

export const dynamic = "force-dynamic";

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

export default async function EditCoursePage({ params, searchParams }: { params: any, searchParams: any }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  let parsed: any = { leftCourses: defaultLeftCourses, rightCourses: defaultRightCourses };
  
  if (setting) {
    try {
      parsed = JSON.parse(setting.value);
      parsed.leftCourses = (parsed.leftCourses || []).map((c: any, i: number) => ({ ...c, id: c.id || `left-legacy-${i}` }));
      parsed.rightCourses = (parsed.rightCourses || []).map((c: any, i: number) => ({ ...c, id: c.id || `right-legacy-${i}` }));
    } catch(e) {}
  }

  const col = resolvedSearchParams.col === "right" ? "rightCourses" : "leftCourses";
  const course = parsed[col]?.find((c: any) => c.id === resolvedParams.id);
  
  if (!course) {
    return (
      <div className="p-8 max-w-5xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Course Not Found</h1>
        <p className="text-slate-600 mb-4">Could not find a course with ID: <strong>{resolvedParams.id}</strong> in column: <strong>{col}</strong></p>
        <div className="bg-slate-100 p-4 rounded text-left overflow-auto text-xs font-mono">
          <p>Available IDs in this column:</p>
          <ul>
            {parsed[col]?.map((c: any) => <li key={c.id}>{c.id} - {c.title}</li>)}
          </ul>
        </div>
        <a href="/admin/home-settings/home-course" className="mt-6 inline-block text-blue-500 underline">Go Back</a>
      </div>
    );
  }

  async function saveAction(formData: FormData) {
    "use server";
    
    try {
      const settingRecord = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
      let currentData: any = { leftCourses: defaultLeftCourses, rightCourses: defaultRightCourses };
      
      if (settingRecord) {
        try {
          currentData = JSON.parse(settingRecord.value);
          currentData.leftCourses = (currentData.leftCourses || []).map((c: any, i: number) => ({ ...c, id: c.id || `left-legacy-${i}` }));
          currentData.rightCourses = (currentData.rightCourses || []).map((c: any, i: number) => ({ ...c, id: c.id || `right-legacy-${i}` }));
        } catch(e) {}
      }
      
      const colStr = resolvedSearchParams.col === "right" ? "rightCourses" : "leftCourses";
      const index = currentData[colStr].findIndex((c: any) => c.id === resolvedParams.id);
      
      if (index === -1) return;
      
      currentData[colStr][index] = {
        ...currentData[colStr][index],
        title: formData.get("title"),
        content: formData.get("content"),
        startDate: formData.get("startDate"),
        endDate: formData.get("endDate"),
        link: formData.get("link"),
        linkText: formData.get("linkText"),
        gallery: JSON.parse(formData.get("gallery") as string || "[]")
      };
      
      await prisma.siteSetting.upsert({
        where: { key: 'home_courses' },
        create: { key: 'home_courses', value: JSON.stringify(currentData) },
        update: { value: JSON.stringify(currentData) }
      });
      
      revalidatePath("/");
      revalidatePath("/admin/home-settings/home-course");
      revalidatePath(`/admin/home-settings/home-course/${resolvedParams.id}`);
    } catch (e) {
      console.error(e);
      throw new Error("Failed to save");
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-32">
      <CourseForm initialData={course} saveAction={saveAction} col={searchParams.col} />
    </div>
  );
}
