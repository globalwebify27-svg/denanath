const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (f === 'page.tsx') {
            if (p.includes('about-hospital')) continue;

            let c = fs.readFileSync(p, 'utf8');
            
            // Check if already injected
            if (c.includes('subtle background decoration') || c.includes('HeartPulse size={200}')) {
                continue;
            }

            // Inject HeartPulse component
            const regex = /(<Save size=\{20\} strokeWidth=\{2\.5\} \/> Save Changes\s*<\/button>\s*<\/div>)\s*<\/div>/;
            if (regex.test(c)) {
                c = c.replace(regex, `$1\n        {/* subtle background decoration */}\n        <div className="absolute right-0 top-0 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">\n           <HeartPulse size={200} className="text-[#007a87] -mt-10 -mr-10" />\n        </div>\n      </div>`);
                
                // Add import
                if (c.includes('lucide-react') && !c.includes('HeartPulse')) {
                    c = c.replace(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/, (match, p1) => {
                        return `import { ${p1.trim()}, HeartPulse } from "lucide-react";`;
                    });
                } else if (!c.includes('lucide-react')) {
                    c = `import { HeartPulse } from "lucide-react";\n` + c;
                }

                fs.writeFileSync(p, c, 'utf8');
                console.log('Added background icon to ' + p);
            }
        }
    }
}
walk('src/app/admin/(dashboard)');
