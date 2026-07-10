const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_doctors_department_details' } });
  console.log(setting.value);
}

main().finally(() => prisma.$disconnect());
