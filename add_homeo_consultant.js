const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const prisma = new PrismaClient();

async function main() {
  const allDepts = await prisma.department.findMany();
  const homeoDept = allDepts.find(d => d.name.toUpperCase() === 'HOMEOPATHY');
  
  if (homeoDept) {
    const $ = cheerio.load(homeoDept.description, null, false);
    
    // Check if consultant section already exists
    let exists = false;
    $('section').each((_, section) => {
      const h3 = $(section).find('h3').first();
      if (h3.text().trim().toLowerCase().includes('consultant')) {
        exists = true;
      }
    });

    if (!exists) {
      // Find the "Contact Us" section so we can insert before it
      let contactSection = null;
      $('section').each((_, section) => {
        const h3 = $(section).find('h3').first();
        if (h3.text().trim().toLowerCase() === 'contact us') {
          contactSection = $(section);
        }
      });

      const consultantHtml = `
      <section>
        <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
        <ul class="list-disc pl-5 space-y-2 mt-2 marker:text-[#002b5c]">
          <li>Dr. BHALGAT PRAVIN</li>
          <li>Dr. JOSHI SMITA</li>
          <li>Dr. MALUSHTE RAHUL</li>
          <li>Dr. PHANSALKAR SHIRISH</li>
          <li>Dr. SOLANKI MANEESHA</li>
          <li>Dr. VYAS DEEPA</li>
        </ul>
      </section>
      `;

      if (contactSection) {
        $(consultantHtml).insertBefore(contactSection);
      } else {
        $('.space-y-8').append(consultantHtml);
      }

      await prisma.department.update({
        where: { id: homeoDept.id },
        data: { description: $.html() }
      });
      console.log("Added Consultant section to HOMEOPATHY description.");
    } else {
      console.log("Consultant section already exists.");
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
