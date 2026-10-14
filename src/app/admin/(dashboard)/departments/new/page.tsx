import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, HeartPulse, Search } from "lucide-react";

import IconPicker from "@/components/IconPicker";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";
import DepartmentSectionsManager from "../DepartmentSectionsManager";
import {
  getDefaultDepartmentSections,
  buildDepartmentDescription,
} from "../departmentSectionsHelper";

export default function NewDepartmentPage() {
  async function createDepartment(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const headOfDepartment = formData.get("headOfDepartment") as string;
    const icon = formData.get("icon") as string;
    const status = formData.get("status") === "on";

    const seoMetaTitle = formData.get("seoMetaTitle") as string;
    const seoMetaDescription = formData.get("seoMetaDescription") as string;
    const seoKeywords = formData.get("seoKeywords") as string;

    const description = await buildDepartmentDescription(formData, name);

    // Create department without description first
    const newDepartment = await prisma.department.create({
      data: {
        name,
        headOfDepartment,
        icon,
        status,
        seoMetaTitle,
        seoMetaDescription,
        seoKeywords,
      },
    });

    // Bypass Prisma Client stale schema limit by updating description directly via SQL
    await prisma.$executeRawUnsafe(
      "UPDATE Department SET description = ? WHERE id = ?",
      description,
      newDepartment.id
    );

    const { revalidatePath } = require("next/cache");
    revalidatePath("/", "layout");

    redirect(
      "/admin/departments?alert=" +
        encodeURIComponent("Department created successfully!")
    );
  }

  const initialSections = getDefaultDepartmentSections();

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      {/* Header Section */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <Link
            href="/admin/departments"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005c66] transition-colors mb-3"
          >
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
              <label
                htmlFor="name"
                className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest"
              >
                Department Name *
              </label>
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
              <label
                htmlFor="headOfDepartment"
                className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest"
              >
                Head of Department
              </label>
              <input
                type="text"
                id="headOfDepartment"
                name="headOfDepartment"
                placeholder="e.g. Dr. John Doe"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">
                Department Icon Name
              </label>
              <IconPicker name="icon" placeholder="Select department icon" />
              <p className="text-[11px] font-[600] text-gray-400 mt-1">
                Select a Lucide React icon visual representation.
              </p>
            </div>
          </div>

          {/* Department Content Sections Manager */}
          <DepartmentSectionsManager initialSections={initialSections} />

          {/* Card: SEO Settings */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300">
            <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
              <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
                <Search size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="text-[20px] font-black text-[#002b5c]">SEO Settings</h2>
                <p className="text-[13px] text-slate-500 font-medium">
                  Manage search engine optimization meta tags.
                </p>
              </div>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="seoMetaTitle"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed"
                  placeholder="Enter SEO Meta Title..."
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Meta Description
                </label>
                <textarea
                  name="seoMetaDescription"
                  rows={3}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none"
                  placeholder="Enter SEO Meta Description..."
                />
              </div>
              <div>
                <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">
                  Keywords
                </label>
                <textarea
                  name="seoKeywords"
                  rows={2}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm"
                  placeholder="hospital, care, pune, best hospital..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <input
              type="checkbox"
              id="status"
              name="status"
              defaultChecked
              className="w-5 h-5 text-[#007a87] bg-white border-gray-300 rounded focus:ring-[#007a87]"
            />
            <label
              htmlFor="status"
              className="text-[14px] font-[700] text-gray-800 cursor-pointer"
            >
              Active Department (Visible on website)
            </label>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-wrap justify-end gap-3">
            <Link
              href="/admin/departments"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-xl font-[700] text-[13px] text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <SubmitButton
              text="Save Department"
              loadingText="Saving..."
              successMessage="Department created successfully!"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
