const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const data = {
    title: "Patient Portal",
    googlePlayUrl: "#",
    appStoreUrl: "#",
    features: [
      "View Pathology & Radiology Reports",
      "View Discharge Summary",
      "View OPD Schedule",
      "Book Appointments",
      "Explore Health Packages",
      "Ask Queries directly to Doctors"
    ]
  };

  try {
    await prisma.siteSetting.upsert({
      where: { key: 'page_online-facilities_patient_portal' },
      update: {
        value: JSON.stringify(data)
      },
      create: {
        key: 'page_online-facilities_patient_portal',
        value: JSON.stringify(data)
      }
    });
    console.log("Seeded patient portal page successfully.");
  } catch (error) {
    console.error("Error seeding patient portal:", error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
