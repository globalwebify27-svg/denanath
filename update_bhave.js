const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updatedDoctor = await prisma.doctor.update({
    where: { id: 'cmqp0u9ml00147375kjgkl68f' },
    data: { specialty: 'Urology' }
  });
  console.log("Successfully updated Dr. BHAVE SHIRISH:");
  console.log(updatedDoctor.id, updatedDoctor.name, updatedDoctor.specialty);
}
main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
