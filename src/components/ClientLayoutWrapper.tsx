"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import QuickAccessWidget from "./home/QuickAccessWidget";

export default function ClientLayoutWrapper({
  children,
  latestEvent,
}: {
  children: React.ReactNode;
  latestEvent?: any;
}) {
  const pathname = usePathname();
  
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
