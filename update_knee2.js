const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const dep = await prisma.department.findUnique({
    where: { id: 'knee-specialty-clinic' }
  });
  
  if (dep) {
    let html = dep.description;
    
    // The current content block we want to replace
    const targetContent = `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3><p><img src="/uploads/b892162fe12eaa3c.jpg"></p><p>We have developed the most innovative and sophisticated exercise center for problems related to the knee joint.</p>\n<ul>\n<li>Pain, stiffness, instability after a knee injury?</li>\n<li>Missing sports, trekking, or running?</li>\n<li>Muscle weakness after knee surgery?<br></li>\n</ul></section>`;
    
    const targetContent2 = `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3><p><img src="/uploads/b892162fe12eaa3c.jpg"></p><p>We have developed the most innovative and sophisticated exercise center for problems related to the knee joint.</p>\r\n<ul>\r\n<li>Pain, stiffness, instability after a knee injury?</li>\r\n<li>Missing sports, trekking, or running?</li>\r\n<li>Muscle weakness after knee surgery?<br></li>\r\n</ul></section>`;
    
    const newContent = `<section><h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Overview</h3><p><img src="/uploads/b892162fe12eaa3c.jpg"></p>\n<p><strong>Knee Specialty Exercise Clinic</strong><br/>Pain, stiffness, instability after knee injury?<br/>Missing sport, trekking or running?<br/>Muscle weakness after knee surgery?</p>\n<p>We have developed the most innovative and sophisticated exercise center for problems related to the knee joint.</p></section>`;
    
    if (html.includes(targetContent)) {
      html = html.replace(targetContent, newContent);
    } else if (html.includes(targetContent2)) {
      html = html.replace(targetContent2, newContent);
    } else {
      console.log("Could not find exact match, doing manual reconstruction.");
      // Just in case, let's do a more robust replace
      html = html.replace(/<section><h3 class="text-xl font-bold text-\[#002b5c\] mb-4 border-b pb-2">Overview<\/h3>.*?<\/section>/s, newContent);
    }
    
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
