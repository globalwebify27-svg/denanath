const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany();
  const dept = depts.find(d => d.name.toUpperCase() === 'PAEDIATRIC SMALL STEPS');
  if (!dept) return console.log('Not found');
  
  let desc = dept.description;
  
  // Replace !h-auto with aspect-video to enforce 16:9 ratio
  desc = desc.replace(/!h-auto/g, 'aspect-video');
  
  await prisma.department.update({
    where: { id: dept.id },
    data: { description: desc }
  });
  console.log('Fixed image sizes in PAEDIATRIC SMALL STEPS to 16:9 ratio (aspect-video)');
}
main().catch(console.error).finally(() => prisma.$disconnect());
