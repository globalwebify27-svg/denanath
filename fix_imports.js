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
            if (!c.includes('import { Save }') && c.includes('<Save ')) {
                fs.writeFileSync(p, 'import { Save } from "lucide-react";\n' + c, 'utf8');
                console.log('Fixed ' + p);
            }
        }
    }
}
walk('src/app/admin/(dashboard)');
