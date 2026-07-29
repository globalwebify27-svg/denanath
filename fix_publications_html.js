const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateHTML = (publications, archives) => {
    let pubHtml = '';
    for (const pub of (publications || [])) {
      if (pub.isHeader) {
        pubHtml += `\n<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">${pub.title}</h4>\n`;
      } else {
        let doiHtml = '';
        if (pub.doi) {
          let doiVal = pub.doi.replace(/DOI:\s*/i, '').replace(/doi:\s*/i, '').trim();
          doiHtml = `
            <a href="https://doi.org/${doiVal}" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1 break-all">
              DOI: ${doiVal}
            </a>
          `;
        }
        
        pubHtml += `
        <div class="bg-white border border-slate-200 mb-6 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
          <div class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
            ${pub.title || ''}
          </div>
          <div class="text-slate-600 text-sm mb-3">
            <span class="font-semibold text-slate-800">${pub.authorsDate || ''}</span>
          </div>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
              ${pub.journal || ''}
            </span>
            ${doiHtml}
          </div>
        </div>
        `;
      }
    }

    const arcHtml = (archives || []).map(arc => `
      <a href="${arc.link || '#'}" class="bg-white border border-slate-200 p-4 rounded-xl font-bold text-[#007a87] hover:bg-[#003360] hover:text-white hover:border-[#003360] hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:-translate-y-1 transition-all shadow-sm flex items-center justify-center text-sm md:text-base decoration-transparent">
        ${arc.year || ''}
      </a>
    `).join('');

    return `
      <div class="space-y-12">
        <div>
          <div class="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <h3 class="text-2xl md:text-3xl font-extrabold text-[#002b5c] flex items-center gap-3">
              <span class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </span>
              Recent Publications
            </h3>
          </div>
          <div class="space-y-6">
            ${pubHtml}
          </div>
        </div>

        <div class="bg-slate-50 border border-slate-200 rounded-3xl p-8 text-center relative overflow-hidden group">
          <div class="relative z-10">
            <h3 class="text-2xl font-black text-[#002b5c] mb-4 group-hover:text-[#007a87] transition-colors">Archive Years</h3>
            <p class="text-slate-600 max-w-xl mx-auto mb-8 relative z-10 leading-relaxed">
              Explore our extensive history of clinical research, including hundreds of national and international publications across various medical disciplines.
            </p>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
              ${arcHtml}
            </div>
          </div>
        </div>
      </div>
    `;
};

async function main() {
  const settings = await prisma.siteSetting.findUnique({
    where: { key: 'page_research_publications' }
  });
  if (settings) {
    const data = JSON.parse(settings.value);
    const newContent = generateHTML(data.publications || [], data.archives || []);
    data.content = newContent;
    await prisma.siteSetting.update({
      where: { key: 'page_research_publications' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Successfully regenerated HTML for page_research_publications!");
  } else {
    console.log("No data found for page_research_publications.");
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
