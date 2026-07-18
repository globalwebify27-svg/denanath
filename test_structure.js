const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');

async function test() {
  const res = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const data = JSON.parse(res.value);
  
  const $ = cheerio.load(data.content);
  
  const container = $('.space-y-6').first();
  console.log("Children count:", container.children().length);
  
  // What are the children?
  const types = {};
  container.children().each((i, el) => {
    types[el.tagName] = (types[el.tagName] || 0) + 1;
  });
  console.log(types);
  
  const allH4s = $('h4').length;
  const allDivs = $('div.bg-white').length;
  console.log("Total H4s in document:", allH4s);
  console.log("Total DIVs in document:", allDivs);
}
test().catch(console.error).finally(()=>prisma.$disconnect());
