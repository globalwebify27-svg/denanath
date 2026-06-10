import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, HeartPulse } from "lucide-react";

import IconPicker from "@/components/IconPicker";

export default function NewDepartmentPage() {
  async function createDepartment(formData: FormData) {
    "use server";
    
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const headOfDepartment = formData.get("headOfDepartment") as string;
    const icon = formData.get("icon") as string;
    const status = formData.get("status") === "on"; // Checkbox

    await prisma.department.create({
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

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      {/* Header Section */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <Link href="/admin/departments" className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005c66] transition-colors mb-3">
            <ArrowLeft size={16} /> Back to Departments
          </Link>
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2">
            Add New Department
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Create a new medical department or unit for the hospital.
          </p>
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
        <form action={createDepartment} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Department Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Cardiology"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="headOfDepartment" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Head of Department</label>
              <input
                type="text"
                id="headOfDepartment"
                name="headOfDepartment"
                placeholder="e.g. Dr. John Doe"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Department Icon Name</label>
              <IconPicker name="icon" placeholder="Select department icon" />
              <p className="text-[11px] font-[600] text-gray-400 mt-1">Select a Lucide React icon visual representation.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Provide an overview of the department's services..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all resize-none"
            ></textarea>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <input
              type="checkbox"
              id="status"
              name="status"
              defaultChecked
              className="w-5 h-5 text-[#007a87] bg-white border-gray-300 rounded focus:ring-[#007a87]"
            />
            <label htmlFor="status" className="text-[14px] font-[700] text-gray-800 cursor-pointer">
              Active Department (Visible on website)
            </label>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-wrap justify-end gap-3">
            <Link
              href="/admin/departments"
              className="whitespace-nowrap w-full sm:w-auto text-center px-6 py-3 rounded-xl font-[700] text-[13px] text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="whitespace-nowrap w-full sm:w-auto flex items-center justify-center gap-2 bg-[#007a87] text-white px-6 py-3 rounded-xl hover:bg-[#005c66] hover:shadow-lg transition-all duration-300 font-[700] text-[13px] tracking-wide hover:shadow-[0_8px_20px_rgba(0,122,135,0.3)]"
            >
              <Save size={18} />
              Save Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
