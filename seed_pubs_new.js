const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const raw = fs.readFileSync('raw_pubs.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const pubs = [];
let i = 0;

while (i < lines.length) {
  if (lines[i].match(/^A\]|^B\]|^Publications:/)) {
    i++;
    continue;
  }

  const chunk = [];
  // Find the next line that looks like authors + date.
  // Actually, we can just grab lines until we hit another author+date line.
  chunk.push(lines[i]);
  i++;
  while (i < lines.length && !lines[i].match(/^A\]|^B\]|^Publications:/) && !lines[i].match(/\([A-Za-z]+[- ]?[A-Za-z]* \d{4}\)/)) {
    chunk.push(lines[i]);
    i++;
  }

  if (chunk.length >= 2) {
    const authors_date = chunk[0];
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

    pubs.push({ title, authors_date, journal, doi });
  }
}

async function main() {
  const archiveYears = [
    { year: "2024 - 2025", link: "#" }, { year: "2023 - 2024", link: "#" }, { year: "2022 - 2023", link: "#" },
    { year: "2021 - 2022", link: "#" }, { year: "2020 - 2021", link: "#" }, { year: "2019 - 2020", link: "#" },
    { year: "2018 - 2019", link: "#" }, { year: "2017 - 2018", link: "#" }
  ];

  const payload = JSON.stringify({ recentPubs: pubs, archiveYears });
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_publications' },
    update: { value: payload },
    create: { key: 'page_research_publications', value: payload }
  });

  console.log("Seeded " + pubs.length + " publications to DB.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
