import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { HospitalProvider } from "@/context/HospitalContext";
import { prisma } from "@/lib/prisma";

import QuickAccessWidget from "@/components/home/QuickAccessWidget";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import Script from "next/script";
import CanonicalLink from "@/components/CanonicalLink";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_home' } });
    if (setting && setting.value) {
      seoData = JSON.parse(setting.value);
    }
  } catch (error) {
    console.error("Error fetching home SEO:", error);
  }

  const sanitize = (str: string | undefined | null) => str ? str.replace(/[\r\n]+/g, ' ').trim() : undefined;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: sanitize(seoData.seoMetaTitle) || "Deenanath Mangeshkar Hospital and Research Center | Pune",
    description: sanitize(seoData.seoMetaDescription) || "Official web portal of Deenanath Mangeshkar Hospital and Research Center, Pune. Experience state-of-the-art clinical super-specialties, Pune's finest doctor roster, 24/7 trauma emergency response, and preventative health care. Delivering medical excellence with human warmth.",
    keywords: seoData.seoKeywords ? sanitize(seoData.seoKeywords)?.split(',').map((k: string) => k.trim()) : ["Deenanath Mangeshkar Hospital and Research Center", "DMH Pune", "Erandwane Hospital", "Best Hospital in Pune", "Book Doctor Appointment Pune", "Emergency Trauma Care Pune", "Mangeshkar Hospital Pune"],
    authors: [{ name: "Deenanath Mangeshkar Hospital and Research Center" }],
    publisher: "Deenanath Mangeshkar Hospital and Research Center",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let latestEvent = null;
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
    if (setting && setting.value) {
      const parsedData = JSON.parse(setting.value);
      const eventsList = parsedData.events || [];
      if (eventsList && eventsList.length > 0) {
        latestEvent = eventsList[eventsList.length - 1];
      }
    }
  } catch (error) {
    console.error("Error fetching latest event for footer:", error);
  }

  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <body 
        className={`${plusJakartaSans.className} min-h-full bg-slate-50 text-slate-800 antialiased`}
        suppressHydrationWarning
        >
        <CanonicalLink />
        <Script id="google-translate-fouc" strategy="afterInteractive">
          {`
            (function() {
              try {
                var match = document.cookie.match(/googtrans=\\/en\\/([a-z]{2,3})/);
                if (match && match[1] !== 'en') {
                  var style = document.createElement('style');
                  style.id = 'gt-fouc-guard';
                  style.textContent = 'body { opacity: 0 !important; visibility: hidden !important; transition: opacity 0.3s ease; }';
                  document.head.appendChild(style);
                  setTimeout(function() {
                    var guard = document.getElementById('gt-fouc-guard');
                    if (guard) guard.remove();
                  }, 3000);
                }
              } catch(e) {}
            })();
          `}
        </Script>
        <HospitalProvider>
          <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
            <ClientLayoutWrapper latestEvent={latestEvent}>
              {children}
            </ClientLayoutWrapper>
          </div>
        </HospitalProvider>
      </body>
    </html>
  );
}
