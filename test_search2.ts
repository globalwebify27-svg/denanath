import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function run() {
  const dept = await prisma.department.findFirst({
    where: { description: { contains: "contact" } },
    select: { name: true, description: true }
  });
  if (dept && dept.description) {
    const idx = dept.description.toLowerCase().indexOf("contact");
    console.log("Matched in dept:", dept.name);
    console.log("Snippet:", dept.description.substring(Math.max(0, idx - 50), idx + 50));
  }
}
run().finally(() => prisma.$disconnect());
