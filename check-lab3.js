const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lab = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab3' } });
  console.log('LAB 3 DATA:', lab ? lab.value : 'null');
}
main().finally(() => prisma.$disconnect());
