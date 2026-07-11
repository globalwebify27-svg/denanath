const fs = require('fs');

let html = fs.readFileSync('oph_description.html', 'utf8');

// Regex to remove style attributes. We match style="[^"]*" and remove it.
html = html.replace(/ style="[^"]*"/g, '');

// There are also some class="list1" which we might want to change to standard tailwind classes
// like list-disc or list-decimal to match Cataract Services.
// Cataract uses: <ul class="list-disc pl-5 mt-2 space-y-2 text-sm">
html = html.replace(/<ul class="list1">/g, '<ul>');

// Also, let's wrap sections 3, 4, 5, 6 in `<div class="mt-2 space-y-2 text-sm">` if they aren't already.
// Wait, the easiest way is to just let the global text styles apply. Let's see the result of removing styles first.

fs.writeFileSync('oph_description_clean.html', html, 'utf8');
console.log('Cleaned HTML saved to oph_description_clean.html');
