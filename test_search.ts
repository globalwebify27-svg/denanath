import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const depts = await prisma.department.findMany({
    where: {
      OR: [
        { name: { contains: "contact" } },
        { description: { contains: "contact" } },
      ],
    },
    select: { name: true, description: true }
  });
  console.log("Matched depts:", depts.length);
  if (depts.length > 0) {
    console.log("Sample description snippet:", depts[0].description?.substring(0, 100));
  }
}
run().finally(() => prisma.$disconnect());
