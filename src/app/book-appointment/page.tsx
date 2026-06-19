import { prisma } from "@/lib/prisma";
import ClientPage from "./client-page";

export const dynamic = "force-dynamic";

export default async function BookAppointmentPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_hospital_book_appointment' } });
  let pageData: any = { title: "Book Appointment", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return <ClientPage pageData={pageData} />;
}
