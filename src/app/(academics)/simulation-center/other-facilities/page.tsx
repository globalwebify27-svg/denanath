import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";

export default async function OtherFacilitieson14thFloorPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_other_facilities' } });
  let pageData: any = { title: "Other Facilities on 14th Floor", content: "", image: "" };
  try { if (setting) pageData = JSON.parse(setting.value); } catch (e) {}

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/academics" className="hover:text-white transition-colors">Academics</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/simulation-center" className="hover:text-white transition-colors">Simulation Center</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Other Facilities on 14th Floor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {pageData.title || "Other Facilities on 14th Floor"}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <Link href="/simulation-center" className="inline-flex items-center gap-2 text-[#007a87] hover:text-[#002b5c] font-bold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Simulation Center
        </Link>
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 md:p-12">
          {pageData.image && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200">
              <img src={pageData.image} alt={pageData.title} className="w-full h-auto object-cover max-h-[500px]" />
            </div>
          )}
          
          {pageData.content ? (
            <div className="prose prose-slate max-w-none break-words whitespace-normal overflow-hidden [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_li]:mb-2 prose-p:leading-relaxed prose-headings:text-[#002b5c] text-slate-700" dangerouslySetInnerHTML={{ __html: pageData.content }} />
          ) : (
            <p className="text-slate-500 italic">Content for this section will be updated soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}
