import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft, Stethoscope, HeartPulse } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import LightboxWrapper from "@/components/LightboxWrapper";

export const dynamic = "force-dynamic";

export default async function DepartmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  
  const department = await prisma.department.findUnique({
    where: {
      id: resolvedParams.id,
      status: true
    },
  });

  if (!department) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-xs md:text-sm font-medium tracking-wide mb-4 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors whitespace-nowrap">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/departments" className="hover:text-white transition-colors whitespace-nowrap">Specialties</Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-white truncate">{department.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight flex items-center gap-4">
            {department.name}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Main Content */}
          <div className="w-full flex-1">
            <Link href="/departments" className="inline-flex items-center gap-2 text-[#007a87] hover:text-[#002b5c] font-bold mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Specialties
            </Link>

            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 p-6 sm:p-10">
              
              <div className="mb-10 flex items-start justify-between flex-wrap gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
                    <Stethoscope className="w-4 h-4" />
                    <span>Specialty Details</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                    {department.name}
                  </h2>
                  <div className="w-20 h-1.5 bg-[#007a87] rounded-full"></div>
                </div>
              </div>

              {/* Department Description / Content */}
              <div className="text-slate-700 space-y-6 break-words [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-6 [&_p:not(:last-child)]:mb-4
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-6
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:mb-6
                [&_table]:block [&_table]:overflow-x-auto [&_table]:whitespace-nowrap [&_table]:w-full [&_table]:text-sm [&_table]:text-left [&_table]:border-collapse [&_table]:border [&_table]:border-slate-200
                [&_td]:px-6 [&_td]:py-4 [&_td]:border [&_td]:border-slate-200
                [&_tr:hover]:bg-slate-50
                [&_thead>tr]:!bg-[#002b5c] [&_thead>tr>th]:!text-white [&_thead>tr>th]:font-bold [&_thead>tr>th]:uppercase [&_thead>tr>th]:text-xs
                [&_thead>tr>td]:!text-white [&_thead>tr>td]:font-bold [&_thead>tr>td]:uppercase [&_thead>tr>td]:text-xs
                [&_table>tr:first-child]:!bg-[#002b5c] [&_table>tr:first-child>td]:!text-white [&_table>tr:first-child>td]:font-bold [&_table>tr:first-child>td]:uppercase [&_table>tr:first-child>td]:text-xs
                [&_tbody:first-child>tr:first-child]:!bg-[#002b5c] [&_tbody:first-child>tr:first-child>td]:!text-white [&_tbody:first-child>tr:first-child>td]:font-bold [&_tbody:first-child>tr:first-child>td]:uppercase [&_tbody:first-child>tr:first-child>td]:text-xs
                [&_.department-facilities-section]:grid [&_.department-facilities-section]:grid-cols-2 [&_.department-facilities-section]:md:grid-cols-4 [&_.department-facilities-section]:gap-4
                [&_.department-facilities-section_h3]:col-span-full
                [&_.department-facilities-section_p]:bg-teal-50 [&_.department-facilities-section_p]:p-4 [&_.department-facilities-section_p]:rounded-xl [&_.department-facilities-section_p]:text-center [&_.department-facilities-section_p]:font-semibold [&_.department-facilities-section_p]:text-[#007a87] [&_.department-facilities-section_p]:shadow-sm [&_.department-facilities-section_p]:mb-0
                
                [&_.department-facilities-section_ul]:col-span-full [&_.department-facilities-section_ul]:grid [&_.department-facilities-section_ul]:grid-cols-2 [&_.department-facilities-section_ul]:md:grid-cols-4 [&_.department-facilities-section_ul]:gap-4 [&_.department-facilities-section_ul]:list-none [&_.department-facilities-section_ul]:pl-0
                [&_.department-facilities-section_li]:bg-teal-50 [&_.department-facilities-section_li]:p-4 [&_.department-facilities-section_li]:rounded-xl [&_.department-facilities-section_li]:text-center [&_.department-facilities-section_li]:font-semibold [&_.department-facilities-section_li]:text-[#007a87] [&_.department-facilities-section_li]:shadow-sm
                
                [&_.department-gallery-section_img]:!h-32 [&_.department-gallery-section_img]:!w-full [&_.department-gallery-section_img]:!my-0 [&_.department-gallery-section_img]:!rounded-lg [&_.department-gallery-section_img]:!object-cover [&_.department-gallery-section_img]:!shadow-sm">
                {department.description ? (
                  <LightboxWrapper htmlContent={
                    department.description
                      .replace(/&nbsp;/g, ' ')
                      .replace(/<section>(<h3[^>]*>Facilities<\/h3>)/gi, '<section class="department-facilities-section">$1')
                      .replace(/<section>(<h3[^>]*>Photo Gallery<\/h3>)/gi, '<section class="department-gallery-section">$1')
                  } />
                ) : (
                  <div className="py-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
                    <HeartPulse className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-700 mb-2">No details available</h3>
                    <p className="text-slate-500">More information about this department will be updated soon.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
