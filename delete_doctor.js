const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const doctors = await prisma.doctor.findMany({
    where: {
      name: {
        contains: 'BHAVE'
      }
    }
  });
  
  console.log("Found doctors with BHAVE:");
  doctors.forEach(d => console.log(d.id, d.name, d.specialty));
  
  // Find and delete the one named exactly "Dr. BHAVE SHIRISH SURESH" or similar
  for (const doc of doctors) {
    if (doc.name.trim().toLowerCase() === "dr. bhave shirish suresh" || doc.name.trim().toLowerCase() === "bhave shirish suresh") {
      console.log("Deleting:", doc.id, doc.name);
      await prisma.doctor.delete({
        where: { id: doc.id }
      });
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
