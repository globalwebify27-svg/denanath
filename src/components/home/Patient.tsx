"use client";

import {
  CalendarCheck,
  Building2,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";

export default function PatientJourney() {

  const steps = [
    {
      title: "Book Appointment",
      description:
        "Schedule your consultation online or through our support team.",
      icon: CalendarCheck,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Visit Hospital",
      description:
        "Experience seamless check-in and personalized patient assistance.",
      icon: Building2,
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      title: "Consultation",
      description:
        "Meet our experienced specialists for expert diagnosis and guidance.",
      icon: Stethoscope,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Treatment",
      description:
        "Receive advanced treatment with world-class medical technology.",
      icon: HeartPulse,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Recovery Support",
      description:
        "Continuous follow-up care and recovery assistance for better healing.",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-100 blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-40"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#007a87]">
            Patient Journey
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Your Healthcare Journey <br />
            Made Simple & <span className="text-red-800">Supportive</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-600 leading-relaxed">
            From booking your appointment to complete recovery support,
            we ensure a smooth and compassionate healthcare experience.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Connecting Line */}
          <div className="absolute left-0 top-16 hidden h-1 w-full bg-gradient-to-r from-blue-200 via-cyan-200 to-emerald-200 lg:block"></div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                  }}
                  className="relative rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:shadow-2xl"
                >

                  {/* Step Number */}
                  <div className="absolute -top-4 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#002b5c] text-sm  text-white shadow-lg">
                    0{index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`mt-4 flex h-10 w-10 items-center justify-center rounded-2xl ${step.color}`}
                  >
                    <Icon className="h-5 w-6" />
                  </div>

                  {/* Content */}
                  <div className="mt-6">

                    <h3 className="text-xl font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {step.description}
                    </p>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}