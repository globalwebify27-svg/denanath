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
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  let seoData: any = {};
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_home' } }).catch(() => null);
    if (setting && setting.value) {
      seoData = JSON.parse(setting.value);
    }
  } catch (error) {
    console.warn("Could not reach database for layout SEO metadata, using default fallbacks.");
  }

  const sanitize = (str: string | undefined | null) => str ? str.replace(/[\r\n]+/g, ' ').trim() : undefined;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: sanitize(seoData.seoMetaTitle) || "Best Multispeciality Hospital | Deenanath Mangeshkar Hospital And Research Center | DMH Pune",
      template: "%s | DMH Pune"
    },
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
  let layoutTopHeader = null;
  let layoutHeader = null;
  let layoutFooter = null;
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
    if (setting && setting.value) {
      const parsedData = JSON.parse(setting.value);
      const eventsList = (parsedData.events || []).filter((e: any) => e.status !== false && e.status !== "false");
      if (eventsList && eventsList.length > 0) {
        latestEvent = eventsList.find((e: any) => e.isFooterFeatured) || eventsList[0];
      }
    }
  } catch (error) {
    console.error("Error fetching latest event for footer:", error);
  }

  try {
    const [topHeaderReq, headerReq, footerReq] = await Promise.all([
      prisma.siteSetting.findUnique({ where: { key: 'layout_top_header' } }),
      prisma.siteSetting.findUnique({ where: { key: 'layout_header' } }),
      prisma.siteSetting.findUnique({ where: { key: 'layout_footer' } })
    ]);

    if (topHeaderReq && topHeaderReq.value) layoutTopHeader = JSON.parse(topHeaderReq.value);
    if (headerReq && headerReq.value) layoutHeader = JSON.parse(headerReq.value);
    if (footerReq && footerReq.value) layoutFooter = JSON.parse(footerReq.value);
  } catch (error) {
    console.error("Error fetching layout settings:", error);
  }

  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <body 
        className={`${plusJakartaSans.className} min-h-full bg-slate-50 text-slate-800 antialiased`}
        suppressHydrationWarning
        >
        {/* DOM protection script against React hydration errors when Google Translate wraps text nodes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && typeof Node === 'function' && Node.prototype) {
                var originalRemoveChild = Node.prototype.removeChild;
                Node.prototype.removeChild = function(child) {
                  if (child && child.parentNode !== this) {
                    return child;
                  }
                  return originalRemoveChild.apply(this, arguments);
                };
                var originalInsertBefore = Node.prototype.insertBefore;
                Node.prototype.insertBefore = function(newNode, referenceNode) {
                  if (referenceNode && referenceNode.parentNode !== this) {
                    return newNode;
                  }
                  return originalInsertBefore.apply(this, arguments);
                };
              }
            `,
          }}
        />
        <div id="google_translate_element" style={{ position: 'absolute', top: -9999, left: -9999, opacity: 0, pointerEvents: 'none', height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true" />
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                if (window.google && window.google.translate) {
                  new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: 'en,hi,mr,gu,kn,ta,ar,de',
                    autoDisplay: false
                  }, 'google_translate_element');
                }
              }
            `,
          }}
        />
        <Script
          id="google-translate-cdn"
          strategy="afterInteractive"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
        <CanonicalLink />
        <HospitalProvider>
          <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
            <ClientLayoutWrapper 
              latestEvent={latestEvent} 
              topHeader={layoutTopHeader}
              header={layoutHeader}
              footer={layoutFooter}
            >
              {children}
            </ClientLayoutWrapper>
          </div>
        </HospitalProvider>
      </body>
    </html>
  );
}
