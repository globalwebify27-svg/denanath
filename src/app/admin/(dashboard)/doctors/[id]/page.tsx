import { prisma } from "@/lib/prisma";
import DoctorForm from "./DoctorForm";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditDoctorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  let doctor = null;

  if (id !== "new") {
    doctor = await prisma.doctor.findUnique({
      where: { id },
    });

    if (!doctor) {
      redirect("/admin/doctors");
    }
  }

  let apiSpecialities: string[] = [];
  try {
    const { callDMHApi } = await import("@/lib/dmhApi");
    const specRes = await callDMHApi('speciality');
    
    const list = specRes?.specialityJSON || (Array.isArray(specRes) ? specRes : []);
    if (Array.isArray(list)) {
      apiSpecialities = list
        .map((s: any) => String(s.speciality_name || s.name || s.speciality || '').trim().toUpperCase())
        .filter(Boolean);
    }
  } catch (error) {
    console.error("Error fetching specialities from DMH API:", error);
  }

  if (apiSpecialities.length === 0) {
    const departments = await prisma.department.findMany({ select: { name: true } });
    apiSpecialities = departments.map((d: any) => d.name.toUpperCase());
  }

  apiSpecialities = Array.from(new Set(apiSpecialities)).sort((a, b) => a.localeCompare(b));

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <DoctorForm doctor={doctor || {}} id={id} departments={apiSpecialities} />
    </div>
  );
}
