const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    let fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (!fullPath.includes('admin') && !fullPath.includes('api')) {
        results = results.concat(walk(fullPath));
      }
    } else {
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const dirsToScan = [
  path.join(__dirname, 'src', 'app'),
  path.join(__dirname, 'src', 'components')
];

let files = [];
dirsToScan.forEach(dir => {
  if (fs.existsSync(dir)) {
    files = files.concat(walk(dir));
  }
});

let updatedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Regex to match className="..."
  const classRegex = /(<(?:p|li|div|span|h[1-6]|a|button|td|th)[^>]*className=["'])([^"']*)(["'])/g;

  content = content.replace(classRegex, (match, p1, p2, p3) => {
    // Only replace specific font size classes
    let newClass = p2.replace(/\btext-(xs|sm|base|md|lg|xl)\b/g, 'text-[20px]');
    
    // Also replace responsive sizes
    newClass = newClass.replace(/\b(xs|sm|md|lg|xl|2xl):text-(xs|sm|base|md|lg|xl)\b/g, '$1:text-[20px]');

    return p1 + newClass + p3;
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    updatedFiles++;
  }
});
console.log('Updated ' + updatedFiles + ' files.');
