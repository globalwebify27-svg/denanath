const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const doctors = await prisma.doctor.findMany();
  let count = 0;
  for (const doc of doctors) {
    const trimmed = doc.name.trim();
    if (doc.name !== trimmed) {
      await prisma.doctor.update({
        where: { id: doc.id },
        data: { name: trimmed }
      });
      console.log(`Trimmed: "${doc.name}" -> "${trimmed}"`);
      count++;
    }
  }
  console.log(`Successfully trimmed names for ${count} doctors.`);
}

main().finally(() => prisma.$disconnect());
