const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findFirst({
    where: { name: 'TRANSFUSION MEDICINE' }
  });
  console.log(dept);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
