"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";


export default function HeroSection() {
  const text = "Advanced Healthcare With Human Care";

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 10);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    let typingInterval: NodeJS.Timeout | undefined = undefined;

    if (index <= text.length) {
      typingInterval = setInterval(() => {
        setDisplayText(text.slice(0, index + 1));
        setIndex((prev) => prev + 1);
      }, 100);
    }

    if (index > text.length) {
      const timeout = setTimeout(() => {
        setDisplayText("");
        setIndex(0);
      }, 4000);

      return () => clearTimeout(timeout);
    }

    return () => {
      if (typingInterval) {
        clearInterval(typingInterval);
      }
    };
  }, [index, text]);

  return (
    <section className="relative w-full min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center overflow-hidden bg-slate-950 border-b border-slate-200">
      {/* Image Slider Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none bg-slate-950">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, i) => (
          <img
            key={num}
            src={`/images/Slider-${num}.png`}
            alt={`Hospital Slider ${num}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-10" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-20 flex-grow">
        <div className="w-full max-w-5xl text-center text-white flex flex-col items-center">
          
          {/* Tag */}
          <div className="mb-2 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 sm:px-8 sm:py-3 text-[10px] xs:text-xs sm:text-base backdrop-blur-md shadow-sm font-medium tracking-wide">
            24/7 Emergency & Multi-Speciality Care
          </div>

          {/* Heading - Added min-height classes to prevent jumping */}
          <div className="w-full min-h-[90px] xs:min-h-[110px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px] flex items-center justify-center">
            <h1
              className="
              text-3xl
              xs:text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              leading-[1.4]
              sm:leading-[1.2]
              tracking-tight
              px-1
              break-words
              drop-shadow-xl
              "
            >
              {displayText.includes("Human Care") ? (
                <>
                  {displayText.split("Human Care")[0]}
                  <span className="text-red-400">Human Care</span>
                </>
              ) : (
                displayText
              )}
            </h1>
          </div>

          {/* Description */}
          <p
            className="
            mt-2
            max-w-2xl
            mx-auto
            text-sm
            sm:text-base
            md:text-lg
            text-slate-100
            leading-relaxed
            px-4
            drop-shadow-lg
            font-medium
            "
          >
            Trusted multi-speciality hospital delivering expert treatment,
            emergency care, and compassionate healing.
          </p>

          {/* Buttons - Fully Responsive */}
          <div
            className="
            mt-4
            sm:mt-8
            mb-[20px] md:mb-[40px]
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-3
            sm:gap-4
            w-full
            max-w-[18rem]
            sm:max-w-3xl
            mx-auto
            "
          >
            <Link
              href="/book-appointment"
              className="
              w-full sm:w-auto
              px-6 py-3.5
              rounded-xl
              bg-red-800
              hover:bg-red-700
              transition-all duration-300
              font-semibold
              text-sm
              shadow-lg
              hover:-translate-y-1
              text-center
              "
            >
              Book Appointment
            </Link>

            <Link
              href="/doctor-details"
              className="
              w-full sm:w-auto
              px-6 py-3.5
              rounded-xl
              border border-white/30
              bg-white/10
              hover:bg-white/20
              backdrop-blur-md
              transition-all duration-300
              font-semibold
              text-sm
              shadow-lg
              hover:-translate-y-1
              text-center
              "
            >
              Find a Doctor
            </Link>

            <a
              href="tel:+912040151515"
              className="
              w-full sm:w-auto
              px-6 py-3.5
              rounded-xl
              bg-white
              text-black
              hover:bg-red-700
              hover:text-white
              transition-all duration-300
              font-semibold
              text-sm
              shadow-lg
              hover:-translate-y-1
              text-center
              "
            >
              Emergency Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}