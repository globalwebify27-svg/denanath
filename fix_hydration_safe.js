const fs = require('fs');
const filePath = 'c:/Users/91870/Desktop/globalwebify/denanath/src/app/(online-facilities)/online-payment/client-page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Use a regex that matches exactly <input, <select, <button, <textarea and adds suppressHydrationWarning right after it.
// We avoid matching anything up to > to prevent breaking JSX arrow functions like (e) =>
// (?![^>]*suppressHydrationWarning) ensures we don't add it twice if it's already there in the tag.
const tagsToPatch = ['input', 'select', 'button', 'textarea'];

tagsToPatch.forEach(tag => {
    // Regex: Match <tag followed by space/newline, ensuring suppressHydrationWarning is not in the tag
    const regex = new RegExp(`(<${tag})(\\s+)(?![^>]*suppressHydrationWarning)`, 'g');
    content = content.replace(regex, `$1 suppressHydrationWarning$2`);
});

fs.writeFileSync(filePath, content);
console.log('Safely added suppressHydrationWarning to form elements in online-payment');
