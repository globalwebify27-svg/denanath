const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const ds = await prisma.department.findMany({select:{name:true, id:true}});
  console.log(ds);
}
main().catch(console.error).finally(() => prisma.$disconnect());
