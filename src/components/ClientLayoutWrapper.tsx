"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import QuickAccessWidget from "./home/QuickAccessWidget";
import { applyOfflineTranslation } from "@/lib/offlineTranslate";

export default function ClientLayoutWrapper({
  children,
  latestEvent,
}: {
  children: React.ReactNode;
  latestEvent?: any;
}) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2,3})/);
      if (match && match[1] && match[1] !== 'en') {
        setTimeout(() => applyOfflineTranslation(match[1]), 30);
      } else {
        applyOfflineTranslation('en');
      }
    } catch (e) {}
  }, [pathname]);

  // Hide Navbar, Footer, and QuickAccessWidget on all admin routes
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <main className="flex-grow flex flex-col min-h-screen bg-slate-50">
        {children}
      </main>
    );
  }

  return (
    <>
      <QuickAccessWidget />
      <Navbar />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer latestEvent={latestEvent} />
    </>
  );
}
