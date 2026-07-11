const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const services = await prisma.service.findMany({
    select: { id: true, title: true, icon: true }
  });
  console.log("Services:", services);
}

main().catch(console.error).finally(() => prisma.$disconnect());
