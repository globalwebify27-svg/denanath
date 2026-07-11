const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_home' } });
  console.log(setting);
}

main().catch(console.error).finally(() => prisma.$disconnect());
