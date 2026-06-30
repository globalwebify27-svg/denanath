const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const department = await prisma.department.findFirst({
    where: { name: 'OBESITY SURGERY' }
  });
  
  if (department) {
    console.log("Found:", department.name);
    const fs = require('fs');
    fs.writeFileSync('obesity_desc.html', department.description || '');
    console.log("Wrote description to obesity_desc.html");
  } else {
    console.log("OBESITY SURGERY not found");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
