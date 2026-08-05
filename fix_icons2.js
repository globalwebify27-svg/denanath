const fs = require('fs');

const files = [
  'src/app/careers/client-page.tsx',
  'src/app/(online-facilities)/patient-registration/client-page.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');

  // Replace input classes
  content = content.replace(/<input\s+([^>]*?)className=["'](.*?)["']([^>]*?)\/?>/g, (match, before, classes, after) => {
    // Target inputs with pl-11 or pl-9 that don't have peer
    if ((classes.includes('pl-11') || classes.includes('pl-9') || classes.includes('pl-10')) && !classes.includes('peer ')) {
      let newClasses = 'peer ' + classes + ' focus:!pl-4 [&:not(:placeholder-shown)]:!pl-4';
      return '<input ' + before + 'className="' + newClasses + '"' + after + '/>';
    }
    return match;
  });

  // Replace icons.
  const icons = ['User', 'Calendar', 'Phone', 'Mail', 'FileText', 'MapPin', 'Building', 'Briefcase', 'Globe', 'Lock'];
  const iconPattern = new RegExp('<(' + icons.join('|') + ')\\s+([^>]*?)className=["\'](.*?)absolute(.*?)["\']([^>]*?)\\/?>', 'g');
  
  content = content.replace(iconPattern, (match, iconName, before, cls1, cls2, after) => {
    let classes = cls1 + 'absolute' + cls2;
    if (!classes.includes('peer-focus:opacity-0')) {
      let newClasses = classes + ' transition-opacity duration-200 peer-focus:opacity-0 peer-[&:not(:placeholder-shown)]:opacity-0';
      return '<' + iconName + ' ' + before + 'className="' + newClasses + '"' + after + '/>';
    }
    return match;
  });

  fs.writeFileSync(file, content);
  console.log('Fixed ' + file);
});
