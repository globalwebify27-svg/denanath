const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({
    where: { key: 'page_simulation_lab2' }
  });
  console.log(JSON.stringify(JSON.parse(setting.value), null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
