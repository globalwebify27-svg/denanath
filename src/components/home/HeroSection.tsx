import React from "react";

export default function HeroSection() {
  return (
<section className={` relative   w-full h-[40vh] sm:h-[60vh] md:h-[75vh] min-h-[300px] sm:min-h-[450px] md:min-h-[550px] overflow-hidden bg-slate-950 border-b border-slate-200`}>

  {/* YouTube Background Video */}
  <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0">
    <iframe
      src="https://www.youtube.com/embed/tZeR1AGk_Uk?autoplay=1&mute=1&loop=1&playlist=tZeR1AGk_Uk&controls=0&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1&disablekb=1&modestbranding=1"
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
      className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 scale-105 pointer-events-none"
      title="Hospital Drone Video"
    />
  </div>

  <div className="absolute inset-0 bg-black/40 z-10" />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-black/10 to-transparent z-10" />

  {/* Hero Content */}
  <div className="relative z-20 flex h-full items-center justify-center px-6">
    <div className="max-w-4xl text-center text-white">

      {/* Small Tag */}
      <div className="mb-5 inline-block  rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
        24/7 Emergency & Multi-Speciality Care
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-bold sm:text-4xl md:text-5xl  leading-tight">
        Advanced Healthcare With  <br />
        <span className="text-red-400">Human Care</span>
      </h1>

      {/* Subheading */}
      <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-sm text-slate-200">
        Trusted multi-speciality hospital delivering expert treatment,
        emergency care, and compassionate healing.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

        <button className="px-6 py-3 text-sm rounded-xl bg-red-800 hover:bg-red-700 transition font-semibold shadow-lg">
          Book Appointment
        </button>

        <button className="px-6 py-3 text-sm rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md transition font-semibold">
          Find a Doctor
        </button>

        <button className="px-6 py-3 text-sm rounded-xl bg-white text-black hover:text-white hover:bg-red-700 transition font-semibold shadow-lg">
          Emergency Support
        </button>

      </div>
    </div>
  </div>
</section>
  );
}
