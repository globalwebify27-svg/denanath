const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.department.update({
    where: { id: 'cmpxpxqnp0003p31m7zcacc6b' }, // The older duplicate
    data: { status: false }
  });
  console.log("Successfully hid the older duplicate PREVENTIVE MEDICINE department.");
}

main().finally(() => prisma.$disconnect());
