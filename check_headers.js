const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const d = await prisma.siteSetting.findUnique({where:{key:'page_research_publications'}});
  const data = JSON.parse(d.value);
  const lines = data.content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Publications: April')) {
      console.log('Header at line', i, ':', lines[i].trim());
    }
  }
}
main().finally(() => process.exit(0));
