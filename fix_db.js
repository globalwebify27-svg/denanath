const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function run() {
  const prisma = new PrismaClient();
  const d = await prisma.siteSetting.findUnique({where:{key:'page_research_publications'}});
  let data = JSON.parse(d.value);
  let content = data.content;

  const lines = content.split('\n');
  
  // Find where to insert 2023-2024
  let insert2023 = -1;
  let insert2022 = -1;
  
  for(let j=0; j<lines.length; j++) {
    if (lines[j].includes('font-semibold text-slate-800')) {
      const yrM = lines[j].match(/20\d{2}/);
      if (yrM) {
         const yr = parseInt(yrM[0]);
         if (yr === 2023 && insert2023 === -1) {
           // backtrack to the start of this publication div
           for (let k = j; k >= 0; k--) {
             if (lines[k].includes('<div class="bg-white border border-slate-200')) {
               insert2023 = k;
               break;
             }
           }
         }
         if (yr === 2022 && insert2022 === -1) {
           for (let k = j; k >= 0; k--) {
             if (lines[k].includes('<div class="bg-white border border-slate-200')) {
               insert2022 = k;
               break;
             }
           }
         }
      }
    }
  }

  if (insert2023 !== -1 && insert2022 !== -1) {
    // Insert from bottom to top so indices don't shift!
    if (insert2022 > insert2023) {
      lines.splice(insert2022, 0, '\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2022 \u2013 March 2023</h4>\n');
      lines.splice(insert2023, 0, '\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2023 \u2013 March 2024</h4>\n');
    }
    
    data.content = lines.join('\n');
    await prisma.siteSetting.update({
      where: { key: 'page_research_publications' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Successfully inserted headers for 2022 and 2023.");
  } else {
    console.log("Could not find insertion points.");
    console.log("2023:", insert2023, "2022:", insert2022);
  }
}
run().finally(() => process.exit(0));
