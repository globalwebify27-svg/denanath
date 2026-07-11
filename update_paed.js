const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const cleanHtml = fs.readFileSync('paed_description_clean.html', 'utf8');
  await prisma.department.update({
    where: { id: 'cmpxpxqxp001rp31mp1s7gdjl' },
    data: { description: cleanHtml }
  });
  console.log("Updated Paediatric Small Steps description");
}

main().catch(console.error).finally(() => prisma.$disconnect());
