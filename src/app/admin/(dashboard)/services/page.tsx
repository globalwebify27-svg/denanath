import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Search, Plus, Edit } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const page = Math.max(1, parseInt(resolvedParams.page || "1", 10));
  const itemsPerPage = 10;

  const totalCount = await prisma.service.count({
    where: {
      title: {
        contains: query,
      },
    },
  });

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const services = await prisma.service.findMany({
    where: {
      title: {
        contains: query,
      },
    },
    orderBy: {
      title: "asc",
    },
    skip: (page - 1) * itemsPerPage,
    take: itemsPerPage,
  });

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Services Management</h1>
          <p className="text-[14px] font-[600] text-gray-500">Manage hospital specialities and services.</p>
        </div>
        <Link
          href="/admin/services/new"
          className="flex items-center gap-2 bg-[#007a87] text-white px-5 py-2.5 rounded-xl hover:bg-[#005c66] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-[700] text-[13px] tracking-wide"
        >
          <Plus size={18} />
          <span>Add New Service</span>
        </Link>
      </div>

      {/* Modern Search & Filter Bar */}
      <div className="bg-white p-2 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-lg flex items-center">
          <Search className="absolute left-4 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search services by title..."
            defaultValue={query}
            className="w-full pl-11 pr-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-transparent focus:border-[#007a87]/30 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#007a87]/10 transition-all font-[500] text-gray-700 text-[14px]"
          />
        </div>
        <div className="px-4 text-[13px] font-[600] text-gray-400">
          Showing <span className="text-[#002b5c] font-[800]">{totalCount}</span> services
        </div>
      </div>

      {/* Premium Data Table */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/80 overflow-hidden relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse table-fixed min-w-[800px] md:min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                <th className="p-5 font-[800] text-[12px] uppercase tracking-widest text-gray-400 w-[30%]">Service Title</th>
                <th className="p-5 font-[800] text-[12px] uppercase tracking-widest text-gray-400 w-[20%]">Status</th>
                <th className="p-5 font-[800] text-[12px] uppercase tracking-widest text-gray-400 w-[40%]">Items Included</th>
                <th className="p-5 font-[800] text-[12px] uppercase tracking-widest text-gray-400 text-right w-[10%]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100/80">
              {services.map((service: any) => {
                const initials = service.title.substring(0, 2).toUpperCase();
                let parsedItems: string[] = [];
                try {
                  parsedItems = JSON.parse(service.items);
                } catch (e) {
                  parsedItems = [];
                }

                return (
                  <tr key={service.id} className="hover:bg-gray-50/60 transition-colors group">
                    <td className="p-5 break-words">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#002b5c]/10 to-[#007a87]/10 border border-[#007a87]/20 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                          <span className="text-[12px] font-[800] text-[#002b5c] tracking-wider">{initials}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-[800] text-[14px] text-gray-900 tracking-tight truncate">{service.title}</p>
                          <p className="text-[12px] font-[600] text-gray-400 mt-0.5">Icon: {service.icon || "Default"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <div className="flex flex-wrap gap-1">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg border text-[11px] font-[800] uppercase tracking-widest whitespace-normal break-words ${service.status ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
                          {service.status ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 break-words">
                      <p className="text-[13px] font-[600] text-gray-600 leading-relaxed whitespace-normal line-clamp-2">
                        {parsedItems.length > 0 ? parsedItems.join(", ") : <span className="text-gray-300 italic">No specific items listed</span>}
                      </p>
                    </td>
                    <td className="p-5 text-right">
                      <Link
                        href={`/admin/services/${service.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-xl bg-gray-50 text-gray-400 hover:bg-[#007a87] hover:text-white hover:shadow-md transition-all duration-300"
                        title="Edit Service"
                      >
                        <Edit size={16} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
              {services.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 border border-gray-100">
                      <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-[16px] font-[800] text-gray-800 tracking-tight">No services found</p>
                    <p className="text-[13px] font-[500] text-gray-400 mt-1 max-w-sm mx-auto">
                      Get started by adding a new service to the hospital directory.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <span className="text-[13px] font-[600] text-gray-500">
              Page <span className="text-gray-800">{page}</span> of <span className="text-gray-800">{totalPages}</span>
            </span>
            <div className="flex gap-2">
              <Link
                href={`/admin/services?q=${query}&page=${Math.max(1, page - 1)}`}
                className={`px-4 py-2 text-[12px] font-[700] rounded-lg border transition-all ${page === 1 ? 'border-gray-200 text-gray-400 pointer-events-none bg-gray-50' : 'border-gray-300 text-[#002b5c] bg-white hover:border-[#007a87] hover:text-[#007a87] hover:shadow-sm'}`}
              >
                PREVIOUS
              </Link>
              <Link
                href={`/admin/services?q=${query}&page=${Math.min(totalPages, page + 1)}`}
                className={`px-4 py-2 text-[12px] font-[700] rounded-lg border transition-all ${page === totalPages ? 'border-gray-200 text-gray-400 pointer-events-none bg-gray-50' : 'border-gray-300 text-[#002b5c] bg-white hover:border-[#007a87] hover:text-[#007a87] hover:shadow-sm'}`}
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
