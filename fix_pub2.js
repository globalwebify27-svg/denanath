const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function patch() {
  try {
    const raw = fs.readFileSync('publications_db.txt', 'utf8');
    const data = JSON.parse(raw);
    
    // Check if we accidentally added it to the FIRST occurrence and remove it
    const incorrectStr = '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-200 pt-8">Publications: April 2024 &ndash; March 2025</h4>\\n      <div class="bg-white border border-slate-200 p-6 rounded-2xl';
    
    // Wait, the easiest way to fix it properly:
    // Just restore from `publications_db.txt` again, to clear any bad state.
    // And inject exactly where we want.
    if (!data.content.includes('Publications: April 2025')) {
      data.content = data.content.replace('<div class="space-y-6">', '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-2">Publications: April 2025 &ndash; March 2026</h4><div class="space-y-6">');
    } else {
      data.content = data.content.replace('<h3 class="text-xl md:text-2xl font-extrabold text-[#002b5c] mb-6 mt-2">Publications: April 2025 &ndash; March 2026</h3>', '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-2">Publications: April 2025 &ndash; March 2026</h4>');
    }

    // Now for the second header (April 2024 - March 2025)
    // We want it before the (March 2025) one. Let's find the exact block.
    
    // If the old wrong header exists, remove it:
    data.content = data.content.replace('<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-200 pt-8">Publications: April 2024 &ndash; March 2025</h4>\\n      ', '');
    data.content = data.content.replace('<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-200 pt-8">Publications: April 2024 &ndash; March 2025</h4>\n      ', '');

    const searchTarget = `        <div class="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
          <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
            Genetic Counselling, Testing, and Management of Hereditary Breast and Ovarian Cancer Syndrome in India: Updated Expert Consensus Recommendations from Indian Society of Medical and Pediatric Oncology.
          </p>
          <p class="text-slate-600 text-sm mb-3">
            <span class="font-semibold text-slate-800">Malhotra H, Pramanik R, Srinivas S, Kotwal P, Mehra N, Kulkarni P,et al. (March 2025).</span>`;
            
    if (data.content.includes(searchTarget)) {
       data.content = data.content.replace(searchTarget, '<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2024 &ndash; March 2025</h4>\n' + searchTarget);
       console.log("Successfully injected header before the correct March 2025 publication!");
    } else {
       console.log("Error: Could not find exact search target block!");
    }
    
    await prisma.siteSetting.update({
      where: { key: 'page_research_publications' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Updated DB.");
  } catch(e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

patch();
