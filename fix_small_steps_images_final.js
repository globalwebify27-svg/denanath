const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany();
  const dept = depts.find(d => d.name.toUpperCase() === 'PAEDIATRIC SMALL STEPS');
  if (!dept) return console.log('Not found');
  
  let desc = dept.description;
  
  // Strip out the forced size classes completely, but keep responsive defaults
  desc = desc.replace(/class="!w-\[280px\] md:!w-\[350px\] !h-\[180px\] md:!h-\[220px\] !object-cover !rounded-2xl !shadow-md !mb-4 !mt-2 block"/g, 'class="max-w-[80%] md:max-w-[400px] h-auto object-contain rounded-xl shadow-sm mb-4 mt-2 block"');
  
  await prisma.department.update({
    where: { id: dept.id },
    data: { description: desc }
  });
  console.log('Fixed image sizes in PAEDIATRIC SMALL STEPS to be natural and responsive');
}
main().catch(console.error).finally(() => prisma.$disconnect());
