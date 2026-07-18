const fs = require('fs');

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

  // If the line is the start of a new pub
  // Starts with Author (e.g. "Gandhi S, Bhatta S") and ends with Date "(January 2023)"
  if (currentPub.length > 0 && line.match(/\((January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[^)]*\)\.?$/i)) {
      parsedItems.push({ type: 'pub', lines: currentPub });
      currentPub = [];
  }
  else if (currentPub.length > 0 && line.match(/\(\d{4}\)$/)) {
      parsedItems.push({ type: 'pub', lines: currentPub });
      currentPub = [];
  }
  // Or if it's a 1-line pub that contains " et al. " and ends with "."
  else if (currentPub.length > 0 && line.length > 100 && line.match(/ et al\. /i) && line.match(/\.\s*$/)) {
      parsedItems.push({ type: 'pub', lines: currentPub });
      currentPub = [];
  }

  currentPub.push(line);

  // If this line ends with a journal-like ending, close the pub
  if (line.match(/\d+:\s*\d+[-–]\d+\.?$/) || 
      line.match(/\[Epub ahead of print\]$/i) || 
      line.match(/\d+\(\d+\):\s*\d+[-–]\d+\.?$/) ||
      line.match(/DOI:/i) ||
      line.match(/S\d+-\d+$/)) {
    parsedItems.push({ type: 'pub', lines: currentPub });
    currentPub = [];
  }
}
if (currentPub.length) parsedItems.push({ type: 'pub', lines: currentPub });

console.log('Total parsed items:', parsedItems.length);
console.log('Headers:', parsedItems.filter(p => p.type === 'header').length);
console.log('Pubs:', parsedItems.filter(p => p.type === 'pub').length);

// Let's print a few pubs from the middle (where the 798 block is)
const pubs = parsedItems.filter(p => p.type === 'pub');
console.log('Sample pub 1:', pubs[200]);
console.log('Sample pub 2:', pubs[201]);
console.log('Sample pub 3:', pubs[300]);
console.log('Sample pub 4:', pubs[350]);
