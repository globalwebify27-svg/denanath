const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const raw = fs.readFileSync('public/new_publications.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const pubs = [];
let i = 0;

while (i < lines.length) {
  if (lines[i].match(/^A\]|^B\]|^Publications:/)) {
    i++;
    continue;
  }

  const chunk = [];
  chunk.push(lines[i]);
  i++;
  while (i < lines.length && !lines[i].match(/^A\]|^B\]|^Publications:/) && !lines[i].match(/\([A-Za-z]+[- ]?[A-Za-z]* \d{4}\)/)) {
    chunk.push(lines[i]);
    i++;
  }

  if (chunk.length >= 2) {
    const authorsDate = chunk[0];
    const title = chunk[1];
    let journal_doi = chunk.slice(2).join(' ');

    let journal = journal_doi;
    let doi = "";
    const doiMatch = journal_doi.match(/DOI:?\s*(.*)$/i) || journal_doi.match(/doi\.org\/(.*)$/i) || journal_doi.match(/doi:\s*(.*)$/i);
    if (doiMatch) {
      doi = doiMatch[1].trim();
      journal = journal_doi.substring(0, journal_doi.length - doiMatch[0].length).trim();
      journal = journal.replace(/[\.\s]+$/, '');
    }

    pubs.push({ title, authorsDate, journal, doi });
  }
}

const generateHTML = (publications, archives) => {
  const pubHtml = (publications || []).map(pub => {
    let doiHtml = '';
    if (pub.doi) {
      doiHtml = `
        <a href="https://doi.org/${pub.doi.replace('DOI:', '').replace('doi:', '').trim()}" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1 break-all">
          DOI: ${pub.doi.replace('DOI:', '').replace('doi:', '').trim()}
        </a>
      `;
    }

    return `
      <div class="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
        <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
          ${pub.title || ''}
        </p>
        <p class="text-slate-600 text-sm mb-3">
          <span class="font-semibold text-slate-800">${pub.authorsDate || ''}</span>
        </p>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
            ${pub.journal || ''}
          </span>
          ${doiHtml}
        </div>
      </div>
    `;
  }).join('');

  const arcHtml = (archives || []).map(arc => `
    <a href="${arc.link || '#'}" class="bg-white border border-slate-200 p-4 rounded-xl font-bold text-[#007a87] hover:bg-[#003360] hover:text-white hover:border-[#003360] hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:-translate-y-1 transition-all shadow-sm flex items-center justify-center text-sm md:text-base decoration-transparent">
      ${arc.year || ''}
    </a>
  `).join('');

  return `
    <div class="space-y-12">
      <div>
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <h3 class="text-2xl md:text-3xl font-extrabold text-[#002b5c] flex items-center gap-3">
            <span class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </span>
            Recent Publications
          </h3>
        </div>
        <div class="space-y-6">
          ${pubHtml}
        </div>
      </div>

      <div class="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center relative overflow-hidden group">
        <div class="relative z-10">
          <h3 class="text-2xl font-black text-[#002b5c] mb-4 group-hover:text-[#007a87] transition-colors">Archive Years</h3>
          <p class="text-slate-600 max-w-xl mx-auto mb-8 relative z-10 leading-relaxed">
            Explore our extensive history of clinical research, including hundreds of national and international publications across various medical disciplines.
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
            ${arcHtml}
          </div>
        </div>
      </div>
    </div>
  `;
};

async function main() {
  const archives = [
    { year: "2024 - 2025", link: "#" },
    { year: "2023 - 2024", link: "#" },
    { year: "2022 - 2023", link: "#" },
    { year: "2021 - 2022", link: "#" },
    { year: "2020 - 2021", link: "#" },
    { year: "2019 - 2020", link: "#" },
    { year: "2018 - 2019", link: "#" },
    { year: "2017 - 2018", link: "#" }
  ];

  const payload = {
    publications: pubs,
    archives: archives,
    content: generateHTML(pubs, archives)
  };

  try {
    const res = await fetch("http://localhost:3000/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: "page_research_publications",
        value: JSON.stringify(payload),
        pathsToRevalidate: [
          "/admin/research/publications",
          "/publications"
        ]
      })
    });
    
    if (!res.ok) {
        console.error('Failed API request:', await res.text());
        return;
    }
    console.log("Successfully seeded " + pubs.length + " publications to DB and revalidated Next.js cache.");
  } catch (e) {
    console.error("Error hitting API:", e);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
