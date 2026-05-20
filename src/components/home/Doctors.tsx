"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-40"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#007a87]">
              Meet Our Specialists
            </p>

            <h2 className="text-4xl  tracking-tight text-slate-900 md:text-3xl">
              Expert Doctors Dedicated <br />
              to Your Health
            </h2>
          </div>

          <p className="max-w-xl text-slate-600 leading-relaxed">
            Our highly experienced specialists provide compassionate care,
            advanced treatments, and world-class medical expertise across
            multiple specialties.
          </p>
        </div>

        {/* Doctors Carousel */}
        <div className="relative">

          {/* Scroll Container */}
    <div className="flex gap-6 justify-center items-center overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide snap-x snap-mandatory">

            {doctors.map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="min-w-[260px] max-w-[260px] rounded-[1.5rem] text-center border border-slate-200 bg-white shadow-sm transition hover:shadow-2xl snap-start overflow-hidden"
              >

                {/* Doctor Image */}
                <div className="relative h-[340px] w-full overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Department Badge */}
                  <div className="absolute top-4 left-4 rounded-full bg-white/90 px-4 py-1 text-xs font-semibold text-[#002b5c] backdrop-blur-md">
                    {doctor.specialization}
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-6">

                  <h3 className="text-2xl font-bold text-slate-900">
                    {doctor.name}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-[#007a87]">
                    {doctor.qualification}
                  </p>

                  <p className="mt-3 text-slate-600">
                    {doctor.experience}
                  </p>

                  {/* CTA */}
                  <button className="mt-6 text-sm w-full rounded-2xl bg-[#002b5c] px-5 py-3 font-semibold text-white transition duration-300 hover:bg-[#007a87] hover:shadow-xl">
                    Book Appointment
                  </button>
                </div>

              </motion.div>
            ))}

          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-center gap-4">

            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100">
              <ChevronRight className="h-5 w-5" />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}