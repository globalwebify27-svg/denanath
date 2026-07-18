const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_publications' } });
    if (!setting) {
      console.log('No setting found');
      return;
    }
    const val = JSON.parse(setting.value);
    
    // Replace the old heading with a smaller one
    if (val.content.includes('<h3 class="text-xl md:text-2xl font-extrabold')) {
      val.content = val.content.replace(
        '<h3 class="text-xl md:text-2xl font-extrabold text-[#002b5c] mb-6 mt-2">Publications: April 2025 &ndash; March 2026</h3>',
        '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-2">Publications: April 2025 &ndash; March 2026</h4>'
      );
      
      await prisma.siteSetting.update({
        where: { key: 'page_research_publications' },
        data: { value: JSON.stringify(val) }
      });
      console.log('Updated DB successfully with smaller font!');
    } else {
      console.log('Heading not found in the expected format');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}
main();
