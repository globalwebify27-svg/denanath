const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lab3 = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab3' } });
  if (lab3) {
    let data = JSON.parse(lab3.value);
    delete data.image;
    data.gallery = [];
    await prisma.siteSetting.update({
      where: { key: 'page_simulation_lab3' },
      data: { value: JSON.stringify(data) }
    });
    console.log('Cleared image from lab 3');
  }
}
main().finally(() => prisma.$disconnect());
