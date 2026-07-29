const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.siteSetting.findUnique({where: {key: 'home_courses'}}).then(s => {
  const data = JSON.parse(s.value);
  console.log(data);
}).catch(console.error).finally(() => prisma.$disconnect());
