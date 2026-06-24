const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const dept = await prisma.department.findFirst({
    where: { name: { contains: 'ABDOMINAL TRANSPLANT' } },
    select: { description: true }
  });
  console.log(dept.description);
}
main().catch(console.error).finally(() => prisma.$disconnect());
