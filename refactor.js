const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('client-page.tsx') || file.endsWith('page.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src/app');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // Remove DynamicSidebar
  if (content.includes('<DynamicSidebar')) {
    content = content.replace(/<DynamicSidebar[^>]*\/>/g, '');
    modified = true;
  }
  
  // Also remove {isMenuPage ? ... } if it exists (from my earlier change, though I only did it on [slug] so maybe not needed here)

  // Center mb-8 header div
  if (content.includes('mb-8') && !content.includes('mb-8 text-center') && modified) {
    content = content.replace(/className="mb-8"/g, 'className="mb-8 text-center"');
  }

  // Center the line below the header
  if (content.includes('w-16 h-1 bg-[#007a87] rounded-full mt-4') && !content.includes('mx-auto') && modified) {
    content = content.replace(/w-16 h-1 bg-\[#007a87\] rounded-full mt-4/g, 'w-16 h-1 bg-[#007a87] rounded-full mt-4 mx-auto');
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated: ' + file);
  }
});
