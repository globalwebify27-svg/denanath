const fs = require('fs');
const path = require('path');
const baseDir = 'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\(research)';
const dirs = fs.readdirSync(baseDir);

const sourceClient = path.join(baseDir, 'about', 'client-page.tsx');
const destClient = path.join(baseDir, 'research-about', 'client-page.tsx');
if (fs.existsSync(sourceClient)) {
  fs.copyFileSync(sourceClient, destClient);
}

dirs.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (fs.statSync(fullPath).isDirectory()) {
    const cpPath = path.join(fullPath, 'client-page.tsx');
    if (fs.existsSync(cpPath)) {
      let content = fs.readFileSync(cpPath, 'utf8');
      // replace "href": "/about" with "href": "/research-about"
      content = content.replace(/"href": "\/about"/g, '"href": "/research-about"');
      fs.writeFileSync(cpPath, content);
    }
  }
});
console.log("Replaced successfully!");
