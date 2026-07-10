const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const query = "Dr. BHAVE SHIRISH";
  const doctors = await prisma.doctor.findMany({
    where: {
      name: {
        contains: query,
      }
    }
  });
  console.log("Docs found with exact string:", doctors.length);
  
  const doctors2 = await prisma.doctor.findMany({
    where: {
      name: {
        contains: "BHAVE",
      }
    }
  });
  console.log("Docs found with BHAVE:", doctors2.length);
}
main().finally(() => prisma.$disconnect());
