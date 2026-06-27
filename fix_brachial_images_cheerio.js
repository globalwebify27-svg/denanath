const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');

async function main() {
  const dept = await prisma.department.findFirst({
    where: { name: 'BRACHIAL PLEXUS' }
  });
  if (dept && dept.description) {
    const $ = cheerio.load(dept.description, null, false);
    
    // Find the images
    const images = $('img[src="/uploads/113851c173a11f0f.jpg"], img[src="/uploads/803905ae3e46f521.jpg"], img[src="/uploads/6e56e6bb85cbd5a0.jpg"]');
    
    if (images.length > 0) {
       // Save their HTML
       const imagesHtml = [];
       images.each((_, el) => {
         $(el).addClass('w-full max-w-[300px] h-48 object-cover rounded-xl shadow-sm border border-slate-100');
         imagesHtml.push($.html(el));
       });
       
       // Remove them from current location
       images.remove();
       
       // Create a container for them
       const container = $('<div class="flex flex-wrap gap-4 mt-8 mb-6 justify-center w-full"></div>');
       imagesHtml.forEach(html => container.append(html));
       
       // Find the "Statistics of Brachial Plexus Surgeries" section
       let targetSection = null;
       $('section').each((_, el) => {
         if ($(el).text().includes('ADULTS')) {
           targetSection = $(el);
         }
       });
       
       if (targetSection) {
         // Append the image container to the end of this section
         targetSection.append(container);
         
         await prisma.$executeRawUnsafe(
           'UPDATE Department SET description = ? WHERE name = ?',
           $.html(),
           'BRACHIAL PLEXUS'
         );
         console.log('Fixed Brachial Plexus images via cheerio (used .remove())');
       } else {
         console.log('Target section not found');
       }
    } else {
       console.log('Images not found in description.');
    }
  } else {
    console.log('Department not found');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
