const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    where: { name: { contains: 'PLAY THERAPY' } }
  });
  console.log("Depts:", depts.map(d => ({ id: d.id, name: d.name })));

  const specialties = await prisma.specialty.findMany({
    where: { name: { contains: 'PLAY THERAPY' } }
  });
  console.log("Specialties:", specialties.map(s => ({ id: s.id, name: s.name })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
