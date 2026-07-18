const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function restore() {
  try {
    const raw = fs.readFileSync('publications_db.txt', 'utf8');
    const data = JSON.parse(raw);
    
    // Inject the first header if it was missing
    if (!data.content.includes('Publications: April 2025')) {
      data.content = data.content.replace('<div class="space-y-6">', '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-2">Publications: April 2025 &ndash; March 2026</h4><div class="space-y-6">');
    } else {
      // make sure it's the right size
      data.content = data.content.replace('<h3 class="text-xl md:text-2xl font-extrabold text-[#002b5c] mb-6 mt-2">Publications: April 2025 &ndash; March 2026</h3>', '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-2">Publications: April 2025 &ndash; March 2026</h4>');
    }

    // Inject the second header above "Genetic Counselling" card
    if (!data.content.includes('Publications: April 2024 &ndash; March 2025')) {
      // Find the card starting with Genetic Counselling
      // We can do a string replace since it's an exact string in the HTML
      const searchStr = '<p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">\n          Genetic Counselling, Testing, and Management of Hereditary Breast and Ovarian Cancer Syndrome in India: Updated Expert Consensus Recommendations from Indian Society of Medical and Pediatric Oncology.';
      
      const replaceStr = '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2024 &ndash; March 2025</h4>\n      <div class="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">\n        ' + searchStr;
      
      // Wait, let's just replace the div class="bg-white..." that contains this string
      const fullSearch = '<div class="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">\n        <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">\n          Genetic Counselling, Testing, and Management of Hereditary Breast and Ovarian Cancer Syndrome in India: Updated Expert Consensus Recommendations from Indian Society of Medical and Pediatric Oncology.';
      
      if (data.content.includes(fullSearch)) {
        data.content = data.content.replace(fullSearch, '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2024 &ndash; March 2025</h4>\n      ' + fullSearch);
      } else {
        console.log("Could not find the exact match for the second header injection. Doing fallback.");
        const fallbackSearch = 'Genetic Counselling, Testing, and Management of Hereditary Breast and Ovarian Cancer Syndrome in India: Updated Expert Consensus Recommendations from Indian Society of Medical and Pediatric Oncology.';
        const idx = data.content.indexOf(fallbackSearch);
        if (idx !== -1) {
          // Find the preceding `<div class="bg-white border`
          const strBefore = data.content.substring(0, idx);
          const divIdx = strBefore.lastIndexOf('<div class="bg-white border border-slate-200');
          if (divIdx !== -1) {
            data.content = data.content.substring(0, divIdx) + '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-200 pt-8">Publications: April 2024 &ndash; March 2025</h4>\n      ' + data.content.substring(divIdx);
          }
        }
      }
    }
    
    await prisma.siteSetting.upsert({
      where: { key: 'page_research_publications' },
      update: { value: JSON.stringify(data) },
      create: { key: 'page_research_publications', value: JSON.stringify(data) }
    });
    console.log("Successfully restored and patched publications DB!");
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

restore();
