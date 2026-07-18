const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');

async function test() {
  const res = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const data = JSON.parse(res.value);
  
  const $ = cheerio.load(data.content);
  
  const container = $('.space-y-6').first();
  if (!container.length) {
    console.log("NO container found!");
    return;
  }
  
  console.log("Total children:", container.children().length);
  
  let h4Count = 0;
  let divCount = 0;
  let otherCount = 0;
  let missingFieldsCount = 0;
  
  container.children().each((i, child) => {
    const $child = $(child);
    if (child.tagName === 'h4') {
      h4Count++;
    } else if (child.tagName === 'div' && $child.hasClass('bg-white')) {
      divCount++;
      const pTags = $child.find('p');
      const title = pTags.eq(0).text().trim();
      const authorsDate = pTags.eq(1).text().trim();
      
      const spans = $child.find('.flex span');
      const journal = spans.eq(0).text().trim();
      
      const aTag = $child.find('a');
      const doi = aTag.text().trim();
      
      if (!title || !authorsDate || (!journal && !doi)) {
        missingFieldsCount++;
        if (missingFieldsCount < 5) {
          console.log("Missing fields in:", {title, authorsDate, journal, doi});
          console.log("HTML:", $child.prop('outerHTML').substring(0, 200));
        }
      }
    } else {
      otherCount++;
      if (otherCount < 5) {
        console.log("Other child:", $child.prop('outerHTML').substring(0, 200));
      }
    }
  });
  
  console.log({ h4Count, divCount, otherCount, missingFieldsCount });
}
test().catch(console.error).finally(()=>prisma.$disconnect());
