const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const items = [
    { title: "Annual Report 2024-2025", link: "#" },
    { title: "Annual Report 2023-2024", link: "#" },
    { title: "Annual Report 2022-2023", link: "#" },
    { title: "Tribute issue (2021-2022)", description: "A tribute to Lata Mangeshkar (1929 - 2022)", link: "#" },
    { title: "Annual Report 2020-2021", link: "#" },
    { title: "Annual Report 2019-2020", link: "#" },
    { title: "Annual Report 2018-2019", link: "#" },
    { title: "Annual Report 2017-2018", link: "#" },
    { title: "Annual Report 2016-2017", link: "#" },
    { title: "Annual Report 2015-2016", link: "#" },
    { title: "Annual Report 2014-2015", link: "#" },
    { title: "Annual Report 2013-2014", link: "#" }
  ];

  const generateHTML = (items) => {
    const microscopeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>`;
    const fileTextSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-slate-400 group-hover:text-[#D9232D] transition-colors duration-300"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`;
    const downloadSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

    const cardsHtml = (items || []).map(report => `
      <div class="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:border-[#003360] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full decoration-transparent">
        <div class="p-6 md:p-8 flex-1 flex flex-col items-center text-center justify-center relative">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-[#002b5c] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
          <div class="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:bg-[#003360]/5 group-hover:border-[#003360]/20 transition-colors duration-300">
            ${fileTextSvg}
          </div>
          <h3 class="text-xl font-bold text-[#002b5c] mb-2 group-hover:text-[#002b5c]">${report.title || ''}</h3>
          ${report.description ? `<p class="text-sm text-slate-500 mb-4 group-hover:text-slate-500">${report.description}</p>` : ''}
        </div>
        <div class="border-t border-slate-100 p-4 bg-slate-50 group-hover:bg-[#003360] transition-colors duration-300 mt-auto">
          <a 
            href="${report.link || '#'}" 
            ${report.link && report.link !== "#" ? 'target="_blank" rel="noopener noreferrer"' : ''}
            class="flex items-center justify-center gap-2 text-[#007a87] group-hover:text-white font-bold text-sm transition-colors decoration-transparent"
          >
            ${downloadSvg}
            Download PDF
          </a>
        </div>
      </div>
    `).join('');

    return `
      <div class="mb-10">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-[#007a87] text-xs font-bold tracking-wider uppercase mb-4">
          ${microscopeSvg}
          <span>Research</span>
        </div>
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#002b5c] mb-6 tracking-tight">
          Annual Reports
        </h2>
        <div class="w-20 h-1.5 bg-[#007a87] rounded-full mb-8"></div>
        <p class="text-slate-600 mb-8 leading-relaxed max-w-3xl">
          Review our annual performance, financial statements, and clinical milestones.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        ${cardsHtml}
      </div>
    `;
  };

  const payload = {
    title: "Annual Reports",
    items: items,
    content: generateHTML(items),
    image: ""
  };
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_annual_reports' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_research_annual_reports', value: JSON.stringify(payload) }
  });
  
  console.log("Successfully seeded page_research_annual_reports");
}

run().catch(console.error).finally(() => prisma.$disconnect());
