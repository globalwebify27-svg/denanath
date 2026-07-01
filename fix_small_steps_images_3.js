const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany();
  const dept = depts.find(d => d.name.toUpperCase() === 'PAEDIATRIC SMALL STEPS');
  if (!dept) return console.log('Not found');
  
  let desc = dept.description;
  
  // Replace the old injected classes with the new fixed-size classes
  desc = desc.replace(/<img([^>]*)>/g, (match, p1) => {
    // Remove any existing class attribute
    const cleanP1 = p1.replace(/class="[^"]*"/g, '');
    // Inject the new classes to match exactly: same fixed width, same fixed height, block display
    return `<img${cleanP1} class="!w-[280px] md:!w-[350px] !h-[180px] md:!h-[220px] !object-cover !rounded-2xl !shadow-md !mb-4 !mt-2 block" >`;
  });

  await prisma.department.update({
    where: { id: dept.id },
    data: { description: desc }
  });
  console.log('Fixed image sizes in PAEDIATRIC SMALL STEPS to exact same small size');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
