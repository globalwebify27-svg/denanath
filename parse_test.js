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
  if (lines[i].match(/^A\]|^B\]|^Publications:/)) {
    i++;
    continue;
  }

  // A new publication starts with the authors & date line.
  // The date is usually like (March 2025) or (April-June 2025).
  // We collect all lines until the NEXT line that looks like an authors line.
  let pubLines = [];
  pubLines.push(lines[i]);
  i++;

  while (i < lines.length && !lines[i].match(/\([a-zA-Z\-\s]*\d{4}\)/) && !lines[i].match(/^A\]|^B\]|^Publications:/)) {
    pubLines.push(lines[i]);
    i++;
  }

  if (pubLines.length >= 3) {
    const authors_date = pubLines[0];
    // Everything in between is the title
    const title = pubLines.slice(1, pubLines.length - 1).join(" ");
    const journal_doi = pubLines[pubLines.length - 1];

    let journal = journal_doi;
    let doi = "";
    const doiMatch = journal_doi.match(/DOI:?\s*(.*)$/i) || journal_doi.match(/doi\.org\/(.*)$/i);
    if (doiMatch) {
      doi = doiMatch[1].trim();
      journal = journal_doi.substring(0, journal_doi.length - doiMatch[0].length).trim();
      journal = journal.replace(/[\.\s]+$/, '');
    }

    pubs.push({ title, authors_date, journal, doi });
  }
}

console.log("Parsed", pubs.length, "publications.");
console.log(pubs.slice(0, 3));
console.log(pubs.slice(-2));
