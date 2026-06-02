import { prisma } from "@/lib/prisma";
import DoctorForm from "./DoctorForm";
import { notFound } from "next/navigation";

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
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {id === "new" ? "Add New Doctor" : "Edit Doctor Profile"}
      </h1>
      <DoctorForm doctor={doctor || {}} />
    </div>
  );
}
