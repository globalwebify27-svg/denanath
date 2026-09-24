const fs = require('fs');
const path = require('path');

const dir = './src';
const searchRegex = /\/doctor-details/g;
const replacement = '/doctors-profile';

function walkDir(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (searchRegex.test(content)) {
        const newContent = content.replace(searchRegex, replacement);
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Replaced in ${fullPath}`);
      }
    }
  }
}

walkDir(dir);
