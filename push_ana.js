const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const newHtml = fs.readFileSync('ana_desc.txt', 'utf8');
  await prisma.department.updateMany({
    where: { name: { contains: 'ANAESTHESIOLOGY' } },
    data: { description: newHtml }
  });
  console.log("Updated ANAESTHESIOLOGY successfully.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
