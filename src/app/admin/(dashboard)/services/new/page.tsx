import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, HeartPulse, Search } from "lucide-react";

import IconPicker from "@/components/IconPicker";

export default function NewServicePage() {
  async function createService(formData: FormData) {
    "use server";
    
    const title = formData.get("title") as string;
    const icon = formData.get("icon") as string;
    const itemsRaw = formData.get("items") as string;
    const status = formData.get("status") === "on";

    const seoMetaTitle = formData.get("seoMetaTitle") as string;
    const seoMetaDescription = formData.get("seoMetaDescription") as string;
    const seoKeywords = formData.get("seoKeywords") as string;

    // Process comma separated items into JSON array
    const itemsArray = itemsRaw.split(",").map(item => item.trim()).filter(item => item !== "");
    const itemsStr = JSON.stringify(itemsArray);

    await prisma.service.create({
      data: {
        title,
        icon,
        items: itemsStr,
        status,
        seoMetaTitle,
        seoMetaDescription,
        seoKeywords,
      },
    });

    redirect("/admin/services");
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      {/* Header Section */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005c66] transition-colors mb-3">
            <ArrowLeft size={16} /> Back to Services
          </Link>
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2">
            Add New Service
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Create a new hospital service or speciality.
          </p>
        </div>
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <form action={createService} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-10">
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Service Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="e.g. Cardiology"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Icon Name</label>
              <IconPicker name="icon" placeholder="Select service icon" />
              <p className="text-[11px] font-[600] text-gray-400 mt-1">Select a Lucide React icon visual representation.</p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="items" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Services Included</label>
            <textarea
              id="items"
              name="items"
              rows={3}
              placeholder="e.g. 2D Echo, Holter, Colour Doppler (comma separated)"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all resize-none"
            ></textarea>
            <p className="text-[11px] font-[600] text-gray-400 mt-1">Separate each item with a comma.</p>
          </div>

          <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 flex items-center justify-between">
            <div>
              <p className="text-[14px] font-[800] text-gray-800">Active Service</p>
              <p className="text-[12px] font-[600] text-gray-500 mt-0.5">Visible to the public on the website.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="status" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003360]"></div>
            </label>
          </div>

        </div>

        {/* Card: SEO Settings */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 mt-8">
          <div className="bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4">
            <div className="bg-indigo-500/10 p-3 rounded-2xl text-indigo-600">
              <Search size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-black text-[#002b5c]">SEO Settings</h2>
              <p className="text-[13px] text-slate-500 font-medium">Manage search engine optimization meta tags.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Title</label>
              <input type="text" name="seoMetaTitle" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed" placeholder="Enter SEO Meta Title..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Meta Description</label>
              <textarea name="seoMetaDescription" rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none" placeholder="Enter SEO Meta Description..." />
            </div>
            <div>
              <label className="block text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3">Keywords</label>
              <textarea name="seoKeywords" rows={2} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all duration-200 text-slate-700 font-medium leading-relaxed resize-none text-sm" placeholder="hospital, care, pune, best hospital..." />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#007a87] text-white px-8 py-3.5 rounded-xl hover:bg-[#006570] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-[800] text-[14px] tracking-wide hover:shadow-[0_8px_20px_rgba(0,122,135,0.3)]"
          >
            <Save size={18} />
            <span>Save Service</span>
          </button>
        </div>
      </form>
    </div>
  );
}
