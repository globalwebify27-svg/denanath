"use server";

import { prisma } from "@/lib/prisma";

export async function getHomeCourses() {
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

  let leftCourses = defaultLeftCourses;
  let rightCourses = defaultRightCourses;

  if (setting) {
    try {
      const parsed = JSON.parse(setting.value);
      
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      
      const isValidCourse = (c: any) => {
        if (!c.endDate) return true;
        const endDate = new Date(c.endDate);
        if (isNaN(endDate.getTime())) return true;
        return endDate >= now;
      };

      if (parsed.leftCourses) {
        leftCourses = parsed.leftCourses
          .filter(isValidCourse)
          .map((c: any, i: number) => ({ ...c, id: c.id || `left-legacy-${i}` }));
      }
      if (parsed.rightCourses) {
        rightCourses = parsed.rightCourses
          .filter(isValidCourse)
          .map((c: any, i: number) => ({ ...c, id: c.id || `right-legacy-${i}` }));
      }
    } catch (e) {
      console.error("Failed to parse home courses data", e);
    }
  }

  return { leftCourses, rightCourses };
}
