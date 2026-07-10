const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Fix OBSTETRICS FAQ image
  const obstetrics = await prisma.department.findUnique({
    where: { id: 'cmpxpxqw1001ep31mq8nwhmlo' }
  });
  
  if (obstetrics && obstetrics.description) {
    let newDesc = obstetrics.description;
    newDesc = newDesc.replace(
      '<p><img src="/uploads/002d72877e1c2e28.jpg">Brief set of questions frequently asked.</p>',
      '<p><img src="/uploads/002d72877e1c2e28.jpg"></p><p>Brief set of questions frequently asked.</p>'
    );
    await prisma.department.update({
      where: { id: 'cmpxpxqw1001ep31mq8nwhmlo' },
      data: { description: newDesc }
    });
    console.log("Fixed OBSTETRICS AND GYNAECOLOGY");
  }

  // 2. Fix ONCOLOGY Infrastructure image
  const oncology = await prisma.department.findUnique({
    where: { id: 'cmpxpxqwa001gp31mzoxhxbvx' }
  });
  
  if (oncology && oncology.description) {
    let newDesc = oncology.description;
    newDesc = newDesc.replace(
      '<li>Chemotherapy Administered (Jan 14 to Aug 14)<img src="/uploads/297e47f1ef0f4397.jpg"></li>',
      '<li>Chemotherapy Administered (Jan 14 to Aug 14)</li></ul><div class="mt-6 w-full text-center"><img src="/uploads/297e47f1ef0f4397.jpg"></div><ul>'
    );
    
    // Clean up empty <ul> just in case there were no elements after it
    newDesc = newDesc.replace(/<ul>\s*<\/ul>/g, '');
    
    await prisma.department.update({
      where: { id: 'cmpxpxqwa001gp31mzoxhxbvx' },
      data: { description: newDesc }
    });
    console.log("Fixed ONCOLOGY");
  }
}

main().finally(() => prisma.$disconnect());
