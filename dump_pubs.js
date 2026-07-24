const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const d = await prisma.siteSetting.findUnique({where:{key:'page_research_publications'}});
  require('fs').writeFileSync('temp_dump.json', JSON.stringify(d.value));
}
main().finally(() => prisma.$disconnect());
