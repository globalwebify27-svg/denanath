import { prisma } from "@/lib/prisma";
import EventsClientPage from "./client-page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
  if (setting) {
    try {
      const parsed = JSON.parse(setting.value);
      return {
        title: parsed.seoMetaTitle || "Events - DMH",
        description: parsed.seoMetaDescription || "",
        keywords: parsed.seoKeywords || "",
      }
    } catch(e){}
  }
  return { title: "Events - DMH" }
}

export default async function EventsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
  
  let data: any = {
    title: "Diabetes Nursing Conference 2026",
    date: "Saturday March 21, 2026",
    overview: [
      "The Diabetes Nursing Conference was a highly successful one-day event dedicated to advancing the knowledge, skills, and professional development of nurses specializing in diabetes care. This premier gathering brought together 400 healthcare professionals, researchers, and educators committed to improving diabetes management through innovative practices and evidence-based approaches.",
      "Attendees benefitted from expert-led sessions focused on enhancing patient safety, elevating the quality of care, and fostering ongoing professional growth. The event was meticulously overseen by an MNC observer, ensuring strict adherence to quality standards and accreditation requirements.",
      "Participants earned 10 MNC Credit Points, contributing toward their continuous professional development. This conference marked our 13th MNC-accredited Continuing Nursing Education (CNE) event. As nurses are mandated to renew their MNC registration every five years by accumulating 150 credit points, DMH Hospital proactively supports their efforts to meet this requirement through such educational initiatives."
    ],
    objectives: [
      "Provide updated knowledge on nursing care for diabetes management.",
      "Promote best practices to enhance patient safety and quality of care."
    ],
    summary: "This conference provided a vital platform for professional growth, emphasizing the importance of patient safety, ethical practices, and technological innovations in diabetes nursing. It fostered a collaborative environment for nurses to enhance their skills and knowledge, ultimately aiming to improve patient outcomes through dedicated learning and practice.",
    organizers: [
      { name: "Mrs. Revati Mangaonkar", role: "Director Nursing (Chairperson)" },
      { name: "Mrs. Komal Parab", role: "Assistant Director Nursing (Organize Secretary)" }
    ],
    gallery: [
      "Diabetes-Nursing-Conference1.jpg",
      "Diabetes-Nursing-Conference2.jpg"
    ],
    agenda: [
      { topic: "Managing Diabetic Emergencies", speaker: "Ms. Shubhangi Khandve", role: "Head Nurse – Intensive Care Unit, DMH, Pune." },
      { topic: "All About Insulin – Insulin Therapy Management, Safe Administration, and Patient Education", speaker: "Ms. Priti Dhage", role: "Associate Nursing Superintendent – Medical & Surgical, DMH, Pune" },
      { topic: "Lifestyle Modification – Nurse’s Role in Diabetes Care", speaker: "Dr. Aditya Deshpande", role: "Hononary Consultant Endocrinology, DMH, Pune." },
      { topic: "Wound Care Management for Diabetic Foot Ulcers", speaker: "Ms. Sayali Rawade", role: "Therapy Specialist, B Barun Medical India Pvt, Ltd., Pune" },
      { topic: "Patient Education – Diet and Glucose Monitoring", speaker: "Ms. Swati Chile", role: "Clinical Instructor – Ward, DMH, Pune" }
    ]
  };

  try {
    if (setting) data = JSON.parse(setting.value);
  } catch (e) {}

  return <EventsClientPage data={data} />;
}
