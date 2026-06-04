import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewServicePage() {
  async function createService(formData: FormData) {
    "use server";
    
    const title = formData.get("title") as string;
    const icon = formData.get("icon") as string;
    const itemsRaw = formData.get("items") as string;
    const status = formData.get("status") === "on";

    // Process comma separated items into JSON array
    const itemsArray = itemsRaw.split(",").map(item => item.trim()).filter(item => item !== "");
    const itemsStr = JSON.stringify(itemsArray);

    await prisma.service.create({
      data: {
        title,
        icon,
        items: itemsStr,
        status,
      },
    });

    redirect("/admin/services");
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/admin/services" 
          className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005c66] transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Back to Services
        </Link>
        <h1 className="text-[36px] font-[900] text-[#002b5c] tracking-tight mb-2">Add New Service</h1>
        <p className="text-[15px] font-[500] text-gray-500">Create a new hospital service or speciality.</p>
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
              <label htmlFor="icon" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Icon Name</label>
              <input
                type="text"
                id="icon"
                name="icon"
                placeholder="e.g. HeartPulse, Pill, Scissors"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
              />
              <p className="text-[11px] font-[600] text-gray-400 mt-1">Lucide React icon name.</p>
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
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007a87]"></div>
            </label>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#002b5c] text-white px-8 py-3.5 rounded-xl hover:bg-[#001f42] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 font-[800] text-[14px] tracking-wide"
          >
            <Save size={18} />
            <span>Save Service</span>
          </button>
        </div>
      </form>
    </div>
  );
}
