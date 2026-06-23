const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const lab3 = await prisma.siteSetting.findUnique({ where: { key: 'page_simulation_lab3' } });
  if (lab3) {
    let data = JSON.parse(lab3.value);
    // Remove any <img> tags and their surrounding <p><span> if they are just wrapping the image
    let newContent = data.content.replace(/<p[^>]*><span[^>]*><img[^>]*><\/span><\/p>/g, "");
    newContent = newContent.replace(/<img[^>]*>/g, ""); // Just in case
    
    data.content = newContent;
    
    await prisma.siteSetting.update({
      where: { key: 'page_simulation_lab3' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Image removed and database updated!");
  }
}
main().finally(() => prisma.$disconnect());
