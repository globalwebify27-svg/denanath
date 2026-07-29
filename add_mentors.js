const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const additionalHTML = `
<h3>Mentors (Department of Radiology)</h3>
<p><strong>Dr Aditi Gujarathi, MD</strong><br/>Department of Radiology</p>
<p><strong>Dr Sonali Deshmukh, MD</strong><br/>Department of Radiology</p>
<p><strong>Dr Sujit Nilegaokar DRM, DNB</strong><br/>Nuclear Medicine</p>
<p><strong>Dr Aniruddha Joshi, DNB</strong><br/>Department of Radiology</p>
`;

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  if (setting) {
    let data = JSON.parse(setting.value);
    
    const courseIndex = data.leftCourses.findIndex(c => c.title === "Oncology Imaging Fellowship");
    if (courseIndex !== -1) {
      // Append the additional HTML to the existing content without losing anything
      data.leftCourses[courseIndex].content += additionalHTML;
    } else {
      console.log("Course not found in DB.");
    }
    
    await prisma.siteSetting.update({
      where: { key: 'home_courses' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Database updated successfully. Mentors added.");
  } else {
    console.log("No home_courses setting found in DB.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
