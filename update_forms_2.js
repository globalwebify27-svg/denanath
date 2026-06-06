const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'admin', '(dashboard)');

const rules = [
    // 1. Labels stragglers
    {
        from: /text-sm font-bold text-slate-700 mb-1/g,
        to: "text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3"
    },
    // 2. Input/Textarea stragglers
    {
        from: /w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-\[#007a87\]/g,
        to: "w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
    },
    {
        from: /flex-1 p-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-\[#007a87\]/g,
        to: "flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
    },
    {
        from: /w-16 p-2 border border-slate-200 rounded-lg text-sm text-center/g,
        to: "w-16 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center"
    },
    {
        from: /w-32 p-2 border border-slate-200 rounded-lg text-sm text-center/g,
        to: "w-32 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium text-center"
    },
    {
        from: /flex-1 p-2 border border-slate-200 rounded-lg text-sm/g,
        to: "flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
    },
    {
        from: /w-1\/3 p-2 border border-slate-200 rounded-lg text-sm/g,
        to: "w-1/3 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
    },
    {
        from: /w-full p-2 border border-slate-200 rounded-lg text-sm/g,
        to: "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium"
    }
];

let updatedCount = 0;

function walkDir(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (file === 'client-form.tsx' || file.endsWith('Form.tsx')) {
            if (fullPath.includes('about-hospital')) continue;
            
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            for (const rule of rules) {
                if (rule.from.test(content)) {
                    content = content.replace(rule.from, rule.to);
                    modified = true;
                }
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                updatedCount++;
                console.log(`Updated stragglers in ${fullPath}`);
            }
        }
    }
}

walkDir(dir);
console.log(`Total forms updated for stragglers: ${updatedCount}`);
