const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findUnique({
    where: { id: 'cmpxpxqxp001rp31mp1s7gdjl' }
  });
  fs.writeFileSync('paed_description.html', dept.description || '', 'utf8');
}

main().catch(console.error).finally(() => prisma.$disconnect());
