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
            
            // If HeartPulse component is used but not imported
            if (c.includes('<HeartPulse') && !c.includes('HeartPulse } from') && !c.includes(', HeartPulse } from') && !c.includes('{ HeartPulse } from')) {
                if (c.includes('lucide-react')) {
                    c = c.replace(/import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"];/, (match, p1) => {
                        // Don't add it twice
                        if (p1.includes('HeartPulse')) return match;
                        return `import { ${p1.trim()}, HeartPulse } from "lucide-react";`;
                    });
                } else {
                    c = `import { HeartPulse } from "lucide-react";\n` + c;
                }

                fs.writeFileSync(p, c, 'utf8');
                console.log('Fixed import in ' + p);
            }
        }
    }
}
walk('src/app/admin/(dashboard)');
