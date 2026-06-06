const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'admin', '(dashboard)');

const rules = [
    // 1. Labels
    {
        from: /text-\[12px\] font-\[800\] text-gray-700 uppercase tracking-widest mb-2/g,
        to: "text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-3"
    },
    {
        from: /text-xs font-bold text-slate-700 mb-1/g,
        to: "text-[13px] font-extrabold text-slate-700 uppercase tracking-widest mb-2"
    },
    // 2. Input/Textarea (wide)
    {
        from: /w-full p-3 border border-gray-200 rounded-xl focus:ring-\[#007a87\] focus:outline-none bg-white/g, // with bg-white
        to: "w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
    },
    {
        from: /w-full p-3 border border-gray-200 rounded-xl focus:ring-\[#007a87\] focus:outline-none/g,
        to: "w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-[#007a87]/30 focus:border-[#007a87] transition-all duration-200 text-slate-700 font-medium leading-relaxed"
    },
    // 3. List Item Wrappers
    {
        from: /p-6 bg-slate-50 border border-slate-200 rounded-2xl relative/g,
        to: "bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow duration-300 relative p-6 md:p-8"
    },
    // 4. List Item Headers
    {
        from: /flex items-center gap-3 mb-6 border-b border-slate-200 pb-4/g,
        to: "bg-slate-50/50 border-b border-slate-100 p-5 md:p-6 flex items-center gap-4 -mx-6 md:-mx-8 -mt-6 md:-mt-8 mb-6"
    },
    {
        from: /w-8 h-8 rounded-full bg-\[#007a87\] text-white flex items-center justify-center font-bold text-sm/g,
        to: "w-10 h-10 rounded-2xl bg-[#007a87]/10 text-[#007a87] flex items-center justify-center font-black text-lg"
    },
    // 5. Add New Button
    {
        from: /w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 hover:text-\[#007a87\] hover:border-\[#007a87\] transition-all flex items-center justify-center gap-2/g,
        to: "w-full py-5 border-2 border-dashed border-slate-300 rounded-3xl text-slate-500 font-extrabold hover:bg-slate-50 hover:text-[#007a87] hover:border-[#007a87] transition-all flex items-center justify-center gap-2 text-[15px]"
    },
    // 6. Section Headers (Academics style)
    {
        from: /flex justify-between items-center bg-slate-100 p-4 rounded-xl cursor-pointer hover:bg-slate-200 transition-colors/g,
        to: "flex justify-between items-center bg-slate-50/50 border border-slate-200 p-5 md:p-6 cursor-pointer hover:bg-slate-100 transition-colors rounded-2xl shadow-sm"
    },
    {
        from: /p-4 border border-slate-200 rounded-xl space-y-4 animate-in fade-in/g,
        to: "p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden space-y-6 animate-in fade-in relative mt-4"
    },
    {
        from: /font-bold text-\[#002b5c\] text-lg/g,
        to: "text-[20px] font-black text-[#002b5c]"
    },
    {
        from: /font-bold text-\[#002b5c\]/g,
        to: "text-[20px] font-black text-[#002b5c]"
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
                // Fix potential duplicate classes from text-[20px] replacement
                content = content.replace(/text-\[20px\] font-black text-\[#002b5c\] text-lg/g, 'text-[20px] font-black text-[#002b5c]');
                
                fs.writeFileSync(fullPath, content, 'utf8');
                updatedCount++;
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

walkDir(dir);
console.log(`Total forms updated: ${updatedCount}`);
