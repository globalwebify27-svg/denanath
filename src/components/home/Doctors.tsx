"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function DoctorsSection() {
  const doctors = [
    {
      name: "Dr. Rajesh Sharma",
      specialization: "Cardiologist",
      experience: "18+ Years Experience",
      qualification: "MD, DM Cardiology",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Dr. Priya Mehta",
      specialization: "Neurologist",
      experience: "12+ Years Experience",
      qualification: "MBBS, MD Neurology",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Dr. Aman Verma",
      specialization: "Orthopedic Surgeon",
      experience: "15+ Years Experience",
      qualification: "MS Orthopedics",
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Dr. Neha Kapoor",
      specialization: "Pediatrician",
      experience: "10+ Years Experience",
      qualification: "MD Pediatrics",
      image:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔥 Auto scroll interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;

      const cardWidth = 280; // approx card width + gap
      const maxScroll =
        container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = 300;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#007a87]">
              Meet Our Specialists
            </p>

            <h2 className="text-2xl md:text-4xl tracking-tight text-slate-900">
              Expert Doctors Dedicated <br />
              to Your Health
            </h2>
          </div>

          <p className="max-w-xl text-sm md:text-base text-slate-600 leading-relaxed">
            Our highly experienced specialists provide compassionate care.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex md:justify-center gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
          >
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="
                  min-w-full sm:min-w-[260px] max-w-[260px]
                  rounded-[1.5rem] text-center border border-slate-200 bg-white shadow-sm
                  snap-start overflow-hidden flex-shrink-0
                "
              >
                <div className="relative h-[280px] sm:h-[340px] w-full overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] sm:text-xs font-semibold text-[#002b5c]">
                    {doctor.specialization}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    {doctor.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#007a87] font-medium">
                    {doctor.qualification}
                  </p>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600">
                    {doctor.experience}
                  </p>

                  <button className="mt-5 w-full rounded-xl bg-[#002b5c] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#007a87] transition">
                    Book Appointment
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
{/* Buttons */}
<div className="mt-6 md:hidden  flex justify-center gap-4">
<button
  onClick={() => scroll("left")}
  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border bg-white shadow flex items-center justify-center"
>
  <ChevronLeft className="w-5 h-5" />
</button>

<button
  onClick={() => scroll("right")}
  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border bg-white shadow flex items-center justify-center"
>
  <ChevronRight className="w-5 h-5" />
</button>
</div>
        </div>
      </div>
    </section>
  );
}