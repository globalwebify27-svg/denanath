const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const d = await prisma.department.findUnique({where: {id: 'cmpxpxqol0008p31mv5rddkff'}}); // Wait, I need the actual ID. Let's find it by name.
  // I will use findFirst with name contains BRACHIAL PLEXUS
  const dept = await prisma.department.findFirst({
    where: { name: { contains: 'BRACHIAL PLEXUS' } }
  });
  if (dept && dept.description) {
    fs.writeFileSync('brachial_desc.txt', dept.description);
    console.log("Dumped current BRACHIAL PLEXUS description. ID: " + dept.id);
  } else {
    console.log("No description found for BRACHIAL PLEXUS");
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
