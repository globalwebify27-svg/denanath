import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { HospitalProvider } from "@/context/HospitalContext";

import QuickAccessWidget from "@/components/home/QuickAccessWidget";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";


const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deenanath Mangeshkar Hospital and Research Center | Pune",
  description: "Official web portal of Deenanath Mangeshkar Hospital and Research Center, Pune. Experience state-of-the-art clinical super-specialties, Pune's finest doctor roster, 24/7 trauma emergency response, and preventative health care. Delivering medical excellence with human warmth.",
  keywords: ["Deenanath Mangeshkar Hospital and Research Center", "DMH Pune", "Erandwane Hospital", "Best Hospital in Pune", "Book Doctor Appointment Pune", "Emergency Trauma Care Pune", "Mangeshkar Hospital Pune"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <body 
        className={`${plusJakartaSans.className} min-h-full flex flex-col bg-slate-50 text-slate-800 antialiased`}
        suppressHydrationWarning
        >
        <HospitalProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </HospitalProvider>
      </body>
    </html>
  );
}
