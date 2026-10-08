const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!fullPath.includes('admin') && !fullPath.includes('api') && !fullPath.includes('node_modules')) {
        walk(fullPath, fileList);
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

const files = walk('src');
let count = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Literal standard replacement (100% preserving mx-auto px-4 sm:px-6 lg:px-8)
  content = content.replaceAll(
    'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    'max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8'
  );

  // 2. Specific pages with restricted body widths
  if (file.includes('book-appointment/client-page.tsx')) {
    content = content.replace(
      'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8',
      'max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8'
    );
  }
  if (file.includes('manage-appointments/client-page.tsx')) {
    content = content.replace(
      'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8',
      'max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8'
    );
  }
  if (file.includes('careers/client-page.tsx')) {
    content = content.replace(
      'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
      'max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8'
    );
  }
  if (file.includes('courses/[id]/client-page.tsx')) {
    content = content.replace(
      'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
      'max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8'
    );
  }
  if (file.includes('doctors-profile/[id]/page.tsx')) {
    content = content.replace(
      'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
      'max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8'
    );
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    count++;
    console.log('Successfully updated:', file);
  }
}

console.log('Total files updated:', count);
