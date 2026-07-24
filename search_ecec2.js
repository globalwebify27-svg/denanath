const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.siteSetting.findMany();
  for (const setting of settings) {
      console.log(`Setting: ${setting.key} - ${setting.value.substring(0, 50)}...`);
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
