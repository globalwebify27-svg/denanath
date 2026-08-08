"use client";

import React, { useEffect, useRef, useState } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { ChevronRight, Video, PlayCircle } from "lucide-react";

function getYouTubeEmbedUrl(url: string) {
  if (!url) return null;
  let videoId = "";
  try {
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    } else if (url.includes("youtube.com/watch")) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get("v") || "";
    } else if (url.includes("youtube.com/embed/")) {
      return url;
    }
  } catch (e) {
    return null;
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export default function GalleryVideosClientPage({ pageData }: { pageData: any }) {
  const {
    categories = [],
    videos = []
  } = pageData || {};

  const displayCategories = categories.includes("ALL") ? categories : ["ALL", ...categories];

  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredVideos = activeCategory === "ALL" 
    ? videos 
    : videos.filter((v: any) => v.category === activeCategory);

  const categoriesScrollRef = useRef<HTMLDivElement>(null);

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
            <span className="text-white">Videos</span>
          </div>
          <h1 className="text-[40px] leading-tight font-extrabold text-white tracking-tight flex items-center gap-4">
            Video Gallery
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 md:pt-5 md:pb-12">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
          
          {/* Dynamic Sidebar */}
          <DynamicSidebar categoryName="Patient & Visitors" activeHref="/gallery-videos" />

          {/* Right Main Content */}
          <div className="w-full flex-1">
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-slate-100/60 px-6 pt-3 pb-6 sm:px-10 sm:pt-4 sm:pb-10 md:px-14 md:pt-4 md:pb-8">
              
              <div className="mb-4">
                <div style={{ fontSize: '10px' }} className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4">
                  <Video className="w-4 h-4" />
                  <span>Media</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-4 tracking-tight">
                  Hospital Videos
                </h2>
                <div className="w-20 h-1.5 bg-[#007a87] rounded-full"></div>
              </div>
                
                {/* Categories Scrollable Row */}
                <div 
                  ref={categoriesScrollRef}
                  className="flex gap-2 overflow-x-auto pb-2 pt-1 mb-2 -mx-2 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

              {/* Videos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {filteredVideos.map((video: any, idx: number) => {
                  const embedUrl = getYouTubeEmbedUrl(video.url);
                  
                  return (
                    <div key={idx} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-teal-300 transition-all duration-300 flex flex-col h-full">
                      {embedUrl ? (
                        <div className="aspect-video w-full bg-slate-900 relative">
                          <iframe 
                            src={embedUrl}
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={video.title}
                          ></iframe>
                        </div>
                      ) : (
                        <div className="aspect-video bg-slate-800 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                          {/* Simulated thumbnail background */}
                          <div className="absolute inset-0 bg-slate-800"></div>
                          
                          <div className="relative z-20 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <PlayCircle className="w-8 h-8 text-white ml-1 opacity-50" />
                          </div>
                          
                          {/* Badge overlay */}
                          {video.category && (
                            <div className="absolute top-4 left-4 z-20 pointer-events-none">
                              <span className="bg-teal-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                {video.category}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Video Details */}
                      <div className="p-4 flex-1 flex flex-col justify-center bg-gray-50">
                        <h3 className="font-[600] text-[#002b5c] leading-snug line-clamp-2">
                          {video.title}
                        </h3>
                        {video.url && !embedUrl && (
                           <a href={video.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs text-[#007a87] font-bold hover:underline">
                             <span>Watch on YouTube</span>
                             <ChevronRight className="w-4 h-4" />
                           </a>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {filteredVideos.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-500">
                    No videos found for this category.
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
