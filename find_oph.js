const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany();
  console.log("Departments:", depts.filter(d => d.name.toLowerCase().includes('oph')).map(d => ({ id: d.id, name: d.name })));

  const specialties = await prisma.specialty.findMany();
  console.log("Specialties:", specialties.filter(s => s.name.toLowerCase().includes('oph')).map(s => ({ id: s.id, name: s.name })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
