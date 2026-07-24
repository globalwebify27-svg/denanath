const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const res = await prisma.siteSetting.findUnique({
    where: { key: 'page_events' }
  });
  console.log(res.value);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
