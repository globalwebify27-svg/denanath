const fs = require('fs');
const cheerio = require('cheerio');
const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  
  // Get the Head and Neck Oncosurgery department
  const d = await prisma.department.findFirst({ where: { name: { contains: 'Head and Neck' } }});
  
  if (!d) {
     console.log("Department not found");
     return;
  }
  
  const $ = cheerio.load(d.description, null, false);
  
  $('section').each((_, section) => {
    const h3Text = $(section).find('h3').first().text().trim().toLowerCase();
    
    if (h3Text === 'faq' || h3Text === 'faqs' || h3Text === 'frequently asked questions') {
      const mainUl = $(section).children('ul').first();
      if (mainUl.length > 0) {
        mainUl.children('li').each((_, li) => {
          const $li = $(li);
          const details = $li.children('details.faq-item');
          
          if (details.length > 0) {
             // Extract question
             const question = details.find('summary h4').text().trim();
             // Extract answer
             const answer = details.find('div.text-slate-600').html();
             
             // Rebuild as simple list item for WYSIWYG
             const newHtml = `<strong>${question}</strong>\n${answer}`;
             $li.html(newHtml);
          }
        });
      }
    }
  });
  
  const newDescription = $.html();
  
  await prisma.department.update({
    where: { id: d.id },
    data: { description: newDescription }
  });
  
  console.log("Successfully updated database for Head and Neck Oncosurgery.");
}

main().catch(console.error);
