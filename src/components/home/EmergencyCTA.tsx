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
    <section className="relative overflow-hidden mt-24 max-w-7xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-slate-50 via-white to-rose-50/50 py-16 border border-rose-100/60 shadow-[0_20px_50px_rgba(244,63,94,0.05)]">

      {/* Advanced Ambient Glow Effects (Medical Vibe) */}
      <div className="absolute top-[-20%] left-[-10%] h-[450px] w-[450px] rounded-full bg-gradient-to-br from-red-200/40 to-rose-300/30 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] h-[450px] w-[450px] rounded-full bg-gradient-to-br from-rose-200/30 to-red-300/40 blur-[100px] pointer-events-none"></div>

      {/* Premium Clean Medical Cross/Grid Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#e11d48_1.2px,transparent_1.2px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >

          {/* Left Content Side */}
          <div>

            {/* Emergency Status Badge */}
            <div className="
              inline-flex items-center gap-2.5
              rounded-full border border-red-200/80
              bg-white px-4 py-2 shadow-sm
            ">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>

              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-red-600">
                Emergency Medical Support
              </p>
            </div>

            {/* Main Catchy Heading */}
            <h2 className="
              mt-6 text-3xl sm:text-5xl
              font-light tracking-tight
              leading-tight text-slate-900
            ">
              Need Immediate{" "}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-700">
                Medical Help?
              </span>
            </h2>

            {/* Subtext Description */}
            <p className="
              mt-5 max-w-xl
              text-sm sm:text-base
              leading-relaxed text-slate-600
            ">
              Rapid ambulance service, emergency specialists, trauma care, and ICU response teams available 24/7 for urgent medical situations.
            </p>

            {/* Visual Stats Indicators */}
            <div className="mt-8 flex flex-wrap gap-4">

              <div className="
                rounded-2xl border border-rose-100
                bg-white/90 backdrop-blur-md
                px-6 py-4.5
                shadow-[0_4px_20px_rgba(0,0,0,0.02)]
              ">
                <h3 className="text-2xl font-black text-slate-900">
                  15m
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Avg Response
                </p>
              </div>

              <div className="
                rounded-2xl border border-rose-100
                bg-white/90 backdrop-blur-md
                px-6 py-4.5
                shadow-[0_4px_20px_rgba(0,0,0,0.02)]
              ">
                <h3 className="text-2xl font-black text-slate-900">
                  24/7
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  Guaranteed Available
                </p>
              </div>

            </div>

          </div>

          {/* Right Actionable Red Buttons */}
          <div className="grid gap-4.5">

            {/* Action Card 1: Call Ambulance */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="
                group relative overflow-hidden
                rounded-[2rem]
                bg-gradient-to-r from-red-600 to-red-700
                p-6
                shadow-[0_15px_30px_rgba(220,38,38,0.25)]
                hover:shadow-[0_20px_40px_rgba(220,38,38,0.35)]
                transition-all duration-300
                cursor-pointer
              "
            >
              {/* Internal Smooth Flare Highlight on Hover */}
              <div className="
                absolute inset-0 opacity-0
                group-hover:opacity-100
                transition duration-500
                bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]
              "></div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  
                  {/* High Contrast White Icon Box */}
                  <div className="
                    rounded-2xl bg-white/25 
                    p-3.5 text-white ring-1 ring-white/20
                    backdrop-blur-md
                  ">
                    <PhoneCall className="h-5 w-5  animate-[bounce_3s_infinite]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-white tracking-wide">
                      Call Ambulance
                    </h3>
                    <p className="text-xs sm:text-sm text-red-100/80 mt-0.5 font-medium">
                      Immediate dispatch response team
                    </p>
                  </div>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-red-600 transition-all duration-300">
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>

            {/* Action Card 2: Emergency Care */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="
                group relative overflow-hidden
                rounded-[2rem]
                bg-gradient-to-r from-rose-600 to-rose-700
                p-6
                shadow-[0_15px_30px_rgba(225,29,72,0.25)]
                hover:shadow-[0_20px_40px_rgba(225,29,72,0.35)]
                transition-all duration-300
                cursor-pointer
              "
            >
              <div className="
                absolute inset-0 opacity-0
                group-hover:opacity-100
                transition duration-500
                bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]
              "></div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-5">

                  <div className="
                    rounded-2xl bg-white/15
                    p-3.5 text-white ring-1 ring-white/20
                    backdrop-blur-md
                  ">
                    <Ambulance className="h-5 w-5  animate-[bounce_3s_infinite]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-white tracking-wide">
                      Emergency Care
                    </h3>
                    <p className="text-xs sm:text-sm text-rose-100/80 mt-0.5 font-medium">
                      Instant ICU & Critical Trauma Support
                    </p>
                  </div>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-rose-600 transition-all duration-300">
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>

            {/* Action Card 3: Urgent Appointment */}
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="
                group relative overflow-hidden
                rounded-[2rem]
                bg-gradient-to-r from-red-700 to-red-800
                p-6
                shadow-[0_15px_30px_rgba(185,28,28,0.2)]
                hover:shadow-[0_20px_40px_rgba(185,28,28,0.3)]
                transition-all duration-300
                cursor-pointer
              "
            >
              <div className="
                absolute inset-0 opacity-0
                group-hover:opacity-100
                transition duration-500
                bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_60%)]
              "></div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-5">

                  <div className="
                    rounded-2xl bg-white/15
                    p-3.5 text-white ring-1 ring-white/20
                    backdrop-blur-md
                  ">
                    <CalendarHeart className="h-5 w-5  animate-[bounce_3s_infinite]" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-white tracking-wide">
                      Urgent Appointment
                    </h3>
                    <p className="text-xs sm:text-sm text-red-100/80 mt-0.5 font-medium">
                      Skip queues for priority live consultation
                    </p>
                  </div>

                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-red-700 transition-all duration-300">
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
}