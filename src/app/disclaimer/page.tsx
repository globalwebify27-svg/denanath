import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_disclaimer' } });
  if (setting) {
    try {
      const parsed = JSON.parse(setting.value);
      return {
        title: parsed.seoMetaTitle || "Disclaimer",
        description: parsed.seoMetaDescription || "",
        keywords: parsed.seoKeywords || "",
      }
    } catch(e){}
  }
  return { title: "Disclaimer" }
}

export default async function DisclaimerPage() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_disclaimer' } });
  
  const defaultContent = `
<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6">Disclaimer</h2>
<p>All the information displayed, transmitted or carried by Deenanath Mangeshkar Hospital and its related websites including, but not limited to, directories, guides, news articles, opinions, reviews, text, photographs, images, illustrations, profiles, audio clips, video clips, trademarks, service marks and the like, collectively the "Content", are protected by the copyright and other intellectual property laws and be informed that the content of the same is not intended to be a substitute for professional medical advice and not for solicitation of business. The Content is owned by Deenanath Mangeshkar Hospital, its affiliates or third party licensors. You may not modify, publish, transmit, transfer, sell, reproduce, create derivative work from, distribute, repost, perform, display or in any way commercially exploit any of the Content. You agree to abide by all copyright notices and restrictions attached to any Content accessed through the Deenanath Mangeshkar Hospital website and not to alter the content in any way. <strong>Permitted Use:</strong> you may take a single copy of the Content displayed on the Deenanath Mangeshkar Hospital for personal, non-commercial use only, provided that you do not remove any trademarks, copyright and any other notice contained in such Content. You shall not archive or retain any Content in any form without written permission. The information provided in this site for the sole purpose of disseminating health information for public benefit.</p>
<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6 mt-12">General Disclaimer and Limitation of Liability</h2>
<p>The Deenanath Mangeshkar Hospital website contains facts, views, opinions, statements and recommendations of users of the Deenanath Mangeshkar Hospital website, advertisers, third party information providers and organizations.</p>
<p>The Deenanath Mangeshkar Hospital website does not represent or endorse the accuracy, completeness or reliability of any advice, opinion, statement or other information displayed, uploaded or distributed through the website. You acknowledge that any reliance upon any such opinion, advice, statement or information shall be at your sole risk.</p>
<p>Deenanath Mangeshkar Hospital makes no warranty or representation whatsoever regarding the website or any content, advertising services or products provided through or in connection with the website.</p>
<p>Deenanath Mangeshkar Hospital expressly disclaims any and all warranties, express or implied, including, without limitation without limiting the foregoing, Deenanath Mangeshkar hospitals shall not be liable to you or your business for any incidental, consequential, special, or punitive damages or lost or imputed profits or royalties arising out of this agreement or any goods or services provided, whether for breach of warranty or any obligation arising there from or otherwise, whether liability is asserted in contract or tort (including negligence and strict product liability) and irrespective of whether you have been advised of the possibility of any such loss or damage. Each party hereby waives any claims that these exclusions deprive such party of an adequate remedy.</p>
<p>You acknowledge that third party product and service providers advertise their products and services on the Deenanath Mangeshkar hospitals website. Deenanath Mangeshkar Hospital forms partnerships or alliances with some of these vendors from time to time in order to facilitate the provision of these products and services to you. However, you acknowledge and agree that at no time is Deenanath Mangeshkar Hospital making any representation or warranty regarding any third party’s products or services, nor will Deenanath Mangeshkar hospitals be liable to you or any third party for any claims arising from or in connection with such third party products and services. You hereby disclaim and waive any rights and claims you may have against Deenanath Mangeshkar Hospital with respect to third party products and services, to the maximum extent permitted by law. Further you agree that to use the Site and contents thereof only for lawful purposes.</p>
<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6 mt-12">Feedback & Opinions</h2>
<p>Any feed back / opinion(s) expressed in response to e-mail queries shall not be treated as medical advice until and unless the physical examination of the patient is carried out no treatment shall be initiated. E-mail transmission cannot be guaranteed to be secure or error-free as information could be intercepted, corrupted, lost, destroyed, arrive late or incomplete, or contain viruses. The sender therefore does not accept liability for any errors or omissions in the contents of this message, which arise as a result of e-mail transmission. Whilst every effort is made to address all queries and to accommodate valuable feedback from the Users, Deenanath Mangeshkar Hospital does not guarantee a response or action to every mail.</p>
<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6 mt-12">Privacy Policy</h2>
<p>Deenanath Mangeshkar Hospital are required by law to maintain the privacy of your medical information, to provide you with this written Notice of Privacy Rights and Practices, and to abide by the terms of the Notice currently in effect. This policy shall be applicable to the information collected or displayed on our website. We assure to take the privacy seriously and to keep your privacy and confidentiality of the information provided to us.</p>
<p>We shall not intentionally or unless required under laws share the contents of any person with any outside authorities or any third party. We do not guarantee or assure that the electronic communications received from you or contents or records may not be accessible to the third parties.</p>
  `.trim();

  let data: any = { content: defaultContent, gallery: [], links: [] };
  try {
    if (setting) data = JSON.parse(setting.value);
  } catch (e) {}

  return (
    <main className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div className="w-full bg-[#002b5c] relative overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#b2dfdb] mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Disclaimer</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight flex items-center gap-3">
                Disclaimer
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
          <div 
            className="prose prose-slate prose-lg max-w-none prose-headings:text-[#002b5c] prose-p:text-slate-600"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />

          {/* Gallery Section */}
          {data.gallery && data.gallery.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-100">
              <h3 className="text-2xl font-bold text-[#002b5c] mb-8">Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.gallery.map((img: any, idx: number) => (
                  <div key={idx} className="rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white">
                    {img.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img.image} alt={img.caption || 'Gallery Image'} className="w-full h-48 object-cover" />
                    )}
                    {img.caption && (
                      <div className="p-4 text-center text-sm font-semibold text-slate-700">
                        {img.caption}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links / Publications Section */}
          {data.links && data.links.length > 0 && (
            <div className="mt-16 pt-12 border-t border-slate-100">
              <h3 className="text-2xl font-bold text-[#002b5c] mb-8">Publications & Links</h3>
              <div className="flex flex-col gap-3">
                {data.links.map((link: any, idx: number) => (
                  <a
                    key={idx}
                    href={link.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-[#007a87] hover:shadow-md transition-all duration-300 no-underline"
                  >
                    <div className="bg-teal-50 p-2 rounded-lg text-[#007a87]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <span className="font-semibold text-slate-700 m-0">{link.title || 'View Link'}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
