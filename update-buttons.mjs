import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const dir = 'c:\\Users\\91870\\Desktop\\globalwebify\\denanath\\src\\app\\admin\\(dashboard)';

walkDir(dir, (filePath) => {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if it has a submit button that looks like the old one
    if (content.includes('<button type="submit"') && content.includes('Save Changes')) {
      
      // Add import for SubmitButton if not present
      if (!content.includes('SubmitButton')) {
        // Try to insert after the last import
        const lines = content.split('\n');
        let lastImportIndex = -1;
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].startsWith('import ')) {
            lastImportIndex = i;
          }
        }
        
        if (lastImportIndex !== -1) {
          lines.splice(lastImportIndex + 1, 0, 'import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";');
          content = lines.join('\n');
        } else {
          content = 'import SubmitButton from "@/app/admin/(dashboard)/components/SubmitButton";\n' + content;
        }
      }

      // Replace the button block
      // The button block usually looks like:
      // <button type="submit" className="...">
      //   <Save size={20} strokeWidth={2.5} /> Save Changes
      // </button>
      
      const buttonRegex = /<button type="submit"[\s\S]*?<\/button>/g;
      content = content.replace(buttonRegex, '<SubmitButton />');
      
      // Clean up lucide-react import if Save is no longer used
      // Wait, Save might be used elsewhere, but usually it's just the button
      if (content.includes('import { Save,') || content.includes(', Save }') || content.includes('import { Save }')) {
        if (!content.match(/<Save\b/)) { // if no other <Save is used
          content = content.replace('import { Save } from "lucide-react";', '');
          content = content.replace('Save, ', '');
          content = content.replace(', Save', '');
        }
      }

      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Updated: ' + filePath);
    }
  }
});
