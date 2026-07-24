import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Info, Building2, Package, Tag, Layers, Stethoscope } from 'lucide-react';
import { prisma } from "@/lib/prisma";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_implant_pricing' } });
  if (setting) {
    try {
      const parsed = JSON.parse(setting.value);
      return {
        title: parsed.seoMetaTitle || "Our Implant Pricing",
        description: parsed.seoMetaDescription || "",
        keywords: parsed.seoKeywords || "",
      }
    } catch(e){}
  }
  return { title: "Our Implant Pricing" }
}

export default async function ImplantPricingPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_implant_pricing' } });
  let data: any = {
    title: "Our Implant Pricing",
    subtitle: "We have implemented the new pricing for Total Knee Replacement implants w.e.f August 2017 at our hospital.",
    tableData: []
  };

  try {
    if (setting) data = JSON.parse(setting.value);
  } catch (e) {}

  const tableData = data.tableData || [];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      
      {/* 1. Hero Section */}
      <div className="relative bg-gradient-to-r from-[#002b5c] to-[#005f6b] pt-12 pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00a69c]/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <nav className="flex items-center gap-2 text-sm text-[#b2dfdb] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{data.title}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm">
                <Stethoscope className="w-4 h-4 text-[#a7ffeb]" />
                <span>Orthopedics Department</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4">
                {data.title}
              </h1>
              <p className="text-lg text-[#b2dfdb] font-light max-w-2xl">
                {data.subtitle}
              </p>
            </div>
            
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#002b5c] rounded-xl hover:bg-[#e0f2f1] hover:scale-105 transition-all duration-300 font-bold shadow-lg w-fit"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-[95%] xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8 relative z-20">
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden [&_td]:!text-[18px] [&_th]:!text-[18px] [&_.text-sm]:!text-[18px] [&_.text-xs]:!text-[18px]">
          
          {/* Note Banner */}
          <div className="bg-amber-50 border-b border-amber-100 px-8 py-4 flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-600" />
            <span className="text-amber-800 font-medium text-sm">Note: * GST as applicable</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr>
                  <th colSpan={4} className="bg-slate-50 border-b border-r border-slate-200 py-4 px-6 text-center">
                    <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Implant Details</span>
                  </th>
                  <th colSpan={4} className="bg-[#f0f9ff] border-b border-r border-[#bae6fd] py-4 px-6 text-center">
                    <span className="text-[#0284c7] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                      <Building2 className="w-4 h-4" /> Manufacturer & Brand Name
                    </span>
                  </th>
                  <th className="bg-emerald-50 border-b border-emerald-100 py-4 px-6 text-center">
                    <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                      <Tag className="w-4 h-4" /> Cost
                    </span>
                  </th>
                </tr>
                <tr className="bg-white border-b-2 border-slate-200">
                  <th className="py-4 px-4 font-bold text-slate-700 text-sm w-16 text-center border-r border-slate-100">Sr.No</th>
                  <th className="py-4 px-6 font-bold text-slate-700 text-sm border-r border-slate-100 w-52"><div className="flex items-center gap-2"><Layers className="w-4 h-4 text-slate-400" />System</div></th>
                  <th className="py-4 px-6 font-bold text-slate-700 text-sm border-r border-slate-100 w-48"><div className="flex items-center gap-2"><Package className="w-4 h-4 text-slate-400" />Component</div></th>
                  <th className="py-4 px-6 font-bold text-slate-700 text-sm border-r border-slate-200 w-56">Feature/Material</th>
                  <th className="py-4 px-4 font-bold text-[#0369a1] text-sm bg-[#f8fafc] border-r border-slate-200 text-center">Zimmer</th>
                  <th className="py-4 px-4 font-bold text-[#0369a1] text-sm bg-[#f8fafc] border-r border-slate-200 text-center">Maxx</th>
                  <th className="py-4 px-4 font-bold text-[#0369a1] text-sm bg-[#f8fafc] border-r border-slate-200 text-center">Depuy</th>
                  <th className="py-4 px-4 font-bold text-[#0369a1] text-sm bg-[#f8fafc] border-r border-[#bae6fd] text-center">Smith & Nephew</th>
                  <th className="py-4 px-6 font-bold text-emerald-700 text-base bg-emerald-50/50 text-right">Rate (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-4 text-slate-500 font-medium text-center border-r border-slate-100">{row.srNo}</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold border-r border-slate-100">{row.system}</td>
                    <td className="py-4 px-6 text-slate-600 border-r border-slate-100">{row.component}</td>
                    <td className="py-4 px-6 text-slate-600 text-sm border-r border-slate-200">{row.feature}</td>
                    
                    <td className="py-4 px-4 text-slate-600 text-sm border-r border-slate-100 text-center">{row.zimmer !== 'NA' ? row.zimmer : <span className="text-slate-300">-</span>}</td>
                    <td className="py-4 px-4 text-slate-600 text-sm border-r border-slate-100 text-center">{row.maxx !== 'NA' ? row.maxx : <span className="text-slate-300">-</span>}</td>
                    <td className="py-4 px-4 text-slate-600 text-sm border-r border-slate-100 text-center">{row.depuy !== 'NA' ? row.depuy : <span className="text-slate-300">-</span>}</td>
                    <td className="py-4 px-4 text-slate-600 text-sm border-r border-slate-200 text-center">{row.sn !== 'NA' ? row.sn : <span className="text-slate-300">-</span>}</td>
                    
                    <td className="py-4 px-6 text-emerald-600 font-bold text-right text-lg whitespace-nowrap bg-emerald-50/10 group-hover:bg-emerald-50/30 transition-colors">
                      ₹ {row.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
