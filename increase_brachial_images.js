const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');

async function main() {
  const dept = await prisma.department.findFirst({
    where: { name: 'BRACHIAL PLEXUS' }
  });
  if (dept && dept.description) {
    const $ = cheerio.load(dept.description, null, false);
    
    // Find the wrapper divs containing the images
    // The images are inside divs with 'rounded-xl shadow-sm border border-slate-200 overflow-hidden'
    const imageWrappers = $('div.overflow-hidden.flex-shrink-0');
    
    if (imageWrappers.length > 0) {
       imageWrappers.each((_, el) => {
         const $wrap = $(el);
         
         // Remove old sizing
         $wrap.removeClass('w-32 h-24 sm:w-48 sm:h-32');
         
         // Add new, slightly larger sizing
         // Width: 60 = 240px, Height: 44 = 176px
         $wrap.addClass('w-40 h-32 sm:w-60 sm:h-44');
       });
       
       await prisma.$executeRawUnsafe(
         'UPDATE Department SET description = ? WHERE name = ?',
         $.html(),
         'BRACHIAL PLEXUS'
       );
       console.log('Successfully increased image size slightly');
    } else {
       console.log('Image wrappers not found');
    }
  } else {
    console.log('Department not found');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
