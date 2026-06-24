const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const dept = await prisma.department.findFirst({
    where: { name: { contains: 'ABDOMINAL' } }
  });
  console.log(dept.description.indexOf('border-collapse') !== -1 ? 'Has Tailwind Classes' : 'LOST TAILWIND CLASSES');
}
main().catch(console.error).finally(() => prisma.$disconnect());
