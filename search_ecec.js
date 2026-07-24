const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.siteSetting.findMany();
  for (const setting of settings) {
    if (setting.value.includes('ECECEC')) {
      console.log(`Found in SiteSetting: ${setting.key}`);
      console.log(setting.value);
    }
  }

  const services = await prisma.service.findMany();
  for (const service of services) {
    if (service.items.includes('ECECEC') || service.title.includes('ECECEC')) {
      console.log(`Found in Service: ${service.id} - ${service.title}`);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
