const fs = require('fs');

let html = fs.readFileSync('paed_description.html', 'utf8');

// Replace: <p><img ... >Text</p>
// With:    <p><img ...></p><p class="mt-2 text-slate-700 clear-both block w-full">Text</p>
html = html.replace(/(<p>.*?<img[^>]+>)(.*?)(<\/p>)/g, '$1</p><p class="mt-2 text-slate-700 clear-both block w-full">$2</p>');

fs.writeFileSync('paed_description_clean.html', html, 'utf8');
console.log('Saved to paed_description_clean.html');
