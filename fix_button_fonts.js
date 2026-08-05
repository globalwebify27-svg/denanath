const fs = require('fs');
const glob = require('glob');

const paths = [
  'src/app/careers/client-page.tsx',
  'src/app/careers/page.tsx',
  'src/app/contact-us/client-page.tsx',
  'src/app/contact-us/page.tsx',
  'src/app/(online-facilities)/online-payment/client-page.tsx',
  'src/app/(online-facilities)/online-payment/page.tsx',
  'src/app/(online-facilities)/patient-registration/client-page.tsx'
];

paths.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // We want to find <button ... className="..." ...> and change its text size class
  // text-xs, text-sm, text-base, text-lg, text-xl, text-[...]
  
  // Regex to match button tags and their classNames
  const buttonRegex = /<button([^>]*?)className=["'](.*?)["']([^>]*?)\/?>/g;
  
  content = content.replace(buttonRegex, (match, before, classes, after) => {
    // Remove existing text size classes
    let newClasses = classes.replace(/\b(text-xs|text-sm|text-base|text-lg|text-xl|text-2xl|text-\[\d+px\])\b/g, '');
    
    // Clean up double spaces
    newClasses = newClasses.replace(/\s+/g, ' ').trim();
    
    // Add text-[16px]
    newClasses += ' text-[16px]';
    
    return '<button' + before + 'className="' + newClasses + '"' + after + '>';
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log('Fixed buttons in ' + file);
  }
});
