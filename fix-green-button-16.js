const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let count = 0;
walkDir('./src/app', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    const targetString = 'style={{ fontSize: \'18px\' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4"';
    
    // Also cover potential cases where it might have been slightly different or multiple spaces
    if (content.includes(targetString)) {
      const replacementString = 'style={{ fontSize: \'16px\' }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] font-bold tracking-wider uppercase mb-4"';
      content = content.split(targetString).join(replacementString);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed:', filePath);
      count++;
    }
  }
});
console.log('Total files fixed to 16px:', count);
