const fs = require('fs');
const filePath = 'c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/online-payment/client-page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all <input, <select, <button, <textarea with suppressHydrationWarning
// Make sure not to duplicate it if it already exists
const tagsToPatch = ['input', 'select', 'button', 'textarea'];

tagsToPatch.forEach(tag => {
    // Regex to match <tag ... avoiding matching if suppressHydrationWarning already exists
    const regex = new RegExp(`(<${tag}(?![^>]*suppressHydrationWarning)[^>]*?)(/?>)`, 'g');
    content = content.replace(regex, '$1 suppressHydrationWarning$2');
});

fs.writeFileSync(filePath, content);
console.log('Added suppressHydrationWarning to form elements in online-payment');
