const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const value = JSON.stringify({
    seoMetaTitle: "Deenanath Mangeshkar Hospital and Research Center | Pune",
    seoMetaDescription: "Official web portal of Deenanath Mangeshkar Hospital and Research Center, Pune. Experience state-of-the-art clinical super-specialties, Pune's finest doctor roster, 24/7 trauma emergency response, and preventative health care. Delivering medical excellence with human warmth.",
    seoKeywords: "Deenanath Mangeshkar Hospital and Research Center,DMH Pune,Erandwane Hospital,Best Hospital in Pune,Book Doctor Appointment Pune,Emergency Trauma Care Pune,Mangeshkar Hospital and Rsearch center."
  });

  await prisma.siteSetting.upsert({
    where: { key: 'page_home' },
    update: { value },
    create: { key: 'page_home', value }
  });
  console.log("Restored page_home");
}

main().catch(console.error).finally(() => prisma.$disconnect());
