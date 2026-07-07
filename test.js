const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.siteSetting.findUnique({ where: { key: 'page_virtual_tour' } })
  .then(res => {
    if (res && res.value) {
       const parsed = JSON.parse(res.value);
       console.log("Length:", parsed.locations.length);
       const names = parsed.locations.map(l => l.name);
       console.log("Names:", names);
    }
  });
