const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (f === 'page.tsx') {
            let c = fs.readFileSync(p, 'utf8');
            let imports = c.match(/import\s+{[^}]+}\s+from\s+['"]lucide-react['"];/g);
            if (imports && imports.length > 1) {
                console.log('Duplicate in ' + p);
                // Remove the exact 'import { Save } from "lucide-react";' line
                c = c.replace(/import { Save } from ["']lucide-react["'];\n?/, '');
                fs.writeFileSync(p, c, 'utf8');
            }
        }
    }
}
walk('src/app/admin/(dashboard)');
