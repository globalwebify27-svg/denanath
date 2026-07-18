const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const res = await prisma.siteSetting.findUnique({where: {key: 'page_research_publications'}});
  const parsed = JSON.parse(res.value);
  const idx = parsed.content.indexOf('Tamhankar AS and Tamhankar TAA');
  if (idx !== -1) {
    const start = parsed.content.lastIndexOf('<div class="bg-white', idx);
    console.log(parsed.content.substring(start, start + 3000));
  }
}
test().catch(console.error).finally(()=>prisma.$disconnect());
