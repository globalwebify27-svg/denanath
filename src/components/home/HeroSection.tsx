"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const defaultHeroData = {
  slides: [
    { src: "/images/Slider-1.png", alt: "Hospital Slider 1", pos: "object-[25%_30%]" },
    { src: "/images/Slider-2.png", alt: "Hospital Slider 2", pos: "object-[75%_40%]" },
    { src: "/images/Slider-3.png", alt: "Hospital Slider 3", pos: "object-[75%_40%]" },
    { src: "/images/Slider-4.png", alt: "Hospital Slider 4", pos: "object-[35%_40%]" },
    { src: "/images/Slider-5.png", alt: "Hospital Slider 5", pos: "object-[75%_40%]" },
    { src: "/images/Slider-6.png", alt: "Hospital Slider 6", pos: "object-[25%_35%]" },
    { src: "/images/Slider-7.png", alt: "Hospital Slider 7", pos: "object-[75%_40%]" },
    { src: "/images/Slider-8.png", alt: "Hospital Slider 8", pos: "object-[75%_40%]" },
    { src: "/images/Slider-9.png", alt: "Hospital Slider 9", pos: "object-[25%_35%]" },
    { src: "/images/Slider-10.png", alt: "Hospital Slider 10", pos: "object-[25%_40%]" },
  ]
};

export default function HeroSection({ data = defaultHeroData }: { data?: any }) {
  if (!data || !data.slides) data = defaultHeroData;
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = data.slides;

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center overflow-hidden bg-slate-950 border-b border-slate-200 group">
      {/* Image Slider Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-slate-950">
        {slides.map(({ src, alt, pos }, i) => (
          <img
            key={src}
            src={src}
            alt={alt}
            className={`absolute inset-0 w-full h-full object-cover ${pos} md:object-center transition-opacity duration-1000 ease-in-out ${
              i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent z-10 pointer-events-none" />

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all cursor-pointer ${
              i === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

