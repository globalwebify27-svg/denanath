const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const data = {
    title: "Patient Registration Form",
    introText: "Registration is a process by which patient is enrolled into the records of the hospital. This is required to provide seamless hospital services to the patient and to keep track of various services that are availed by the patient. This is also the first step to generate a medical record of the patient in which all medical details of the patient are documented.",
    highlightText: "This facility is to be used only by patient coming first time to this hospital.",
  };

  try {
    await prisma.siteSetting.upsert({
      where: { key: 'page_online-facilities_patient_registration' },
      update: { value: JSON.stringify(data) },
      create: { key: 'page_online-facilities_patient_registration', value: JSON.stringify(data) }
    });
    console.log("Seeded patient_registration_page successfully.");
  } catch (e) {
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
}

run();
