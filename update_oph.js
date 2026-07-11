const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const cleanHtml = fs.readFileSync('oph_description_clean.html', 'utf8');
  await prisma.department.update({
    where: { id: 'cmpxpxqwk001ip31mu7xt1hm0' },
    data: { description: cleanHtml }
  });
  console.log("Updated Ophthalmology description");
}

main().catch(console.error).finally(() => prisma.$disconnect());
