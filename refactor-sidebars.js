const fs = require('fs');
const path = require('path');

const targetDirs = [
  { dir: 'src/app/(about)', category: 'About Us' },
  { dir: 'src/app/(patient-guide)', category: 'Patient & Visitors' },
  { dir: 'src/app/patient-visitors', category: 'Patient & Visitors' }, 
  { dir: 'src/app/patient-guide', category: 'Patient & Visitors' }, 
  { dir: 'src/app/(research)', category: 'Research' },
  { dir: 'src/app/(doctors)', category: 'Doctors & Departments' },
  { dir: 'src/app/departments', category: 'Doctors & Departments' }, 
  { dir: 'src/app/(academics)', category: 'Academics' },
  { dir: 'src/app/(online-facilities)', category: 'Online Facilities' }
];

function processDirectory(dirPath, categoryName) {
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath, categoryName);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      processFile(fullPath, categoryName);
    }
  }
}

function processFile(filePath, categoryName) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Check if it has a sidebar
  const startIdx = content.indexOf('{/* Left Sidebar Navigation */}');
  if (startIdx === -1) return;

  const endStr = '{/* Right Main Content */}';
  const endIdx = content.indexOf(endStr);
  if (endIdx === -1) {
    console.log(`Could not find Right Main Content in ${filePath}`);
    return;
  }

  // Extract the active href
  const activeHrefMatch = content.match(/href:\s*["']([^"']+)["'][^}]*active:\s*true/i);
  if (!activeHrefMatch) {
    console.log(`Could not find active href in ${filePath}`);
    return;
  }
  const activeHref = activeHrefMatch[1];
  
  const replacement = `\{/* Dynamic Sidebar */\}
          <DynamicSidebar categoryName="${categoryName}" activeHref="${activeHref}" />

          `;
          
  const before = content.substring(0, startIdx);
  const after = content.substring(endIdx);
  
  content = before + replacement + after;
  
  // Also remove the scrollContainerRef hook if it exists
  content = content.replace(/const\s+scrollContainerRef\s*=\s*useRef<[^>]+>\(null\);\s*/, '');
  
  // Also remove the useEffect that uses scrollContainerRef
  const effectRegex = /useEffect\(\(\)\s*=>\s*\{\s*if\s*\(window\.innerWidth\s*<\s*1024\s*&&\s*scrollContainerRef\.current\)[\s\S]*?\}\s*\},?\s*\[\]\);\s*/;
  content = content.replace(effectRegex, '');
  
  // Also remove the unused arrays
  const optionsRegex = /const\s+\w*(?:Options|options)\s*=\s*\[[\s\S]*?\];\s*/;
  content = content.replace(optionsRegex, '');
  
  // Add the import for DynamicSidebar at the top
  if (!content.includes('import DynamicSidebar')) {
    content = content.replace(/import\s+React.*?;\n/m, `$&import DynamicSidebar from "@/components/DynamicSidebar";\n`);
  }

  fs.writeFileSync(filePath, content);
  console.log(`Refactored ${filePath}`);
}

for (const { dir, category } of targetDirs) {
  processDirectory(dir, category);
}
