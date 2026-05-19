import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[40vh] sm:h-[60vh] md:h-[75vh] min-h-[300px] sm:min-h-[450px] md:min-h-[550px] overflow-hidden bg-slate-950 border-b border-slate-200">
      {/* YouTube Background Video Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
        <iframe
          src="https://www.youtube.com/embed/sGyAIy71wD4?autoplay=1&mute=1&loop=1&playlist=sGyAIy71wD4&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&disablekb=1&modestbranding=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 brightness-85 pointer-events-none scale-105"
          title="Hospital Drone Video"
        />
      </div>

      {/* Subtle overlay gradient to blend with the rest of the layout */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none z-10" />
    </section>
  );
}
