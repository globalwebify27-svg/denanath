const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (f === 'client-form.tsx' || f.endsWith('Form.tsx')) {
            // Ignore about-hospital as it doesn't have a ClientForm with a button inside
            if (p.includes('about-hospital')) continue;

            let c = fs.readFileSync(p, 'utf8');
            const regex = /<div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">[\s\S]*?<\/button>\s*<\/div>/g;
            
            if (regex.test(c)) {
                c = c.replace(regex, '');
                
                // Clean up any stray unused 'Save' imports in client-form.tsx
                if (c.includes('import { Save }')) {
                    c = c.replace(/import\s+\{\s*Save\s*\}\s+from\s+['"]lucide-react['"];?\n?/, '');
                } else if (c.includes('Save')) {
                    c = c.replace(/,\s*Save/g, '');
                    c = c.replace(/Save\s*,/g, '');
                }

                fs.writeFileSync(p, c, 'utf8');
                console.log('Removed button from ' + p);
            }
        }
    }
}
walk('src/app/admin/(dashboard)');
