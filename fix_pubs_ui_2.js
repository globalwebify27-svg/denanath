const fs = require('fs');
const txt = fs.readFileSync('publications_db.txt', 'utf8');
const data = JSON.parse(txt);

const startIdx = data.content.indexOf('<div class="bg-white border border-slate-200');
const header = data.content.substring(0, startIdx);

const footerIdx = data.content.lastIndexOf('          </div>\n        </div>\n\n        <div class="bg-slate-50 border border-slate-200 rounded-3xl');
const footer = data.content.substring(footerIdx);

console.log('Header length:', header.length);
console.log('Footer length:', footer.length);
console.log('Footer starts with:', footer.substring(0, 100));

// Also let's fetch the CURRENT DB content and wrap it!
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  const current = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const currentData = JSON.parse(current.value);
  
  // Wait, currentData.content already has the header I added in my first flawed fix script?
  // Let's strip the flawed header/footer!
  let innerContent = currentData.content;
  
  // If it already contains the header, find the first bg-white border border-slate-200
  const firstCard = innerContent.indexOf('<div class="bg-white border border-slate-200');
  // Wait, there might be <h4> tags for the headers!
  // Find the first <h4>
  let startInner = innerContent.indexOf('<h4 class="text-base md:text-lg font-bold');
  if (startInner === -1 || startInner > firstCard) {
      startInner = firstCard;
  }
  
  // Find the end of the inner content. It ends at the last </div> of the last card.
  // Actually, innerContent from parse_giant_pubs.js ONLY had <h4> and <div> tags!
  // Wait, my flawed script `fix_pubs_ui.js` previously wrapped it!
  // So currentData.content has the HEADER from before, and the FLAWED footer!
  // The header length is 817.
  // The flawed footer was just "          </div>\n        </div>\n" + some text.
  
  // Let's just re-read the plain cards from my `parse_giant_pubs.js` by running it again!
  // But wait, the cards are perfectly inside currentData.content between header and footer.
  // Let's just slice it!
  const actualInnerStart = currentData.content.indexOf('<h4 class="text-base md:text-lg font-bold');
  const actualInnerEnd = currentData.content.indexOf('          </div>\n        </div>\n');
  
  let cardsHTML = currentData.content;
  if (actualInnerStart !== -1 && actualInnerEnd !== -1) {
      cardsHTML = currentData.content.substring(actualInnerStart, actualInnerEnd);
  }
  
  const newContent = header + cardsHTML + footer;
  
  const payload = {
    title: "Publications",
    content: newContent
  };
  
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(payload) }
  });
  console.log('Fixed DB layout for real!');
}

fix().catch(console.error).finally(()=>prisma.$disconnect());
