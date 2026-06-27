const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const newHtml = fs.readFileSync('andro_desc.txt', 'utf8');
  await prisma.department.updateMany({
    where: { name: { contains: 'ANDROLOGY' } },
    data: { description: newHtml }
  });
  console.log("Updated ANDROLOGY successfully.");
}
main().catch(console.error).finally(() => prisma.$disconnect());
