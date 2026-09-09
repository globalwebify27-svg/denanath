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

    content = content.replace(/\btext-\[18px\]\b/g, 'text-base');
    content = content.replace(/\btext-\[17px\]\b/g, 'text-base');
    content = content.replace(/\bsm:text-lg\b/g, 'sm:text-base');
    content = content.replace(/\bmd:text-lg\b/g, 'md:text-base');
    content = content.replace(/\blg:text-lg\b/g, 'lg:text-base');
    content = content.replace(/\bxl:text-lg\b/g, 'xl:text-base');
    
    // Replace standalone text-lg with text-base
    content = content.replace(/\btext-lg\b/g, 'text-base');

    // Also replace other odd body sizes if any
    content = content.replace(/\btext-\[19px\]\b/g, 'text-base');
    
    // Headings generally use text-xl, text-2xl, text-3xl, etc. 
    // To "Reduce the overall font size across the entire website for a cleaner and more balanced appearance",
    // We can also step down the larger font sizes by one level.
    // Wait, replacing text-2xl with text-xl everywhere might be destructive if not careful.
    // Let's just focus on standardizing body to 16px and applying a global CSS theme override for the rest.

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
    }
});

console.log(`Changed ${changedFiles} files`);
