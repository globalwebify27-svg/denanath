const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content
    .replace(/"\/about\/about-hospital"/g, '"/about-hospital"')
    .replace(/"\/about\/associates"/g, '"/associates"')
    .replace(/"\/about\/accreditations"/g, '"/accreditations"')
    .replace(/"\/about\/supportHospitalDonations"/g, '"/supportHospitalDonations"')
    .replace(/"\/about\/unique-features"/g, '"/unique-features"')
    .replace(/"\/about\/foreign-contribution"/g, '"/foreign-contribution"')
    .replace(/"\/about\/charity-details"/g, '"/charity-details"');
    
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated ${filePath}`);
  }
}

const aboutDir = 'src/app/(about)';
const folders = fs.readdirSync(aboutDir);
for (const folder of folders) {
  const stat = fs.statSync(path.join(aboutDir, folder));
  if (stat.isDirectory()) {
    const pagePath = path.join(aboutDir, folder, 'page.tsx');
    replaceInFile(pagePath);
  }
}

// Special update for Navbar parent link
const navbarPath = 'src/components/Navbar.tsx';
if (fs.existsSync(navbarPath)) {
  replaceInFile(navbarPath);
  // Also change the main parent link from "/about" to "/about-hospital"
  const navbarContent = fs.readFileSync(navbarPath, 'utf8');
  const fixedNavbar = navbarContent.replace(/name: "About Us",\s*href: "\/about"/, 'name: "About Us",\n      href: "/about-hospital"');
  fs.writeFileSync(navbarPath, fixedNavbar);
}
