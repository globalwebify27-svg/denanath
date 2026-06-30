const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const d = await prisma.department.findMany({ select: { name: true } });
  console.log(d.map(x => x.name));
}
main().finally(() => prisma.$disconnect());
