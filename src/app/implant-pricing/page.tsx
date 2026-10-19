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
      <div className="relative bg-gradient-to-r from-[#002b5c] to-[#005f6b] py-4 md:py-6 overflow-hidden">
        {data.bannerImage ? (
          <div className="absolute inset-0 z-0">
            <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c] via-[#002b5c]/80 to-transparent"></div>
          </div>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00a69c]/20 rounded-full blur-[100px] pointer-events-none" />
          </>
        )}
        
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <nav className="flex items-center gap-2 text-[10px] sm:text-xs text-[#b2dfdb] mb-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{(data.pageTitle || data.title || "").replace(/<[^>]*>?/gm, '')}</span>
          </nav>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 text-white text-[9px] sm:text-[10px] font-semibold mb-2 backdrop-blur-sm">
                <Stethoscope className="w-3 h-3 text-[#a7ffeb]" />
                <span>Orthopedics Department</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-[38px] font-bold text-white leading-tight tracking-tight">
                {data.pageTitle || data.title}
              </h1>
            </div>
            
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-white text-[#002b5c] rounded-lg hover:bg-[#e0f2f1] hover:scale-105 transition-all duration-300 font-bold shadow-md w-fit text-xs sm:text-sm shrink-0"
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
            {tableData.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No implant data available.</div>
            ) : (
              tableData.map((row: any, idx: number) => {
                const brands = [
                  { name: 'Zimmer', val: row.zimmer },
                  { name: 'Maxx', val: row.maxx },
                  { name: 'Depuy', val: row.depuy },
                  { name: 'Smith & Nephew', val: row.sn },
                ];
                return (
                  <div key={idx} className="p-4 sm:p-5 hover:bg-slate-50/60 transition-colors">
                    {/* Header: Sr No + System + Rate */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-teal-50 border border-teal-100 text-teal-800 text-xs font-bold shrink-0 mt-0.5">
                          {row.srNo}
                        </span>
                        <div className="min-w-0">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">System</span>
                          <h3 className="text-base font-bold text-slate-900 leading-snug">{row.system || "—"}</h3>
                        </div>
                      </div>
                      <div className="text-right shrink-0 bg-emerald-50 border border-emerald-200/70 rounded-xl px-3 py-1.5 shadow-sm">
                        <span className="text-[9px] uppercase font-bold text-emerald-600 block">Rate</span>
                        <span className="text-base font-extrabold text-emerald-700 whitespace-nowrap inline-flex items-center justify-end gap-1">
                          <span className="font-semibold text-emerald-600 leading-none">₹</span>
                          <span>{row.rate}</span>
                        </span>
                      </div>
                    </div>

                    {/* Component & Feature info */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50/90 rounded-xl p-3 mb-3 border border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                          <Package className="w-3 h-3 text-slate-400" /> Component
                        </span>
                        <span className="text-slate-800 font-semibold">{row.component || "—"}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-semibold block text-[10px] uppercase tracking-wider mb-0.5 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-slate-400" /> Feature / Material
                        </span>
                        <span className="text-slate-700 font-medium">{row.feature || "—"}</span>
                      </div>
                    </div>

                    {/* Brand Availability Badges */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                        <Building2 className="w-3 h-3 text-[#0284c7]" />
                        Manufacturer Brands
                      </span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {brands.map((b, bIdx) => {
                          const isAvailable = b.val && b.val !== 'NA' && b.val !== '-';
                          return (
                            <div 
                              key={bIdx}
                              className={`px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between gap-1 border ${
                                isAvailable
                                  ? 'bg-blue-50/80 border-blue-100 text-blue-950 font-medium'
                                  : 'bg-slate-50/60 border-slate-100 text-slate-400'
                              }`}
                            >
                              <span className="font-semibold text-[10px] text-slate-500 uppercase">{b.name}:</span>
                              <span className={`text-[11px] truncate text-right font-medium ${isAvailable ? 'text-blue-700' : 'text-slate-400'}`}>
                                {isAvailable ? b.val : '—'}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* DESKTOP VIEW: Full Comparison Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="break-words w-full text-left border-collapse">
              <thead>
                <tr>
                  <th colSpan={4} className="bg-slate-50 border-b border-r border-slate-200 py-3.5 px-6 text-center">
                    <span className="text-slate-500 font-bold text-xs uppercase tracking-widest">Implant Details</span>
                  </th>
                  <th colSpan={4} className="bg-[#f0f9ff] border-b border-r border-[#bae6fd] py-3.5 px-6 text-center">
                    <span className="text-[#0284c7] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                      <Building2 className="w-4 h-4" /> Manufacturer & Brand Name
                    </span>
                  </th>
                  <th className="bg-emerald-50 border-b border-emerald-100 py-3.5 px-6 text-center">
                    <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                      <Tag className="w-4 h-4" /> Cost
                    </span>
                  </th>
                </tr>
                <tr className="bg-white border-b-2 border-slate-200">
                  <th className="py-3.5 px-4 font-bold text-slate-700 text-sm w-16 text-center border-r border-slate-100">Sr.No</th>
                  <th className="py-3.5 px-6 font-bold text-slate-700 text-sm border-r border-slate-100 w-52"><div className="flex items-center gap-2"><Layers className="w-4 h-4 text-slate-400" />System</div></th>
                  <th className="py-3.5 px-6 font-bold text-slate-700 text-sm border-r border-slate-100 w-48"><div className="flex items-center gap-2"><Package className="w-4 h-4 text-slate-400" />Component</div></th>
                  <th className="py-3.5 px-6 font-bold text-slate-700 text-sm border-r border-slate-200 w-56">Feature/Material</th>
                  <th className="py-3.5 px-4 font-bold text-[#0369a1] text-sm bg-[#f8fafc] border-r border-slate-200 text-center">Zimmer</th>
                  <th className="py-3.5 px-4 font-bold text-[#0369a1] text-sm bg-[#f8fafc] border-r border-slate-200 text-center">Maxx</th>
                  <th className="py-3.5 px-4 font-bold text-[#0369a1] text-sm bg-[#f8fafc] border-r border-slate-200 text-center">Depuy</th>
                  <th className="py-3.5 px-4 font-bold text-[#0369a1] text-sm bg-[#f8fafc] border-r border-[#bae6fd] text-center">Smith & Nephew</th>
                  <th className="py-3.5 px-6 font-bold text-emerald-700 text-sm bg-emerald-50/50 text-right whitespace-nowrap min-w-[130px]">Rate (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-4 text-slate-500 font-medium text-center border-r border-slate-100 text-sm">{row.srNo}</td>
                    <td className="py-4 px-6 text-slate-800 font-semibold border-r border-slate-100 text-sm">{row.system}</td>
                    <td className="py-4 px-6 text-slate-600 border-r border-slate-100 text-sm">{row.component}</td>
                    <td className="py-4 px-6 text-slate-600 text-sm border-r border-slate-200">{row.feature}</td>
                    
                    <td className="py-4 px-4 text-slate-600 text-sm border-r border-slate-100 text-center">{row.zimmer !== 'NA' ? row.zimmer : <span className="text-slate-300">-</span>}</td>
                    <td className="py-4 px-4 text-slate-600 text-sm border-r border-slate-100 text-center">{row.maxx !== 'NA' ? row.maxx : <span className="text-slate-300">-</span>}</td>
                    <td className="py-4 px-4 text-slate-600 text-sm border-r border-slate-100 text-center">{row.depuy !== 'NA' ? row.depuy : <span className="text-slate-300">-</span>}</td>
                    <td className="py-4 px-4 text-slate-600 text-sm border-r border-slate-200 text-center">{row.sn !== 'NA' ? row.sn : <span className="text-slate-300">-</span>}</td>
                    
                    <td className="py-4 px-6 text-emerald-600 font-bold text-right text-base bg-emerald-50/10 group-hover:bg-emerald-50/30 transition-colors whitespace-nowrap">
                      <span className="inline-flex items-center justify-end gap-1.5 whitespace-nowrap font-bold">
                        <span className="font-semibold text-emerald-600 text-base leading-none">₹</span>
                        <span>{row.rate}</span>
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
