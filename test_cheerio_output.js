const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const prisma = new PrismaClient();

async function main() {
  const department = await prisma.department.findFirst({
    where: { name: { contains: 'Hand' } }
  });
  
  if (!department) {
    console.log("Not found");
    return;
  }
  
  let processedHtml = "";
  if (department.description) {
    const $ = cheerio.load(department.description, null, false);
    
    // Add custom classes to sections
    $('section').each((_, section) => {
      const h3 = $(section).find('h3').first();
      const h3Text = h3.text().trim().toLowerCase();
      if (h3Text === 'facilities') {
        $(section).addClass('department-facilities-section');
      } else if (h3Text === 'photo gallery') {
        $(section).addClass('department-gallery-section');
      } else if (h3Text === 'consultant') {
        const consultants = [];
        
        // Find all potential consultant names
        $(section).find('p, li, h4').each((_, el) => {
           let text = $(el).text().trim();
           text = text.replace(/^(?:[A-Z]\\s*)+Dr\\./, 'Dr.');
           text = text.replace(/&nbsp;/g, ' ').trim();
           if (text && text.length > 2) {
              consultants.push(text);
           }
        });
        
        if (consultants.length === 0) {
           let allText = '';
           $(section).contents().each((_, el) => {
              if (el.tagName && el.tagName.toLowerCase() === 'h3') return;
              allText += $(el).text() + ' ';
           });
           let text = allText.replace(/<[^>]+>/g, '').trim();
           text = text.replace(/^(?:[A-Z]\\s*)+Dr\\./, 'Dr.');
           text = text.replace(/&nbsp;/g, ' ').trim();
           if (text && text.length > 2) consultants.push(text);
        }
        
        if (consultants.length > 0) {
           const circlesHtml = consultants.map(cleanText => {
              return \`<div class="consultant">\${cleanText}</div>\`;
           }).join('');
           
           const newHtml = \`
             <h3 class="text-xl font-bold text-[#002b5c] mb-4 border-b pb-2">Consultant</h3>
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               \${circlesHtml}
             </div>
           \`;
           $(section).html(newHtml);
        }
      }
    });

    processedHtml = $.html().replace(/&nbsp;/g, ' ');
  }
  
  console.log("Processed HTML length:", processedHtml.length);
  console.log(processedHtml);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
