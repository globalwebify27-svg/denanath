const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all files with readAsDataURL
const adminDir = path.join(process.cwd(), 'src/app/admin');
const filesToProcess = execSync(`Get-ChildItem -Path "${adminDir}" -Recurse -Filter "*.tsx" | Select-String -Pattern "readAsDataURL" | Select-Object Path`, { shell: 'powershell.exe' })
  .toString()
  .split('\n')
  .map(l => l.trim())
  .filter(l => l.endsWith('.tsx'));

let updatedCount = 0;

const regex = /const\s+reader\s*=\s*new\s+FileReader\(\);\s*reader\.onloadend\s*=\s*\(\)\s*=>\s*\{([\s\S]*?)reader\.result(?: as string)?([\s\S]*?)\};\s*reader\.readAsDataURL\(file\);/g;

for (const file of filesToProcess) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (regex.test(content)) {
    content = content.replace(regex, `const formData = new FormData();
      formData.append('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.url) {$1data.url$2} else { alert('Upload failed'); }
      })
      .catch(err => {
        console.error('Upload error:', err);
        alert('Upload error');
      });`);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
    updatedCount++;
  }
}

console.log(`Successfully updated ${updatedCount} files.`);
