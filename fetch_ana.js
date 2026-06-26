const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const d = await prisma.department.findFirst({where: {name: {contains: 'ANAESTHESIOLOGY'}}});
  const fs = require('fs');
  fs.writeFileSync('ana_desc.txt', d.description);
}
main().catch(console.error).finally(() => prisma.$disconnect());
