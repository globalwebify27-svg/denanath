const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const ids = ['hypoxic-training-center', 'posture-pain-clinic', 'knee-specialty-clinic'];

  for (const id of ids) {
    const dep = await prisma.department.findUnique({ where: { id } });
    if (!dep || !dep.description) continue;

    // Use regex to strip width and height attributes from img tags
    let newHtml = dep.description.replace(/<img([^>]*)>/gi, (match, p1) => {
       let newAttrs = p1
          .replace(/\bwidth\s*=\s*["'][^"']*["']/gi, '')
          .replace(/\bheight\s*=\s*["'][^"']*["']/gi, '')
          .replace(/\bstyle\s*=\s*["'][^"']*["']/gi, ''); // Also remove any inline styling on the image
       return `<img${newAttrs}>`;
    });

    await prisma.department.update({
      where: { id },
      data: { description: newHtml }
    });
    console.log(`Updated images in backend for: ${id}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
