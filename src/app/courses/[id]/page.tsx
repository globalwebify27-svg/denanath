import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  if (!setting) {
    notFound();
  }

  const parsed = JSON.parse(setting.value);
  
  const allCourses = [
    ...(parsed.leftCourses || []),
    ...(parsed.rightCourses || [])
  ];

  const targetSlug = resolvedParams.id.toLowerCase();

  const course = allCourses.find((c: any) => {
    if (!c) return false;
    const titleSlug = (c.title || "").toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    return c.id?.toLowerCase() === targetSlug || titleSlug === targetSlug;
  });

  if (!course) {
    notFound();
  }

  return <ClientPage data={course} />;
}
