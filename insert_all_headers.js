const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const d = await prisma.siteSetting.findUnique({where:{key:'page_research_publications'}});
  let data = JSON.parse(d.value);
  let lines = data.content.split('\n');
  
  // We want to insert headers for 2020, 2019, 2018, 2017
  const years = [
    { year: 2020, header: '\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2020 \u2013 March 2021</h4>\n' },
    { year: 2019, header: '\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2019 \u2013 March 2020</h4>\n' },
    { year: 2018, header: '\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2018 \u2013 March 2019</h4>\n' },
    { year: 2017, header: '\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2017 \u2013 March 2018</h4>\n' }
  ];

  for (const item of years) {
    // find the first occurrence of this year
    let insertIdx = -1;
    for (let j = 0; j < lines.length; j++) {
      if (lines[j].includes('font-semibold text-slate-800')) {
        const m = lines[j].match(/((?:20)\d{2})/);
        if (m) {
          const y = parseInt(m[1]);
          if (y === item.year && insertIdx === -1) {
            // backtrack to the start of the publication div
            for (let k = j; k >= 0; k--) {
              if (lines[k].includes('<div class="bg-white border border-slate-200')) {
                insertIdx = k;
                break;
              }
            }
          }
        }
      }
    }
    
    if (insertIdx !== -1) {
      console.log(`Found insertion point for ${item.year} at line ${insertIdx}`);
      // Only insert if the header isn't already there!
      if (!lines[insertIdx - 1]?.includes(`April ${item.year}`)) {
        lines.splice(insertIdx, 0, item.header);
      }
    }
  }

  // Also check if 2023 and 2022 need "A] National Publications"
  // Let's find where 2023 starts
  let idx23 = lines.findIndex(l => l.includes('Publications: April 2023'));
  if (idx23 !== -1 && !lines[idx23+1]?.includes('A] National')) {
     lines.splice(idx23 + 1, 0, '\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">A] National Publications</h4>\n');
     console.log('Inserted A] National Publications for 2023');
  }

  let idx22 = lines.findIndex(l => l.includes('Publications: April 2022'));
  if (idx22 !== -1 && !lines[idx22+1]?.includes('A] National')) {
     lines.splice(idx22 + 1, 0, '\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">A] National Publications</h4>\n');
     console.log('Inserted A] National Publications for 2022');
  }

  data.content = lines.join('\n');
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(data) }
  });
  console.log('Done updating DB.');
}

main().finally(() => process.exit(0));
