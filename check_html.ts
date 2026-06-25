import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  const dept = await prisma.department.findFirst({
    where: { name: { contains: 'ALLERGY' } }
  });
  if (dept) {
    console.log("Found:", dept.name);
    console.log("HTML:", dept.description);
  } else {
    console.log("Not found.");
  }
}

checkData().finally(() => prisma.$disconnect());
