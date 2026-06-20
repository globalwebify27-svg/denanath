const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const items = [
  { title: "May - August 2017", link: "https://www.dmhospital.org/cms/Media/file/DMHRC-Newsletter-May-2017-Epilepsy.pdf" },
  { title: "January - April 2017", link: "https://www.dmhospital.org/cms/Media/file/Newsletter_Jan_Apr_2017.pdf" },
  { title: "September - December 2016", link: "#" },
  { title: "May - August 2016", link: "#" },
  { title: "January - April 2016", link: "#" },
  { title: "September - December 2015", link: "#" },
  { title: "May - August 2015", link: "#" },
  { title: "January - April 2015", link: "#" },
  { title: "May - August Marathi 2013", link: "#" },
  { title: "May - August 2013", link: "#" },
  { title: "January - April Marathi 2013", link: "#" },
  { title: "January - April 2013", link: "#" }
];

const fileTextSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`;

const downloadSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

async function run() {
  const cardsHtml = items.map(item => {
    const target = item.link !== "#" ? ` target="_blank" rel="noopener noreferrer"` : "";
    return `
      <a href="${item.link}"${target} class="group bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:bg-red-50/10 hover:-translate-y-1 transition-all flex flex-col justify-between h-full decoration-transparent">
        <div>
          <div class="w-12 h-12 rounded-xl bg-teal-100 text-[#007a87] flex items-center justify-center mb-4 group-hover:bg-[#D9232D] group-hover:text-white transition-colors">
            ${fileTextSvg}
          </div>
          <h3 class="text-lg font-bold text-[#002b5c] mb-2 group-hover:text-[#007a87] transition-colors leading-snug">
            ${item.title}
          </h3>
          <p class="text-sm text-slate-500 font-medium mb-6">
            Newsletter Edition
          </p>
        </div>
        
        <div class="flex items-center text-sm font-bold text-[#007a87] group-hover:text-[#002b5c] transition-colors gap-2">
          ${downloadSvg}
          Download PDF
        </div>
      </a>
    `;
  }).join('');

  const html = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${cardsHtml}</div>`;

  const payload = {
    title: "Newsletter Articles",
    content: html,
    image: ""
  };
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_newsletter_articles' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_research_newsletter_articles', value: JSON.stringify(payload) }
  });
  
  console.log("Successfully seeded page_research_newsletter_articles");
}

run().catch(console.error).finally(() => prisma.$disconnect());
