const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cheerio = require('cheerio');

async function main() {
  const dept = await prisma.department.findFirst({
    where: { name: 'BRACHIAL PLEXUS' }
  });
  if (dept && dept.description) {
    const $ = cheerio.load(dept.description, null, false);
    
    // Find the container we created
    // We used 'flex-nowrap' and 'justify-center'
    const container = $('div.flex-nowrap');
    
    if (container.length > 0) {
       container.removeClass('justify-center');
       container.addClass('justify-start');
       container.removeClass('gap-4');
       container.addClass('gap-8'); // Equal and slightly wider gap
       
       await prisma.$executeRawUnsafe(
         'UPDATE Department SET description = ? WHERE name = ?',
         $.html(),
         'BRACHIAL PLEXUS'
       );
       console.log('Successfully aligned images to start and adjusted gaps');
    } else {
       console.log('Image container not found');
    }
  } else {
    console.log('Department not found');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
