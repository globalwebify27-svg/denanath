"use client";

import React, { useEffect, useRef, useState } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { ChevronRight, Image as ImageIcon, Maximize2, X, ChevronLeft, Pause, Play } from "lucide-react";

export default function GalleryPhotosClientPage({ pageData }: { pageData: any }) {
  const {
    categories = [],
    photos = []
  } = pageData || {};

  const displayCategories = categories.includes("ALL") ? categories : ["ALL", ...categories];

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredPhotos = activeCategory === "ALL" 
    ? photos 
    : photos.filter((p: any) => p.category === activeCategory);

  const categoriesScrollRef = useRef<HTMLDivElement>(null);

  // Slideshow logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && lightboxIndex !== null) {
      interval = setInterval(() => {
        setLightboxIndex(prev => {
          if (prev === null) return null;
          return prev === filteredPhotos.length - 1 ? 0 : prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, lightboxIndex, filteredPhotos.length]);

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
            <span className="hover:text-white transition-colors cursor-pointer">Patient & Visitors</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">Photos</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
            Photo Gallery
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 md:pt-5 md:pb-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Dynamic Sidebar */}
          <DynamicSidebar categoryName="Patient & Visitors" activeHref="/gallery-photos" />

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-3 pb-6 sm:px-10 sm:pt-4 sm:pb-10 md:px-14 md:pt-4 md:pb-8">
              
              <div className="mb-4">
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <ImageIcon className="w-4 h-4" />
                  <span>Media</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-4 tracking-tight">
                  Hospital Photos
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full"></div>
              </div>
              
                {/* Categories Scrollable Row */}
                <div 
                  ref={categoriesScrollRef}
                  className="flex gap-2 overflow-x-auto pb-3 pt-1 mb-4 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {displayCategories.map((cat: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveCategory(cat)}
                      className={"whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 " + (
                        activeCategory === cat 
                          ? "bg-[#002b5c] text-white shadow-md transform scale-105" 
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhotos.map((photo: any, idx: number) => (
                  <div 
                    key={idx} 
                    className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col h-full"
                    onClick={() => photo.url && setLightboxIndex(idx)}
                  >
                    {/* Photo Thumbnail */}
                    <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-200 transition-colors">
                      {photo.url ? (
                        <img 
                          src={photo.url} 
                          alt={photo.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-slate-300 group-hover:text-teal-400 group-hover:scale-110 transition-all duration-300" />
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-end p-4">
                        <Maximize2 className="w-5 h-5 text-white drop-shadow-md" />
                      </div>
                      
                      {/* Badge overlay */}
                      {photo.category && (
                        <div className="absolute top-3 left-3 z-20">
                          <span className="bg-white/90 backdrop-blur-sm text-[#007a87] text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
                            {photo.category.replace(" BUILDING", "").substring(0, 15)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Photo Details */}
                    <div className="p-4 border-t border-slate-100 bg-white relative z-10 flex-1 flex items-center">
                      <h3 className="font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors text-sm leading-snug">
                        {photo.title}
                      </h3>
                    </div>
                  </div>
                ))}
                
                {filteredPhotos.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-500">
                    No photos found for this category.
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4"
          onClick={() => { setLightboxIndex(null); setIsPlaying(false); }}
        >
          {/* Main Image Container */}
          <div 
            className="relative flex items-center justify-center max-w-5xl w-full h-[75vh]"
            onClick={e => e.stopPropagation()}
          >
            <img 
              src={filteredPhotos[lightboxIndex].url} 
              alt={filteredPhotos[lightboxIndex].title}
              className="max-w-full max-h-full object-contain shadow-[0_0_40px_rgba(0,0,0,0.5)] border-4 border-white rounded-sm bg-white"
            />
          </div>

          {/* Controls Bar */}
          <div 
            className="mt-4 bg-white/95 px-4 py-2 rounded flex items-center justify-between w-full max-w-4xl shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-sm font-bold text-slate-700 min-w-[50px]">
              {lightboxIndex + 1} / {filteredPhotos.length}
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => prev === null ? null : (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
                }} 
                className="p-1.5 hover:bg-slate-200 rounded-full transition-colors bg-slate-100 text-slate-700"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }} 
                className="p-1.5 hover:bg-slate-200 rounded-full transition-colors bg-slate-100 text-slate-700"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => prev === null ? null : (prev === filteredPhotos.length - 1 ? 0 : prev + 1));
                }} 
                className="p-1.5 hover:bg-slate-200 rounded-full transition-colors bg-slate-100 text-slate-700"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button 
              onClick={() => { setLightboxIndex(null); setIsPlaying(false); }} 
              className="p-1 hover:bg-red-50 text-slate-700 hover:text-red-500 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
