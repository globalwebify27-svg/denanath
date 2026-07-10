"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export default function LightboxWrapper({ htmlContent }: { htmlContent: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      // --- Auto-Slider for Multiple Images in a Single Paragraph ---
      // If the admin places multiple images inside a single paragraph, turn them into a slider
      // without breaking the grid layout or merging other paragraphs.
      const pTags = containerRef.current.querySelectorAll('.department-facilities-section p');
      pTags.forEach(p => {
        if (p.hasAttribute('data-slider-init')) return;
        p.setAttribute('data-slider-init', 'true');

        const images = Array.from(p.querySelectorAll('img'));
        if (images.length > 1) {
          // Hide original images in the P tag so we can wrap them
          images.forEach(img => { (img as HTMLElement).style.display = 'none'; });

          const sliderContainer = document.createElement('div');
          sliderContainer.className = "relative group w-full mt-2";
          
          const scrollArea = document.createElement('div');
          scrollArea.className = "flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 scrollbar-hide";
          scrollArea.style.scrollbarWidth = 'none'; // Firefox
          scrollArea.style.setProperty('-ms-overflow-style', 'none'); // IE/Edge
          
          images.forEach(img => {
              const imgWrapper = document.createElement('div');
              imgWrapper.className = "snap-center shrink-0 w-full rounded-xl overflow-hidden shadow-sm relative bg-white";
              
              const newImg = document.createElement('img');
              newImg.src = img.src;
              newImg.alt = img.alt || "Facility Image";
              newImg.className = "w-full h-48 sm:h-56 object-cover lightbox-enabled-img transition-transform hover:scale-105 duration-500";
              newImg.style.cursor = 'pointer';
              
              imgWrapper.appendChild(newImg);
              scrollArea.appendChild(imgWrapper);
          });
          
          sliderContainer.appendChild(scrollArea);
          
          const prevBtn = document.createElement('button');
          prevBtn.innerHTML = '&#10094;'; // <
          prevBtn.className = "absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-teal-700 w-8 h-8 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 font-bold border border-teal-100";
          prevBtn.onclick = (e) => { e.stopPropagation(); scrollArea.scrollBy({ left: -scrollArea.clientWidth, behavior: 'smooth' }); };
          
          const nextBtn = document.createElement('button');
          nextBtn.innerHTML = '&#10095;'; // >
          nextBtn.className = "absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-teal-700 w-8 h-8 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 font-bold border border-teal-100";
          nextBtn.onclick = (e) => { e.stopPropagation(); scrollArea.scrollBy({ left: scrollArea.clientWidth, behavior: 'smooth' }); };
          
          sliderContainer.appendChild(prevBtn);
          sliderContainer.appendChild(nextBtn);
          
          p.appendChild(sliderContainer);
        }
      });

      // --- Convert Video Embed Placeholders to Real Players ---
      setTimeout(() => {
        try {
          const videoEmbeds = containerRef.current?.querySelectorAll('.video-embed');
          if (!videoEmbeds) return;
          
          videoEmbeds.forEach(div => {
            if (div.hasAttribute('data-video-init')) return;
            div.setAttribute('data-video-init', 'true');

            const videoUrl = div.getAttribute('data-video-url') || '';
            const videoType = div.getAttribute('data-video-type') || '';

            if (!videoUrl) return;

            // Create a 16:9 wrapper floated left
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'float:left;width:400px;max-width:100%;margin:0 24px 16px 0;position:relative;padding-bottom:min(225px, 56.25%);height:0;overflow:hidden;border-radius:12px;box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);border:1px solid #e2e8f0;';

            if (videoType === 'embed' || videoUrl.includes('youtube.com/embed') || videoUrl.includes('player.vimeo.com')) {
              const iframe = document.createElement('iframe');
              iframe.src = videoUrl;
              iframe.frameBorder = '0';
              iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
              iframe.allowFullscreen = true;
              iframe.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
              wrapper.appendChild(iframe);
            } else {
              const video = document.createElement('video');
              video.controls = true;
              video.src = videoUrl;
              video.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;object-fit:contain;background:#000;';
              wrapper.appendChild(video);
            }

            const parentSection = div.closest('section');
            if (parentSection) {
              // Establish a new block formatting context to contain the float (prevents bleeding into next sections)
              parentSection.style.display = 'flow-root';
              
              // Move the video to the very top of the section so all content wraps around it
              // Skip the <h3> heading if it exists so the title stays at the top
              const heading = parentSection.querySelector('h3');
              if (heading && heading.parentElement === parentSection) {
                 parentSection.insertBefore(wrapper, heading.nextSibling);
              } else {
                 parentSection.insertBefore(wrapper, parentSection.firstChild);
              }
              div.remove();
            } else {
              div.replaceWith(wrapper);
              if (wrapper.parentElement) {
                 wrapper.parentElement.style.display = 'flow-root';
              }
            }
          });
        } catch (e) {
          console.error("Error converting videos:", e);
        }
      }, 100);

      // --- Lightbox Initialization ---
      const imgElements = Array.from(containerRef.current.querySelectorAll('img'));
      const imgData = imgElements.map(img => ({
        src: img.getAttribute('src') || img.src,
        alt: img.alt || 'Gallery Image'
      }));
      setImages(imgData);
      
      // Make them look clickable via CSS injected to the container
      imgElements.forEach(img => {
        if (img.style.display !== 'none') {
          img.style.cursor = 'pointer';
          if (!img.classList.contains('lightbox-enabled-img')) {
            img.classList.add('lightbox-enabled-img');
          }
        }
      });

      // --- FAQ Details Hover/Click Logic ---
      const detailsElements = containerRef.current.querySelectorAll('details.faq-item');
      detailsElements.forEach(details => {
        if (details.hasAttribute('data-hover-init')) return;
        details.setAttribute('data-hover-init', 'true');
        
        let timeout: NodeJS.Timeout;
        
        details.addEventListener('mouseenter', () => {
          clearTimeout(timeout);
          details.setAttribute('open', '');
        });
        
        details.addEventListener('mouseleave', () => {
          timeout = setTimeout(() => {
            details.removeAttribute('open');
          }, 150); // slight delay to make hover less jittery
        });
        
        // Prevent click from immediately closing if we are hovering
        const summary = details.querySelector('summary');
        if (summary) {
           summary.addEventListener('click', (e) => {
             e.preventDefault(); // we handle toggle manually
             if (details.hasAttribute('open')) {
               details.removeAttribute('open');
             } else {
               details.setAttribute('open', '');
             }
           });
        }
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
        className="[&_img]:cursor-pointer [&_img]:transition-transform [&_img]:duration-300 [&_img]:hover:scale-[1.02] overflow-hidden"
      />

      {currentIndex !== null && createPortal(
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
        </div>,
        document.body
      )}
    </>
  );
}
