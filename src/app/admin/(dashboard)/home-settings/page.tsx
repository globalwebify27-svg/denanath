import { prisma } from "@/lib/prisma";
import { Home } from "lucide-react";
import InlineSeoForm from "@/app/admin/(dashboard)/components/InlineSeoForm";

export const dynamic = "force-dynamic";

export default async function AdminHomeSettingsPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_home' } });
  let seoData: any = {};
  try { if (setting) seoData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="p-8 space-y-8">
      {/* Header Section */}
      <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            Home Settings
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            Manage the SEO metadata and main configurations for the public homepage.
          </p>
        </div>
        
        {/* subtle background decoration */}
        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
           <Home size={200} className="text-[#007a87] -mt-10 -mr-10" />
        </div>
      </div>

      <InlineSeoForm settingKey="page_home" initialData={seoData} pathsToRevalidate={['/']} />
    </div>
  );
}
