import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[40vh] sm:h-[60vh] md:h-[75vh] min-h-[300px] sm:min-h-[450px] md:min-h-[550px] overflow-hidden bg-slate-100 border-b border-slate-200">
      {/* Full Screen HD Campus Underlay - 100% Opacity, Vibrant & Clear */}
      <img
        src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1920&auto=format&fit=crop"
        alt="Deenanath Mangeshkar Hospital Corporate Campus"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none brightness-90"
      />
    </section>
  );
}
