const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const lab3 = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab3' } });
  if (lab3) {
    let data = JSON.parse(lab3.value);
    fs.writeFileSync('lab3_content.html', data.content);
    console.log("Wrote lab3_content.html");
  }
}
main().finally(() => prisma.$disconnect());
