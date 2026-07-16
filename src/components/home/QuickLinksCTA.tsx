"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  Users,
  Microscope,
  ArrowRight,
  Activity
} from "lucide-react";
import Link from "next/link";

export default function QuickLinksCTA() {
  return (
    <section className="relative overflow-hidden mt-12 max-w-7xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-10 border border-blue-100/60 shadow-[0_20px_50px_rgba(0,43,92,0.05)]">

      {/* Advanced Ambient Glow Effects (Medical Vibe) */}
      <div className="absolute top-[-20%] left-[-10%] h-[450px] w-[450px] rounded-full bg-gradient-to-br from-blue-200/40 to-blue-300/30 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] h-[450px] w-[450px] rounded-full bg-gradient-to-br from-indigo-200/30 to-blue-300/40 blur-[100px] pointer-events-none"></div>

      {/* Premium Clean Medical Cross/Grid Background Pattern */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#002b5c_1.2px,transparent_1.2px)] bg-[size:24px_24px]"></div>

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

            {/* Status Badge */}
            <div className="
              inline-flex items-center gap-2.5
              rounded-full border border-blue-200/80
              bg-white px-4 py-2 shadow-sm
            ">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#002b5c]"></span>
              </span>

              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#002b5c]">
                Comprehensive Care
              </p>
            </div>

            {/* Main Catchy Heading */}
            <h2 className="
              mt-6 text-3xl sm:text-5xl
              font-light tracking-tight
              leading-tight text-slate-900
            ">
              Explore Our{" "}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#001730] to-[#003f8a]">
                Clinical Services
              </span>
            </h2>

            {/* Subtext Description */}
            <p className="
              mt-5 max-w-xl
              text-sm sm:text-base
              leading-relaxed text-slate-600
            ">
              Discover our wide range of medical specialties, expert doctors, and advanced diagnostic facilities dedicated to providing the best healthcare.
            </p>

            {/* Visual Stats Indicators */}
            <div className="mt-8 flex flex-wrap gap-4">

              <div className="
                rounded-2xl border border-blue-100
                bg-white/90 backdrop-blur-md
                px-6 py-5
                shadow-[0_4px_20px_rgba(0,0,0,0.02)]
              ">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-xl text-[#002b5c]">
                    <Stethoscope size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Expert</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">Specialists</p>
                  </div>
                </div>
              </div>

              <div className="
                rounded-2xl border border-blue-100
                bg-white/90 backdrop-blur-md
                px-6 py-5
                shadow-[0_4px_20px_rgba(0,0,0,0.02)]
              ">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-xl text-[#002b5c]">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Advanced</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">Diagnosis</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Actionable Blue Buttons */}
          <div className="grid gap-4.5">

            {/* Action Card 1: Specialities */}
            <Link href="/departments" passHref>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="
                  group relative overflow-hidden
                  rounded-[2rem]
                  bg-gradient-to-r from-[#001730] to-[#002b5c]
                  p-6
                  shadow-[0_15px_30px_rgba(0,43,92,0.25)]
                  hover:shadow-[0_20px_40px_rgba(0,43,92,0.35)]
                  transition-all duration-300
                  cursor-pointer
                "
              >
                {/* Internal Smooth Flare Highlight on Hover */}
                <div className="
                  absolute inset-0 opacity-0
                  group-hover:opacity-100
                  transition duration-500
                  bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]
                "></div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    
                    {/* High Contrast White Icon Box */}
                    <div className="
                      rounded-2xl bg-white/20 
                      p-3.5 text-white ring-1 ring-white/20
                      backdrop-blur-md
                    ">
                      <Activity className="h-5 w-5 animate-[bounce_3s_infinite]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-white tracking-wide">
                        Specialities and Departments
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-100/80 mt-0.5 font-medium">
                        Medical / Surgical / Allied
                      </p>
                    </div>

                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-[#001730] transition-all duration-300">
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Action Card 2: Doctors */}
            <Link href="/doctors" passHref>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="
                  group relative overflow-hidden
                  rounded-[2rem]
                  bg-gradient-to-r from-[#002145] to-[#003570]
                  p-6
                  shadow-[0_15px_30px_rgba(0,79,107,0.25)]
                  hover:shadow-[0_20px_40px_rgba(0,79,107,0.35)]
                  transition-all duration-300
                  cursor-pointer
                "
              >
                <div className="
                  absolute inset-0 opacity-0
                  group-hover:opacity-100
                  transition duration-500
                  bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]
                "></div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-5">

                    <div className="
                      rounded-2xl bg-white/15
                      p-3.5 text-white ring-1 ring-white/20
                      backdrop-blur-md
                    ">
                      <Users className="h-5 w-5 animate-[bounce_3s_infinite]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-white tracking-wide">
                        Doctors
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-100/80 mt-0.5 font-medium">
                        Medical / Surgical Experts
                      </p>
                    </div>

                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-[#002145] transition-all duration-300">
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Action Card 3: Diagnosis */}
            <Link href="#" passHref>
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="
                  group relative overflow-hidden
                  rounded-[2rem]
                  bg-gradient-to-r from-[#002b5c] to-[#004085]
                  p-6
                  shadow-[0_15px_30px_rgba(0,122,135,0.2)]
                  hover:shadow-[0_20px_40px_rgba(0,122,135,0.3)]
                  transition-all duration-300
                  cursor-pointer
                "
              >
                <div className="
                  absolute inset-0 opacity-0
                  group-hover:opacity-100
                  transition duration-500
                  bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]
                "></div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-5">

                    <div className="
                      rounded-2xl bg-white/15
                      p-3.5 text-white ring-1 ring-white/20
                      backdrop-blur-md
                    ">
                      <Microscope className="h-5 w-5 animate-[bounce_3s_infinite]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-white tracking-wide">
                        Diagnosis
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-100/80 mt-0.5 font-medium">
                        Advanced Diagnostic Services
                      </p>
                    </div>

                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-[#002b5c] transition-all duration-300">
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            </Link>

          </div>

        </motion.div>
      </div>
    </section>
  );
}
