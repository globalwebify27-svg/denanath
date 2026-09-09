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

    content = content.replace(/text-\[18px\]/g, 'text-base');
    content = content.replace(/text-\[17px\]/g, 'text-base');
    content = content.replace(/sm:text-\[18px\]/g, 'sm:text-base');
    content = content.replace(/md:text-\[18px\]/g, 'md:text-base');
    content = content.replace(/lg:text-\[18px\]/g, 'lg:text-base');
    
    // Some classes might be just text-lg without boundaries matching properly if there are other chars
    // But text-lg replacement worked (count went from 150 -> 66 files modified, 0 in <p>).

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
    }
});

console.log(`Changed ${changedFiles} files with 18px arbitrary values.`);
