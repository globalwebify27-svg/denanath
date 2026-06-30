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
       // Remove all classes from images
       images.removeAttr('class');
       
       // Add exact small sizing
       images.addClass('w-32 h-24 sm:w-48 sm:h-32 object-cover rounded-xl shadow-sm border border-slate-200');
       
       // Create a new container to ensure they are on one line
       const container = $('<div class="flex flex-row flex-nowrap overflow-x-auto gap-4 mt-8 mb-6 justify-center w-full py-2"></div>');
       
       // Append the raw HTML of the newly styled images to the container
       const imagesHtml = [];
       images.each((_, el) => {
         imagesHtml.push($.html(el));
       });
       
       // Remove the old container if it exists
       // The images are currently in a flex container that we created earlier
       const oldContainer = images.parent('div.flex');
       if (oldContainer.length > 0) {
         oldContainer.remove();
       } else {
         images.remove();
       }
       
       imagesHtml.forEach(html => container.append(html));
       
       // Append to the target section again
       let targetSection = null;
       $('section').each((_, el) => {
         if ($(el).text().includes('ADULTS')) {
           targetSection = $(el);
         }
       });
       
       if (targetSection) {
         targetSection.append(container);
         
         await prisma.$executeRawUnsafe(
           'UPDATE Department SET description = ? WHERE name = ?',
           $.html(),
           'BRACHIAL PLEXUS'
         );
         console.log('Successfully styled Brachial Plexus images to small size on one line');
       }
    } else {
       console.log('Images not found');
    }
  } else {
    console.log('Department not found');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
