import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import DisclaimerClientForm from "./client-form";

export const dynamic = "force-dynamic";

export default async function AdminDisclaimerPage() {
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
  } catch(e) {}

  async function saveData(formData: FormData) {
    "use server";
    
    try {
      const parsed = {
        content: formData.get("content") || "",
        seoMetaTitle: formData.get("seoMetaTitle") || "",
        seoMetaDescription: formData.get("seoMetaDescription") || "",
        seoKeywords: formData.get("seoKeywords") || "",
        gallery: JSON.parse((formData.get("gallery") as string) || "[]"),
        links: JSON.parse((formData.get("links") as string) || "[]")
      };
      
      const finalJson = JSON.stringify(parsed);
      
      await prisma.siteSetting.upsert({
        where: { key: 'page_disclaimer' },
        update: { value: finalJson },
        create: { key: 'page_disclaimer', value: finalJson }
      });
      
      revalidatePath("/admin/about/disclaimer");
      revalidatePath("/disclaimer");
    } catch (e) {
      console.error("Failed to save Disclaimer data", e);
      throw e;
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto pb-32">
      <DisclaimerClientForm initialData={data} saveAction={saveData} />
    </div>
  );
}
