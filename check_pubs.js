const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const d = await prisma.siteSetting.findUnique({where:{key:'page_research_publications'}});
  const data = JSON.parse(d.value);
  const lines = data.content.split('\n');
  
  let i23 = -1, i22 = -1, i21 = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('Publications: April 2023')) i23 = i;
    if (lines[i].includes('Publications: April 2022')) i22 = i;
    if (lines[i].includes('Publications: April 2021')) i21 = i;
  }
  
  console.log("2023 -> 2022 pub count:", lines.slice(i23, i22).filter(l => l.includes('<div class="bg-white border border-slate-200')).length);
  console.log("2022 -> 2021 pub count:", lines.slice(i22, i21).filter(l => l.includes('<div class="bg-white border border-slate-200')).length);
}
main().finally(() => process.exit(0));
