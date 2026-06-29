const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findFirst({
    where: { name: { contains: 'Cardiology' } }
  });
  console.log(dept.description);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
