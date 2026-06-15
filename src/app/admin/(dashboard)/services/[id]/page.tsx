import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Trash2, HeartPulse } from "lucide-react";

import IconPicker from "@/components/IconPicker";
import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const service = await prisma.service.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!service) {
    redirect("/admin/services");
  }

  let itemsStr = "";
  try {
    const parsed = JSON.parse(service.items);
    if (Array.isArray(parsed)) {
      itemsStr = parsed.join(", ");
    }
  } catch (e) {
    itemsStr = "";
  }

  async function updateService(formData: FormData) {
    "use server";
    
    const title = formData.get("title") as string;
    const icon = formData.get("icon") as string;
    const itemsRaw = formData.get("items") as string;
    const status = formData.get("status") === "on";

    const itemsArray = itemsRaw.split(",").map(item => item.trim()).filter(item => item !== "");
    const newItemsStr = JSON.stringify(itemsArray);

    await prisma.service.update({
      where: { id: resolvedParams.id },
      data: {
        title,
        icon,
        items: newItemsStr,
        status,
      },
    });

    redirect("/admin/services");
  }

  async function deleteService() {
    "use server";
    await prisma.service.delete({
      where: { id: resolvedParams.id },
    });
    redirect("/admin/services");
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">
      <form action={updateService}>
        {/* Header Section */}
        <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
          <div className="z-10 relative">
            <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm font-bold text-[#007a87] hover:text-[#005c66] transition-colors mb-3">
              <ArrowLeft size={16} /> Back to Services
            </Link>
            <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2">
              Edit Service
            </h1>
            <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
              Update details for {service.title}.
            </p>
          </div>
          
          {/* Actions in Header */}
          <div className="z-10 shrink-0 mt-4 lg:mt-0 flex items-center gap-3">
            <SubmitButton text="Save Changes" loadingText="Saving..." />
            <button
              formAction={deleteService}
              formNoValidate
              type="submit"
              className="p-3 text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors shadow-sm"
              title="Delete Service"
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
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <h3 className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Service Details</h3>
          </div>

          <div className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Service Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={service.title}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007a87]/20 focus:border-[#007a87] font-[500] text-[14px] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Icon Name</label>
                <IconPicker name="icon" defaultValue={service.icon || ""} placeholder="Select service icon" />
                <p className="text-[11px] font-[600] text-gray-400 mt-1">Select a Lucide React icon visual representation.</p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="items" className="text-[12px] font-[800] text-gray-700 uppercase tracking-widest">Services Included</label>
              <textarea
                id="items"
                name="items"
                defaultValue={itemsStr}
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
                <input type="checkbox" name="status" defaultChecked={service.status} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#003360]"></div>
              </label>
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}
