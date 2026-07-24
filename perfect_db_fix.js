const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const d = await prisma.siteSetting.findUnique({where:{key:'page_research_publications'}});
  let data = JSON.parse(d.value);
  let lines = data.content.split('\n');

  // Insert 2023 Header
  let idx23 = -1;
  for (let j = 0; j < lines.length; j++) {
    if (lines[j].includes('Nath D, Hiwale A, Kurwale N, Patil CY. (April 2023)')) {
      for (let k = j; k >= 0; k--) {
        if (lines[k].includes('<div class="bg-white border border-slate-200')) {
          idx23 = k;
          break;
        }
      }
      break;
    }
  }
  
  if (idx23 !== -1 && !lines[idx23-1].includes('April 2023')) {
    const h23 = '\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2023 \u2013 March 2024</h4>\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">A] National Publications</h4>\n';
    lines.splice(idx23, 0, h23);
  }

  // Insert 2022 Header
  let idx22 = -1;
  for (let j = 0; j < lines.length; j++) {
    if (lines[j].includes('Pujari SS, Ojha PK, Kulkarni RV, et al. (April 2022)')) {
      for (let k = j; k >= 0; k--) {
        if (lines[k].includes('<div class="bg-white border border-slate-200')) {
          idx22 = k;
          break;
        }
      }
      break;
    }
  }

  if (idx22 !== -1 && !lines[idx22-1].includes('April 2022')) {
    const h22 = '\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2022 \u2013 March 2023</h4>\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">A] National Publications</h4>\n';
    lines.splice(idx22, 0, h22);
  }

  // Update content
  let content = lines.join('\n');

  // Fix SARS-CoV-2 completely
  const regex = /<div class="bg-white border border-slate-200[^>]*>\s*<p[^>]*>\s*Int J Ped & Neo Heal\. 5\(4\), 33-36\s*<\/p>\s*<p[^>]*>\s*<span class="font-semibold text-slate-800"><\/span>\s*<\/p>\s*<div[^>]*>\s*<span[^>]*>\s*<\/span>\s*<\/div>\s*<\/div>/g;
  content = content.replace(regex, '');

  const spanStart = content.indexOf('<span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">', content.indexOf('Early onset SARS-CoV-2'));
  if (spanStart !== -1) {
    const spanEnd = content.indexOf('</span>', spanStart);
    const innerText = content.substring(spanStart + 86, spanEnd).trim();
    if (innerText === "") {
       const left = content.substring(0, spanStart + 86);
       const right = content.substring(spanEnd);
       content = left + '\n              Int J Ped & Neo Heal. 5(4), 33-36\n            ' + right;
    }
  }

  data.content = content;
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(data) }
  });
  console.log('Database surgically updated.');
}

main().finally(() => process.exit(0));
