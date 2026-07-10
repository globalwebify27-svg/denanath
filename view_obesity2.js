const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    where: {
      name: { contains: 'OBESITY' }
    }
  });
  console.log(depts[0].description);
}

main().finally(() => prisma.$disconnect());
