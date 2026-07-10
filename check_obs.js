const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const obstetrics = await prisma.department.findUnique({
    where: { id: 'cmpxpxqw1001ep31mq8nwhmlo' }
  });
  
  if (obstetrics) {
    const obsMatches = obstetrics.description.match(/<section>.*?FAQ.*?<\/section>/is);
    if (obsMatches) console.log(obsMatches[0]);
  }
}

main().finally(() => prisma.$disconnect());
