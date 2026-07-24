const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.siteSetting.findMany();
  for (const setting of settings) {
    if (setting.value.includes('EC Approval') || setting.key.includes('ec_approval') || setting.key.includes('ec-approval')) {
      console.log(`Setting found: ${setting.key}`);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
