const fs = require('fs');

const file = fs.readFileSync('c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/patient-registration/client-page.tsx', 'utf8');

function replaceSelect(fileStr, selectName, iconName) {
    const start = fileStr.indexOf(`<select name="${selectName}"`);
    if (start === -1) {
        console.log(`Could not find ${selectName} select`);
        return fileStr;
    }
    const end = fileStr.indexOf('</select>', start) + 9;
    const selectBlock = fileStr.slice(start, end);

    const optionsMatches = [...selectBlock.matchAll(/<option>(.*?)<\/option>/g)];
    const optionsList = optionsMatches.map(m => m[1]).filter(o => o !== '-- Select --');

    const customDropdownString = `<CustomDropdown 
  name="${selectName}"
  placeholder="-- Select --"
  ${iconName ? `icon={${iconName}}` : ''}
  options={[
    ${optionsList.map(o => `"${o}"`).join(',\n    ')}
  ]}
/>`;

    const replacementStart = fileStr.lastIndexOf('<div className="relative">', start);
    const blockEnd = fileStr.indexOf('</div>', end) + 6;
    const oldBlock = fileStr.slice(replacementStart, blockEnd);

    let newBlock = oldBlock.replace(selectBlock, customDropdownString);
    if (iconName) {
        newBlock = newBlock.replace(new RegExp(`<${iconName}[^>]*>`), '');
    }
    newBlock = newBlock.replace(/<ChevronRight[^>]*>/, '');

    return fileStr.replace(oldBlock, newBlock);
}

let newFile = replaceSelect(file, 'localState', '');

fs.writeFileSync('c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/patient-registration/client-page.tsx', newFile);
console.log('Replaced localState with CustomDropdown');
