const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const r = await prisma.siteSetting.findUnique({ where: { key: 'page_research_contact' } });
  if (r) {
    console.log('CONTENT:');
    console.log(r.value);
  } else {
    console.log('NOT FOUND');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
