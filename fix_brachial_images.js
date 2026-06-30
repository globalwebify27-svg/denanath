const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const dept = await prisma.department.findFirst({
    where: { name: 'BRACHIAL PLEXUS' }
  });
  if (dept && dept.description) {
    let desc = dept.description;
    
    // Find the images
    const imagesStr = '<img src="/uploads/113851c173a11f0f.jpg"><img src="/uploads/803905ae3e46f521.jpg"><img src="/uploads/6e56e6bb85cbd5a0.jpg">';
    
    if (desc.includes(imagesStr)) {
       // Remove them from current location
       desc = desc.replace(imagesStr, '');
       
       // Add them after the adults table
       // The adults table ends with:
       //   </table>\n    </div>\n</section>
       const targetStr = '</table>\n    </div>\n</section>';
       const insertStr = '</table>\n    </div>\n    <div class="flex flex-wrap gap-4 mt-6 justify-center">\n      ' + imagesStr + '\n    </div>\n</section>';
       
       if (desc.includes(targetStr)) {
           desc = desc.replace(targetStr, insertStr);
           
           // Apply styling to images for better presentation
           desc = desc.replace(/<img src="\/uploads\/113851c173a11f0f.jpg">/g, '<img src="/uploads/113851c173a11f0f.jpg" class="w-full max-w-sm rounded-xl shadow-sm">');
           desc = desc.replace(/<img src="\/uploads\/803905ae3e46f521.jpg">/g, '<img src="/uploads/803905ae3e46f521.jpg" class="w-full max-w-sm rounded-xl shadow-sm">');
           desc = desc.replace(/<img src="\/uploads\/6e56e6bb85cbd5a0.jpg">/g, '<img src="/uploads/6e56e6bb85cbd5a0.jpg" class="w-full max-w-sm rounded-xl shadow-sm">');

           await prisma.$executeRawUnsafe(
             'UPDATE Department SET description = ? WHERE name = ?',
             desc,
             'BRACHIAL PLEXUS'
           );
           console.log('Fixed Brachial Plexus images');
       } else {
           console.log('Target string not found in description to insert images.');
       }
    } else {
       console.log('Images string not found in description.');
    }
  } else {
    console.log('Department not found');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
