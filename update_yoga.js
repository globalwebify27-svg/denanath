const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<p>Welcome to the Yoga Centre. Join our classes to improve your physical and mental well-being under expert guidance. Below are the details of our ongoing schedule.</p>

<h3>Yoga Class Schedule</h3>
<ul>
  <li><strong>Batch Name:</strong> Bihar School of Yoga</li>
  <li><strong>Timing:</strong> 06:00pm to 7:00pm</li>
  <li><strong>Days:</strong> Monday , Wednesday and Friday</li>
  <li><strong>Fee Structure:</strong> Rs. 1200 /- for one month</li>
</ul>

<h3>Registration Details</h3>
<p>For registration details kindly contact:</p>
<ul>
  <li><strong>Telephone:</strong> <a href="tel:02049154121">020 4915 4121</a></li>
  <li><strong>Email:</strong> <a href="mailto:yoga@dmhospital.org">yoga@dmhospital.org</a></li>
</ul>
`;

const gallery = [
  { image: "/images/Yoga_Img1.jpg", caption: "Yoga Class 1" },
  { image: "/images/Yoga_Img2.jpg", caption: "Yoga Class 2" }
];

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  if (setting) {
    let data = JSON.parse(setting.value);
    
    const courseIndex = data.rightCourses.findIndex(c => c.title === "Yoga Classes Schedule");
    if (courseIndex !== -1) {
      data.rightCourses[courseIndex].content = htmlContent;
      data.rightCourses[courseIndex].gallery = gallery;
      data.rightCourses[courseIndex].link = ""; 
    } else {
      console.log("Yoga Classes Schedule not found in DB.");
    }
    
    await prisma.siteSetting.update({
      where: { key: 'home_courses' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Database updated successfully. Yoga content migrated.");
  } else {
    console.log("No home_courses setting found in DB.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
