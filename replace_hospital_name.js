const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const targetRegex = /Deenanath\s+Mangeshkar\s+Hospital(?:\s*(?:and|&|&amp;|\\&)\s*Research\s*Cent(?:er|re))?/gi;

function walk(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    
    // Skip dependency/build/git dirs
    if (stat.isDirectory()) {
      if (file === 'node_modules' || file === '.next' || file === '.git') {
        continue;
      }
      walk(filepath, callback);
    } else if (stat.isFile() && /\.(tsx|ts|js|jsx|json|html|css|txt)$/.test(filepath)) {
      // Avoid modifying the script itself
      if (file === 'replace_hospital_name.js') {
        continue;
      }
      callback(filepath);
    }
  }
}

let totalMatches = 0;
let modifiedFilesCount = 0;

console.log('Starting search and replace in:', baseDir);

walk(baseDir, (filepath) => {
  const content = fs.readFileSync(filepath, 'utf8');
  let hasMatch = false;
  
  const newContent = content.replace(targetRegex, (match) => {
    hasMatch = true;
    totalMatches++;
    // Preserve uppercase if the original text was uppercase
    if (match === match.toUpperCase()) {
      return 'DEENANATH MANGESHKAR HOSPITAL AND RESEARCH CENTER';
    }
    return 'Deenanath Mangeshkar Hospital and Research Center';
  });

  if (hasMatch) {
    fs.writeFileSync(filepath, newContent, 'utf8');
    modifiedFilesCount++;
    console.log(`Modified: ${path.relative(baseDir, filepath)}`);
  }
});

console.log(`\nSuccessfully updated hospital name!`);
console.log(`Total occurrences replaced: ${totalMatches}`);
console.log(`Total files updated: ${modifiedFilesCount}`);
