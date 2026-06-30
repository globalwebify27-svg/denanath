import { prisma } from "@/lib/prisma";
import DoctorForm from "./DoctorForm";
import { notFound } from "next/navigation";

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
      notFound();
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <DoctorForm doctor={doctor || {}} id={id} />
    </div>
  );
}
