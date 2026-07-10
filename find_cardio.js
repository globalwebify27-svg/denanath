const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    where: {
      OR: [
        { name: { contains: 'CARDIO' } },
        { name: { contains: 'VASCULAR' } },
        { name: { contains: 'THORACIC' } }
      ]
    },
    select: {
      id: true,
      name: true,
      description: true
    }
  });
  
  depts.forEach(d => {
    console.log(`\nID: ${d.id}`);
    console.log(`Name: ${d.name}`);
    console.log(`Description Length: ${d.description ? d.description.length : 0}`);
  });
}

main().finally(() => prisma.$disconnect());
