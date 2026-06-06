const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.siteSetting.findUnique({ where: { key: 'page_gallery_photos' } })
  .then(s => {
    const json = JSON.parse(s.value);
    console.log(json.photos.slice(json.photos.length - 2));
  })
  .catch(console.error)
  .finally(() => prisma.$disconnect());
