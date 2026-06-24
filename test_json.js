const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const docs = await prisma.$queryRaw`SELECT id, name, length(publications) as pl, length(training) as tl, length(experience) as el, length(education) as edl FROM Doctor ORDER BY length(publications) DESC LIMIT 5;`;
  console.log(docs);
}
main().catch(console.error).finally(() => prisma.$disconnect());
