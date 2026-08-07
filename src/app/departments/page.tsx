import type { Metadata } from "next";
import React from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { ChevronRight, Stethoscope } from "lucide-react";
import { prisma } from "@/lib/prisma";
import DepartmentsClientPage from "./client-page";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_departments' } });
    if (setting && setting.value) seoData = JSON.parse(setting.value);
  } catch (error) {}

  return {
    ...(seoData.seoMetaTitle && { title: seoData.seoMetaTitle }),
    ...(seoData.seoMetaDescription && { description: seoData.seoMetaDescription }),
    ...(seoData.seoKeywords && { keywords: seoData.seoKeywords }),
  };
}

export default async function DepartmentDetailsPage() {
  const departments = await prisma.department.findMany({
    where: { status: true },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
          <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-white transition-colors cursor-pointer">Specialties</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Specialty Details</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
            Specialty Details
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 md:pt-5 md:pb-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">

          {/* Dynamic Sidebar */}
          <DynamicSidebar categoryName="Doctors & Departments" activeHref="/departments" />

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-2 pb-6 sm:px-10 sm:pt-3 sm:pb-10 md:px-14 md:pt-4 md:pb-14">

              <div className="mb-10">
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <Stethoscope className="w-4 h-4" />
                  <span>Specialties</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
                  Specialty Details
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
              </div>

              {/* Client component handles search + pagination */}
              <DepartmentsClientPage departments={departments} />

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
