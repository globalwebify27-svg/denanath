const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const prisma = new PrismaClient();

const newFaqHtml = `
  <section>
    <h3 class="text-xl font-bold text-[#002b5c] mb-6 border-b pb-2">FAQs</h3>
    <ul class="list-disc pl-5 space-y-4 marker:text-black">
      <li>
        <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-start gap-3 list-none outline-none">
            <h4 class="text-lg font-bold text-slate-800 m-0 group-hover:text-black transition-colors">What are Head Neck Cancers?</h4>
          </summary>
          <div class="text-slate-600 mt-3 border-t border-slate-100 pt-3">
            <p class="!mb-0">Head and neck cancer is a term used to denote cancer that develops in the mouth, throat, neck, nose, sinuses, salivary glands, thyroid or other areas of the head and neck. Most of these cancers are squamous cell carcinomas, or cancers that begin in the lining of the mouth, nose and throat. Eighty-five percent of head and neck cancers are linked to tobacco use, and 75 percent are associated with a combination of tobacco and alcohol use.</p>
          </div>
        </details>
      </li>

      <li>
        <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-start gap-3 list-none outline-none">
            <h4 class="text-lg font-bold text-slate-800 m-0 group-hover:text-black transition-colors">What are precancers?</h4>
          </summary>
          <div class="text-slate-600 mt-3 border-t border-slate-100 pt-3">
            <p class="!mb-0">The chronic effect of carcinogens cause changes in the lining of the mouth. Features like white patches (leukoplakia), red patches (erythroleukoplakia), tightening of the mucosa (oral submucous fibrosis) or lace-like patches (oral lichen planus) are called pre-cancers or pre-malignant conditions, and indicate that the lining has started on its path to becoming cancerous. They can sometimes be halted by stopping the addictions.</p>
          </div>
        </details>
      </li>

      <li>
        <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-start gap-3 list-none outline-none">
            <h4 class="text-lg font-bold text-slate-800 m-0 group-hover:text-black transition-colors">What are the treatment modalities?</h4>
          </summary>
          <div class="text-slate-600 mt-3 border-t border-slate-100 pt-3">
            <p class="!mb-0">If you are unfortunate enough to be diagnosed with this disease, please do not lose hope. There are many treatment modalities available which are tailored to the patient’s site, type and extent of cancer. The general fitness of the patient plays a role in his/her ability to tolerate the treatment. The treatments mainly used are:</p>
            <p class="font-bold text-slate-700 mt-3 !mb-0">Surgery</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>Tumor removal, also called curative or primary surgery : Surgery is used to remove the tumor and some of the nearby healthy tissue. The tissue around the tumor is called the margin. Tumor removal may be the primary treatment in some types of cancer and may be used as the sole treatment, or in conjunction with other modalities, such as chemotherapy or radiation therapy.</li>
              <li>Salvage surgery- Patients whose disease recurs after treatment with chemotherapy and/or radiation therapy are treated with salvage surgery. There is an extremely small window of opportunity for such patients, and they must be evaluated promptly.</li>
              <li>Diagnostic surgery :  A biopsy may be used to diagnose certain cancers. During a surgical biopsy, the surgeon makes an incision into the skin to remove some or all of the suspicious tissue. This is sent to the pathologist to examine the tissue and diagnose the type of tumor, which dictates further treatment.</li>
            </ul>
            <p class="mt-3 !mb-0"><strong class="font-bold text-slate-700">Radiation Therapy - </strong>Radiation therapy is the use of high-energy x-rays or other particles to destroy or shrink cancer cells. A doctor who specializes in giving radiation therapy to treat cancer is called a radiation oncologist. A radiation therapy regimen, or schedule, usually consists of a specific number of treatments given over a set period of time, and maybe used either as the sole modality or I conjunction with surgery, chemotherapy or immunotherapy.</p>
            <p class="mt-3 !mb-0"><strong class="font-bold text-slate-700">Chemotherapy - </strong>Chemotherapy is the use of drugs to destroy cancer cells. It acts on all rapidly growing cells, but more so on the cancer cells. Therefore, they can also cause damage to healthy cells, which account for the side effects of chemotherapy. The types of chemotherapy are:</p>
            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>Neoadjuvant - Before surgery, to shrink tumors, and make it operable.</li>
              <li>Adjuvant (usually along with radiation)- After surgery, to consolidate the gains of surgery.</li>
              <li>Curative - To treat cancers of the blood or lymphatic system, such as leukemia and lymphoma.</li>
              <li>Palliative - For cancer that comes back after treatment, called recurrent cancer, or for cancer that has spread to other parts of the body, called metastatic cancer.</li>
            </ul>
          </div>
        </details>
      </li>

      <li>
        <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-start gap-3 list-none outline-none">
            <h4 class="text-lg font-bold text-slate-800 m-0 group-hover:text-black transition-colors">Why are Head Neck cancers important?</h4>
          </summary>
          <div class="text-slate-600 mt-3 border-t border-slate-100 pt-3">
            <p class="!mb-0 text-slate-400 italic">Information will be updated soon.</p>
          </div>
        </details>
      </li>

      <li>
        <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-start gap-3 list-none outline-none">
            <h4 class="text-lg font-bold text-slate-800 m-0 group-hover:text-black transition-colors">Why do Head Neck Cancers happen? (Risk factors)</h4>
          </summary>
          <div class="text-slate-600 mt-3 border-t border-slate-100 pt-3">
            <p class="!mb-0 text-slate-400 italic">Information will be updated soon.</p>
          </div>
        </details>
      </li>

      <li>
        <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-start gap-3 list-none outline-none">
            <h4 class="text-lg font-bold text-slate-800 m-0 group-hover:text-black transition-colors">How to suspect Head Neck Cancers?</h4>
          </summary>
          <div class="text-slate-600 mt-3 border-t border-slate-100 pt-3">
            <p class="!mb-0 text-slate-400 italic">Information will be updated soon.</p>
          </div>
        </details>
      </li>

      <li>
        <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-start gap-3 list-none outline-none">
            <h4 class="text-lg font-bold text-slate-800 m-0 group-hover:text-black transition-colors">What are the common head neck cancers?</h4>
          </summary>
          <div class="text-slate-600 mt-3 border-t border-slate-100 pt-3">
            <p class="!mb-0 text-slate-400 italic">Information will be updated soon.</p>
          </div>
        </details>
      </li>

      <li>
        <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
          <summary class="flex items-start gap-3 list-none outline-none">
            <h4 class="text-lg font-bold text-slate-800 m-0 group-hover:text-black transition-colors">After effects of treatment of head neck cancers</h4>
          </summary>
          <div class="text-slate-600 space-y-3 mt-3 border-t border-slate-100 pt-3">
            <div class="flex items-start gap-3">
              <span class="text-green-500 font-bold text-xl leading-none mt-0.5">✓</span>
              <p class="!mb-0">Head neck cancers affect the most critical aspects of speech, swallowing, smell and appearance. Therefore, its treatment also has implications in the day-to-day activities of the patient.</p>
            </div>
            <p class="font-bold text-slate-700 ml-7 !mb-0">Due to surgery</p>
            <div class="flex items-start gap-3 ml-7">
              <span class="text-red-400 font-bold text-xl leading-none mt-0.5">&gt;</span>
              <p class="!mb-0">Changes in breathing- Occasionally, some people need a tracheostomy, which is an opening of the trachea directly onto the skin, kept open by a tracheostomy tube. It may be temporary or permanent, depending on the disease. Some patients may also need a feeding tube on a temporary basis.</p>
            </div>
          </div>
        </details>
      </li>
    </ul>
  </section>
`;

async function main() {
  const department = await prisma.department.findFirst({
    where: { name: 'Head and Neck Oncosurgery' }
  });

  if (!department) return;

  const $ = cheerio.load(department.description, null, false);
  
  // Find the exact FAQ section. 
  let faqSection = null;
  $('section').each(function() {
    if ($(this).find('h3').text().trim().toLowerCase() === 'faqs') {
      faqSection = $(this);
    }
  });

  if (faqSection) {
    faqSection.replaceWith(newFaqHtml);
    
    // Sometimes the broken HTML leaves extra paragraphs outside the section!
    // We should remove any loose `<p>` tags that are hanging around between FAQs and Contact Us.
    // The safest way is to clear everything until the Contact Us section.
  }
  
  // Actually, string replacement is safer for completely broken HTML where `</section>` is messed up.
  let html = department.description;
  const faqRegex = /<section>\s*<h3[^>]*>FAQs<\/h3>[\s\S]*?(?=<section>\s*<h3[^>]*>Contact Us<\/h3>)/i;
  
  if (faqRegex.test(html)) {
    html = html.replace(faqRegex, newFaqHtml);
    await prisma.department.update({
      where: { id: department.id },
      data: { description: html }
    });
    console.log("Updated via Regex.");
  } else {
    console.log("Regex failed, relying on Cheerio...");
    await prisma.department.update({
      where: { id: department.id },
      data: { description: $.html() }
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
