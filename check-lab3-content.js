const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lab3 = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab3' } });
  if (lab3) {
    let data = JSON.parse(lab3.value);
    console.log("LAB 3 CONTENT: ", data.content ? data.content.substring(0, 100) + "..." : "empty");
  }
}
main().finally(() => prisma.$disconnect());
