const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

prisma.siteSetting.findUnique({ where: { key: 'layout_header' } })
  .then(res => {
    console.log(JSON.stringify(JSON.parse(res.value), null, 2));
  })
  .finally(() => prisma.$disconnect());
