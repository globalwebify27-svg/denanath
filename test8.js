const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.siteSetting.findMany().then(s => {
  const y = s.filter(x => x.value.toLowerCase().includes('yoga'));
  console.log(y.map(x => x.key));
}).catch(console.error).finally(() => prisma.$disconnect());
