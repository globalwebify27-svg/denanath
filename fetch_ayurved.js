const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const d = await prisma.department.findUnique({where: {id: 'cmpxpxqol0007p31mikesmw3o'}}); // ID for AYURVED from previous fetch_depts
  if (d && d.description) {
    fs.writeFileSync('ayurved_desc.txt', d.description);
    console.log("Dumped current AYURVED description");
  } else {
    console.log("No description found");
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
