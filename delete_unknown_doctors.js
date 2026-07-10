const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const unknownDoctors = await prisma.doctor.findMany({
    where: {
      name: {
        contains: 'Unknown Doctor'
      }
    }
  });
  console.log("Found Unknown Doctors:", unknownDoctors.length);
  
  if (unknownDoctors.length > 0) {
    const ids = unknownDoctors.map(d => d.id);
    const deleteResult = await prisma.doctor.deleteMany({
      where: {
        id: { in: ids }
      }
    });
    console.log(`Deleted ${deleteResult.count} Unknown Doctor records.`);
  } else {
    console.log("No Unknown Doctor records found.");
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
