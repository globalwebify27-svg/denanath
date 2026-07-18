const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 
async function run() { 
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_patient_rights' } }); 
  if (setting && setting.value) { 
    const data = JSON.parse(setting.value); 
    data.imageUrl = '/images/patient-rights-high-res.png'; 
    await prisma.siteSetting.update({ 
      where: { key: 'page_patient_rights' }, 
      data: { value: JSON.stringify(data) } 
    }); 
    console.log('DB updated'); 
  } else { 
    console.log('No DB setting found'); 
  } 
} 
run().finally(() => prisma.$disconnect());
