const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const dbDocs = await prisma.doctor.findMany({ select: { id: true, dmhDoctorId: true, name: true }});
  console.log('Total in DB:', dbDocs.length);
  
  // Try to see if there are any duplicate names or strange ids
  const names = {};
  dbDocs.forEach(d => {
    names[d.name] = (names[d.name] || 0) + 1;
  });
  
  const dupes = Object.entries(names).filter(([name, count]) => count > 1);
  console.log('Duplicate names in DB:', dupes.length);
  if (dupes.length > 0) console.log(dupes);

  // We can't easily call DMH API from here without the same fetch wrapper, let's just use raw fetch if possible
  // Or just check the DB counts
}

main().catch(console.error).finally(() => prisma.$disconnect());
