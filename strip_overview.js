const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function stripOverview() {
  const setting = await prisma.siteSetting.findUnique({where: {key: 'home_courses'}});
  if (!setting) return;
  
  let currentData = JSON.parse(setting.value);
  const index = currentData.leftCourses.findIndex(c => c.link === '/neuro-radiology-fellowship');
  
  if (index !== -1 && currentData.leftCourses[index].content) {
    let content = currentData.leftCourses[index].content;
    // Remove the h2 overview tag we injected
    content = content.replace(/<h2 class="text-2xl font-bold border-b border-slate-100 pb-4 mb-6">Overview<\/h2>\s*/, '');
    // Also remove if Quill stripped classes
    content = content.replace(/<h2>Overview<\/h2>\s*/, '');
    // Also remove if Quill made it a p
    content = content.replace(/<p>Overview<\/p>\s*/, '');
    
    currentData.leftCourses[index].content = content;
    
    await prisma.siteSetting.update({
      where: { key: 'home_courses' },
      data: { value: JSON.stringify(currentData) }
    });
    console.log("Stripped Overview from DB successfully.");
  }
  await prisma.$disconnect();
}

stripOverview().catch(console.error);
