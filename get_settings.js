const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.siteSetting.findUnique({ where: { key: 'page_events' } });
  console.log(JSON.stringify(JSON.parse(settings.value), null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
