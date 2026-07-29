const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
            fixFile(fullPath);
        }
    }
}

function fixFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    let oldContent = content;
    
    let regex = /<textarea([\s\S]*?)(?:\/>|>[\s\S]*?<\/textarea>)/g;
    
    content = content.replace(regex, (match, attrs) => {
        if (attrs.match(/seoMeta|seoKeywords|address|phone|email|introDesc|eventsJson|summary|coreValues|capabilities_imaging|capabilities_radiation/i)) return match;
        
        // Use a balanced brace matching or a greedy match up to a known next attribute
        // Usually textareas have className, rows, placeholder, etc.
        let valMatch = attrs.match(/value=\{((?:[^{}]|(?:\{[^{}]*\}))*)\}/);
        let ocMatch = attrs.match(/onChange=\{([\s\S]*?)\}\s*(?:rows=|className=|placeholder=|type=|\/>|>)/);
        
        if (valMatch && ocMatch) {
            let val = valMatch[1];
            let oc = ocMatch[1]; 
            
            let newOc = oc;
            let paramMatch = oc.match(/^(\(?\s*[a-zA-Z0-9_]+\s*\)?)\s*=>/);
            if (paramMatch) {
                let pNameMatch = paramMatch[1].match(/[a-zA-Z0-9_]+/);
                let pName = pNameMatch ? pNameMatch[0] : 'e';
                newOc = oc.replace(paramMatch[1], 'content');
                newOc = newOc.replace(new RegExp(`\\b${pName}\\.target\\.value\\b`, 'g'), 'content');
                
                return `<QuillEditor value={${val}} onChange={${newOc}} />`;
            }
        }
        
        let dvMatch = attrs.match(/defaultValue=\{((?:[^{}]|(?:\{[^{}]*\}))*)\}/);
        let nMatch = attrs.match(/name=["']([^"']+)["']/);
        if (dvMatch && nMatch && !valMatch) {
            return `<QuillEditor name="${nMatch[1]}" defaultValue={${dvMatch[1]}} />`;
        }
        
        return match;
    });

    if (content !== oldContent) {
        if (!content.includes('import QuillEditor')) {
            const importStmt = `import QuillEditor from "@/components/QuillEditor";\n`;
            if (content.includes('"use client";')) {
                content = content.replace('"use client";', `"use client";\n${importStmt}`);
            } else if (content.includes("'use client';")) {
                content = content.replace("'use client';", `'use client';\n${importStmt}`);
            } else {
                content = importStmt + content;
            }
        }
        fs.writeFileSync(file, content);
        console.log("Updated: " + file);
    }
}

processDir('src/app/admin');
