import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, Plus, Edit, HeartPulse } from "lucide-react";
import InlineSeoForm from "@/app/admin/(dashboard)/components/InlineSeoForm";

export const dynamic = "force-dynamic";

export default async function AdminDoctorsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const page = Math.max(1, parseInt(resolvedParams.page || "1", 10));
  const itemsPerPage = 20;

  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_doctors' } });
  let seoData: any = {};
  try { if (setting) seoData = JSON.parse(setting.value); } catch (e) {}

  const totalCount = await prisma.doctor.count({
    where: {
      name: {
        contains: query,
      },
    },
  });

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const doctors = await prisma.doctor.findMany({
    where: {
      name: {
        contains: query,
      },
    },
    orderBy: {
      name: "asc",
    },
    skip: (page - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Doctors Directory
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage hospital medical staff and physician profiles.
          </p>
        </div>
        <div className="z-10 shrink-0 mt-4 lg:mt-0">
          <Link
            href="/admin/doctors/new"
            className="flex items-center gap-2 bg-[#007a87] text-white px-7 py-3.5 rounded-xl hover:bg-[#006570] hover:shadow-[0_8px_20px_rgba(0,122,135,0.3)] font-bold transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Plus size={20} strokeWidth={2.5} /> Add New Doctor
          </Link>
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <InlineSeoForm settingKey="page_doctors" initialData={seoData} />

      {/* Modern Search & Filter Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form method="GET" action="" className="relative w-full md:max-w-lg flex items-center">
          <Search className="absolute left-4 text-gray-400" size={18} />
          <input
            type="text"
            name="q"
            placeholder="Search doctors by name or specialty..."
            defaultValue={query}
            className="w-full pl-11 pr-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-transparent focus:border-[#007a87]/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#007a87]/10 transition-all font-[500] text-gray-700 text-[14px]"
          />
        </form>
        <div className="px-4 text-[13px] font-[600] text-gray-400">
          Showing <span className="text-[#002b5c] font-[800]">{totalCount}</span> physicians
        </div>
      </div>

      {/* Premium Data Table */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[800px] md:min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <th className="p-5 font-[800] text-[12px] uppercase tracking-widest text-gray-400 w-[35%]">Physician Profile</th>
                <th className="p-5 font-[800] text-[12px] uppercase tracking-widest text-gray-400 w-[25%]">Specialty</th>
                <th className="p-5 font-[800] text-[12px] uppercase tracking-widest text-gray-400 w-[30%]">Qualifications</th>
                <th className="p-5 font-[800] text-[12px] uppercase tracking-widest text-gray-400 text-right w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/80">
              {doctors.map((doctor: any) => {
                // Generate initials for the avatar
                const initials = doctor.name.replace("Dr. ", "").substring(0, 2).toUpperCase();
                return (
                  <tr key={doctor.id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="p-5 break-words">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#002b5c]/10 to-[#007a87]/10 border border-[#007a87]/20 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <span className="text-[12px] font-[800] text-[#002b5c] tracking-wider">{initials}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-[800] text-[14px] text-gray-900 tracking-tight truncate">{doctor.name}</p>
                          <p className="text-[12px] font-[600] text-gray-400 mt-0.5">ID: {doctor.id.substring(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      {doctor.specialty ? (
                        <div className="flex flex-wrap gap-1">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-[#007a87]/10 border border-[#007a87]/20 text-[#007a87] text-[11px] font-[800] uppercase tracking-widest whitespace-normal break-words">
                            {doctor.specialty}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-[13px] font-[500] italic">-</span>
                      )}
                    </td>
                    <td className="p-5 break-words">
                      <p className="text-[13px] font-[600] text-gray-600 leading-relaxed whitespace-normal">
                        {doctor.qualifications || <span className="text-gray-300 italic">-</span>}
                      </p>
                    </td>
                    <td className="p-5 text-right">
                      <Link
                        href={`/admin/doctors/${doctor.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-600 hover:text-white hover:shadow-md transition-all duration-300 [&>svg]:hover:stroke-[3]"
                        title="Edit Doctor"
                      >
                        <Edit size={16} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {doctors.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 border border-gray-100">
                      <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-[16px] font-[800] text-gray-800 tracking-tight">No physicians found</p>
                    <p className="text-[13px] font-[500] text-gray-400 mt-1 max-w-sm mx-auto">
                      We couldn't find any doctors matching your search query. Try adjusting your filters or adding a new doctor.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 bg-gray-50/50">
            <span className="text-[13px] font-[600] text-gray-500 whitespace-nowrap shrink-0">
              Page <span className="text-gray-800 font-[800]">{page}</span> of <span className="text-gray-800 font-[800]">{totalPages}</span>
            </span>
            <div className="flex gap-2 shrink-0">
              <Link
                href={`/admin/doctors?q=${query}&page=${Math.max(1, page - 1)}`}
                className={`px-4 py-2 text-[12px] font-[700] rounded-lg border transition-all whitespace-nowrap ${page === 1 ? 'border-gray-200 text-gray-400 pointer-events-none bg-gray-50' : 'border-gray-300 text-[#002b5c] bg-white hover:border-[#007a87] hover:text-[#007a87] hover:shadow-sm'}`}
              >
                PREVIOUS
              </Link>
              <Link
                href={`/admin/doctors?q=${query}&page=${Math.min(totalPages, page + 1)}`}
                className={`px-4 py-2 text-[12px] font-[700] rounded-lg border transition-all whitespace-nowrap ${page === totalPages ? 'border-gray-200 text-gray-400 pointer-events-none bg-gray-50' : 'border-[#003360] text-white bg-[#003360] hover:bg-[#002347] hover:shadow-sm'}`}
              >
                NEXT
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
