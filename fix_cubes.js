const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        if (file.includes('node_modules') || file.includes('.next') || file.includes('.git')) return;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./');
let changed = 0;
files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.txt') || file.endsWith('.js') || file.endsWith('.jsx')) {
        let content = fs.readFileSync(file, 'utf8');
        const target = "bg-[url(https://www.transparenttextures.com/patterns/cubes.png)]";
        const replacement = "bg-[url(https://www.transparenttextures.com/patterns/cubes.png)]";
        if (content.includes(target)) {
            content = content.replaceAll(target, replacement);
            fs.writeFileSync(file, content, 'utf8');
            changed++;
            console.log('Fixed ' + file);
        }
    }
});
console.log('Files changed: ' + changed);
