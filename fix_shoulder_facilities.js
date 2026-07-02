const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const dep = await prisma.department.findFirst({ where: { name: 'SHOULDER AND SPORTS INJURIES' } });
  
  if (dep) {
    let html = dep.description;
    
    // Fix the Outpatient h4
    html = html.replace('<h4 class="font-bold text-[#007a87] text-lg mb-2 mt-4">Outpatient Facilities – In the same premises</h4>', '<h4 class="font-bold text-[#007a87] text-lg mb-2 mt-4 col-span-full">Outpatient Facilities – In the same premises</h4>');
    
    // Fix the Indoor h4
    html = html.replace('<h4 class="font-bold text-[#007a87] text-lg mb-2 mt-6">Indoor Facilities</h4>', '<h4 class="font-bold text-[#007a87] text-lg mb-2 mt-6 col-span-full">Indoor Facilities</h4>');
    
    // Fix the p tag
    html = html.replace('<p class="text-slate-700 mb-2">Dedicated 2 Operation theatres for Arthroscopy and Shoulder replacement surgeries well equipped with:</p>', '<div class="text-slate-700 mb-2 col-span-full mt-4 font-medium">Dedicated 2 Operation theatres for Arthroscopy and Shoulder replacement surgeries well equipped with:</div>');
    
    await prisma.department.updateMany({
      where: { name: 'SHOULDER AND SPORTS INJURIES' },
      data: { description: html }
    });
    
    console.log("Updated HTML successfully.");
  }
}
run().catch(console.error).finally(() => prisma.$disconnect());
