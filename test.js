const fs = require('fs');
const desc = fs.readFileSync('desc.txt', 'utf8');

const extractSection = (title) => {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`<h3[^>]*>${escapedTitle}<\\/h3>([\\s\\S]*?)<\\/section>`, 'i');
  const match = desc.match(regex);
  return match ? match[1].trim() : "";
};

const gallery = extractSection("Photo Gallery");
console.log("Gallery section length:", gallery.length);

const itemRegex = /<div class="bg-slate-50[^>]*>[\s\S]*?(?:<img[^>]*src="([^"]+)"|<div[^>]*>([^<]+)<\/div>)[\s\S]*?<p[^>]*>([^<]+)<\/p>[\s\S]*?<\/div>/gi;
let match;
while ((match = itemRegex.exec(gallery)) !== null) {
  console.log("Found:", match[1] || match[2], match[3]);
}
console.log("Done");
