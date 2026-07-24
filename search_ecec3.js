const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany();
  for (const dept of depts) {
      if (dept.description && dept.description.includes('ECECEC')) console.log(`Found in Dept: ${dept.id}`);
  }
  const docs = await prisma.doctor.findMany();
  for (const doc of docs) {
      if (doc.publications && doc.publications.includes('ECECEC')) console.log(`Found in Doctor: ${doc.id}`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
