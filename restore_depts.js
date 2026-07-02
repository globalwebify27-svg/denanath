const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.department.updateMany({
    where: { name: { in: ['NEUROLOGY', 'CARDIO-THORACIC AND VASCULAR SURGERY'] } },
    data: { description: "" }
  });
  console.log("Restored NEUROLOGY and CARDIO-THORACIC AND VASCULAR SURGERY");
}
main().catch(console.error).finally(() => prisma.$disconnect());
