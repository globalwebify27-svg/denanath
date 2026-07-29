const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.department.findUnique({
  where: { id: 'knee-specialty-clinic' }
}).then(d => {
  console.log(d.description);
}).catch(console.error).finally(() => prisma.$disconnect());
