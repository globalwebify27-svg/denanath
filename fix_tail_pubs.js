const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  const current = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const currentData = JSON.parse(current.value);
  
  // Find where the bad block starts
  const badStartIdx = currentData.content.indexOf('Tamhankar AS and Tamhankar TAA large cystic gastrointestinal stromal tumor');
  const startReplace = currentData.content.lastIndexOf('<div class="bg-white', badStartIdx);
  
  // Find where it ends
  const endReplace = currentData.content.indexOf('          </div>\n        </div>\n\n        <div class="bg-slate-50', startReplace);
  
  const rawLines = fs.readFileSync('public/new_publications.txt', 'utf8').split('\n');
  const linesToParse = rawLines.slice(2212).map(l => l.trim()).filter(l => l !== '');
  
  let newHtml = '';
  
  for (let line of linesToParse) {
    if (line.match(/^April \d{4} - March \d{4}/i)) {
      newHtml += `\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: ${line}</h4>\n`;
    } else {
      let authors = '';
      let title = '';
      
      const firstDot = line.indexOf('.');
      if (firstDot > 0 && firstDot < 150 && !line.startsWith('April')) {
        authors = line.substring(0, firstDot + 1);
        title = line.substring(firstDot + 1).trim();
      } else {
        title = line;
      }
      
      newHtml += `
      <div class="bg-white border border-slate-200 mb-6 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
        <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
          ${title}
        </p>
        <p class="text-slate-600 text-sm mb-3">
          <span class="font-semibold text-slate-800">${authors}</span>
        </p>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
          </span>
        </div>
      </div>
      `;
    }
  }
  
  const finalHtml = currentData.content.substring(0, startReplace) + newHtml + currentData.content.substring(endReplace);
  
  const payload = {
    title: "Publications",
    content: finalHtml
  };
  
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(payload) }
  });
  console.log('Fixed the tail end of publications!');
}

fix().catch(console.error).finally(()=>prisma.$disconnect());
