const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    where: {
      description: {
        contains: 'thoracic',
        mode: 'insensitive'
      }
    },
    select: {
      id: true,
      name: true
    }
  });
  console.log(depts);
}

main().finally(() => prisma.$disconnect());
