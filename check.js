const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const department = await prisma.department.findFirst({
    where: { name: 'Head and Neck Oncosurgery' }
  });
  console.log(department.description);
}
check().catch(console.error).finally(() => prisma.$disconnect());
