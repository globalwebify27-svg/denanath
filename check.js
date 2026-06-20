const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_publications' } });
  if (setting) {
    const html = JSON.parse(setting.value).content;
    const idx = html.indexOf('showAll');
    if (idx !== -1) {
      console.log('FOUND AT: ' + idx);
      console.log(html.substring(idx - 100, idx + 500));
    } else {
      console.log('NOT FOUND');
    }
  }
  await prisma.$disconnect();
}

run();
