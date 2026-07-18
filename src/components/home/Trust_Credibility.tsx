"use client";

import CountUp from "react-countup";
import { motion } from "framer-motion";

export default function TrustSection() {
  const stats = [
    {
      number: 25,
      suffix: "+",
      label: "Years of Experience",
      color: "text-[#007a87]",
    },
    {
      number: 1.2,
      suffix: "M+",
      label: "Patients Served",
      color: "text-[#007a87]",
    },
    {
      number: 400,
      suffix: "+",
      label: "Expert Doctors",
      color: "text-[#007a87]",
    },
    {
      number: 24,
      suffix: "x7",
      label: "Emergency Services",
      color: "text-[#007a87]",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-[20px] md:py-10">

      {/* Background Blur Effects */}
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-50"></div>

  <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl opacity-50"></div>

  {/* Soft Gradient */}
  <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f0f9ff] to-[#ecfeff]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
            Trusted Healthcare Excellence
          </span>

          <h2 className="mt-5 text-2xl font-semibold text-slate-900 md:text-4xl">
            Building Trust Through <br />
            <span className="text-[#007a87]">
              Care, Experience & Excellence
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg font-normal leading-[31px] text-slate-600">
            Delivering compassionate healthcare with advanced medical expertise,
            modern infrastructure, and trusted specialists.
          </p>
        </motion.div>

        {/* Stats Grid */}
<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-6">

  {/* NABH Card */}
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm hover:shadow-2xl transition col-span-1"
  >
    <h3 className="text-xl sm:text-2xl font-semibold text-[#007a87]">
      NABH
    </h3>
    <p className="mt-3 text-xs sm:text-sm text-slate-700">
      Accredited Hospital
    </p>
  </motion.div>

  {/* Dynamic Stats */}
{stats.map((item, index) => {
  const isLast = index === stats.length - 1;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
      }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className={`
        rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm transition hover:shadow-2xl
        col-span-1
        ${isLast ? "col-span-2 sm:col-span-1 lg:col-span-1 w-full" : ""}
      `}
    >
      <h3 className={`text-xl sm:text-3xl font-semibold ${item.color}`}>
        <CountUp
          end={item.number}
          duration={3}
          decimals={item.number % 1 !== 0 ? 1 : 0}
        />
        {item.suffix}
      </h3>

      <p className="mt-3 font-medium text-slate-700 text-xs sm:text-sm">
        {item.label}
      </p>
    </motion.div>
  );
})}

</div>
      </div>
    </section>
  );
}