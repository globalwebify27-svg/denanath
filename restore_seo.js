const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function restore() {
  const current = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const currentData = JSON.parse(current.value);
  
  currentData.seoMetaTitle = "Deenanath Mangeshkar Hospital and Research Center | Pune";
  currentData.seoKeywords = "Deenanath Mangeshkar Hospital and Research Center,DMH Pune,Erandwane Hospital,Best Hospital in Pune,Book Doctor Appointment Pune,Emergency Trauma Care Pune,Mangeshkar Hospital and Rsearch center.";
  currentData.seoMetaDescription = "Official web portal of Deenanath Mangeshkar Hospital and Research Center, Pune. Experience state-of-the-art clinical super-specialties, Pune's finest doctor roster, 24/7 trauma emergency response, and preventative health care. Delivering medical excellence with human warmth.";
  
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(currentData) }
  });
  console.log('Restored SEO data!');
}

restore().catch(console.error).finally(()=>prisma.$disconnect());
