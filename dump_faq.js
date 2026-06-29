const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const department = await prisma.department.findFirst({
    where: { name: 'Head and Neck Oncosurgery' }
  });

  const $ = cheerio.load(department.description, null, false);
  let faqText = '';
  $('section').each((_, section) => {
    const h3Text = $(section).find('h3').text().trim().toLowerCase();
    if (h3Text === 'faqs' || h3Text === 'faq') {
      faqText = $(section).html();
    }
  });

  fs.writeFileSync('faq_raw.html', faqText);
  console.log('Saved raw FAQ html to faq_raw.html');
}

main().catch(console.error).finally(() => prisma.$disconnect());
