const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lab2 = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab2' } });
  console.log('LAB 2 DATA:', lab2 ? lab2.value : 'null');
}
main().finally(() => prisma.$disconnect());
