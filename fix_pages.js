const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'admin', '(dashboard)');
let updatedCount = 0;

function processPage(fullPath) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let newContent = content;

    // Skip if already processed or is about-hospital
    if (fullPath.includes('about-hospital') || content.includes('<form action={') && content.includes('<form action={') !== content.lastIndexOf('<form action={')) {
       // if there are multiple forms or it's about-hospital, skip or handle carefully.
       // actually, just skip if it already has <form action=... className="space-y-8">
    }

    if (content.includes('className="space-y-8"')) {
        console.log(`Skipping ${fullPath} - already processed`);
        return;
    }

    // 1. Replace top container
    newContent = newContent.replace(/<div className="p-[0-9]+ max-w-[a-zA-Z0-9]+ mx-auto">/, '<div className="p-4 md:p-8 max-w-6xl mx-auto pb-32">');

    // 2. Find action name
    const formMatch = newContent.match(/<form action=\{([^}]+)\}>/);
    if (!formMatch) {
        console.log(`No form action found in ${fullPath}`);
        return;
    }
    const actionName = formMatch[1];

    // 3. Insert <form> opening
    newContent = newContent.replace(
        '<div className="mb-10 flex flex-col',
        `<form action={${actionName}} className="space-y-8">\n      <div className="mb-10 flex flex-col`
    );

    // 4. Insert button into header
    newContent = newContent.replace(
        /<\/p>\s*<\/div>\s*<\/div>/,
        `</p>\n        </div>\n        <div className="z-10 shrink-0 mt-4 md:mt-0">\n          <button type="submit" className="flex items-center gap-2 bg-[#007a87] text-white px-7 py-3.5 rounded-xl hover:bg-[#006570] hover:shadow-[0_8px_20px_rgba(0,122,135,0.3)] font-bold transition-all duration-300 transform hover:-translate-y-0.5">\n            <Save size={20} strokeWidth={2.5} /> Save Changes\n          </button>\n        </div>\n      </div>`
    );

    // 5. Delete inner wrapper and old form
    const innerWrapperRegex = /<div className="bg-white rounded-3xl[^>]+>\s*<form action=\{[^}]+\}>\s*([\s\S]*?)\s*<\/form>\s*<\/div>/;
    if (innerWrapperRegex.test(newContent)) {
        newContent = newContent.replace(innerWrapperRegex, '$1');
    } else {
        // sometimes there's no bg-white wrapper, just the form?
        const justFormRegex = /<form action=\{[^}]+\}>\s*([\s\S]*?)\s*<\/form>/;
        // Wait, if we matched the first form and replaced it?
        // Let's use a global replace for the old form wrapper but it's tricky.
        // Let's strictly rely on the innerWrapperRegex.
    }

    // 6. Fix closing tags
    // The original file ends with:
    //     </div>
    //   );
    // }
    // Now we opened a <form>, so we need </form></div>.
    newContent = newContent.replace(/<\/div>\s*\);\s*\}/, '</form>\n    </div>\n  );\n}');

    // 7. Ensure Save is imported from lucide-react
    if (!newContent.includes('Save')) {
        if (newContent.includes('lucide-react')) {
            newContent = newContent.replace(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/, (match, p1) => {
                if (p1.includes('Save')) return match;
                return `import { ${p1}, Save } from "lucide-react";`;
            });
        } else {
            // Find last import
            const lastImportIndex = newContent.lastIndexOf('import ');
            if (lastImportIndex !== -1) {
                const endOfLastImport = newContent.indexOf(';', lastImportIndex) + 1;
                newContent = newContent.slice(0, endOfLastImport) + '\nimport { Save } from "lucide-react";\n' + newContent.slice(endOfLastImport);
            } else {
                newContent = `import { Save } from "lucide-react";\n` + newContent;
            }
        }
    }

    if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        updatedCount++;
        console.log(`Updated ${fullPath}`);
    }
}

function walkDir(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file === 'page.tsx') {
            processPage(fullPath);
        }
    }
}

walkDir(dir);
console.log(`Total page.tsx files updated: ${updatedCount}`);
