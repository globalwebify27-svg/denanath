const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    where: { name: { contains: 'Hand' } }
  });
  
  for (const d of depts) {
    console.log(`ID: ${d.id}, Name: ${d.name}, Status: ${d.status}`);
    console.log(`Description Length: ${d.description ? d.description.length : 0}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
