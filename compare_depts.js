const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const abdominal = await prisma.department.findFirst({
    where: { name: { contains: 'ABDOMINAL TRANSPLANT' } }
  });
  
  const rehab = await prisma.department.findFirst({
    where: { name: { contains: 'REHAB - EXERCISE' } }
  });

  console.log("ABDOMINAL TRANSPLANT HTML:\n", abdominal?.description?.substring(0, 500), "...\n");
  console.log("REHAB EXERCISE HTML:\n", rehab?.description?.substring(0, 500), "...\n");
  
  // Save full to files for inspection
  const fs = require('fs');
  if(abdominal) fs.writeFileSync('abdominal.html', abdominal.description || '');
  if(rehab) fs.writeFileSync('rehab.html', rehab.description || '');
}

main().finally(async () => await prisma.$disconnect());
