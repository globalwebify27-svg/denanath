const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const current = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const currentData = JSON.parse(current.value);
  
  // We can just replace DOI in the journal string!
  let content = currentData.content;
  
  // Replace DOI: [doi] inside the span with the correct HTML
  // Example journal text: "Indian Journal of Anaesthesia. 70(3):477-484. DOI: 10.4103/ija.ija_1716_25"
  // It's inside <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
  
  content = content.replace(/<span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">\s*(.*?)\s*<\/span>/g, (match, journalText) => {
      // Does it contain DOI?
      const doiMatch = journalText.match(/(?:DOI[:\s]*|doi.org\/)\s*(10\.\d{4,9}\/[-._;()/:A-Z0-9]+)/i);
      
      if (doiMatch) {
          const doi = doiMatch[1];
          // Remove the DOI part from the journal text to keep it clean
          let cleanJournal = journalText.replace(/DOI[:\s]*10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i, '').trim();
          cleanJournal = cleanJournal.replace(/https?:\/\/doi\.org\/\s*10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i, '').trim();
          cleanJournal = cleanJournal.replace(/DOI\s*https?:\/\/doi\.org\/\s*10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i, '').trim();
          
          return `
          <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
            ${cleanJournal}
          </span>
          <a href="https://doi.org/${doi}" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1 break-all">
            DOI: ${doi}
          </a>
          `;
      }
      return match;
  });

  const payload = {
    title: "Publications",
    content: content
  };
  
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(payload) }
  });
  console.log('Successfully fixed DOIs in DB!');
}

run().catch(console.error).finally(() => prisma.$disconnect());
