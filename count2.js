const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const c = await prisma.doctor.count();
  console.log('Final DB count:', c);
}
main().catch(console.error).finally(() => prisma.$disconnect());
