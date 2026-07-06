const fs = require('fs');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // We'll replace blocks that match <div className="relative"> ... <select ... </select> ... </div>
    // However, some selects might not have a <div className="relative"> wrapper? Let's check.
    // Instead, let's find all <select ...> ... </select> and their siblings up to </div>
    
    // Better regex: match the <select> element and its options
    const selectRegex = /<select([^>]*)>([\s\S]*?)<\/select>(\s*<([A-Z][a-zA-Z0-9]*)[^>]*>\s*)?(\s*<ChevronRight[^>]*>\s*)?/g;
    
    content = content.replace(selectRegex, (match, attrs, innerHtml, iconMatch, iconName, chevronMatch) => {
        // Extract name attribute
        const nameMatch = attrs.match(/name="([^"]+)"/);
        const name = nameMatch ? nameMatch[1] : null;

        // Extract options
        const optionRegex = /<option[^>]*>(.*?)<\/option>/g;
        const options = [];
        let placeholder = "-- Select --";
        let optMatch;
        while ((optMatch = optionRegex.exec(innerHtml)) !== null) {
            let val = optMatch[1].trim();
            if (val.includes("-- Select --") || val.includes("Select")) {
                placeholder = val;
            } else {
                options.push(val);
            }
        }

        // Determine icon
        let iconProp = "";
        if (iconName && iconName !== "ChevronRight") {
            iconProp = `\n  icon={${iconName}}`;
        }

        let nameProp = name ? `\n  name="${name}"` : "";

        let replacement = `<CustomDropdown${nameProp}
  placeholder="${placeholder}"${iconProp}
  options={[
    ${options.map(o => `"${o}"`).join(',\n    ')}
  ]}
/>`;
        
        return replacement;
    });

    // Make sure CustomDropdown is imported
    if (content !== originalContent && !content.includes('CustomDropdown')) {
        content = content.replace(/import .* from "lucide-react";/, (match) => {
            return `import CustomDropdown from "@/components/CustomDropdown";\n${match}`;
        });
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
}

const files = [
    'c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/patient-registration/client-page.tsx',
    'c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/patient-portal/client-page.tsx',
    'c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/online-payment/client-page.tsx'
];

files.forEach(processFile);
