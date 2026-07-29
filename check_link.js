const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  if (setting) {
    let data = JSON.parse(setting.value);
    const courseIndex = data.leftCourses.findIndex(c => c.title === "Oncology Imaging Fellowship");
    if (courseIndex !== -1) {
      console.log("Course link value is:", JSON.stringify(data.leftCourses[courseIndex].link));
    } else {
      console.log("Course not found in DB.");
    }
  } else {
    console.log("No home_courses setting found in DB.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
