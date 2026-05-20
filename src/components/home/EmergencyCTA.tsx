"use client";

import { motion } from "framer-motion";
import {
  PhoneCall,
  Ambulance,
  CalendarHeart,
  ArrowRight,
} from "lucide-react";

export default function EmergencyCTA() {
  return (
<section className="relative overflow-hidden mt-24 max-w-7xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-[#fff1f2] via-[#ffffff] to-[#ffe4e6] py-14">

  {/* Red Glow Effects */}
  <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-red-200/40 blur-3xl"></div>
  <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-rose-200/40 blur-3xl"></div>

  {/* Grid Pattern */}
  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#7f1d1d_1px,transparent_1px),linear-gradient(to_bottom,#7f1d1d_1px,transparent_1px)] bg-[size:42px_42px]"></div>

  <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="grid lg:grid-cols-2 gap-8 items-center"
    >

      {/* Left Content */}
      <div>

        {/* Badge */}
        <div className="
          inline-flex items-center gap-2
          rounded-full border border-red-200
          bg-white/80 backdrop-blur-xl
          px-4 py-2 shadow-sm
        ">

          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>

          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-600">
            Emergency Medical Support
          </p>

        </div>

        {/* Heading */}
        <h2 className="
          mt-6 text-3xl sm:text-5xl
          font-light tracking-tight
          leading-tight text-slate-900
        ">

          Need Immediate{" "}

          <span className="font-bold text-red-600">
            Medical Help?
          </span>

        </h2>

        {/* Description */}
        <p className="
          mt-5 max-w-xl
          text-sm sm:text-base
          leading-relaxed text-slate-600
        ">
          Rapid ambulance service, emergency specialists,
          trauma care, and ICU response teams available
          24/7 for urgent medical situations.
        </p>

        {/* Stats */}
        <div className="mt-8 flex flex-wrap gap-4">

          <div className="
            rounded-2xl border border-red-100
            bg-white/80
            px-5 py-4
            shadow-sm
          ">
            <h3 className="text-2xl font-bold text-slate-900">
              15m
            </h3>

            <p className="text-xs text-slate-500">
              Avg Response
            </p>
          </div>

          <div className="
            rounded-2xl border border-red-100
            bg-white/80
            px-5 py-4
            shadow-sm
          ">
            <h3 className="text-2xl font-bold text-slate-900">
              24/7
            </h3>

            <p className="text-xs text-slate-500">
              Available
            </p>
          </div>

        </div>

      </div>

      {/* Right Cards */}
      <div className="grid gap-5">

        {/* Card 1 */}
        <motion.div
          whileHover={{ y: -6 }}
          className="
            group relative overflow-hidden
            rounded-[30px]
            border border-red-100
            bg-[#111111]
            p-6
            shadow-[0_15px_40px_rgba(239,68,68,0.15)]
            hover:shadow-[0_20px_55px_rgba(239,68,68,0.25)]
            transition-all duration-500
            cursor-pointer
          "
        >

          {/* Glow */}
          <div className="
            absolute inset-0 opacity-0
            group-hover:opacity-100
            transition duration-500
            bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_60%)]
          "></div>

          <div className="relative z-10 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="
                rounded-2xl bg-red-500/10
                p-3 ring-1 ring-white/10
              ">
                <PhoneCall className="h-5 w-5 text-red-400" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Call Ambulance
                </h3>

                <p className="text-sm text-red-200/70">
                  Immediate response team
                </p>
              </div>

            </div>

            <ArrowRight className="
              h-5 w-5 text-red-300
              transition-transform duration-300
              group-hover:translate-x-1
            " />

          </div>

        </motion.div>

        {/* Card 2 */}
        <motion.div
          whileHover={{ y: -6 }}
          className="
            group relative overflow-hidden
            rounded-[30px]
            border border-red-100
            bg-[#111111]
            p-6
            shadow-[0_15px_40px_rgba(239,68,68,0.15)]
            hover:shadow-[0_20px_55px_rgba(239,68,68,0.25)]
            transition-all duration-500
            cursor-pointer
          "
        >

          <div className="
            absolute inset-0 opacity-0
            group-hover:opacity-100
            transition duration-500
            bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_60%)]
          "></div>

          <div className="relative z-10 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="
                rounded-2xl bg-red-500/10
                p-3 ring-1 ring-white/10
              ">
                <Ambulance className="h-5 w-5 text-red-400" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Emergency Care
                </h3>

                <p className="text-sm text-red-200/70">
                  ICU & Trauma Support
                </p>
              </div>

            </div>

            <ArrowRight className="
              h-5 w-5 text-red-300
              transition-transform duration-300
              group-hover:translate-x-1
            " />

          </div>

        </motion.div>

        {/* Card 3 */}
        <motion.div
          whileHover={{ y: -6 }}
          className="
            group relative overflow-hidden
            rounded-[30px]
            border border-red-100
            bg-[#111111]
            p-6
            shadow-[0_15px_40px_rgba(239,68,68,0.15)]
            hover:shadow-[0_20px_55px_rgba(239,68,68,0.25)]
            transition-all duration-500
            cursor-pointer
          "
        >

          <div className="
            absolute inset-0 opacity-0
            group-hover:opacity-100
            transition duration-500
            bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_60%)]
          "></div>

          <div className="relative z-10 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="
                rounded-2xl bg-red-500/10
                p-3 ring-1 ring-white/10
              ">
                <CalendarHeart className="h-5 w-5 text-red-400" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Urgent Appointment
                </h3>

                <p className="text-sm text-red-200/70">
                  Priority consultation
                </p>
              </div>

            </div>

            <ArrowRight className="
              h-5 w-5 text-red-300
              transition-transform duration-300
              group-hover:translate-x-1
            " />

          </div>

        </motion.div>

      </div>

    </motion.div>
  </div>
</section>
  );
}