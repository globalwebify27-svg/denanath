const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const generateHTML = (currentData) => {
    const awardsHtml = (currentData.awards || []).map((award) => `
      <div class="relative pl-0 md:pl-14 pt-2 mb-10">
        <div class="hidden md:block absolute left-[19px] top-2 bottom-0 w-0.5 bg-slate-200"></div>
        <div class="relative z-10 flex flex-col items-start">
          <div class="bg-[#007a87] text-white text-sm font-bold py-1.5 px-5 rounded-full shadow-sm mb-4 md:-ml-14">
            ${award.yearLabel}
          </div>
          <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-4 w-full">
            ${(award.items || []).map((item) => `
              <div class="flex gap-3">
                <div class="text-yellow-500 mt-1 shrink-0">•</div>
                <p class="text-slate-600 leading-relaxed text-sm line-clamp-3">${item.replace(/^(.+?)\s*([–-])/g, '<strong class="text-slate-800">$1</strong> $2')}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');

    const grantsHtml = (currentData.grants || []).map((grant) => `
      <div class="bg-slate-50 border border-slate-200 rounded-2xl p-6 relative overflow-hidden group hover:bg-green-50/30 transition-colors">
        <div class="absolute top-0 left-0 w-1 h-full bg-green-500 group-hover:bg-green-600 transition-colors"></div>
        <div class="text-green-600 font-extrabold text-sm mb-3 uppercase tracking-wider">${grant.year}</div>
        <p class="text-slate-700 font-bold mb-2">${grant.name}</p>
        <p class="text-slate-500 text-sm mb-3 italic">${grant.department}</p>
        <p class="text-slate-600 text-sm leading-relaxed">
          ${grant.details}
        </p>
      </div>
    `).join('');

    const pastGrantsHtml = (currentData.pastGrants || []).map((grant) => `
      <div class="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-200 transition-colors">
        <p class="text-slate-800 font-bold mb-1">${grant.name}</p>
        <p class="text-[#007a87] text-sm font-semibold mb-2">${grant.type}</p>
        <p class="text-slate-600 text-sm leading-relaxed">${grant.details}</p>
      </div>
    `).join('');

    return `
      <div>
        <h3 class="text-2xl md:text-3xl font-extrabold text-[#002b5c] mb-8 flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
          </span>
          AWARDS
        </h3>
        
        <div class="space-y-12">
          ${awardsHtml}
        </div>
      </div>

      <div class="h-px bg-slate-200 w-full my-12"></div>

      <div>
        <h3 class="text-2xl md:text-3xl font-extrabold text-[#002b5c] mb-8 flex items-center gap-3">
          <span class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </span>
          GRANTS RECEIVED
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          ${grantsHtml}
        </div>

        ${pastGrantsHtml ? `
        <h4 class="text-xl font-bold text-[#007a87] mb-6">PAST GRANTS RECEIVED</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${pastGrantsHtml}
        </div>
        ` : ''}
      </div>
    `;
};

async function run() {
  const record = await prisma.siteSetting.findUnique({ where: { key: 'page_research_awards' } });
  if (record) {
    const data = JSON.parse(record.value);
    data.content = generateHTML(data);
    await prisma.siteSetting.update({
      where: { key: 'page_research_awards' },
      data: { value: JSON.stringify(data) }
    });
    console.log('Database updated!');
  }
}

run().catch(console.error).finally(() => prisma.$disconnect());
