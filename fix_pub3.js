const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function patch() {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'page_research_publications' } });
    if (!setting) return;
    
    let val = JSON.parse(setting.value);
    
    // Check if the 2023-2024 heading is already injected
    if (val.content.includes('Publications: April 2023 &ndash; March 2024')) {
      console.log('Already injected.');
      return;
    }

    const searchTarget = 'International Delphi Consensus Study on disposable single-use endoscopy';
    const idx = val.content.indexOf(searchTarget);
    
    if (idx !== -1) {
      const strBefore = val.content.substring(0, idx);
      const divIdx = strBefore.lastIndexOf('<div class="bg-white border border-slate-200');
      
      if (divIdx !== -1) {
        val.content = val.content.substring(0, divIdx) + '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2023 &ndash; March 2024</h4>\n      ' + val.content.substring(divIdx);
        
        await prisma.siteSetting.update({
          where: { key: 'page_research_publications' },
          data: { value: JSON.stringify(val) }
        });
        
        console.log("Successfully injected the 2023-2024 header!");
      } else {
        console.log("Error: Could not find the preceding div!");
      }
    } else {
      console.log("Error: Could not find the specific publication title!");
    }
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

patch();
