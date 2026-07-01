const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const prisma = new PrismaClient();

async function main() {
  const depts = await prisma.department.findMany({ where: { status: true } });
  for (const d of depts) {
    if (d.description) {
      try {
        const $ = cheerio.load(d.description, null, false);
        $('section').each((_, s) => {
          $(s).find('h3').first().text();
        });
      } catch (e) {
        console.error('Error in', d.name, e);
      }
    }
  }
  console.log('Done');
}
main().catch(console.error);
