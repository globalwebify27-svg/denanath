"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export default function LightboxWrapper({ htmlContent }: { htmlContent: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const imgElements = Array.from(containerRef.current.querySelectorAll('img'));
      const imgData = imgElements.map(img => ({
        src: img.getAttribute('src') || img.src,
        alt: img.alt || 'Gallery Image'
      }));
      setImages(imgData);
      
      // Make them look clickable via CSS injected to the container
      imgElements.forEach(img => {
        img.style.cursor = 'pointer';
        // Add a class so we can style hover if needed
        img.classList.add('lightbox-enabled-img');
      });
    }
  }, [htmlContent]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    
    // Find if the clicked element is an image, or contains an image (like clicking the card wrapper)
    // Or if a child of a card was clicked, traverse up to find the card, then get its image.
    let imgElement: HTMLImageElement | null = null;
    
    if (target.tagName === 'IMG') {
      imgElement = target as HTMLImageElement;
    } else {
      // Traverse up to find a container that might have an image (e.g. the rounded-xl border div)
      const card = target.closest('div.border.rounded-xl') || target;
      imgElement = card.querySelector('img');
    }

    if (imgElement) {
      e.preventDefault();
      e.stopPropagation();
      const targetSrc = imgElement.getAttribute('src') || imgElement.src;
      const index = images.findIndex(img => img.src === targetSrc);
      if (index !== -1) {
        setCurrentIndex(index);
        setIsPlaying(false);
      }
    }
  };

  // Slideshow logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentIndex !== null) {
      interval = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev === null) return null;
          return prev === images.length - 1 ? 0 : prev + 1;
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentIndex, images.length]);

  const handleClose = () => {
    setCurrentIndex(null);
    setIsPlaying(false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => {
      if (prev === null) return null;
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(prev => {
      if (prev === null) return null;
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div 
        ref={containerRef}
        onClick={handleContainerClick}
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />

      {currentIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Main Image Container */}
          <div 
            className="relative flex items-center justify-center max-w-5xl w-full h-[75vh]"
            onClick={e => e.stopPropagation()} // prevent close on click inside
          >
            <img 
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt}
              className="max-w-full max-h-full object-contain shadow-[0_0_40px_rgba(0,0,0,0.5)] border-4 border-white rounded-sm bg-white"
            />
          </div>

          {/* Controls Bar */}
          <div 
            className="mt-4 bg-white/95 px-4 py-2 rounded flex items-center justify-between w-full max-w-4xl shadow-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-sm font-bold text-slate-700 min-w-[50px]">
              {currentIndex + 1} / {images.length}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={handlePrev} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors bg-slate-100 text-slate-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={togglePlay} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors bg-slate-100 text-slate-700">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button onClick={handleNext} className="p-1.5 hover:bg-slate-200 rounded-full transition-colors bg-slate-100 text-slate-700">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button onClick={handleClose} className="p-1 hover:bg-red-50 text-slate-700 hover:text-red-500 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
