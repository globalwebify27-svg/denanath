const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');

async function test() {
  const res = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const data = JSON.parse(res.value);
  
  const $ = cheerio.load(data.content);
  
  let current = $('.space-y-6').first();
  console.log("Found space-y-6!");
  
  // What are the parents of all 'div.bg-white' ?
  let parents = new Set();
  $('div.bg-white').each((i, el) => {
    parents.add($(el).parent().attr('class') || $(el).parent().get(0).tagName);
  });
  console.log("Parents of div.bg-white:", Array.from(parents));
}
test().catch(console.error).finally(()=>prisma.$disconnect());
