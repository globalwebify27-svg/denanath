const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const d = await prisma.department.findUnique({where: {id: 'cmpxpxqoe0006p31mmfwt9u0a'}}); // The ID from previous fetch
  if (d && d.description) {
    fs.writeFileSync('arthro_desc.txt', d.description);
    console.log("Dumped current ARTHROSCOPY AND ARTHROPLASTY description");
  } else {
    console.log("No description found");
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
