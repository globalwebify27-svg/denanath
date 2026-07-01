const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const prisma = new PrismaClient();
async function main() {
  const depts = await prisma.department.findMany({where:{status:true}});
  for (const department of depts) {
    if(department.description) {
      console.log('Testing', department.name);
      const $ = cheerio.load(department.description, null, false);
      $('section').each((_, section) => {
        const h3Text = $(section).find('h3').first().text().trim().toLowerCase();
        if (h3Text === 'faq' || h3Text === 'faqs' || h3Text === "faq's" || h3Text === 'frequently asked questions' || h3Text === 'specialities' || h3Text === 'speciality') {
          const h4Tags = $(section).children('h4, div').find('h4').addBack('h4');
          if (h4Tags.length > 0) {
            h4Tags.each((_, h4) => {
              let nextEl = $(h4).next();
              let iterations = 0;
              while (nextEl.length > 0 && nextEl.prop('tagName') !== 'H4' && nextEl.prop('tagName') !== 'H3') {
                iterations++;
                if (iterations > 1000) {
                    console.log('INFINITE LOOP DETECTED on', department.name);
                    process.exit(1);
                }
                nextEl = nextEl.next();
              }
            });
          }
        }
      });
    }
  }
  console.log('Done');
}
main().catch(console.error);
