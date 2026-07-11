const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findUnique({
    where: { id: 'cmpxpxqwk001ip31mu7xt1hm0' }
  });
  console.log(JSON.stringify(dept, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
