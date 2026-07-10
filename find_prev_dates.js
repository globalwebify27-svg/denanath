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
    console.log(`CreatedAt: ${d.createdAt}`);
    console.log(`UpdatedAt: ${d.updatedAt}`);
  });
}

main().finally(() => prisma.$disconnect());
