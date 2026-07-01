const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany();
  const dept = depts.find(d => d.name.toUpperCase() === 'PAEDIATRIC SMALL STEPS');
  if (!dept) return console.log('Not found');
  
  let desc = dept.description;
  
  // Replace the old injected classes (the small floating ones) with the new ones
  desc = desc.replace(/<img([^>]*)>/g, (match, p1) => {
    // Remove any existing class attribute
    const cleanP1 = p1.replace(/class="[^"]*"/g, '');
    // Inject the new classes to match the screenshot (not floating, max width around 400px/md size, text below)
    return `<img${cleanP1} class="!w-full !max-w-[350px] md:!max-w-[450px] !h-auto !object-cover !rounded-2xl !shadow-md !mb-6 !mt-2 block" >`;
  });

  await prisma.department.update({
    where: { id: dept.id },
    data: { description: desc }
  });
  console.log('Fixed image sizes in PAEDIATRIC SMALL STEPS to match screenshot');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
