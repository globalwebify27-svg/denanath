import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function DepartmentDetailsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_doctors_department_details' } });
  let pageData: any = { title: "Department Details", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
