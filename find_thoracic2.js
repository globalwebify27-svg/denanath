const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    select: { id: true, name: true, description: true }
  });
  const results = depts.filter(d => d.description && d.description.toLowerCase().includes('thoracic'));
  results.forEach(r => console.log(r.name));
}

main().finally(() => prisma.$disconnect());
