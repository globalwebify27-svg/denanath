const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.doctor.delete({
      where: { id: 'cmqp0uena00247375rsk340iw' } // Dr. DATE JAYDEEP
    });
    console.log("Successfully deleted the duplicate: Dr. DATE JAYDEEP");
  } catch(e) {
    console.log("Could not delete duplicate or already deleted:", e.message);
  }
  
  try {
    // Restore the proper original image for Dr. DATE JAYDEEP ARUN
    await prisma.doctor.update({
      where: { id: 'cmr3j6v0v00013r29mq8wq44a' }, // Dr. DATE JAYDEEP ARUN
      data: {
        image: "https://www.dmhospital.org/images/Hospital/Doctor/Small-DMH/203_Pic.jpg"
      }
    });
    console.log("Successfully fixed Dr. DATE JAYDEEP ARUN's image/record.");
  } catch(e) {
    console.log("Error updating:", e.message);
  }
}
main().finally(() => prisma.$disconnect());
