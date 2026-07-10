const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const obesity = await prisma.department.findUnique({
    where: { id: 'cmpxpxqvw001dp31m3rwtucb4' } // OBESITY SURGERY
  });
  
  if (obesity && obesity.description) {
    let newDesc = obesity.description;
    
    // Fix FAQ image inline issue
    newDesc = newDesc.replace(
      '<p><img src="/uploads/002d72877e1c2e28.jpg">Brief set of questions frequently asked.</p>',
      '<p><img src="/uploads/002d72877e1c2e28.jpg"></p><p>Brief set of questions frequently asked.</p>'
    );
    
    // Fix Procedures image inline issue as well
    newDesc = newDesc.replace(
      '<p><img src="/uploads/19b10021f4a95073.jpg">Obesity surgery works by helping to reduce the number of calories that are available in your body. There are two ways this can be achieved surgically:</p>',
      '<p><img src="/uploads/19b10021f4a95073.jpg"></p><p>Obesity surgery works by helping to reduce the number of calories that are available in your body. There are two ways this can be achieved surgically:</p>'
    );
    
    await prisma.department.update({
      where: { id: 'cmpxpxqvw001dp31m3rwtucb4' },
      data: { description: newDesc }
    });
    console.log("Successfully fixed inline image overrides in OBESITY SURGERY");
  }
}

main().finally(() => prisma.$disconnect());
