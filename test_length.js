const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function test() {
  const res = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const data = JSON.parse(res.value);
  console.log(data.content.length);
}
test().catch(console.error).finally(()=>prisma.$disconnect());
