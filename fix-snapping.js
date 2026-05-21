const fs = require('fs');
const path = require('path');

function fixSnapping(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fixSnapping(fullPath);
    } else if (fullPath.endsWith('page.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove snap-x snap-mandatory
      content = content.replace(/snap-x snap-mandatory/g, '');
      // Remove snap-start
      content = content.replace(/snap-start /g, '');
      
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${fullPath}`);
    }
  }
}

fixSnapping('src/app/(about)');
