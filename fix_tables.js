const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    if (content.includes('<table') || content.includes('whitespace-nowrap')) {
        // 1. Remove minimum width constraints that force scrolling
        content = content.replace(/min-w-\[[0-9]+px\]/g, '');
        content = content.replace(/md:min-w-full/g, '');
        content = content.replace(/sm:min-w-full/g, '');
        content = content.replace(/lg:min-w-full/g, '');
        
        // 2. Allow text to wrap by removing whitespace-nowrap
        content = content.replace(/\bwhitespace-nowrap\b/g, '');

        // 3. Optimize padding in table cells to save space
        // Replace p-3, p-4, p-5, px-4, px-6 with p-2 in th and td tags
        content = content.replace(/<(th|td)([^>]*)p-5/g, '<$1$2p-2');
        content = content.replace(/<(th|td)([^>]*)p-4/g, '<$1$2p-2');
        content = content.replace(/<(th|td)([^>]*)p-3/g, '<$1$2p-2');
        content = content.replace(/<(th|td)([^>]*)px-4 py-3/g, '<$1$2p-2');
        content = content.replace(/<(th|td)([^>]*)px-6 py-4/g, '<$1$2p-2');
        content = content.replace(/<(th|td)([^>]*)px-4 py-4/g, '<$1$2p-2');
        content = content.replace(/<(th|td)([^>]*)px-4 py-2/g, '<$1$2p-2');
        content = content.replace(/<(th|td)([^>]*)px-6 py-3/g, '<$1$2p-2');

        // 4. Ensure headers use smaller text to fit more content
        content = content.replace(/<th([^>]*)text-base/g, '<th$1text-sm');
        content = content.replace(/<th([^>]*)text-lg/g, '<th$1text-sm');
        
        // 5. Add break-words to table to prevent very long words (like emails) from overflowing
        content = content.replace(/<table([^>]*)className="/g, '<table$1className="break-words ');

        // 6. Cleanup multi-spaces in class strings (mostly a cosmetic fix for the code)
        content = content.replace(/className="\s+/g, 'className="');
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
    }
});

console.log(`Changed ${changedFiles} files with table fixes.`);
