const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    where: {
      OR: [
        { name: { contains: 'OBSTETRICS' } },
        { name: { contains: 'ONCOLOGY' } }
      ]
    }
  });
  
  depts.forEach(d => {
    console.log(`\nID: ${d.id}`);
    console.log(`Name: ${d.name}`);
    console.log(`Desc: ${d.description.substring(0, 100)}...`);
  });
}

main().finally(() => prisma.$disconnect());
