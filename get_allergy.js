const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const d = await prisma.department.findFirst({where:{name:'ALLERGY CLINIC'}});
  if (d) {
    console.log(d.description);
  } else {
    console.log("NOT FOUND");
  }
}
main().finally(() => prisma.$disconnect());
