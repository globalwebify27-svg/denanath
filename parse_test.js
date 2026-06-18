const fs = require('fs');

const raw = fs.readFileSync('raw_pubs.txt', 'utf8');
const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);

const pubs = [];
let i = 0;

// Skip header lines
while (i < lines.length && !lines[i].match(/\([a-zA-Z]+ \d{4}\)/)) {
  i++;
}

while (i < lines.length) {
  // Authors & date line might not be perfectly regular, but let's assume chunks of 3 if they don't look like headers
  if (lines[i].match(/^A\]|^B\]|^Publications:/)) {
    i++;
    continue;
  }

  // Try to grab 3 lines
  const authors_date = lines[i];
  const title = lines[i+1] || "";
  const journal_doi = lines[i+2] || "";

  // Split journal and doi
  let journal = journal_doi;
  let doi = "";
  const doiMatch = journal_doi.match(/DOI:?\s*(.*)$/i) || journal_doi.match(/doi\.org\/(.*)$/i);
  if (doiMatch) {
    doi = doiMatch[1].trim();
    journal = journal_doi.substring(0, journal_doi.length - doiMatch[0].length).trim();
    // remove trailing dots/spaces
    journal = journal.replace(/[\.\s]+$/, '');
  }

  pubs.push({ title, authors_date, journal, doi });
  i += 3;
}

console.log("Parsed", pubs.length, "publications.");
console.log(pubs.slice(0, 3));
console.log(pubs.slice(-2));
