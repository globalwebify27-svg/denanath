const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findFirst();
  console.log("Department schema:", Object.keys(dept || {}));
}

main().catch(console.error).finally(() => prisma.$disconnect());
