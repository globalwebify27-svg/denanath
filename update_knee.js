const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const dep = await prisma.department.findUnique({
    where: { id: 'knee-specialty-clinic' }
  });
  
  if (dep) {
    let html = dep.description;
    
    const targetContent = `<p><img src="/uploads/b892162fe12eaa3c.jpg">We have developed the most innovative and sophisticated exercise center for problems related to the knee joint.</p>\r\n<ul>\r\n<li>Pain, stiffness, instability after a knee injury?</li>\r\n<li>Missing sports, trekking, or running?</li>\r\n<li>Muscle weakness after knee surgery?<br></li>\r\n</ul>`;
    
    const newContent = `<p><strong>Knee Specialty Exercise Clinic</strong><br/>Pain, stiffness, instability after knee injury?<br/>Missing sport, trekking or running?<br/>Muscle weakness after knee surgery?</p>\r\n<p><img src="/uploads/b892162fe12eaa3c.jpg">We have developed the most innovative and sophisticated exercise center for problems related to the knee joint.</p>`;
    
    html = html.replace(targetContent, newContent);
    
    await prisma.department.update({
      where: { id: 'knee-specialty-clinic' },
      data: { description: html }
    });
    
    console.log("Updated successfully!");
  } else {
    console.log("Department not found");
  }
}

run().catch(console.error).finally(() => prisma.$disconnect());
