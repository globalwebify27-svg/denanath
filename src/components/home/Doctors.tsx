"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

export const defaultDoctorsData = {
  tagline: "Meet Our Specialists",
  title: "Expert Doctors Dedicated \\nto Your Health",
  description: "Our highly experienced specialists provide compassionate care.",
  doctors: [
    {
      name: "Dr. Agarkhedkar Nikhil",
      specialization: "Plastic Surgery",
      experience: "11+ Years Experience",
      qualification: "MBBS, MS, MCh (Plastic Surgery)",
      image: "/images/3678_Pic.png",
      id: "3678",
    },
    {
      name: "Dr. Rege Ishant",
      specialization: "Neurological Surgery",
      experience: "6+ Years Experience",
      qualification: "MBBS, MS, MCh Neurosurgery",
      image: "/images/1955_Pic.jpg",
      id: "19518",
    },
    {
      name: "Dr. Nagare Umesh",
      specialization: "Orthopaedics",
      experience: "14+ Years Experience",
      qualification: "MBBS, D' ORTHO, MS (UK), MRCSI",
      image: "/images/1100_Pic.jpg",
      id: "764",
    },
    {
      name: "Dr. Nadkarni Anupama",
      specialization: "Paediatrics",
      experience: "17+ Years Experience",
      qualification: "MBBS, MS (PUNE), FRCS (LONDON)",
      image: "/images/971_Pic.jpg",
      id: "649",
    },
  ]
};

export default function DoctorsSection({ data = defaultDoctorsData }: { data?: any }) {
  if (!data || Object.keys(data).length === 0) data = defaultDoctorsData;
  const doctors = data.doctors || defaultDoctorsData.doctors;

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
    <section className="relative overflow-hidden bg-slate-50 py-[20px] md:py-10">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#007a87]">
              {data.tagline}
            </p>

            <h2 className="text-2xl md:text-4xl tracking-tight text-slate-900" dangerouslySetInnerHTML={{ __html: (data.title || "").replace(/\\n/g, '<br/>') }}>
            </h2>
          </div>

          <p className="max-w-xl text-[18px] text-slate-600 leading-[31px]">
            {data.description}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex md:justify-center gap-4 sm:gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                className="
                  w-[280px] sm:w-[260px]
                  rounded-[1.5rem] text-center border border-slate-200 bg-white shadow-sm
                  snap-start overflow-hidden flex-shrink-0 flex flex-col
                "
              >
                <Link href={`/doctor-details/${doctor.id}`} className="relative h-[340px] w-full overflow-hidden block group">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[10px] sm:text-xs font-semibold text-[#002b5c]">
                    {doctor.specialization}
                  </div>
                </Link>

                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <Link href={`/doctor-details/${doctor.id}`} className="hover:text-[#007a87] transition-colors">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {doctor.name}
                    </h3>
                  </Link>

                  <p className="mt-2 text-xs sm:text-sm text-[#007a87] font-medium">
                    {doctor.qualification}
                  </p>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 mb-5">
                    {doctor.experience}
                  </p>

                  <Link href={`/doctor-details/${doctor.id}`} className="mt-auto w-full rounded-xl bg-[#002b5c] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#007a87] transition flex items-center justify-center">
                    Book Appointment
                  </Link>
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