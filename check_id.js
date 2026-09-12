const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const docs = await prisma.doctor.findMany({ where: { id: { in: ['24', '66', '123', '126', '406'] } } });
  console.log(docs.map(d => ({ id: d.id, dmhDoctorId: d.dmhDoctorId })));
}
main().catch(console.error).finally(() => prisma.$disconnect());
