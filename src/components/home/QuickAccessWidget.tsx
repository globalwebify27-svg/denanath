"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  MessageCircle,
  PhoneCall,
  Stethoscope,
  Phone,
  X,
} from "lucide-react";

import { useState } from "react";

export default function QuickAccessWidget() {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      label: "Book Appointment",
      icon: CalendarPlus,
      href: "/appointment",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      label: "WhatsApp Us",
      icon: MessageCircle,
      href: "https://wa.me/919999999999",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      label: "Call Us",
      icon: PhoneCall,
      href: "tel:+911234567890",
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      label: "Find a Doctor",
      icon: Stethoscope,
      href: "/doctors",
      color: "bg-slate-900 hover:bg-slate-800",
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[999]">
      
      {/* Floating Actions Container */}
      <div 
        className={`absolute bottom-16 md:bottom-20 right-0 flex flex-col items-end gap-3 md:gap-4 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
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
              className="group relative flex items-center"
            >
              {/* Hover Tooltip */}
              <span className="absolute right-14 md:right-16 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 md:px-3 md:py-1.5 text-xs md:text-sm font-medium text-white opacity-0 shadow-md transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                {item.label}
              </span>

              <Link
                href={item.href}
                className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 ${item.color}`}
              >
                <Icon className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Main Floating Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#002b5c] text-white shadow-[0_10px_40px_rgba(0,43,92,0.35)]"
      >
        {/* Pulse Ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30 animate-ping"></span>

        {/* Icon toggle with rotation */}
        <div className={`relative z-10 transition-transform duration-300 ${open ? "rotate-90" : ""}`}>
          {open ? (
            <X className="h-5 w-5 md:h-7 md:w-7" />
          ) : (
            <Phone className="h-5 w-5 md:h-7 md:w-7" />
          )}
        </div>
      </motion.button>

    </div>
  );
}