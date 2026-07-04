import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Info, HeartPulse, Tag, Building2, Package, Layers } from 'lucide-react';
import { prisma } from "@/lib/prisma";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_cathlab_pricing' } });
  if (setting) {
    try {
      const parsed = JSON.parse(setting.value);
      return {
        title: parsed.seoMetaTitle || "Cathlab Pharmacy Stent Price List",
        description: parsed.seoMetaDescription || "",
        keywords: parsed.seoKeywords || "",
      }
    } catch(e){}
  }
  return { title: "Cathlab Pharmacy Stent Price List" }
}

export default async function CathlabPricingPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_cathlab_pricing' } });
  let data: any = {
    title: "Cathlab Pharmacy Stent Price List",
    subtitle: "We have implemented the new pricing for Cathlab implants at our hospital w.e.f. 1st April, 2026.",
    tableData: []
  };

  try {
    if (setting) data = JSON.parse(setting.value);
  } catch (e) {}

  const stentData = data.tableData || [];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      
      {/* 1. Hero Section */}
      <div className="relative bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] pt-24 pb-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <nav className="flex items-center gap-2 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">{data.title}</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-6 backdrop-blur-sm">
                <HeartPulse className="w-4 h-4 text-cyan-400" />
                <span>Cardiology Department</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4" dangerouslySetInnerHTML={{ __html: data.title.replace('Pharmacy', 'Pharmacy <br className="hidden md:block"/>') }}>
              </h1>
              <p className="text-lg text-blue-100 font-light max-w-2xl">
                {data.subtitle}
              </p>
            </div>
            
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1e3a8a] rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 font-bold shadow-lg w-fit shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-[95%] xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8 relative z-20">
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Note Banner */}
          <div className="bg-amber-50 border-b border-amber-100 px-8 py-4 flex items-center gap-3">
            <Info className="w-5 h-5 text-amber-600" />
            <span className="text-amber-800 font-medium text-sm">Note: * GST as applicable</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b-2 border-slate-200">
                  <th className="py-5 px-6 font-bold text-slate-700 text-sm w-20 text-center border-r border-slate-100 uppercase tracking-wider">Sr.No.</th>
                  <th className="py-5 px-8 font-bold text-slate-700 text-sm border-r border-slate-100 uppercase tracking-wider w-[30%]">
                    <div className="flex items-center gap-2"><Package className="w-4 h-4 text-slate-400" /> Item Description</div>
                  </th>
                  <th className="py-5 px-6 font-bold text-slate-700 text-sm border-r border-slate-100 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-slate-400" /> Category</div>
                  </th>
                  <th className="py-5 px-6 font-bold text-[#0284c7] text-sm bg-[#f0f9ff] border-r border-[#bae6fd] uppercase tracking-wider w-[25%]">
                    <div className="flex items-center gap-2"><Building2 className="w-4 h-4" /> Manufacturer</div>
                  </th>
                  <th className="py-5 px-8 font-bold text-emerald-700 text-sm bg-emerald-50/50 text-right uppercase tracking-wider">
                    <div className="flex items-center justify-end gap-2"><Tag className="w-4 h-4" /> M.R.P. (₹)</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stentData.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-5 px-6 text-slate-500 font-medium text-center border-r border-slate-100">{row.srNo}</td>
                    <td className="py-5 px-8 text-slate-800 font-bold border-r border-slate-100 text-[15px]">{row.item}</td>
                    <td className="py-5 px-6 text-slate-600 border-r border-slate-100">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                        {row.category}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-slate-700 text-[14px] border-r border-slate-100">{row.manufacturer}</td>
                    <td className="py-5 px-8 text-emerald-600 font-bold text-right text-lg whitespace-nowrap bg-emerald-50/10 group-hover:bg-emerald-50/30 transition-colors">
                      ₹ {row.mrp}
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
