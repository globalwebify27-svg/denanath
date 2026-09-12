const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const nullDocs = await prisma.doctor.count({ where: { dmhDoctorId: null } });
  console.log('Docs with null dmhDoctorId:', nullDocs);
}
main().catch(console.error).finally(() => prisma.$disconnect());
