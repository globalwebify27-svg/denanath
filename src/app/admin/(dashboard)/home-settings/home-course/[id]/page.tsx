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

export default async function EditCoursePage(props: { params: Promise<any>, searchParams: Promise<any> }) {
  const resolvedParams = await props.params;
  const resolvedSearchParams = await props.searchParams;
  
  const rawId = resolvedParams?.id;
  const courseId = rawId ? decodeURIComponent(rawId) : "";
  const colParam = resolvedSearchParams?.col;
  const isNew = courseId === "new";
  
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  let parsed: any = { leftCourses: defaultLeftCourses, rightCourses: defaultRightCourses };
  
  if (setting) {
    try {
      parsed = JSON.parse(setting.value);
      parsed.leftCourses = (parsed.leftCourses || []).map((c: any, i: number) => ({ ...c, id: c.id || `left-legacy-${i}` }));
      parsed.rightCourses = (parsed.rightCourses || []).map((c: any, i: number) => ({ ...c, id: c.id || `right-legacy-${i}` }));
    } catch(e) {}
  }

  let targetCol = (colParam === "right" || courseId.startsWith("right")) ? "rightCourses" : "leftCourses";
  let course: any = null;

  if (isNew) {
    course = {
      id: "new",
      title: "",
      link: "",
      linkText: colParam === "right" ? "View Form" : "View Details",
      content: "",
      startDate: "",
      endDate: "",
      gallery: [],
      status: true,
      seoMetaTitle: "",
      seoMetaDescription: "",
      seoKeywords: "",
    };
  } else {
    // 1. Check in target column
    course = parsed[targetCol]?.find((c: any) => c.id === courseId);

    // 2. If not found in target column, check the other column
    if (!course) {
      const otherCol = targetCol === "rightCourses" ? "leftCourses" : "rightCourses";
      const otherMatch = parsed[otherCol]?.find((c: any) => c.id === courseId);
      if (otherMatch) {
        course = otherMatch;
        targetCol = otherCol;
      }
    }

    // 3. Fallback: match by title slug, legacy index, or case-insensitive ID
    if (!course) {
      const allCourses = [
        ...(parsed.leftCourses || []).map((c: any, i: number) => ({ ...c, _col: "leftCourses", _idx: i })),
        ...(parsed.rightCourses || []).map((c: any, i: number) => ({ ...c, _col: "rightCourses", _idx: i }))
      ];
      
      const targetSlug = courseId.toLowerCase();
      const match = allCourses.find((c: any) => {
        if (!c) return false;
        const titleSlug = (c.title || "").toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return (
          c.id?.toLowerCase() === targetSlug || 
          titleSlug === targetSlug ||
          `left-legacy-${c._idx}` === targetSlug ||
          `right-legacy-${c._idx}` === targetSlug ||
          `left-${c._idx + 1}` === targetSlug ||
          `right-${c._idx + 1}` === targetSlug
        );
      });

      if (match) {
        course = match;
        targetCol = match._col;
      }
    }
  }
  
  if (!course) {
    return (
      <div className="p-8 max-w-5xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Course Not Found</h1>
        <p className="text-slate-600 mb-4">Could not find a course with ID: <strong>{courseId}</strong></p>
        <div className="bg-slate-100 p-4 rounded text-left overflow-auto text-xs font-mono max-w-lg mx-auto">
          <p className="font-bold mb-2">Available IDs:</p>
          <p className="font-semibold text-slate-700">Courses (Left):</p>
          <ul className="mb-2">
            {parsed.leftCourses?.map((c: any) => <li key={c.id}>{c.id} - {c.title}</li>)}
          </ul>
          <p className="font-semibold text-slate-700">Programs (Right):</p>
          <ul>
            {parsed.rightCourses?.map((c: any) => <li key={c.id}>{c.id} - {c.title}</li>)}
          </ul>
        </div>
        <a href="/admin/home-settings/home-course" className="mt-6 inline-block text-blue-500 underline font-bold">Go Back</a>
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
      
      const colStr = targetCol;
      
      if (isNew) {
        const newId = `${colStr === "rightCourses" ? "right" : "left"}-${Date.now()}`;
        const newCourse = {
          id: newId,
          title: (formData.get("title") as string) || "Untitled",
          content: (formData.get("content") as string) || "",
          startDate: (formData.get("startDate") as string) || "",
          endDate: (formData.get("endDate") as string) || "",
          link: (formData.get("link") as string) || "",
          linkText: (formData.get("linkText") as string) || (colStr === "rightCourses" ? "View Form" : "View Details"),
          status: formData.get("status") === "true",
          gallery: JSON.parse((formData.get("gallery") as string) || "[]"),
          seoMetaTitle: (formData.get("seoMetaTitle") as string) || "",
          seoMetaDescription: (formData.get("seoMetaDescription") as string) || "",
          seoKeywords: (formData.get("seoKeywords") as string) || ""
        };
        currentData[colStr] = [...currentData[colStr], newCourse];
      } else {
        let index = currentData[colStr].findIndex((c: any) => c.id === course.id || c.id === courseId);
        let saveCol = colStr;
        
        if (index === -1) {
          const otherCol = colStr === "rightCourses" ? "leftCourses" : "rightCourses";
          index = currentData[otherCol].findIndex((c: any) => c.id === course.id || c.id === courseId);
          if (index !== -1) {
            saveCol = otherCol;
          }
        }
        
        if (index !== -1) {
          currentData[saveCol][index] = {
            ...currentData[saveCol][index],
            title: formData.get("title"),
            content: formData.get("content"),
            startDate: formData.get("startDate"),
            endDate: formData.get("endDate"),
            link: formData.get("link"),
            linkText: formData.get("linkText"),
            status: formData.get("status") === "true",
            gallery: JSON.parse(formData.get("gallery") as string || "[]"),
            seoMetaTitle: (formData.get("seoMetaTitle") as string) || "",
            seoMetaDescription: (formData.get("seoMetaDescription") as string) || "",
            seoKeywords: (formData.get("seoKeywords") as string) || ""
          };
        }
      }
      
      await prisma.siteSetting.upsert({
        where: { key: 'home_courses' },
        create: { key: 'home_courses', value: JSON.stringify(currentData) },
        update: { value: JSON.stringify(currentData) }
      });
      
      revalidatePath("/");
      revalidatePath("/admin/home-settings/home-course");
      revalidatePath("/courses");
      if (!isNew && course?.id) {
        revalidatePath(`/admin/home-settings/home-course/${course.id}`);
        revalidatePath(`/courses/${course.id}`);
      }
    } catch (e) {
      console.error(e);
      throw new Error("Failed to save");
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-32">
      <CourseForm 
        key={`${course?.id || courseId}-${targetCol}`}
        initialData={course} 
        saveAction={saveAction} 
        col={targetCol === "rightCourses" ? "right" : "left"} 
        isNew={isNew} 
      />
    </div>
  );
}
