const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const obstetrics = await prisma.department.findUnique({
    where: { id: 'cmpxpxqw1001ep31mq8nwhmlo' }
  });
  
  if (obstetrics && obstetrics.description) {
    let newDesc = obstetrics.description;
    
    // Use regex to fix the FAQ image regardless of the random upload filename
    newDesc = newDesc.replace(
      /<p><img src="([^"]+)">Brief set of questions frequently asked\.<\/p>/g,
      '<p><img src="$1"></p><p>Brief set of questions frequently asked.</p>'
    );
    
    await prisma.department.update({
      where: { id: 'cmpxpxqw1001ep31mq8nwhmlo' },
      data: { description: newDesc }
    });
    console.log("Fixed OBSTETRICS AND GYNAECOLOGY");
  }
}

main().finally(() => prisma.$disconnect());
