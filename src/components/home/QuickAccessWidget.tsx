"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  MessageCircle,
  PhoneCall,
  Stethoscope,
  Plus,
} from "lucide-react";

import { useState } from "react";

export default function QuickAccessWidget() {

  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: CalendarPlus,
      href: "/appointment",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: MessageCircle,
      href: "https://wa.me/919999999999",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      icon: PhoneCall,
      href: "tel:+911234567890",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      icon: Stethoscope,
      href: "/doctors",
      color: "bg-slate-900 hover:bg-slate-800",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[999]">

      {/* Main Floating Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#002b5c] text-white shadow-[0_10px_40px_rgba(0,43,92,0.35)]"
      >

        {/* Pulse Ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30 animate-ping"></span>

        <Plus
          className={`relative z-10 h-7 w-7 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        />
      </motion.button>

      {/* Floating Actions */}
      <div className="absolute bottom-20 right-0 flex flex-col items-end gap-4">

        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                scale: 0,
                y: 20,
              }}
              animate={
                open
                  ? {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      scale: 0,
                      y: 20,
                    }
              }
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
            >

              <Link
                href={item.href}
                className={`flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 ${item.color}`}
              >

                <Icon className="h-5 w-5" />
              </Link>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}