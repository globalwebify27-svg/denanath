"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, X, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Play, Pause } from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";

export default function ClientPage({ data }: { data: any }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-grow">
        {/* Hero Section */}
        <div className="w-full bg-[#002b5c] relative overflow-hidden py-16">
          <div className="absolute inset-0 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] opacity-10 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#b2dfdb] mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/#courses" className="hover:text-white transition-colors">Courses</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{data.title}</span>
            </nav>

            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight max-w-4xl leading-tight">
              {data.title}
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-[#002b5c] border-b border-slate-100 pb-4 mb-6">
              Overview
            </h2>
            {data.content ? (
              <div 
                className="prose prose-slate max-w-none prose-headings:text-[#002b5c] prose-a:text-[#007a87] prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            ) : (
              <p className="text-slate-500">Detailed information about this program is currently being updated. Please check back later.</p>
            )}
            
            {data.link && data.link.trim() !== "" && (
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
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100">
              <h3 className="text-2xl font-bold text-[#002b5c] border-b border-slate-100 pb-4 mb-8">
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
    </main>
  );
}
