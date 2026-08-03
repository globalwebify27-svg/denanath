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

export const defaultQuickLinksData = {
  tagline: "Comprehensive Care",
  title: 'Explore Our <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#001730] to-[#003f8a]">Clinical Services</span>',
  description: "Discover our wide range of medical specialties, expert doctors, and advanced diagnostic facilities dedicated to providing the best healthcare.",
  stats: [
    { title: "Expert", subtitle: "Specialists", iconString: "Stethoscope" },
    { title: "Advanced", subtitle: "Diagnosis", iconString: "Activity" }
  ],
  links: [
    { 
      title: "Specialities and Departments", 
      subtitle: "Medical / Surgical / Allied", 
      url: "/departments", 
      iconString: "Activity", 
      bgColorFrom: "#001730", 
      bgColorTo: "#002b5c", 
      hoverColor: "#001730" 
    },
    { 
      title: "Doctors", 
      subtitle: "Medical / Surgical Experts", 
      url: "/doctors", 
      iconString: "Users", 
      bgColorFrom: "#002145", 
      bgColorTo: "#003570", 
      hoverColor: "#002145" 
    },
    { 
      title: "Diagnosis", 
      subtitle: "Advanced Diagnostic Services", 
      url: "#", 
      iconString: "Microscope", 
      bgColorFrom: "#002b5c", 
      bgColorTo: "#004085", 
      hoverColor: "#002b5c" 
    }
  ]
};

export default function QuickLinksCTA({ data = defaultQuickLinksData }: { data?: any }) {
  if (!data || Object.keys(data).length === 0) data = defaultQuickLinksData;
  const stats = data.stats || defaultQuickLinksData.stats;
  const links = data.links || defaultQuickLinksData.links;
  return (
    <section className="relative overflow-hidden mt-12 max-w-7xl mx-auto rounded-[2.5rem] bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-[20px] md:py-10 border border-blue-100/60 shadow-[0_20px_50px_rgba(0,43,92,0.05)]">

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
                {data.tagline}
              </p>
            </div>

            {/* Main Catchy Heading */}
            <h2 className="
              mt-6 text-3xl sm:text-5xl
              font-light tracking-tight
              leading-tight text-slate-900
            " dangerouslySetInnerHTML={{__html: data.title}}>
            </h2>

            {/* Subtext Description */}
            <p className="
              mt-5 max-w-xl
              text-[18px] font-normal
              leading-[31px] text-slate-600
            ">
              {data.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {stats.map((stat: any, index: number) => {
                const Icons = require('lucide-react');
                const Icon = Icons[stat.iconString] || Icons.Activity;
                return (
                  <div key={index} className="
                    group
                    rounded-2xl border border-blue-100
                    bg-white/90 backdrop-blur-md
                    px-6 py-5
                    shadow-[0_4px_20px_rgba(0,0,0,0.02)]
                    transition-all duration-300
                  ">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 p-2 rounded-xl text-[#002b5c] transition-colors duration-300 group-hover:text-[#9F0712]">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900">{stat.title}</h3>
                        <p className="text-xs font-medium text-slate-500 mt-0.5">{stat.subtitle}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          <div className="grid gap-4.5">
            {links.map((link: any, index: number) => {
              const Icons = require('lucide-react');
              const Icon = Icons[link.iconString] || Icons.Activity;
              
              // Helper to safely extract a hex color from any format (raw hex or tailwind class like from-[#123456])
              const extractHex = (val: string, fallback: string) => {
                if (!val) return fallback;
                if (val.startsWith('#')) return val;
                const match = val.match(/\[(#.*?)\]/);
                if (match) return match[1];
                return fallback;
              };
              
              const fromHex = extractHex(link.bgColorFrom, '#002b5c');
              const toHex = extractHex(link.bgColorTo, '#004085');
              const hoverHex = extractHex(link.hoverColor, '#002b5c');

              return (
                <Link key={index} href={link.url} passHref>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`
                      group relative overflow-hidden
                      rounded-[2rem]
                      p-6
                      shadow-[0_15px_30px_rgba(0,43,92,0.25)]
                      hover:shadow-[0_20px_40px_rgba(0,43,92,0.35)]
                      transition-all duration-300
                      cursor-pointer
                    `}
                    style={{ 
                      background: `linear-gradient(to right, ${fromHex}, ${toHex})`,
                      '--hover-color': hoverHex
                    } as React.CSSProperties}
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
                          rounded-2xl bg-white/20 
                          p-3.5 text-white ring-1 ring-white/20
                          backdrop-blur-md notranslate
                        " translate="no" data-no-translate="true" aria-hidden="true">
                          <Icon className="h-5 w-5 animate-[bounce_3s_infinite] notranslate" aria-hidden="true" />
                        </div>

                        <div>
                          <h3 className="font-bold text-lg text-white tracking-wide">
                            {link.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-blue-100/80 mt-0.5 font-medium">
                            {link.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 group-hover:bg-white text-white transition-all duration-300 group-hover:text-[color:var(--hover-color)]`}>
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
