const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    where: {
      OR: [
        { name: { contains: 'REHAB' } },
        { name: { contains: 'EXERCISE' } }
      ]
    },
    select: { name: true, id: true }
  });
  console.log(JSON.stringify(depts, null, 2));
}

main().finally(async () => await prisma.$disconnect());
