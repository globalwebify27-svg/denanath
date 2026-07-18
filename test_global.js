const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const cheerio = require('cheerio');

async function test() {
  const res = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const data = JSON.parse(res.value);
  
  const $ = cheerio.load(data.content);
  
  let h4Count = 0;
  let pubCount = 0;
  
  $('h4, div.bg-white').each((i, el) => {
    if (el.tagName === 'h4') {
      h4Count++;
    } else if (el.tagName === 'div' && $(el).hasClass('bg-white')) {
      // make sure it's a publication, not something else. Publications have hover:shadow
      if ($(el).hasClass('hover:-translate-y-1')) {
        pubCount++;
      }
    }
  });
  
  console.log(`Found ${h4Count} headers and ${pubCount} publications!`);
}
test().catch(console.error).finally(()=>prisma.$disconnect());
