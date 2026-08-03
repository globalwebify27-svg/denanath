"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { baseNavLinks } from "@/lib/navConfig";

interface SidebarOption {
  name: string;
  href: string;
  active: boolean;
}

export default function DynamicSidebar({ 
  categoryName, 
  activeHref 
}: { 
  categoryName: string;
  activeHref: string;
}) {
  const [dynamicLinks, setDynamicLinks] = useState<{name: string, href: string}[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/dynamic-pages')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
           const pages = data.filter((page: any) => page.status && page.navbarMenu === categoryName);
           setDynamicLinks(pages.map((p: any) => ({ name: p.title, href: `/${p.slug}` })));
        }
      })
      .catch(err => console.error("Error fetching dynamic pages:", err));
  }, [categoryName]);

  const baseCategory = baseNavLinks.find(link => link.name === categoryName);
  const staticDropdown = baseCategory?.dropdown || [];
  
  const allOptions: SidebarOption[] = [
    ...staticDropdown.map(item => ({
      name: item.name,
      href: item.href,
      active: item.href === activeHref
    })),
    ...dynamicLinks.map(item => ({
      name: item.name,
      href: item.href,
      active: item.href === activeHref
    }))
  ];

  useEffect(() => {
    if (window.innerWidth < 1024 && scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const container = scrollContainerRef.current;
        const scrollPos = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        setTimeout(() => {
          container.scrollTo({ left: Math.max(0, scrollPos), behavior: 'smooth' });
        }, 100);
      }
    }
  }, [allOptions]);

  if (allOptions.length === 0) return null;

  return (
    <div className="w-full lg:w-[280px] shrink-0 sticky top-14 lg:top-28 z-30 bg-[#f8fafc] py-2 lg:py-0">
      <div ref={scrollContainerRef} className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
        {allOptions.map((option, idx) => (
          <Link
            key={idx}
            href={option.href}
            data-active={option.active}
            className={`snap-start shrink-0 group flex items-center justify-between px-6 py-4 lg:py-4 text-sm font-bold transition-all duration-300 lg:border-l-4 lg:border-b-0 border-b-4 whitespace-nowrap lg:whitespace-normal ${
              option.active
                ? "border-[#007a87] bg-teal-50/40 text-[#007a87]"
                : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-[#002b5c] lg:hover:border-slate-200 hover:border-slate-200"
            } ${idx !== allOptions.length - 1 ? "lg:border-b lg:border-b-slate-50" : ""}`}
          >
            <span>{option.name}</span>
            <ChevronRight 
              className={`hidden lg:block w-4 h-4 transition-transform duration-300 ${
                option.active 
                  ? "text-[#007a87] translate-x-1" 
                  : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#002b5c]"
              }`} 
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
