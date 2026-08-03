const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany();
  const dept = depts.find(d => d.name.toUpperCase() === 'PAEDIATRIC SMALL STEPS');
  if (!dept) return console.log('Not found');
  
  let desc = dept.description;
  fs.writeFileSync('paed_small_steps_dump.txt', desc, 'utf8');
  console.log('Dumped');
}
main().catch(console.error).finally(() => prisma.$disconnect());
