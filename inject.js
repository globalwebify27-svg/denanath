const fs = require('fs');

const data = JSON.parse(fs.readFileSync('fcra.json', 'utf8'));

const pageContent = fs.readFileSync('src/app/about/foreign-contribution/page.tsx', 'utf8');

// Find where fcraData starts and ends
const startMatch = "const fcraData = [";
const endMatch = "  ];\n\n  return (";

const startIndex = pageContent.indexOf(startMatch);
const endIndex = pageContent.indexOf(endMatch) + 4; // up to "  ];"

if (startIndex !== -1 && endIndex !== -1) {
  const newContent = pageContent.substring(0, startIndex) + 
                     "const fcraData = " + JSON.stringify(data, null, 4) + ";" +
                     pageContent.substring(endIndex);
                     
  fs.writeFileSync('src/app/about/foreign-contribution/page.tsx', newContent);
  console.log("Injected 40 quarters of data successfully");
} else {
  console.log("Could not find insertion points");
}
