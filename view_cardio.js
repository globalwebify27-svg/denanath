const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({
    where: {
      name: {
        contains: 'CARDIO-THORACIC AND VASCULAR SURGERY'
      }
    }
  });
  console.log(JSON.stringify(depts, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
