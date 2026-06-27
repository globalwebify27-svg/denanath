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
       images.each((_, el) => {
         const $img = $(el);
         
         // If it's already wrapped in our specific div, unwrap it first or just update it
         if ($img.parent().hasClass('overflow-hidden')) {
             // Already wrapped, we'll just manipulate the wrapper below if needed, 
             // but let's assume they are not wrapped because our previous script applied classes directly to img.
         } else {
             // Remove all classes from image
             $img.removeAttr('class');
             // Make image full width and height of parent, cover, and scale slightly to hide baked-in borders
             $img.addClass('w-full h-full object-cover scale-105');
             
             // Wrap in a rounded div with border and hidden overflow
             $img.wrap('<div class="w-32 h-24 sm:w-48 sm:h-32 rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-shrink-0 relative"></div>');
         }
       });
       
       await prisma.$executeRawUnsafe(
         'UPDATE Department SET description = ? WHERE name = ?',
         $.html(),
         'BRACHIAL PLEXUS'
       );
       console.log('Successfully wrapped images to fully cover the box');
    } else {
       console.log('Images not found');
    }
  } else {
    console.log('Department not found');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
