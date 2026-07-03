const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const dept = await prisma.department.findFirst({ where: { name: 'RHEUMATOLOGY' } });
    if (dept) {
      // Replace the previous margin styling with a uniform margin to create an even, consistent gap
      // This will also override the global my-6 tailwind class that was making the vertical gap huge.
      const updatedHtml = dept.description.replace(
        /margin-right: 10px; margin-bottom: 10px;/g, 
        'margin: 16px !important;'
      );

      await prisma.department.update({
        where: { id: dept.id },
        data: { description: updatedHtml }
      });
      console.log('Updated RHEUMATOLOGY image gaps.');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
main();
