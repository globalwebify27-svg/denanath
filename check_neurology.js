const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const d = await prisma.department.findFirst({ where: { name: 'NEUROLOGY' }});
  if (d && d.description) console.log(d.description.substring(0, 500));
}
main().finally(() => prisma.$disconnect());
