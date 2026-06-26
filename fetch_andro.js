const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const d = await prisma.department.findUnique({where: {id: 'cmpxpxqo60005p31myw35t8oh'}});
  if (d && d.description) {
    fs.writeFileSync('andro_desc.txt', d.description);
    console.log("Dumped current ANDROLOGY description");
  } else {
    console.log("No description found for ANDROLOGY");
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
