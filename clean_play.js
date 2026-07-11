const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const dept = await prisma.department.findUnique({
    where: { id: 'cmpxpxqyl001zp31m2gkffu58' }
  });
  
  let html = dept.description || '';
  
  // Use 'gs' flags so .* matches newlines
  const cleanHtml = html.replace(/(<p[^>]*>.*?<img[^>]+>)\s*(.*?)(<\/p>)/gs, (match, imgPart, textPart, endP) => {
    if (!textPart.trim()) {
      return match;
    }
    return `${imgPart}</p><p class="mt-2 text-slate-700 clear-both block w-full">${textPart.trim()}</p>`;
  });
  
  fs.writeFileSync('play_description_clean.html', cleanHtml, 'utf8');
  
  await prisma.department.update({
    where: { id: 'cmpxpxqyl001zp31m2gkffu58' },
    data: { description: cleanHtml }
  });
  
  console.log("Updated PLAY THERAPY description");
}

main().catch(console.error).finally(() => prisma.$disconnect());
