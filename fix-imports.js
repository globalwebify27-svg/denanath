const fs = require('fs');
const path = require('path');

const targetDirs = [
  'src/app/(about)',
  'src/app/(patient-guide)',
  'src/app/patient-visitors',
  'src/app/patient-guide',
  'src/app/(research)',
  'src/app/(doctors)',
  'src/app/departments',
  'src/app/(academics)',
  'src/app/(online-facilities)'
];

function processDir(dir) {
  if(!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for(const f of files) {
    const p = path.join(dir, f);
    if(fs.statSync(p).isDirectory()) processDir(p);
    else if(p.endsWith('.tsx') || p.endsWith('.jsx')) {
      let content = fs.readFileSync(p, 'utf-8');
      if(content.includes('<DynamicSidebar') && !content.includes('import DynamicSidebar')) {
        content = content.replace(/import\s+Link/m, 'import DynamicSidebar from "@/components/DynamicSidebar";\nimport Link');
        fs.writeFileSync(p, content);
        console.log('Fixed ' + p);
      }
    }
  }
}

targetDirs.forEach(processDir);
