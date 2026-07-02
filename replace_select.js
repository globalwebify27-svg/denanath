const fs = require('fs');

const file = fs.readFileSync('c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/patient-registration/client-page.tsx', 'utf8');

// Find the localCountry select
const start = file.indexOf('<select name="localCountry"');
if (start === -1) {
    console.log("Could not find localCountry select");
    process.exit(1);
}
const end = file.indexOf('</select>', start) + 9;
const selectBlock = file.slice(start, end);

const optionsMatches = [...selectBlock.matchAll(/<option>(.*?)<\/option>/g)];
const optionsList = optionsMatches.map(m => m[1]).filter(o => o !== '-- Select --');

const customDropdownString = `<CustomDropdown 
  name="localCountry"
  placeholder="-- Select --"
  icon={Globe}
  options={[
    ${optionsList.map(o => `"${o}"`).join(',\n    ')}
  ]}
/>`;

// Replace the block and the two icons below it since CustomDropdown renders its own icon
const replacementStart = file.lastIndexOf('<div className="relative">', start);
const blockEnd = file.indexOf('</div>', end) + 6;
const oldBlock = file.slice(replacementStart, blockEnd);

let newBlock = oldBlock.replace(selectBlock, customDropdownString);
newBlock = newBlock.replace(/<Globe[^>]*>/, '').replace(/<ChevronRight[^>]*>/, '');

let newFile = file.replace(oldBlock, newBlock);

// Also add import for CustomDropdown
if (!newFile.includes('CustomDropdown')) {
  newFile = newFile.replace('import { submitFormAction }', 'import CustomDropdown from "@/components/CustomDropdown";\nimport { submitFormAction }');
}

fs.writeFileSync('c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/patient-registration/client-page.tsx', newFile);
console.log('Replaced localCountry with CustomDropdown');
