const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const count = await prisma.service.count();
  console.log('Total services:', count);
  const size = await prisma.$queryRaw`SELECT sum(length(items)) as total_img_size FROM Service;`;
  console.log('Total items bytes:', size);
}
main().catch(console.error).finally(() => prisma.$disconnect());
