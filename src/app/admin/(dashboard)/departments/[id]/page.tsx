import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, HeartPulse } from "lucide-react";
import { notFound } from "next/navigation";

import IconPicker from "@/components/IconPicker";

export default async function EditDepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  
  const department = await prisma.department.findUnique({
    where: {
      id: resolvedParams.id,
    },
  });

  if (!department) {
    notFound();
  }

  async function updateDepartment(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const headOfDepartment = formData.get("headOfDepartment") as string;
    const icon = formData.get("icon") as string;
    const status = formData.get("status") === "on";

    await prisma.department.update({
      where: { id: resolvedParams.id },
      data: {
        name,
        description,
        headOfDepartment,
        icon,
        status,
      },
    });

    redirect("/admin/departments");
  }

  async function deleteDepartment() {
    "use server";
    await prisma.department.delete({
      where: { id: resolvedParams.id },
    });
    redirect("/admin/departments");
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={updateDepartment}>
        {/* Header Section */}
        <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
          <div className="z-10 relative">
            <Link href="/admin/departments" className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005c66] transition-colors mb-3">
              <ArrowLeft size={16} /> Back to Departments
            </Link>
            <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2">
              Edit Department
            </h1>
            <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
              Update details for {department.name}.
            </p>
          </div>
          
          {/* Actions in Header */}
          <div className="z-10 shrink-0 mt-4 lg:mt-0 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="whitespace-nowrap flex items-center gap-2 bg-[#007a87] text-white px-5 py-3 rounded-xl hover:bg-[#006570] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 font-bold text-xs shadow-md hover:shadow-[0_8px_20px_rgba(0,122,135,0.3)]"
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
            <button
              formAction={deleteDepartment}
              formNoValidate
              type="submit"
              className="p-3 text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors shadow-sm"
              title="Delete Department"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* subtle background decoration */}
          <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
             <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10">
          {/* Card Header for Second Section */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
            <h3 className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Department Details</h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Department Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={department.name}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="headOfDepartment" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Head of Department</label>
                <input
                  type="text"
                  id="headOfDepartment"
                  name="headOfDepartment"
                  defaultValue={department.headOfDepartment || ""}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Department Icon Name</label>
                <IconPicker name="icon" defaultValue={department.icon || ""} placeholder="Select department icon" />
                <p className="text-[11px] font-[600] text-gray-400 mt-1">Select a Lucide React icon visual representation.</p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Description</label>
              <textarea
                id="description"
                name="description"
                defaultValue={department.description || ""}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all resize-none"
              ></textarea>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
              <input
                type="checkbox"
                id="status"
                name="status"
                defaultChecked={department.status}
                className="w-5 h-5 text-[#007a87] bg-white border-gray-300 rounded focus:ring-[#007a87]"
              />
              <label htmlFor="status" className="text-[14px] font-[700] text-gray-800 cursor-pointer">
                Active Department (Visible on website)
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
