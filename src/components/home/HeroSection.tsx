import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[40vh] sm:h-[60vh] md:h-[75vh] min-h-[300px] sm:min-h-[450px] md:min-h-[550px] overflow-hidden bg-slate-900 border-b border-slate-200">
      {/* HTML5 Drone Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none brightness-90 z-0"
        poster="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1920&auto=format&fit=crop"
      >
        <source
          src="https://mercer-health.s3.us-east-2.amazonaws.com/wp-content/uploads/2022/08/29130541/Mercer-Health-Maria-Stein-March-2023.mp4"
          type="video/mp4"
        />
        {/* Fallback image */}
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1920&auto=format&fit=crop"
          alt="Deenanath Mangeshkar Hospital Corporate Campus"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none brightness-90"
        />
      </video>
    </section>
  );
}
