const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const doc24 = await prisma.doctor.findUnique({ where: { id: '24' } });
  console.log('Doc with id 24:', doc24 ? doc24.dmhDoctorId : null);
  
  const doc18 = await prisma.doctor.findUnique({ where: { id: '18' } });
  console.log('Doc with id 18:', doc18 ? doc18.dmhDoctorId : null);
}
main().catch(console.error).finally(() => prisma.$disconnect());
