import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Updating primary keys to match DMH API IDs...');
  
  // This raw SQL will update the primary key `id` to be the same as `dmhDoctorId`
  // for all doctors where `dmhDoctorId` is not null.
  const result = await prisma.$executeRaw`UPDATE Doctor SET id = dmhDoctorId WHERE dmhDoctorId IS NOT NULL`;
  
  console.log(`Successfully updated ${result} doctor primary keys to match the API ID.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
