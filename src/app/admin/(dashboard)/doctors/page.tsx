import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, Plus, Edit } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  const doctors = await prisma.doctor.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Doctors Directory</h1>
        <Link
          href="/admin/doctors/new"
          className="flex items-center gap-2 bg-[#007a87] text-white px-4 py-2 rounded-lg hover:bg-[#005c66] transition-colors"
        >
          <Plus size={20} />
          <span>Add New Doctor</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search doctors by name..."
            defaultValue={query}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007a87]"
          />
        </div>
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Name</th>
              <th className="p-4 font-semibold text-gray-600">Specialty</th>
              <th className="p-4 font-semibold text-gray-600">Qualifications</th>
              <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor: any) => (
              <tr key={doctor.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900">{doctor.name}</td>
                <td className="p-4 text-gray-600">{doctor.specialty || "-"}</td>
                <td className="p-4 text-gray-600">{doctor.qualifications || "-"}</td>
                <td className="p-4 text-right">
                  <Link
                    href={`/admin/doctors/${doctor.id}`}
                    className="inline-flex items-center gap-1 text-[#007a87] hover:text-[#005c66] font-medium"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  No doctors found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
