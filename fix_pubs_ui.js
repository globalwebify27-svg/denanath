const fs = require('fs');
const txt = fs.readFileSync('publications_db.txt', 'utf8');
const data = JSON.parse(txt);

const startIdx = data.content.indexOf('<div class="bg-white border border-slate-200');
const header = data.content.substring(0, startIdx);

const footerIdx = data.content.indexOf('<div>\n            <h3 class="text-xl');
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
  
  const newContent = header + currentData.content + '          </div>\n        </div>\n' + footer;
  
  const payload = {
    title: "Publications",
    content: newContent
  };
  
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(payload) }
  });
  console.log('Fixed DB layout!');
}

fix().catch(console.error).finally(()=>prisma.$disconnect());
