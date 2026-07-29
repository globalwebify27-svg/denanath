const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.department.findMany().then(deps => {
  const d = deps.filter(x => x.name.toLowerCase().includes('yoga'));
  console.log(d.map(x => ({id: x.id, name: x.name})));
}).catch(console.error).finally(() => prisma.$disconnect());
