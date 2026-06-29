const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const prisma = new PrismaClient();

const newFaqHtml = `
<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-6 border-b pb-2">FAQs</h3>
  <div class="space-y-2">
    <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
      <summary class="flex items-start gap-3 list-none outline-none">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-0.5">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0 group-hover:text-blue-600 transition-colors">What are Head Neck Cancers?</h4>
      </summary>
      <div class="pl-8 text-slate-600 mt-3 border-t border-slate-100 pt-3">
        <p class="!mb-0">Head and neck cancer is a term used to denote cancer that develops in the mouth, throat, neck, nose, sinuses, salivary glands, thyroid or other areas of the head and neck. Most of these cancers are squamous cell carcinomas, or cancers that begin in the lining of the mouth, nose and throat. Eighty-five percent of head and neck cancers are linked to tobacco use, and 75 percent are associated with a combination of tobacco and alcohol use.</p>
      </div>
    </details>

    <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
      <summary class="flex items-start gap-3 list-none outline-none">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-0.5">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0 group-hover:text-blue-600 transition-colors">What are precancers?</h4>
      </summary>
      <div class="pl-8 text-slate-600 mt-3 border-t border-slate-100 pt-3">
        <p class="!mb-0 text-slate-400 italic">Information will be updated soon.</p>
      </div>
    </details>

    <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
      <summary class="flex items-start gap-3 list-none outline-none">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-0.5">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0 group-hover:text-blue-600 transition-colors">What are the treatment modalities?</h4>
      </summary>
      <div class="pl-8 text-slate-600 mt-3 border-t border-slate-100 pt-3">
        <p class="!mb-0 text-slate-400 italic">Information will be updated soon.</p>
      </div>
    </details>

    <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
      <summary class="flex items-start gap-3 list-none outline-none">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-0.5">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0 group-hover:text-blue-600 transition-colors">Why are Head Neck cancers important?</h4>
      </summary>
      <div class="pl-8 text-slate-600 mt-3 border-t border-slate-100 pt-3">
        <p class="!mb-0 text-slate-400 italic">Information will be updated soon.</p>
      </div>
    </details>

    <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
      <summary class="flex items-start gap-3 list-none outline-none">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-0.5">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0 group-hover:text-blue-600 transition-colors">Why do Head Neck Cancers happen? (Risk factors)</h4>
      </summary>
      <div class="pl-8 text-slate-600 mt-3 border-t border-slate-100 pt-3">
        <p class="!mb-0 text-slate-400 italic">Information will be updated soon.</p>
      </div>
    </details>

    <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
      <summary class="flex items-start gap-3 list-none outline-none">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-0.5">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0 group-hover:text-blue-600 transition-colors">How to suspect Head Neck Cancers?</h4>
      </summary>
      <div class="pl-8 text-slate-600 mt-3 border-t border-slate-100 pt-3">
        <p class="!mb-0 text-slate-400 italic">Information will be updated soon.</p>
      </div>
    </details>

    <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
      <summary class="flex items-start gap-3 list-none outline-none">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-0.5">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0 group-hover:text-blue-600 transition-colors">What are the common head neck cancers?</h4>
      </summary>
      <div class="pl-8 text-slate-600 mt-3 border-t border-slate-100 pt-3">
        <p class="!mb-0 text-slate-400 italic">Information will be updated soon.</p>
      </div>
    </details>

    <details class="faq-item group cursor-pointer p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-slate-100 [&_summary::-webkit-details-marker]:hidden">
      <summary class="flex items-start gap-3 list-none outline-none">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-0.5">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0 group-hover:text-blue-600 transition-colors">After effects of treatment of head neck cancers</h4>
      </summary>
      <div class="pl-8 text-slate-600 space-y-3 mt-3 border-t border-slate-100 pt-3">
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
  </div>
</section>
`;

async function main() {
  const department = await prisma.department.findFirst({
    where: { name: 'Head and Neck Oncosurgery' }
  });

  if (!department) {
    console.log("Department not found");
    return;
  }

  const $ = cheerio.load(department.description, null, false);
  
  let replaced = false;
  $('section').each((_, section) => {
    const h3Text = $(section).find('h3').text().trim().toLowerCase();
    if (h3Text === 'faqs' || h3Text === 'faq') {
      $(section).replaceWith(newFaqHtml);
      replaced = true;
    }
  });

  if (!replaced) {
    $.root().append(newFaqHtml);
  }

  const updatedHtml = $.html();

  await prisma.department.update({
    where: { id: department.id },
    data: { description: updatedHtml }
  });

  console.log("Successfully updated FAQs for Head and Neck Oncosurgery with details/summary");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
