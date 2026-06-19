import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function DoctorDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ department?: string }>;
}) {
  const resolvedParams = await searchParams;
  const deptFilter = resolvedParams.department;

  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_doctors_doctor_details' } });
  let pageData: any = { title: "Doctor Details", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  const whereClause = deptFilter ? { specialty: { contains: deptFilter } } : {};

  const doctors = await prisma.doctor.findMany({
    where: whereClause,
    orderBy: { name: 'asc' }
  });

  return <ClientPage pageData={pageData} doctors={doctors} />;
}
