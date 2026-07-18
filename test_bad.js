const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');

async function test() {
  const res = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const data = JSON.parse(res.value);
  
  const $ = cheerio.load(data.content);
  
  // Find where the other divs are
  let firstBadDiv = $('div.bg-white').filter((i, el) => {
    return $(el).parent().attr('class') !== 'space-y-6';
  }).first();
  
  console.log("First bad div parent:", firstBadDiv.parent().prop('outerHTML').substring(0, 300));
}
test().catch(console.error).finally(()=>prisma.$disconnect());
