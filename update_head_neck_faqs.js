const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const prisma = new PrismaClient();

const newFaqHtml = `
<section>
  <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">FAQs</h3>
  <div class="space-y-6">
    <div class="faq-item">
      <div class="flex items-start gap-3">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-1">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0">What are Head Neck Cancers?</h4>
      </div>
      <div class="pl-8 mt-2 text-slate-600">
        <p class="!mb-0">Head and neck cancer is a term used to denote cancer that develops in the mouth, throat, neck, nose, sinuses, salivary glands, thyroid or other areas of the head and neck. Most of these cancers are squamous cell carcinomas, or cancers that begin in the lining of the mouth, nose and throat. Eighty-five percent of head and neck cancers are linked to tobacco use, and 75 percent are associated with a combination of tobacco and alcohol use.</p>
      </div>
    </div>

    <div class="faq-item">
      <div class="flex items-start gap-3">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-1">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0">What are precancers?</h4>
      </div>
    </div>

    <div class="faq-item">
      <div class="flex items-start gap-3">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-1">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0">What are the treatment modalities?</h4>
      </div>
    </div>

    <div class="faq-item">
      <div class="flex items-start gap-3">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-1">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0">Why are Head Neck cancers important?</h4>
      </div>
    </div>

    <div class="faq-item">
      <div class="flex items-start gap-3">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-1">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0">Why do Head Neck Cancers happen? (Risk factors)</h4>
      </div>
    </div>

    <div class="faq-item">
      <div class="flex items-start gap-3">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-1">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0">How to suspect Head Neck Cancers?</h4>
      </div>
    </div>

    <div class="faq-item">
      <div class="flex items-start gap-3">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-1">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0">What are the common head neck cancers?</h4>
      </div>
    </div>

    <div class="faq-item">
      <div class="flex items-start gap-3">
        <span class="text-blue-400 font-bold text-2xl leading-none mt-1">?</span>
        <h4 class="text-lg text-blue-500 font-medium m-0">After effects of treatment of head neck cancers</h4>
      </div>
      <div class="pl-8 mt-3 text-slate-600 space-y-3">
        <div class="flex items-start gap-3">
          <span class="text-green-500 font-bold text-xl leading-none mt-1">✓</span>
          <p class="!mb-0">Head neck cancers affect the most critical aspects of speech, swallowing, smell and appearance. Therefore, its treatment also has implications in the day-to-day activities of the patient.</p>
        </div>
        <p class="font-bold text-slate-700 ml-7 !mb-0">Due to surgery</p>
        <div class="flex items-start gap-3 ml-7">
          <span class="text-red-400 font-bold text-xl leading-none mt-1">&gt;</span>
          <p class="!mb-0">Changes in breathing- Occasionally, some people need a tracheostomy, which is an opening of the trachea directly onto the skin, kept open by a tracheostomy tube. It may be temporary or permanent, depending on the disease. Some patients may also need a feeding tube on a temporary basis.</p>
        </div>
      </div>
    </div>
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
  
  // Find the FAQ section and replace it
  let replaced = false;
  $('section').each((_, section) => {
    const h3Text = $(section).find('h3').text().trim().toLowerCase();
    if (h3Text === 'faqs' || h3Text === 'faq') {
      $(section).replaceWith(newFaqHtml);
      replaced = true;
    }
  });

  if (!replaced) {
    // If not found, just append it
    $.root().append(newFaqHtml);
  }

  const updatedHtml = $.html();

  await prisma.department.update({
    where: { id: department.id },
    data: { description: updatedHtml }
  });

  console.log("Successfully updated FAQs for Head and Neck Oncosurgery");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
