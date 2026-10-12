"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import DynamicSidebar from "@/components/DynamicSidebar";
import Link from "next/link";
import { ChevronRight, Image as ImageIcon, Maximize2, X, ChevronLeft, Pause, Play } from "lucide-react";

export default function GalleryPhotosClientPage({ pageData }: { pageData: any }) {
  const stripHtml = (str: string) => str.replace(/<[^>]*>/g, '').trim();
  
  const rawCategories = (pageData?.categories || []).map((c: string) => stripHtml(c)).filter((c: string) => c);
  
  // Clean photos and filter out items without valid URLs
  const rawPhotos = (pageData?.photos || [])
    .map((p: any) => ({ 
      title: p.title ? stripHtml(p.title) : '', 
      category: stripHtml(p.category || ''),
      url: (p.url || '').trim()
    }))
    .filter((p: any) => Boolean(p.url));

  const displayCategories = rawCategories.includes("ALL") ? rawCategories : ["ALL", ...rawCategories];

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Swipe / Drag state for sliding gesture
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const filteredPhotos = activeCategory === "ALL" 
    ? rawPhotos 
    : rawPhotos.filter((p: any) => p.category === activeCategory);

  const categoriesScrollRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Navigation handlers with wrap-around
  const goToSlide = useCallback((index: number) => {
    if (filteredPhotos.length === 0) return;
    const newIdx = (index + filteredPhotos.length) % filteredPhotos.length;
    setLightboxIndex(newIdx);
  }, [filteredPhotos.length]);

  const handlePrev = useCallback(() => {
    if (lightboxIndex !== null) goToSlide(lightboxIndex - 1);
  }, [lightboxIndex, goToSlide]);

  const handleNext = useCallback(() => {
    if (lightboxIndex !== null) goToSlide(lightboxIndex + 1);
  }, [lightboxIndex, goToSlide]);

  // Slideshow logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && lightboxIndex !== null && filteredPhotos.length > 1) {
      interval = setInterval(() => {
        handleNext();
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, lightboxIndex, filteredPhotos.length, handleNext]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
        setIsPlaying(false);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  // Center active thumbnail in bottom strip
  useEffect(() => {
    if (lightboxIndex !== null && thumbnailRefs.current[lightboxIndex]) {
      thumbnailRefs.current[lightboxIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [lightboxIndex]);

  // Touch & Mouse drag handlers for sliding
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setTouchStartX(clientX);
    setTouchDeltaX(0);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (touchStartX === null || !isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setTouchDeltaX(clientX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || !isDragging) return;
    const threshold = 50; // swipe trigger threshold
    if (touchDeltaX < -threshold) {
      handleNext();
    } else if (touchDeltaX > threshold) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-teal-500/30">
      {/* Premium Page Header */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-10">
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

      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 md:pt-5 md:pb-12">
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
                    onClick={() => {
                      setActiveCategory(cat);
                      if (lightboxIndex !== null) setLightboxIndex(null);
                    }}
                    className={" px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 " + (
                      activeCategory === cat 
                        ? "bg-[#002b5c] text-white shadow-md transform scale-105" 
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Photos Grid */}
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
                          alt={photo.title || 'Hospital Photo'} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                          loading="lazy"
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
                            {photo.category.replace(" BUILDING", "").substring(0, 18)}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Photo Details */}
                    <div className="p-4 border-t border-slate-100 bg-white relative z-10 flex-1 flex items-center">
                      <h3 className="font-bold text-[#002b5c] group-hover:text-[#007a87] transition-colors text-sm leading-snug line-clamp-2">
                        {photo.title || "Hospital Photo"}
                      </h3>
                    </div>
                  </div>
                ))}
                
                {filteredPhotos.length === 0 && (
                  <div className="col-span-full py-16 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="font-semibold text-slate-600">No photos found for this category.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Sliding Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos.length > 0 && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between overflow-hidden select-none"
          onClick={() => { setLightboxIndex(null); setIsPlaying(false); }}
        >
          {/* Top Bar: Title, Category, Counter, and Controls */}
          <div 
            className="w-full z-40 px-4 sm:px-8 py-3.5 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent"
            onClick={e => e.stopPropagation()}
          >
            {/* Left: Info */}
            <div className="flex items-center gap-3 max-w-[60%] sm:max-w-[70%]">
              {filteredPhotos[lightboxIndex]?.category && (
                <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0">
                  {filteredPhotos[lightboxIndex].category}
                </span>
              )}
              <h3 className="text-white text-sm sm:text-base font-semibold truncate drop-shadow">
                {filteredPhotos[lightboxIndex]?.title || "Hospital Photo"}
              </h3>
            </div>

            {/* Right: Counter, Slideshow, Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-white/80 text-xs sm:text-sm font-semibold bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
                {lightboxIndex + 1} / {filteredPhotos.length}
              </span>

              {filteredPhotos.length > 1 && (
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? "Pause Slideshow (Space)" : "Play Slideshow (Space)"}
                  className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                    isPlaying 
                      ? "bg-teal-500 text-white border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.5)]" 
                      : "bg-white/10 hover:bg-white/20 text-white border-white/15"
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              )}

              <button
                onClick={() => { setLightboxIndex(null); setIsPlaying(false); }}
                title="Close (Esc)"
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-red-500/80 text-white border border-white/15 transition-all hover:scale-105 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Stage: Sliding Image Carousel with Touch & Mouse Swipe */}
          <div 
            className="relative flex-1 w-full min-h-0 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
          >
            {/* Sliding Track */}
            <div 
              className="flex h-full w-full items-center"
              style={{
                transform: `translateX(calc(-${lightboxIndex * 100}% + ${touchDeltaX}px))`,
                transition: isDragging ? 'none' : 'transform 400ms cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {filteredPhotos.map((photo: any, idx: number) => (
                <div 
                  key={idx} 
                  className="w-full h-full shrink-0 flex items-center justify-center p-4 sm:p-8"
                >
                  <div className="relative max-h-full max-w-full flex items-center justify-center">
                    <img 
                      src={photo.url} 
                      alt={photo.title || 'Hospital Photo'} 
                      className="max-h-[72vh] sm:max-h-[75vh] max-w-[92vw] sm:max-w-[85vw] object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.9)] rounded-xl select-none"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Left Chevron Arrow */}
            {filteredPhotos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                aria-label="Previous image (Left Arrow)"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 group"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
              </button>
            )}

            {/* Floating Right Chevron Arrow */}
            {filteredPhotos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                aria-label="Next image (Right Arrow)"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 group"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Thumbnail Strip Carousel */}
          {filteredPhotos.length > 1 && (
            <div 
              className="w-full z-40 py-3.5 px-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col items-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 max-w-full overflow-x-auto py-1 px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {filteredPhotos.map((p: any, idx: number) => (
                  <button
                    key={idx}
                    ref={el => { thumbnailRefs.current[idx] = el; }}
                    onClick={() => goToSlide(idx)}
                    title={p.title || `Photo ${idx + 1}`}
                    className={`relative shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                      idx === lightboxIndex
                        ? "w-16 h-12 sm:w-20 sm:h-14 ring-2 ring-teal-400 ring-offset-2 ring-offset-black scale-105 opacity-100 shadow-[0_0_12px_rgba(45,212,191,0.5)]"
                        : "w-12 h-9 sm:w-16 sm:h-11 opacity-45 hover:opacity-85 scale-95 hover:scale-100"
                    }`}
                  >
                    <img 
                      src={p.url} 
                      alt={p.title || `Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
