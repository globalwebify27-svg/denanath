const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const res = await prisma.siteSetting.findUnique({where: {key: 'page_research_publications'}});
  const parsed = JSON.parse(res.value);
  const idx = parsed.content.indexOf('Nath D, Hiwale A, Kurwale N, Patil CY. (April 2023)');
  if (idx !== -1) {
    const start = parsed.content.lastIndexOf('<div class="bg-white', idx);
    let end = parsed.content.indexOf('</div>', idx);
    end = parsed.content.indexOf('</div>', end + 5);
    end = parsed.content.indexOf('</div>', end + 5) + 6;
    console.log(parsed.content.substring(start, end));
  }
}
test().catch(console.error).finally(()=>prisma.$disconnect());
