const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.siteSetting.findUnique({where:{key:'home_courses'}}).then(s => console.log(s.value)).catch(e => console.log(e)).finally(() => prisma.$disconnect());
