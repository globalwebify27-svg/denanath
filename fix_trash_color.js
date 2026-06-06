const fs = require('fs');
const path = require('path');

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory()) {
            walk(p);
        } else if (f.endsWith('.tsx')) {
            let content = fs.readFileSync(p, 'utf8');
            if (content.includes('Trash2')) {
                const original = content;
                // Add color prop to Trash2 icons
                content = content.replace(/<Trash2 size=\{([0-9]+)\}\s*\/>/g, '<Trash2 size={$1} color="#D9232D" />');
                
                // Clean up any button hover styles so it stays #D9232D
                // Just for consistency, we'll replace text-red-500 or text-rose-500
                // but setting color="#D9232D" takes precedence anyway!
                
                if (original !== content) {
                    fs.writeFileSync(p, content, 'utf8');
                    console.log('Updated: ' + p);
                }
            }
        }
    }
}
walk('src/app/admin/(dashboard)');
