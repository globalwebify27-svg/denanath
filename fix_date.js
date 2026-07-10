const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.doctor.delete({
      where: { id: 'cmqp0uedk00227375wrn3p1sy' } // Dr. DATE SHARDUL
    });
    console.log("Successfully deleted the duplicate: Dr. DATE SHARDUL");
  } catch(e) {
    console.log("Could not delete duplicate or already deleted:", e.message);
  }
  
  try {
    // Restore the proper original image for Dr. DATE SHARDUL VIDYADHAR
    const updated = await prisma.doctor.update({
      where: { id: 'cmr3j7hbp000013fn2pqfqipi' }, // Dr. DATE SHARDUL VIDYADHAR
      data: {
        image: "https://www.dmhospital.org/images/Hospital/Doctor/Small-DMH/1370_Pic.jpg"
      }
    });
    console.log("Successfully fixed Dr. DATE SHARDUL VIDYADHAR's image/record.");
  } catch(e) {
    console.log("Error updating:", e.message);
  }
}
main().finally(() => prisma.$disconnect());
