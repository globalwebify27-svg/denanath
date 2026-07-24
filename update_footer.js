const fs = require('fs');
const path = require('path');

const layoutPath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/app/layout.tsx');
const clientWrapperPath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/components/ClientLayoutWrapper.tsx');
const footerPath = path.join('c:/Users/91870/Desktop/globalwebify/denanath/src/components/Footer.tsx');

// 1. Update layout.tsx
let layoutContent = fs.readFileSync(layoutPath, 'utf-8');
const layoutFetchCode = `export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let latestEvent = null;
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
    if (setting && setting.value) {
      const events = JSON.parse(setting.value);
      if (events && events.length > 0) {
        latestEvent = events[events.length - 1];
      }
    }
  } catch (error) {
    console.error("Error fetching latest event for footer:", error);
  }

  return (`;
layoutContent = layoutContent.replace(/export default function RootLayout\(\{[\s\S]*?\}\) \{[\s\S]*?return \(/, layoutFetchCode);
layoutContent = layoutContent.replace(/<ClientLayoutWrapper>/, "<ClientLayoutWrapper latestEvent={latestEvent}>");
fs.writeFileSync(layoutPath, layoutContent, 'utf-8');

// 2. Update ClientLayoutWrapper.tsx
let wrapperContent = fs.readFileSync(clientWrapperPath, 'utf-8');
const wrapperPropsCode = `export default function ClientLayoutWrapper({
  children,
  latestEvent,
}: {
  children: React.ReactNode;
  latestEvent?: any;
}) {`;
wrapperContent = wrapperContent.replace(/export default function ClientLayoutWrapper\(\{[\s\S]*?\}\) \{/, wrapperPropsCode);
wrapperContent = wrapperContent.replace(/<Footer \/>/, "<Footer latestEvent={latestEvent} />");
fs.writeFileSync(clientWrapperPath, wrapperContent, 'utf-8');

// 3. Update Footer.tsx
let footerContent = fs.readFileSync(footerPath, 'utf-8');
const footerPropsCode = `export default function Footer({ latestEvent }: { latestEvent?: any }) {`;
footerContent = footerContent.replace(/export default function Footer\(\) \{/, footerPropsCode);

// The footer section to replace
//                   <div className="w-[70px] h-[36px] shrink-0 rounded-md overflow-hidden border border-white/80 bg-black/20">
//                     <img 
//                       src="/images/unnamed (7).webp" 
//                       alt="Diabetes Nursing Conference 2026" 
//                       className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
//                     />
//                   </div>
//                   <Link href="/events" className="text-[#b2dfdb] hover:text-[#a7ffeb] transition-colors text-[13px] leading-snug">
//                     Diabetes Nursing<br />Conference 2026
//                   </Link>

const newFooterSection = `                  <div className="w-[70px] h-[36px] shrink-0 rounded-md overflow-hidden border border-white/80 bg-black/20">
                    <img 
                      src={latestEvent && latestEvent.gallery && latestEvent.gallery.length > 0 ? latestEvent.gallery[0] : "/images/unnamed (7).webp"} 
                      alt={latestEvent?.title || "Diabetes Nursing Conference 2026"} 
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <Link href="/events" className="text-[#b2dfdb] hover:text-[#a7ffeb] transition-colors text-[13px] leading-snug line-clamp-2" title={latestEvent?.title || "Diabetes Nursing Conference 2026"}>
                    {latestEvent?.title || "Diabetes Nursing Conference 2026"}
                  </Link>`;

footerContent = footerContent.replace(/<div className="w-\[70px\] h-\[36px\] shrink-0 rounded-md overflow-hidden border border-white\/80 bg-black\/20">[\s\S]*?<\/Link>/, newFooterSection);
fs.writeFileSync(footerPath, footerContent, 'utf-8');

console.log('Footer dynamic update script completed.');
