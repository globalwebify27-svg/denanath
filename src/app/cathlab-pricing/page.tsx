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
      <div className="relative bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] py-4 md:py-6 overflow-hidden">
        {data.bannerImage ? (
          <div className="absolute inset-0 z-0">
            <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#1e3a8a]/80 to-transparent"></div>
          </div>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          </>
        )}
        
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <nav className="flex items-center gap-2 text-[10px] sm:text-xs text-blue-200 mb-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{(data.pageTitle || data.title || "").replace(/<[^>]*>?/gm, '')}</span>
          </nav>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[9px] sm:text-[10px] font-semibold mb-2 backdrop-blur-sm">
                <HeartPulse className="w-3 h-3 text-cyan-400" />
                <span>Cardiology Department</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-[38px] font-bold text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: (data.pageTitle || data.title || "").replace('Pharmacy', 'Pharmacy <br className="hidden md:block"/>') }}>
              </h1>
            </div>
            
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-white text-[#1e3a8a] rounded-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300 font-bold shadow-md w-fit text-xs sm:text-sm shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 pt-6 sm:pt-8 relative z-20">
        
        {data.subtitle && (
          <div className="mb-6 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
            <div className="bg-teal-50 p-2 sm:p-2.5 rounded-xl shrink-0 mt-0.5">
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-[#007a87]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#002b5c] mb-1 sm:mb-2">{(data.pageTitle || data.title || "").replace(/<[^>]*>?/gm, '')}</h2>
              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                {data.subtitle}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Note Banner */}
          <div className="bg-amber-50 border-b border-amber-100 px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Info className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
              <span className="text-amber-800 font-semibold text-xs sm:text-sm">Note: * GST as applicable</span>
            </div>
            <span className="text-[11px] text-amber-700 font-medium hidden sm:inline-block">Prices subject to revision per hospital policy</span>
          </div>

          {/* MOBILE VIEW: Responsive Cards Stack */}
          <div className="block md:hidden divide-y divide-slate-100">
            {stentData.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No stent pricing data available.</div>
            ) : (
              stentData.map((row: any, idx: number) => (
                <div key={idx} className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors">
                  {/* Top bar: Sr No & Category + MRP */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2 min-w-0 flex-wrap">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold shrink-0">
                        {row.srNo}
                      </span>
                      {row.category && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                          {row.category}
                        </span>
                      )}
                    </div>
                    <div className="text-right shrink-0 bg-emerald-50 border border-emerald-200/70 rounded-xl px-3 py-1.5 shadow-sm">
                      <span className="text-[9px] uppercase font-bold text-emerald-600 block">M.R.P.</span>
                      <span className="text-base font-extrabold text-emerald-700 whitespace-nowrap inline-flex items-center justify-end gap-1">
                        <span className="font-semibold text-emerald-600 leading-none">₹</span>
                        <span>{row.mrp}</span>
                      </span>
                    </div>
                  </div>

                  {/* Item Description */}
                  <h3 className="text-base font-bold text-slate-900 leading-snug mb-2.5">
                    {row.item}
                  </h3>

                  {/* Manufacturer */}
                  {row.manufacturer && (
                    <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50/90 rounded-xl p-2.5 border border-slate-100">
                      <Building2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Manufacturer</span>
                        <span className="font-semibold text-slate-800 text-xs sm:text-sm">{row.manufacturer}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* DESKTOP VIEW: Full Comparison Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="break-words w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b-2 border-slate-200">
                  <th className="py-4 px-6 font-bold text-slate-700 text-sm w-20 text-center border-r border-slate-100 uppercase tracking-wider">Sr.No.</th>
                  <th className="py-4 px-8 font-bold text-slate-700 text-sm border-r border-slate-100 uppercase tracking-wider w-[30%]">
                    <div className="flex items-center gap-2"><Package className="w-4 h-4 text-slate-400" /> Item Description</div>
                  </th>
                  <th className="py-4 px-6 font-bold text-slate-700 text-sm border-r border-slate-100 uppercase tracking-wider">
                    <div className="flex items-center gap-2"><Layers className="w-4 h-4 text-slate-400" /> Category</div>
                  </th>
                  <th className="py-4 px-6 font-bold text-[#0284c7] text-sm bg-[#f0f9ff] border-r border-[#bae6fd] uppercase tracking-wider w-[25%]">
                    <div className="flex items-center gap-2"><Building2 className="w-4 h-4" /> Manufacturer</div>
                  </th>
                  <th className="py-4 px-8 font-bold text-emerald-700 text-sm bg-emerald-50/50 text-right uppercase tracking-wider whitespace-nowrap min-w-[140px]">
                    <div className="flex items-center justify-end gap-2"><Tag className="w-4 h-4" /> M.R.P. (₹)</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stentData.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6 text-slate-500 font-medium text-center border-r border-slate-100 text-sm">{row.srNo}</td>
                    <td className="py-4 px-8 text-slate-800 font-bold border-r border-slate-100 text-sm">{row.item}</td>
                    <td className="py-4 px-6 text-slate-600 border-r border-slate-100">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                        {row.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-700 text-sm border-r border-slate-100">{row.manufacturer}</td>
                    <td className="py-4 px-8 text-emerald-600 font-bold text-right text-base bg-emerald-50/10 group-hover:bg-emerald-50/30 transition-colors whitespace-nowrap">
                      <span className="inline-flex items-center justify-end gap-1.5 whitespace-nowrap font-bold">
                        <span className="font-semibold text-emerald-600 text-base leading-none">₹</span>
                        <span>{row.mrp}</span>
                      </span>
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
