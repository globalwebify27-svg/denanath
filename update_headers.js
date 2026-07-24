const fs = require('fs');

const filesToUpdate = [
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/events/client-page.tsx",
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/ec-approval/page.tsx",
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/disclaimer/page.tsx",
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/(academics)/laryngology-fellowship/client-page.tsx",
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/(academics)/vasant-nirmala-oswal-centre/client-page.tsx",
  "c:/Users/91870/Desktop/globalwebify/denanath/src/app/(academics)/neuro-radiology-fellowship/client-page.tsx"
];

const targetPattern1 = /className="relative bg-gradient-to-r from-\[#004d56\] to-\[#007b8a\] pt-24 pb-16 overflow-hidden"/g;
const replacement1 = 'className="w-full bg-[#002b5c] relative overflow-hidden pt-24 pb-16"';

const targetPattern2 = /\{\/\* Abstract Background Shapes \*\/\}[\s\S]*?<div className="absolute bottom-0 left-0 w-\[400px\] h-\[400px\] bg-\[#d9232d\]\/20 rounded-full blur-\[100px\] pointer-events-none" \/>/g;
const replacement2 = `<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />\n        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-teal-500/20 to-transparent pointer-events-none" />`;

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(targetPattern1, replacement1);
    content = content.replace(targetPattern2, replacement2);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
