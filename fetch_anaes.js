const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const dept = await prisma.department.findFirst({
    where: { name: 'ANAESTHESIOLOGY' }
  });
  if (dept) {
    fs.writeFileSync('anaes_desc.html', dept.description);
    console.log('saved');
  } else {
    console.log('not found');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
