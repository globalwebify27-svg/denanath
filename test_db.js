const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const count = await prisma.doctor.count();
  console.log('Total doctors:', count);
  const size = await prisma.$queryRaw`SELECT sum(length(image)) as total_img_size FROM Doctor;`;
  console.log('Total image bytes:', size);
}
main().catch(console.error).finally(() => prisma.$disconnect());
