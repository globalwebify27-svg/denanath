const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.department.findMany().then(deps => {
  const d = deps.filter(x => x.description && x.description.includes('Pramod Patil'));
  console.log(d.map(x => ({id: x.id, name: x.name, desc: x.description})));
}).catch(console.error).finally(() => prisma.$disconnect());
