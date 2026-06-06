const fs = require('fs');
const path = require('path');

const directory = path.join(__dirname, 'src', 'app', 'admin', '(dashboard)');

const pattern = /<div className="mb-8">\s*<h1 className="text-\[36px\] font-\[800\] leading-\[40px\] text-\[#002b5c\] tracking-tight mb-2">(.*?)<\/h1>\s*<p className="text-\[14px\] font-\[600\] text-gray-500">(.*?)<\/p>\s*<\/div>/g;

function replaceHeader(match, title, desc) {
    return `<div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#002b5c] to-[#007a87]"></div>
        <div className="z-10 relative">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#002b5c] tracking-tight leading-tight mb-2 flex items-center gap-3">
            ${title}
          </h1>
          <p className="text-[15px] font-medium text-slate-500 max-w-xl leading-relaxed">
            ${desc}
          </p>
        </div>
      </div>`;
}

let updatedCount = 0;

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (file === 'page.tsx') {
            if (fullPath.includes('about-hospital')) continue;
            
            let content = fs.readFileSync(fullPath, 'utf8');
            
            if (pattern.test(content)) {
                content = content.replace(pattern, replaceHeader);
                fs.writeFileSync(fullPath, content, 'utf8');
                updatedCount++;
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

walkDir(directory);
console.log(`Total files updated: ${updatedCount}`);
