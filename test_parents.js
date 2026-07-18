const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');

async function test() {
  const res = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const data = JSON.parse(res.value);
  
  const $ = cheerio.load(data.content);
  
  // Find where the other h4s are
  $('h4').each((i, el) => {
    console.log(`H4 ${i}:`, $(el).parent().attr('class'));
  });
}
test().catch(console.error).finally(()=>prisma.$disconnect());
