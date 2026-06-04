"use client";

import React, { useEffect, useState } from "react";

export default function HeroSection() {
  const text = "Advanced Healthcare With Human Care";

  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

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
    <section className="relative w-full min-h-screen overflow-hidden bg-slate-950 border-b border-slate-200">
      {/* YouTube Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/tZeR1AGk_Uk?autoplay=1&mute=1&loop=1&playlist=tZeR1AGk_Uk&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&disablekb=1&modestbranding=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Hospital Drone Video"
          className="
          absolute top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          w-[350vw] h-[200vw]
          sm:w-[180vw] sm:h-[100vw]
          md:w-[120vw] md:h-[70vw]
          lg:w-[100vw] lg:h-[56.25vw]
          min-w-full min-h-full
          object-cover
          "
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 py-16">
        <div className="w-full max-w-5xl text-center text-white flex flex-col items-center">
          
          {/* Tag */}
          <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] xs:text-xs sm:text-sm backdrop-blur-md shadow-sm">
            24/7 Emergency & Multi-Speciality Care
          </div>

          {/* Heading - Added min-height classes to prevent jumping */}
          <div className="w-full min-h-[120px] xs:min-h-[140px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px] flex items-center justify-center">
            <h1
              className="
              text-3xl
              xs:text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              leading-[1.2]
              tracking-tight
              px-1
              break-words
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
            text-slate-200
            leading-relaxed
            px-4
            "
          >
            Trusted multi-speciality hospital delivering expert treatment,
            emergency care, and compassionate healing.
          </p>

          {/* Buttons - Fully Responsive */}
          <div
            className="
            mt-8
            mb-12
            sm:mb-16
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
            <button
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
              "
            >
              Book Appointment
            </button>

            <button
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
              "
            >
              Find a Doctor
            </button>

            <button
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
              "
            >
              Emergency Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}