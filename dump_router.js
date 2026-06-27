const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const badLines = [];
walk('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      if (line.match(/router\.(push|replace|refresh|back|forward)\(/)) {
        // extract the surrounding context
        const context = lines.slice(Math.max(0, i-3), i+4).join('\n');
        badLines.push(`File: ${filePath}:${i+1}\nContext:\n${context}\n---\n`);
      }
    });
  }
});

fs.writeFileSync('router_calls.txt', badLines.join('\n'));
console.log(`Found ${badLines.length} router calls.`);
