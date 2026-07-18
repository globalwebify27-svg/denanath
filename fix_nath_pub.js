const fs = require('fs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  const current = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const currentData = JSON.parse(current.value);
  
  // Find the bad card(s)
  const idx1 = currentData.content.indexOf('Jathar K, Singh G, Pissurlencar S. (January-March 2025).');
  const startCard1 = currentData.content.lastIndexOf('<div class="bg-white', idx1);
  
  const idx2 = currentData.content.indexOf('DOI: 10.14569/IJACSA.2023.0141082');
  let endCard2 = currentData.content.indexOf('</div>', idx2);
  endCard2 = currentData.content.indexOf('</div>', endCard2 + 1);
  endCard2 = currentData.content.indexOf('</div>', endCard2 + 1) + 6;
  
  console.log('Replacing from', startCard1, 'to', endCard2);
  console.log('Content being replaced:', currentData.content.substring(startCard1, endCard2));
  
  // The correct HTML for the three publications:
  // 1. Jathar K (Since there's no title, let's use the Journal as title if needed, or just leave title empty)
  // 2. 84. Nath D
  // 3. DOI for 84. Nath D
  const correctHtml = `
      <div class="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
        <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
          
        </p>
        <p class="text-slate-600 text-sm mb-3">
          <span class="font-semibold text-slate-800">Jathar K, Singh G, Pissurlencar S. (January-March 2025).</span>
        </p>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
            Indian J Otolaryngol Head Neck Surg. 75(Suppl 1):1113-1115. Epub 2023 Mar 16. PMID: 37206745; PMCID: PMC10188762.
          </span>
          <a href="https://doi.org/10.1007/s12070-023-03671-y" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1 break-all">
            DOI: 10.1007/s12070-023-03671-y
          </a>
        </div>
      </div>
      
      <div class="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
        <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
          Investigations of Modified Functional Connectivity at Rest in Drug-Resistant Temporal Lobe Epilepsy Patients.
        </p>
        <p class="text-slate-600 text-sm mb-3">
          <span class="font-semibold text-slate-800">84. Nath D, Hiwale A, Kurwale N, Patil CY. (April 2023)</span>
        </p>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
            International Journal of Advanced Computer Science and Applications. 14(10):774-782.
          </span>
          <a href="https://doi.org/10.14569/IJACSA.2023.0141082" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1 break-all">
            DOI: 10.14569/IJACSA.2023.0141082
          </a>
        </div>
      </div>
  `;
  
  const newContent = currentData.content.substring(0, startCard1) + correctHtml + currentData.content.substring(endCard2);
  
  const payload = {
    title: "Publications",
    content: newContent
  };
  
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(payload) }
  });
  console.log('Fixed the Jathar and Nath cards in DB!');
}

fix().catch(console.error).finally(()=>prisma.$disconnect());
