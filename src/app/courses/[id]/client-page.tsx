"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, X, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Play, Pause } from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";

export default function ClientPage({ data }: { data: any }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const contentRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && lightboxIndex !== null && data.gallery) {
      interval = setInterval(() => {
        setLightboxIndex(prev => {
          if (prev === null) return null;
          return prev === data.gallery.length - 1 ? 0 : prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, lightboxIndex, data.gallery]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleImgClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "IMG") {
        const src = (target as HTMLImageElement).src;
        if (src) setZoomImage(src);
      }
    };
    el.addEventListener("click", handleImgClick);
    return () => el.removeEventListener("click", handleImgClick);
  }, [data.content]);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="w-full bg-[#002b5c] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-blue-200 text-[10px] font-medium tracking-wide mb-1 overflow-hidden whitespace-nowrap">
              <Link href="/" className="hover:text-white transition-colors shrink-0">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <Link href="/#courses" className="hover:text-white transition-colors shrink-0">Courses</Link>
              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span className="text-white truncate">{data.title?.replace(/_/g, " - ")}</span>
            </div>

            <h1 className="text-[24px] sm:text-[32px] md:text-[40px] leading-tight font-extrabold text-white tracking-tight max-w-5xl">
              {data.title?.replace(/_/g, " - ")}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8 md:pt-3 md:pb-12 space-y-6 sm:space-y-8">
          
          <div className={`bg-white rounded-3xl px-6 sm:px-10 md:px-12 shadow-sm border border-slate-100 ${data.title?.includes("Yoga") ? "pt-4 pb-3 sm:pt-5 sm:pb-4 md:pt-5 md:pb-4" : "pt-3 pb-6 sm:pt-4 sm:pb-8 md:pt-4 md:pb-6"}`}>
            {data.content ? (
              <div 
                ref={contentRef}
                className="prose prose-slate max-w-none text-[18px] prose-headings:text-[#002b5c] prose-a:text-[#007a87] prose-img:rounded-2xl prose-img:cursor-pointer [&_img]:!cursor-pointer prose-img:w-full prose-img:h-auto prose-img:max-w-full prose-img:shadow-md prose-img:border prose-img:border-slate-200/80 hover:prose-img:shadow-2xl hover:prose-img:scale-[1.01] prose-img:transition-all prose-img:duration-300 [&_h1]:!text-[22px] [&_h1]:!mt-2 [&_h1]:!mb-1 [&_h1:first-child]:!mt-0 [&_h2]:!text-[22px] [&_h2]:!mt-2 [&_h2]:!mb-1 [&_h2:first-child]:!mt-0 [&_h3]:!text-[22px] [&_h3]:!mt-2 [&_h3]:!mb-1 [&_h3:first-child]:!mt-0 [&_h4]:!text-[22px] [&_h4]:!mt-1.5 [&_h4]:!mb-1 [&_h4:first-child]:!mt-0 [&_p]:!text-[18px] [&_p]:!mt-0 [&_p]:!mb-1 [&_p:first-child]:!mt-0 [&_li]:!text-[18px] [&_td]:!text-[18px] [&_th]:!text-[18px] [&_ul]:my-1.5 [&_ol]:my-1.5 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: data.content.replace(/(?:<p>(?:<br\s*\/?>|\s|&nbsp;)*<\/p>\s*)+$/gi, "") 
                }}
              />
            ) : (
              <p className="text-slate-500">Detailed information about this program is currently being updated. Please check back later.</p>
            )}
            
            {data.link && data.link.trim() !== "" && data.title !== "Neuro Radiology Fellowship" && (
              <div className="mt-8 pt-8 border-t border-slate-100">
                <a 
                  href={data.link} 
                  target={data.link.startsWith("http") || data.link.includes(".pdf") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#007a87] text-white rounded-xl font-bold hover:bg-[#005f69] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  {data.linkText || "View Details"}
                </a>
              </div>
            )}
          </div>

          {data.gallery && data.gallery.length > 0 && (
            <div className="bg-white rounded-3xl px-6 py-5 sm:px-8 sm:py-6 md:px-10 md:py-6 shadow-sm border border-slate-100">
              <h3 className="text-[22px] font-bold text-[#002b5c] border-b border-slate-100 pb-2 mb-4">
                Gallery
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.gallery.map((img: any, idx: number) => (
                  <div key={idx} className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white group">
                    <div 
                      className="relative h-48 sm:h-56 cursor-pointer"
                      onClick={() => {
                        setLightboxIndex(idx);
                        setIsPlaying(false);
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={img.image} 
                        alt={img.caption || "Gallery Image"} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white bg-black/50 px-4 py-2 rounded-full font-medium text-sm backdrop-blur-sm">View</span>
                      </div>
                    </div>
                    {img.caption && (
                      <div className="p-4 bg-slate-50 border-t border-slate-100">
                        <p className="text-sm font-semibold text-slate-700 text-center">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

      {lightboxIndex !== null && data.gallery && typeof window !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4"
          onClick={() => {
            setLightboxIndex(null);
            setIsPlaying(false);
          }}
        >
          {/* Main Image Container */}
          <div 
            className="relative flex items-center justify-center max-w-5xl w-full h-[75vh]"
            onClick={e => e.stopPropagation()} // prevent close on click inside
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={data.gallery[lightboxIndex].image} 
              alt={data.gallery[lightboxIndex].caption || "Gallery Image"}
              className="max-w-full max-h-full object-contain shadow-[0_0_40px_rgba(0,0,0,0.5)] border-4 border-white rounded-sm bg-white"
            />
          </div>

          {/* Controls Bar */}
          <div 
            className="mt-4 bg-white/95 px-4 py-2 rounded flex items-center justify-between w-full max-w-4xl shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-sm font-bold text-slate-700 min-w-[50px]">
              {lightboxIndex + 1} / {data.gallery.length}
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => prev === null ? null : (prev === 0 ? data.gallery.length - 1 : prev - 1));
                }} 
                className="p-1.5 hover:bg-slate-200 rounded-full transition-colors bg-slate-100 text-slate-700"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }} 
                className="p-1.5 hover:bg-slate-200 rounded-full transition-colors bg-slate-100 text-slate-700"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => prev === null ? null : (prev === data.gallery.length - 1 ? 0 : prev + 1));
                }} 
                className="p-1.5 hover:bg-slate-200 rounded-full transition-colors bg-slate-100 text-slate-700"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(null);
                setIsPlaying(false);
              }} 
              className="p-1 hover:bg-red-50 text-slate-700 hover:text-red-500 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>,
        document.body
      )}

      {zoomImage && typeof window !== "undefined" && createPortal(
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-2 sm:p-6 animate-in fade-in duration-300 cursor-pointer"
          onClick={() => setZoomImage(null)}
        >
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 z-50">
            <span className="text-white/80 text-xs sm:text-sm font-medium bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10">
              Click anywhere to close
            </span>
            <button
              onClick={() => setZoomImage(null)}
              className="text-white hover:text-red-400 bg-white/10 hover:bg-white/20 p-2.5 sm:p-3 rounded-full transition-colors shadow-lg border border-white/10 cursor-pointer"
              title="Close Zoom"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div 
            className="relative w-full max-w-7xl max-h-[92vh] flex items-center justify-center p-1 cursor-default"
            onClick={e => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={zoomImage} 
              alt="Zoomed Content Image"
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.85)] border-2 sm:border-4 border-white bg-white"
            />
          </div>
        </div>,
        document.body
      )}
    </main>
  );
}
