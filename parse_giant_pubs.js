const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const txt = fs.readFileSync('public/new_publications.txt', 'utf8');
  const lines = txt.split('\n');

  const parsedItems = [];
  let currentPub = [];

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    if (line.match(/^Publications[\s:\-]/i) || line.match(/^A\]|^B\]/)) {
      if (currentPub.length) {
        parsedItems.push({ type: 'pub', lines: currentPub });
        currentPub = [];
      }
      parsedItems.push({ type: 'header', text: line });
      continue;
    }
    
    if (line === '') {
      if (currentPub.length) {
        parsedItems.push({ type: 'pub', lines: currentPub });
        currentPub = [];
      }
      continue;
    }

    if (i > 1531 && currentPub.length >= 2) {
       // Look ahead to the current line (since it's not empty and not a header)
       // If it starts with an Author-like pattern (Name Initials, Name Initials)
       // Or if it contains 'et al' and ends in a date
       const isAuthor = line.match(/^[A-Z][a-zA-Z\-]+,?\s+[A-Z\.]+,?\s+/) || 
                        line.match(/^[A-Z][a-zA-Z]+ [A-Z]{1,2}, /) || 
                        line.match(/\bet al\.?/i) || 
                        line.match(/\(\d{4}\)$/);
       
       // If the PREVIOUS line ended with a journal-like pattern
       const lastLine = currentPub[currentPub.length - 1];
       const isEndOfPub = lastLine.match(/\d+:\s*\d+[-–]\d+\.?$/) || 
                          lastLine.match(/\[Epub ahead of print\]/i) || 
                          lastLine.match(/\d+\(\d+\):\s*\d+[-–]\d+\.?$/) ||
                          lastLine.match(/DOI:/i) ||
                          lastLine.match(/S\d+-\d+\.?$/) ||
                          lastLine.match(/\d{4}\.?$/);

       if ((isAuthor && currentPub.length >= 2) || (isEndOfPub && currentPub.length >= 3)) {
           parsedItems.push({ type: 'pub', lines: currentPub });
           currentPub = [];
       }
    }

    currentPub.push(line);
  }
  if (currentPub.length) parsedItems.push({ type: 'pub', lines: currentPub });

  // Generate HTML
  let finalHtml = '';
  for (let item of parsedItems) {
    if (item.type === 'header') {
      finalHtml += `\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">${item.text}</h4>\n`;
    } else {
      const p = item.lines;
      let title = '', authors = '', journal = '';
      if (p.length === 1) {
        title = p[0];
      } else if (p.length === 2) {
        authors = p[0];
        title = p[1];
      } else {
        authors = p[0];
        title = p[1];
        journal = p.slice(2).join(' ');
      }
      
      finalHtml += `
      <div class="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
        <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
          ${title}
        </p>
        <p class="text-slate-600 text-sm mb-3">
          <span class="font-semibold text-slate-800">${authors}</span>
        </p>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
            ${journal}
          </span>
        </div>
      </div>
      `;
    }
  }

  const payload = {
    title: "Publications",
    content: finalHtml
  };
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_publications' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_research_publications', value: JSON.stringify(payload) }
  });
  console.log('Successfully updated publications in DB! Total parsed items:', parsedItems.length);
}

run().catch(console.error).finally(() => prisma.$disconnect());
