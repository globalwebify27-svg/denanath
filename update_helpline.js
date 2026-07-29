const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const htmlContent = `
<h3>Garbha-Swasthya Helpline</h3>
<p>ParamGarbha-Swasthya helpline, a helpline to provide free information about questions and concerns about unborn baby’s well-being was inaugurated at the hands of Dr. Kiran Bedi, on September 18th 2010. This helpline is provided by Prenatal Medicine Program of Deenanath Mangeshkar Hospital, Pune. Hon. Ushatai Mangeshkar, Meenatai Khadikar, Medical Director Dr. Dhananjay Kelkar & other dignitaries were present at the occasion.</p>
<p>Garbha-Swasthya helpline will operate from 10 am to 4 pm from Monday to Saturday and callers may dial <strong>020-4015 1500</strong> to avail this facility.</p>

<h4>Glimpses of Inauguration programme</h4>

<p>Garbhaswasthya Helpline for finding about fetal welbeing in special conditions such as maternal illness, drug exposure, infections during pregnancy, genetic disorders, special tests during pregnancy etc.</p>
<p>Please call <strong>020-40151500</strong> to access the helpline.</p>
`;

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  
  if (setting) {
    let data = JSON.parse(setting.value);
    
    const courseIndex = data.rightCourses.findIndex(c => c.title === "Garbha-Swasthya Helpline");
    if (courseIndex !== -1) {
      data.rightCourses[courseIndex].content = htmlContent;
      // Also ensure the self-referencing link issue doesn't pop up
      data.rightCourses[courseIndex].link = ""; 
    } else {
      console.log("Helpline not found in DB.");
    }
    
    await prisma.siteSetting.update({
      where: { key: 'home_courses' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Database updated successfully. Helpline content updated.");
  } else {
    console.log("No home_courses setting found in DB.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
