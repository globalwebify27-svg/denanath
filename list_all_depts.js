const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    select: { id: true, name: true }
  });

  console.log(JSON.stringify(depts, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
