const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    where: {
      name: { contains: 'OBESITY' }
    }
  });
  console.log(JSON.stringify(depts, null, 2));
}

main().finally(() => prisma.$disconnect());
