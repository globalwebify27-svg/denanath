import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting duplicate cleanup and mapping...');

  // 1. Get all doctors with a dmhDoctorId (these are the ones we just synced)
  const syncedDoctors = await prisma.doctor.findMany({
    where: {
      dmhDoctorId: { not: null },
    },
  });

  // 2. Get all doctors WITHOUT a dmhDoctorId (these are the original manual ones)
  const originalDoctors = await prisma.doctor.findMany({
    where: {
      dmhDoctorId: null,
    },
  });

  console.log(`Found ${syncedDoctors.length} synced doctors and ${originalDoctors.length} original doctors.`);

  let matchedCount = 0;
  let deletedCount = 0;

  for (const syncedDoc of syncedDoctors) {
    // Try to find a match in the original doctors by name.
    // The DMH API names often have "(SPECIALTY)" appended, like "PATIL SURESH (JOINT REPLACEMENT)".
    // The original might just be "Dr. PATIL SURESH" or "PATIL SURESH".
    const syncedNameBase = syncedDoc.name.replace(/\(.*?\)/g, '').replace(/^Dr\.?\s*/i, '').trim().toLowerCase();
    
    // Find the best match in original doctors
    const match = originalDoctors.find(orig => {
      const origNameBase = orig.name.replace(/\(.*?\)/g, '').replace(/^Dr\.?\s*/i, '').trim().toLowerCase();
      // Check if names match or one contains the other
      return origNameBase === syncedNameBase || 
             (origNameBase.length > 5 && syncedNameBase.includes(origNameBase)) ||
             (syncedNameBase.length > 5 && origNameBase.includes(syncedNameBase));
    });

    if (match) {
      console.log(`Matching: [Original] "${match.name}" <==> [Synced] "${syncedDoc.name}"`);
      
      // Delete the duplicate synced doctor FIRST so we free up the unique dmhDoctorId
      await prisma.doctor.delete({
        where: { id: syncedDoc.id },
      });

      // Update the original doctor with the API IDs and the API name/specialty
      await prisma.doctor.update({
        where: { id: match.id },
        data: {
          dmhDoctorId: syncedDoc.dmhDoctorId,
          dmhSpecialityId: syncedDoc.dmhSpecialityId,
          name: syncedDoc.name, // the user requested to map the API name and designation
          specialty: syncedDoc.specialty,
        },
      });

      matchedCount++;
      deletedCount++;

      // Remove from originalDoctors array so we don't match it twice
      const index = originalDoctors.findIndex(o => o.id === match.id);
      if (index > -1) originalDoctors.splice(index, 1);
    } else {
      // If no match found, we leave it as is (it's a valid new doctor from the API)
    }
  }

  console.log(`Cleanup complete! Matched and merged ${matchedCount} doctors. Deleted ${deletedCount} duplicates.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
