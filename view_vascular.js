const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findUnique({
    where: { id: 'cmpxpxr08002ap31maye3qoxo' }
  });
  console.log(dept.description);
}

main().finally(() => prisma.$disconnect());
