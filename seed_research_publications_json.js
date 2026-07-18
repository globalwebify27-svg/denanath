const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const cheerio = require('cheerio');
const prisma = new PrismaClient();

async function run() {
  const buffer = execSync('git show 3cd82c7:src/app/(research)/publications/page.tsx');
  const fileContent = buffer.toString('utf-8');
  
  // Extract everything inside <div className="space-y-6"> which holds the publications
  // Wait, there are multiple "space-y-6" for each year. 
  // Let's just load the whole file in cheerio by wrapping it
  
  // Clean up JSX to make it parsable HTML
  let html = fileContent.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  html = html.replace(/className=/g, 'class=');
  html = html.replace(/<>\s*/g, '<div>');
  html = html.replace(/<\/>\s*/g, '</div>');
  html = html.replace(/\{showAll2025 && \(/g, '');
  html = html.replace(/\n\s*\)\}/g, '');
  
  const $ = cheerio.load(`<body>${html}</body>`);
  const publications = [];
  
  // Find all publication cards
  // They are divs with bg-white border border-slate-200 p-6 rounded-2xl
  $('div.bg-white.border.border-slate-200.p-6.rounded-2xl').each((i, el) => {
    const pub = $(el);
    const title = pub.find('p.text-\\[\\#002b5c\\]').text().trim();
    if (!title) return; // skip if not a pub card
    
    // Authors and date
    const authorsDateText = pub.find('p.text-slate-600').text().trim();
    // Journal
    const journal = pub.find('span.bg-slate-50').text().trim();
    // DOI
    const doiHref = pub.find('a[href^="https://doi.org/"], a[href*="dx.doi.org"]').attr('href');
    let doi = "";
    if (doiHref) {
      doi = doiHref.split('doi.org/')[1] || doiHref;
    } else {
      const doiText = pub.find('a').text().trim();
      if (doiText.includes('DOI:')) {
        doi = doiText.replace('DOI:', '').trim();
      }
    }
    
    publications.push({
      title,
      authorsDate: authorsDateText,
      journal,
      doi
    });
  });

  const archives = [
    { year: "2024 - 2025", link: "#" },
    { year: "2023 - 2024", link: "#" },
    { year: "2022 - 2023", link: "#" },
    { year: "2021 - 2022", link: "#" },
    { year: "2020 - 2021", link: "#" },
    { year: "2019 - 2020", link: "#" },
    { year: "2018 - 2019", link: "#" },
    { year: "2017 - 2018", link: "#" }
  ];

  const payload = {
    title: "Publications",
    publications,
    archives
  };
  
  const pubHtml = publications.map(pub => {
    let doiHtml = '';
    if (pub.doi) {
      doiHtml = `
        <a href="https://doi.org/${pub.doi.replace('DOI:', '').replace('doi:', '').trim()}" target="_blank" rel="noopener noreferrer" class="text-[#007a87] hover:underline font-medium inline-flex items-center gap-1 break-all">
          DOI: ${pub.doi.replace('DOI:', '').replace('doi:', '').trim()}
        </a>
      `;
    }

    let extraHeading = '';
    if (pub.title.includes('Genetic Counselling, Testing, and Management of Hereditary Breast and Ovarian Cancer Syndrome in India')) {
      extraHeading = `<h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-12 border-t border-slate-100 pt-8">Publications: April 2024 &ndash; March 2025</h4>`;
    }

    return `
      ${extraHeading}
      <div class="bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all group">
        <p class="text-[#002b5c] font-bold mb-2 group-hover:text-[#007a87] transition-colors">
          ${pub.title}
        </p>
        <p class="text-slate-600 text-sm mb-3">
          <span class="font-semibold text-slate-800">${pub.authorsDate}</span>
        </p>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span class="inline-flex items-center text-slate-500 bg-slate-50 px-2 py-1 rounded">
            ${pub.journal}
          </span>
          ${doiHtml}
        </div>
      </div>
    `;
  }).join('');

  const arcHtml = archives.map(arc => `
    <a href="${arc.link}" class="bg-white border border-slate-200 p-4 rounded-xl font-bold text-[#007a87] hover:bg-[#003360] hover:text-white hover:border-[#003360] hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:-translate-y-1 transition-all shadow-sm flex items-center justify-center text-sm md:text-base decoration-transparent">
      ${arc.year}
    </a>
  `).join('');

  payload.content = `
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
          <h4 class="text-base md:text-lg font-bold text-[#002b5c] mb-6 mt-2">Publications: April 2025 &ndash; March 2026</h4>
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
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_publications' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_research_publications', value: JSON.stringify(payload) }
  });
  
  console.log("Successfully seeded page_research_publications with parsed data. Total pubs: " + publications.length);
}

run().catch(console.error).finally(() => prisma.$disconnect());
