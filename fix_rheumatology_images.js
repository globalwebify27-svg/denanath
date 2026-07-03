const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const dept = await prisma.department.findFirst({ where: { name: 'RHEUMATOLOGY' } });
    if (dept) {
      // Add inline styles for specific dimensions. Using !important just in case global tailwind classes interfere.
      let updatedHtml = dept.description.replace(
        /<img\s+(?![^>]*style=)[^>]*src=/gi, 
        (match) => match.replace('src=', 'style="width: 295px !important; height: 184px !important; object-fit: cover; margin-right: 10px; margin-bottom: 10px; display: inline-block;" src=')
      );
      
      // If some imgs already have styles, we might need a more complex replace, but based on current HTML, they don't.
      if (!updatedHtml.includes('295px')) {
          updatedHtml = dept.description.replace(/<img /g, '<img style="width: 295px !important; height: 184px !important; object-fit: cover; margin-right: 10px; margin-bottom: 10px; display: inline-block;" ');
      }

      await prisma.department.update({
        where: { id: dept.id },
        data: { description: updatedHtml }
      });
      console.log('Updated RHEUMATOLOGY images.');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
main();
