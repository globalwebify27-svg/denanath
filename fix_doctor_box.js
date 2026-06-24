const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const dept = await prisma.department.findFirst({
    where: { name: { contains: 'ABDOMINAL TRANSPLANT' } }
  });
  let html = dept.description;

  html = html.replace(/text-\[\#002b5c\] m-0/g, 'text-slate-800 m-0');
  html = html.replace(/bg-teal-100 flex items-center justify-center text-teal-600/g, 'bg-slate-100 flex items-center justify-center text-slate-600');
  
  await prisma.department.update({
    where: { id: dept.id },
    data: { description: html }
  });
  console.log('Fixed Doctor Box Color');
}
main().catch(console.error).finally(() => prisma.$disconnect());
