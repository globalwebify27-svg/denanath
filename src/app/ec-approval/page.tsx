import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_ec_approval' } });
  if (setting) {
    try {
      const parsed = JSON.parse(setting.value);
      return {
        title: parsed.seoMetaTitle || "EC Approval",
        description: parsed.seoMetaDescription || "",
        keywords: parsed.seoKeywords || "",
      }
    } catch(e){}
  }
  return { title: "EC Approval" }
}

export default async function ECApprovalPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_ec_approval' } });
  let data: any = { content: "", gallery: [], links: [] };
  
  try {
    if (setting) data = JSON.parse(setting.value);
  } catch (e) {}

  return (
    <main className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden pt-16 pb-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#b2dfdb] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">EC Approval</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                EC Approval
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 relative z-20">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
          <div className="prose prose-slate prose-lg max-w-none prose-headings:text-[#002b5c] prose-a:text-[#007a87] prose-a:font-semibold hover:prose-a:text-[#005c66]">
            
            {/* Content Section - Only shows if valid data is provided from backend */}
            {data.content && data.content.trim().length > 0 && data.content !== "ECECECECECECECECECECECEC" && (
              <>
                <h2 className="text-2xl font-bold text-[#002b5c] border-b border-slate-100 pb-4 mb-6">
                  {data.title || "Official Approval Information"}
                </h2>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 font-mono text-slate-700 break-words shadow-inner text-lg whitespace-pre-wrap">
                  {data.content}
                </div>
              </>
            )}

            {/* Gallery Section */}
            {data.gallery && data.gallery.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[#002b5c] mb-6">Gallery</h3>
                <div className="grid grid-cols-1 gap-8">
                  {data.gallery.map((img: any, idx: number) => (
                    <div key={idx} className="rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white">
                      {img.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={img.image} alt={img.caption || 'Gallery Image'} className="w-full h-auto object-contain" />
                      )}
                      {img.caption && (
                        <div className="p-4 text-center text-sm font-semibold text-slate-700">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links / Publications Section */}
            {data.links && data.links.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-[#002b5c] mb-6">Publications & Links</h3>
                <div className="flex flex-col gap-3">
                  {data.links.map((link: any, idx: number) => (
                    <a
                      key={idx}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-[#007a87] hover:shadow-md transition-all duration-300 no-underline"
                    >
                      <div className="bg-teal-50 p-2 rounded-lg text-[#007a87]">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <span className="font-semibold text-slate-700 m-0">{link.title || 'View Link'}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* Info Box - Only shows if valid data is provided from backend */}
            {data.content && data.content.trim().length > 0 && data.content !== "ECECECECECECECECECECECEC" && (
              <div className="mt-12 text-sm text-slate-500 bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
                <div className="text-blue-500 shrink-0 mt-0.5">ℹ️</div>
                <p className="m-0">
                  This section contains the official Ethics Committee (EC) Approval documents and identifiers. For any queries regarding this approval data, please contact the research administration.
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
