const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const department = await prisma.department.findFirst({
    where: { name: 'OBSTETRICS AND GYNAECOLOGY' }
  });
  
  if (department) {
    console.log("Found:", department.name);
    const fs = require('fs');
    fs.writeFileSync('gynae_desc.html', department.description || '');
    console.log("Wrote description to gynae_desc.html");
  } else {
    console.log("OBSTETRICS AND GYNAECOLOGY not found");
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
