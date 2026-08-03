import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const trueCount = await prisma.doctor.count({ where: { isAppAllowed: true } });
  const falseCount = await prisma.doctor.count({ where: { isAppAllowed: false } });
  console.log(`isAppAllowed -> True: ${trueCount}, False: ${falseCount}`);
  
  const sample = await prisma.doctor.findMany({ take: 10, select: { name: true, isAppAllowed: true, dmhDoctorId: true } });
  console.log('Sample doctors:', sample);
}

main().catch(console.error).finally(() => prisma.$disconnect());
