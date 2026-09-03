"use client";

import React, { useEffect, useState, useRef } from "react";

export const defaultHeroData = {
  slides: [
    { src: "/images/Slider-1.png", alt: "Hospital Slider 1", pos: "object-[25%_30%]", link: "" },
    { src: "/images/Slider-2.png", alt: "Hospital Slider 2", pos: "object-[75%_40%]", link: "" },
    { src: "/images/Slider-3.png", alt: "Hospital Slider 3", pos: "object-[75%_40%]", link: "" },
    { src: "/images/Slider-4.png", alt: "Hospital Slider 4", pos: "object-[35%_40%]", link: "" },
    { src: "/images/Slider-5.png", alt: "Hospital Slider 5", pos: "object-[75%_40%]", link: "" },
    { src: "/images/Slider-6.png", alt: "Hospital Slider 6", pos: "object-[25%_35%]", link: "" },
    { src: "/images/Slider-7.png", alt: "Hospital Slider 7", pos: "object-[75%_40%]", link: "" },
    { src: "/images/Slider-8.png", alt: "Hospital Slider 8", pos: "object-[75%_40%]", link: "" },
    { src: "/images/Slider-9.png", alt: "Hospital Slider 9", pos: "object-[25%_35%]", link: "" },
    { src: "/images/Slider-10.png", alt: "Hospital Slider 10", pos: "object-[25%_40%]", link: "" },
  ]
};

export default function HeroSection({ data = defaultHeroData }: { data?: any }) {
  if (!data || !data.slides) data = defaultHeroData;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const slides = data.slides;

  // Auto-slide every 3 seconds, pauses when mouse is hovering on the hero
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  // Click on left half = previous slide, right half = next slide
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    // Don't trigger if user clicked on dots
    if ((e.target as HTMLElement).closest('[data-dots]')) return;
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;

    if (clickX < halfWidth) {
      // Clicked left half → previous slide
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    } else {
      // Clicked right half → next slide
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full md:min-h-[80vh] flex flex-col justify-center overflow-hidden bg-slate-950 border-b border-slate-200 cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={handleClick}
    >
      {/* Invisible relative image to set exact container height precisely on mobile to avoid black bars and cropping */}
      {slides.length > 0 && (
        <img src={slides[0].src} className="relative w-full h-auto opacity-0 pointer-events-none md:hidden block" alt="" />
      )}

      {/* Image Slider Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-slate-950">
        {slides.map(({ src, alt, pos }: { src: string; alt: string; pos: string }, i: number) => (
          <img
            key={src}
            src={src}
            alt={alt}
            className={`absolute inset-0 w-full h-full object-contain md:object-cover ${pos} md:object-center transition-opacity duration-700 ease-in-out ${
              i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent z-10 pointer-events-none" />

    </section>
  );
}