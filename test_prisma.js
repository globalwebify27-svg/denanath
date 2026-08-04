const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const c = await prisma.siteSetting.findUnique({where: {key: 'page_cathlab_pricing'}});
  const i = await prisma.siteSetting.findUnique({where: {key: 'page_implant_pricing'}});
  console.log('Cathlab:', c?.value?.substring(0, 500));
  console.log('Implant:', i?.value?.substring(0, 500));
}

main().finally(() => prisma.$disconnect());
