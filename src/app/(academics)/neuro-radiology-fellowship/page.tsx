import type { Metadata } from "next";
import NeuroRadiologyFellowshipClientPage from "./client-page";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Neuro Radiology Fellowship | Academics",
  description: "Neuro Radiology Fellowship at Deenanath Mangeshkar Hospital",
};

export const dynamic = "force-dynamic";

export default async function NeuroRadiologyFellowshipPage() {
  let courseData = null;
  
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
    if (setting) {
      const parsed = JSON.parse(setting.value);
      const allCourses = [...(parsed.leftCourses || []), ...(parsed.rightCourses || [])];
      courseData = allCourses.find(c => c.link === "/neuro-radiology-fellowship");
    }
  } catch (e) {
    console.error("Failed to fetch dynamic course data:", e);
  }

  return <NeuroRadiologyFellowshipClientPage courseData={courseData} />;
}
