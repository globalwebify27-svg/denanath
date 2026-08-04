const fs = require('fs');
const path = require('path');

function walkDir(dir, ext, results = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      walkDir(full, ext, results);
    } else if (stat.isFile() && full.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

const appDir = path.join(__dirname, 'src', 'app');
const files = walkDir(appDir, '.tsx');

let totalFixed = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // We are replacing the fontSize from 14px to 16px on the pill badges
  const targetPattern = /style={{ fontSize: '14px' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-\[#007a87\] font-bold tracking-wider uppercase mb-4"/g;
  
  if (content.match(targetPattern)) {
    content = content.replace(targetPattern, 'style={{ fontSize: \'16px\' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    totalFixed++;
    console.log('Fixed:', path.relative(__dirname, file));
  }
}

console.log(`\n✅ Done! Changed font size to 16px in ${totalFixed} files total.`);
