const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findFirst({ where: { name: 'OPHTHALMOLOGY' } });
  if(!dept) return console.log('Not found');

  const $ = cheerio.load(dept.description, null, false);
  let changed = false;

  $('section').each((_, section) => {
    const h3 = $(section).find('h3').first();
    const title = h3.text().trim().toLowerCase();
    
    if (title === 'specialities') {
      const h4Tags = $(section).children('h4, div').find('h4').addBack('h4');
      if (h4Tags.length > 0) {
        const ul = $('<ul class="list-disc pl-5 space-y-4 marker:text-black"></ul>');
        
        h4Tags.each((_, h4) => {
          const q = $(h4).text().trim();
          let a = '';
          
          let nextEl = $(h4).next();
          const elementsToRemove = [];
          
          while (nextEl.length > 0 && nextEl.prop('tagName') !== 'H4' && nextEl.prop('tagName') !== 'H3') {
            a += $.html(nextEl);
            elementsToRemove.push(nextEl);
            nextEl = nextEl.next();
          }
          
          const li = $('<li></li>');
          li.append($('<strong></strong>').text(q));
          li.append($('<div class="mt-2"></div>').html(a));
          ul.append(li);
          
          $(h4).remove();
          elementsToRemove.forEach(el => el.remove());
        });
        
        $(section).empty();
        $(section).append(h3);
        $(section).append(ul);
        changed = true;
      }
    }
  });

  if (changed) {
    await prisma.department.update({
      where: { id: dept.id },
      data: { description: $.html() }
    });
    console.log('Successfully converted Specialities to FAQ format');
  } else {
    console.log('No change needed or already converted');
  }
}
main();
