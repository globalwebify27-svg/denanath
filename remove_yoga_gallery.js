const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  if (setting) {
    let data = JSON.parse(setting.value);
    
    const courseIndex = data.rightCourses.findIndex(c => c.title === "Yoga Classes Schedule");
    if (courseIndex !== -1) {
      // Remove gallery from frontend rendering by setting it to an empty array
      data.rightCourses[courseIndex].gallery = [];
    } else {
      console.log("Yoga Classes Schedule not found in DB.");
    }
    
    await prisma.siteSetting.update({
      where: { key: 'home_courses' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Database updated successfully. Gallery removed from Yoga Centre.");
  } else {
    console.log("No home_courses setting found in DB.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
