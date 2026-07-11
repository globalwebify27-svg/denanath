const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findUnique({
    where: { id: 'cmpxpxqwk001ip31mu7xt1hm0' }
  });
  fs.writeFileSync('oph_description.html', dept.description || '', 'utf8');
}

main().catch(console.error).finally(() => prisma.$disconnect());
