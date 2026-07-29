"use client";

import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
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
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center overflow-hidden bg-slate-950 border-b border-slate-200">
      {/* Image Slider Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-slate-950">
        {slides.map(({ src, alt, pos }, i) => (
          <img
            key={src}
            src={src}
            alt={alt}
            className={`absolute inset-0 w-full h-full object-cover ${pos} md:object-center transition-opacity duration-1000 ease-in-out ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent z-10" />
    </section>
  );
}

