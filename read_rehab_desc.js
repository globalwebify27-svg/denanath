const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findUnique({
    where: { id: 'cmpxpxqz60023p31mztqtkqp0' }
  });
  console.log(dept.description);
}

main().finally(async () => await prisma.$disconnect());
