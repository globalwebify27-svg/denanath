const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');

async function test() {
  const res = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const data = JSON.parse(res.value);
  
  const $ = cheerio.load(data.content);
  
  // Find where the other divs are
  let rootDivs = 0;
  $('body > div.bg-white').each((i, el) => {
    rootDivs++;
  });
  console.log('Root divs:', rootDivs);
}
test().catch(console.error).finally(()=>prisma.$disconnect());
