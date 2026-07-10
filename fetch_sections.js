const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const obstetrics = await prisma.department.findUnique({ where: { id: 'cmpxpxqw1001ep31mq8nwhmlo' } });
  console.log("OBSTETRICS FAQ:");
  const obsMatches = obstetrics.description.match(/<section>.*?FAQ.*?<\/section>/is);
  if (obsMatches) console.log(obsMatches[0]);

  const oncology = await prisma.department.findUnique({ where: { id: 'cmpxpxqwa001gp31mzoxhxbvx' } });
  console.log("\nONCOLOGY INFRA:");
  const oncMatches = oncology.description.match(/<section>.*?Infrastructure.*?<\/section>/is);
  if (oncMatches) console.log(oncMatches[0]);
}

main().finally(() => prisma.$disconnect());
