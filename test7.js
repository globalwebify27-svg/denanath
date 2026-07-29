const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.siteSetting.findMany().then(s => console.log(s.map(x => x.key))).catch(console.error).finally(() => prisma.$disconnect());
