const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fetching current doctors...');
  // 1. Fetch the 446 doctors currently in the DB (which have the images & content restored)
  const currentDocs = await prisma.doctor.findMany();

  console.log('Clearing Doctor table temporarily...');
  // 2. Clear the table
  await prisma.doctor.deleteMany({});

  console.log('Re-inserting doctors with API ID mapped to Primary ID...');
  // 3. Re-insert them, forcing the internal 'id' to match the 'dmhDoctorId'
  let updatedCount = 0;
  for (const doc of currentDocs) {
    // Determine the new ID: if it has an API ID, use it. Otherwise, keep the random one.
    const newId = doc.dmhDoctorId ? String(doc.dmhDoctorId) : doc.id;
    
    await prisma.doctor.create({
      data: {
        ...doc,
        id: newId
      }
    });
    updatedCount++;
  }

  console.log(`✅ Successfully updated ${updatedCount} doctors! The Admin Panel will now show the actual API ID.`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
