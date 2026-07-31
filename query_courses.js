const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: 'home_courses' } });
  if (setting) {
    const parsed = JSON.parse(setting.value);
    console.log(JSON.stringify(parsed, null, 2));
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
