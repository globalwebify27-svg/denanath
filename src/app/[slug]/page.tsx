import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import DynamicSidebar from "@/components/DynamicSidebar";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const page = await prisma.dynamicPage.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!page || !page.status) {
    return {
      title: "Page Not Found - DMH",
    };
  }

  return {
    title: page.seoMetaTitle || `${page.title} - Deenanath Mangeshkar Hospital`,
    description: page.seoMetaDescription || undefined,
    keywords: page.seoKeywords || undefined,
  };
}

export default async function DynamicPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const page = await prisma.dynamicPage.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!page || !page.status) {
    notFound();
  }

  const isMenuPage = ["Top Header", "Main Header", "Footer"].includes(page.navbarMenu);

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
            <span className="text-white">{page.title}</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight">{page.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-5">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          {/* Dynamic Sidebar - Only show for sub-menu pages */}
          {!isMenuPage && (
            <DynamicSidebar categoryName={page.navbarMenu} activeHref={`/${page.slug}`} />
          )}

          {/* Right Main Content */}
          <div className="w-full flex-1 min-w-0">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-2 pb-6 sm:px-10 sm:pt-3 sm:pb-10 md:px-14 md:pt-4 md:pb-14">
              
              <div className={`mb-8 ${isMenuPage ? 'text-center' : ''}`}>
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <FileText className="w-4 h-4" />
                  <span>{page.title}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] tracking-tight">
                  {page.title}
                </h2>
                <div className={`w-16 h-1 bg-[#007a87] rounded-full mt-4 ${isMenuPage ? 'mx-auto' : ''}`}></div>
              </div>

              <div 
                className="prose prose-slate max-w-none prose-headings:text-[#002b5c] prose-a:text-teal-600 prose-img:rounded-xl [&_p]:text-slate-700 [&_p]:leading-[29px] [&_p]:font-normal overflow-hidden break-words [&_*]:!whitespace-normal [&_*]:!break-words"
                dangerouslySetInnerHTML={{ __html: page.content }} 
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
