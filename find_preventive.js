const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    where: {
      name: { contains: 'PREVENTIVE' }
    }
  });
  
  depts.forEach(d => {
    console.log(`\nID: ${d.id}`);
    console.log(`Name: ${d.name}`);
    console.log(`Status: ${d.status}`);
    console.log(`Description Length: ${d.description ? d.description.length : 0}`);
  });
}

main().finally(() => prisma.$disconnect());
