const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('/about/supportHospitalDonations')) {
    const newContent = content.replace(/\/about\/supportHospitalDonations/g, '/about/donations');
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
  }
}

const aboutDir = 'src/app/about';
const folders = fs.readdirSync(aboutDir);
for (const folder of folders) {
  const pagePath = path.join(aboutDir, folder, 'page.tsx');
  replaceInFile(pagePath);
}

replaceInFile('src/components/Navbar.tsx');
