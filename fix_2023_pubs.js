const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const raw = fs.readFileSync('new_2023_pubs.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const pubs = [];
let currentChunk = [];

for (let i = 0; i < lines.length; i++) {
  // If line starts with "number. ", it's a new publication
  if (/^\d+\.\s/.test(lines[i])) {
    if (currentChunk.length > 0) {
      processChunk(currentChunk);
    }
    currentChunk = [lines[i].replace(/^\d+\.\s/, '')]; // Strip the number
  } else {
    currentChunk.push(lines[i]);
  }
}
if (currentChunk.length > 0) {
  processChunk(currentChunk);
}

function processChunk(chunk) {
  if (chunk.length >= 2) {
    const authors_date = chunk[0];
    const title = chunk[1];
    let journal_doi = chunk.slice(2).join(' ');

    let journal = journal_doi;
    let doi = "";
    
    // Look for DOI
    const doiMatch = journal_doi.match(/DOI:?\s*(.*)$/i) || journal_doi.match(/doi\.org\/(.*)$/i) || journal_doi.match(/doi:\s*(.*)$/i);
    if (doiMatch) {
      doi = doiMatch[1].trim();
      journal = journal_doi.substring(0, journal_doi.length - doiMatch[0].length).trim();
      journal = journal.replace(/[\.\s]+$/, '');
    }
    
    // Clean up brackets from DOI
    if (doi.endsWith(']')) doi = doi.slice(0, -1).trim();
    if (journal.endsWith('[')) journal = journal.slice(0, -1).trim();

    pubs.push({ title, authors_date, journal, doi });
  }
}

let pubHtml = '';
for (const pub of pubs) {
  let doiHtml = '';
  if (pub.doi) {
    let doiVal = pub.doi.replace(/DOI:\s*/i, '').replace(/doi:\s*/i, '').trim();
    doiHtml = `
            <a href="https://doi.org/${doiVal}" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1 break-all">
              DOI: ${doiVal}
            </a>
          `;
  }
  
  pubHtml += `
        <div class="bg-white border border-slate-200 mb-6 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
          <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
            ${pub.title || ''}
          </p>
          <p class="text-slate-600 text-sm mb-3">
            <span class="font-semibold text-slate-800">${pub.authors_date || ''}</span>
          </p>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
              ${pub.journal || ''}
            </span>
            ${doiHtml}
          </div>
        </div>`;
}

async function main() {
  const d = await prisma.siteSetting.findUnique({where:{key:'page_research_publications'}});
  let data = JSON.parse(d.value);
  let dbLines = data.content.split('\n');

  let startIdx = -1;
  let endIdx = -1;

  for (let j = 0; j < dbLines.length; j++) {
    if (dbLines[j].includes('Publications: April 2023 \u2013 March 2024')) {
      startIdx = j;
    }
    if (dbLines[j].includes('Publications: April 2022 \u2013 March 2023') && startIdx !== -1) {
      endIdx = j;
      break;
    }
  }

  if (startIdx !== -1 && endIdx !== -1) {
    const newChunk = [dbLines[startIdx], '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">A] National Publications</h4>', pubHtml];
    
    dbLines.splice(startIdx, endIdx - startIdx, ...newChunk);
    
    data.content = dbLines.join('\n');
    await prisma.siteSetting.update({
      where: { key: 'page_research_publications' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Updated 2023-2024 publications successfully. Replaced " + (endIdx - startIdx) + " lines with " + pubs.length + " pubs.");
  } else {
    console.log("Could not find start and end indices: ", startIdx, endIdx);
  }
}

main().finally(() => process.exit(0));
