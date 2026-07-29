const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  if (setting) {
    let data = JSON.parse(setting.value);
    
    const courseIndex = data.leftCourses.findIndex(c => c.title === "Oncology Imaging Fellowship");
    if (courseIndex !== -1) {
      data.leftCourses[courseIndex].link = "";
    }
    
    await prisma.siteSetting.update({
      where: { key: 'home_courses' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Database updated successfully. Link forced to empty string.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
