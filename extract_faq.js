const fs = require('fs');
const content = fs.readFileSync('current_db.txt', 'utf8');
const faqIndex = content.indexOf('What are precancers');
if (faqIndex === -1) {
  console.log("precancers not found");
} else {
  console.log(content.substring(Math.max(0, faqIndex - 500), faqIndex + 1500));
}
