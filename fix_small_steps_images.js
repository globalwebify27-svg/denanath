const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany();
  const dept = depts.find(d => d.name.toUpperCase() === 'PAEDIATRIC SMALL STEPS');
  if (!dept) return console.log('Not found');
  
  let desc = dept.description;
  
  // First, remove any existing injected classes to start fresh
  desc = desc.replace(/class="!w-full !h-48 md:!h-64 !object-cover !rounded-2xl !shadow-md !my-6"/g, '');
  
  // Now add the classes to ensure all images are uniform
  desc = desc.replace(/<img([^>]*)>/g, (match, p1) => {
    // If it already has a class attribute, we might want to append to it, but for simplicity let's just assume these raw tags don't.
    // Remove any existing class attributes so we can append our fresh ones
    const cleanP1 = p1.replace(/class="[^"]*"/g, '');
    return `<img${cleanP1} class="!w-full !max-w-[300px] md:!max-w-[400px] !h-[200px] md:!h-[250px] !object-cover !rounded-2xl !shadow-md !mb-4 block" >`;
  });

  await prisma.department.update({
    where: { id: dept.id },
    data: { description: desc }
  });
  console.log('Fixed image sizes in PAEDIATRIC SMALL STEPS');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
