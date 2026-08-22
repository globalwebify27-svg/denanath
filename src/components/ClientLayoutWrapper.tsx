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
  topHeader,
  header,
  footer,
}: {
  children: React.ReactNode;
  latestEvent?: any;
  topHeader?: any;
  header?: any;
  footer?: any;
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

  // Check if current page is globally disabled in the header
  let isInactive = false;
  if (!isAdmin && header && header.menus && pathname) {
    for (const menu of header.menus) {
      if (menu.href === pathname && menu.isActive === false) {
        isInactive = true;
        break;
      }
      if (menu.dropdown) {
        for (const sub of menu.dropdown) {
          if (sub.href === pathname && sub.isActive === false) {
            isInactive = true;
            break;
          }
        }
      }
    }
  }

  if (isAdmin) {
    return (
      <main className="flex-grow flex flex-col min-h-screen bg-slate-50">
        {children}
      </main>
    );
  }

  if (isInactive) {
    return (
      <>
        {header?.isActive !== false && <Navbar topHeaderSettings={topHeader?.isActive !== false ? topHeader : null} headerSettings={header} />}
        <main className="flex-grow flex flex-col min-h-[60vh] items-center justify-center bg-slate-50 px-4">
          <div className="text-center max-w-md">
            <h1 className="text-5xl font-extrabold text-[#002b5c] tracking-tight mb-4">404</h1>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Page Not Found</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              The page you are looking for has been disabled or does not exist.
            </p>
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 bg-[#007a87] text-white font-bold rounded-xl hover:bg-[#00606a] hover:-translate-y-0.5 transition-all shadow-lg hover:shadow-xl"
            >
              Return to Home
            </a>
          </div>
        </main>
        {footer?.isActive !== false && <Footer latestEvent={latestEvent} footerSettings={footer} />}
      </>
    );
  }

  return (
    <>
      <QuickAccessWidget />
      {header?.isActive !== false && <Navbar topHeaderSettings={topHeader?.isActive !== false ? topHeader : null} headerSettings={header} />}
      <main className="flex-grow flex flex-col">{children}</main>
      {footer?.isActive !== false && <Footer latestEvent={latestEvent} footerSettings={footer} />}
    </>
  );
}
