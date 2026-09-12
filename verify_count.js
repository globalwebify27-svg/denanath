const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const docs = await prisma.doctor.findMany({ select: { dmhSpecialityId: true } });
  let totalProfiles = 0;
  for (const doc of docs) {
    if (doc.dmhSpecialityId) {
      totalProfiles += doc.dmhSpecialityId.split(',').filter(Boolean).length;
    } else {
      // If a doctor has no speciality, they still count as 1 profile
      totalProfiles += 1;
    }
  }
  console.log(`Total database doctors: ${docs.length}`);
  console.log(`Total specialties across all doctors: ${totalProfiles}`);
}
main().catch(console.error).finally(() => prisma.$disconnect());
