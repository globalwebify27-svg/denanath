const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function test() {
  const res = await prisma.siteSetting.findUnique({where: {key: 'page_research_publications'}});
  const parsed = JSON.parse(res.value);
  const archiveIdx = parsed.content.indexOf('Archive Years');
  console.log(parsed.content.substring(archiveIdx, archiveIdx + 3000));
}
test().catch(console.error).finally(()=>prisma.$disconnect());
