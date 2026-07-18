const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function test() {
  const res = await prisma.siteSetting.findUnique({where: {key: 'page_research_publications'}});
  const parsed = JSON.parse(res.value);
  console.log('Contains 2017-2018?', parsed.content.includes('Publications - April 2017 - March 2018'));
  console.log('Contains 2016-2017?', parsed.content.includes('April 2016 - March 2017'));
}
test().catch(console.error).finally(()=>prisma.$disconnect());
