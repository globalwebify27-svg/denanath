import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { notFound } from "next/navigation";

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
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin/departments" className="inline-flex items-center gap-2 text-sm font-[700] text-gray-500 hover:text-[#007a87] transition-colors mb-4">
            <ArrowLeft size={16} />
            Back to Departments
          </Link>
          <h1 className="text-[36px] font-[800] leading-[40px] text-[#002b5c] tracking-tight mb-2">Edit Department</h1>
          <p className="text-[14px] font-[600] text-gray-500">Update details for {department.name}.</p>
        </div>
        <form action={deleteDepartment}>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors font-[700] text-[13px]"
            title="Delete Department"
            // In a real app, you'd add a confirmation modal here
          >
            <Trash2 size={16} />
            Delete
          </button>
        </form>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
        <form action={updateDepartment} className="space-y-6">
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
              <label htmlFor="icon" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Department Icon Name</label>
              <input
                type="text"
                id="icon"
                name="icon"
                defaultValue={department.icon || ""}
                placeholder="e.g. HeartPulse, Shield, Activity, Users"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
              />
              <p className="text-[11px] font-[600] text-gray-400 mt-1">Enter a valid Lucide React icon name to display on the frontend.</p>
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

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link
              href="/admin/departments"
              className="px-6 py-3 rounded-xl font-[700] text-[13px] text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#007a87] text-white px-6 py-3 rounded-xl hover:bg-[#005c66] hover:shadow-lg transition-all duration-300 font-[700] text-[13px] tracking-wide"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
