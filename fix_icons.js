const fs = require('fs');

const files = [
  'src/app/careers/client-page.tsx',
  'src/app/(online-facilities)/patient-registration/client-page.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace input classes
  content = content.replace(/<input([^>]*?)className="([^"]*?)w-full([^"]*?)pl-11([^"]*?)"/g, (match, before, classStart, classMid, classEnd) => {
    if (classStart.includes('peer ') || classMid.includes('peer ')) return match;
    // We add peer and the focus/placeholder styles
    return '<input' + before + 'className="peer ' + classStart + 'w-full' + classMid + 'pl-11 pr-4 focus:!pl-4 [&:not(:placeholder-shown)]:!pl-4' + classEnd + '"';
  });

  // Replace icons. Icons are right after inputs. 
  // Icons look like <User className="... absolute left-4 ..." />
  const iconRegex = /<([A-Z][a-zA-Z0-9]*)\s+className="([^"]*?absolute left-4[^"]*?)"/g;
  content = content.replace(iconRegex, (match, iconName, classes) => {
    // If it's a dropdown or doesn't have absolute left-4, it won't match.
    if (classes.includes('peer-focus:opacity-0')) return match;
    return '<' + iconName + ' className="' + classes + ' transition-opacity duration-200 peer-focus:opacity-0 peer-[&:not(:placeholder-shown)]:opacity-0"';
  });

  fs.writeFileSync(file, content);
  console.log('Processed ' + file);
});
