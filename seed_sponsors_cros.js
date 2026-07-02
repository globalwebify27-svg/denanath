const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const content = execSync('git show 3cd82c7:"src/app/(research)/sponsors-cros/page.tsx"').toString();
  
  // Extract sponsors
  const sponsorsMatch = content.match(/const sponsors = \[([\s\S]*?)\];/);
  let sponsors = [];
  if (sponsorsMatch) {
    sponsors = sponsorsMatch[1].split(',')
      .map(s => s.trim().replace(/^"|"$/g, ''))
      .filter(s => s);
  }

  // Extract cros
  const crosMatch = content.match(/const cros = \[([\s\S]*?)\];/);
  let cros = [];
  if (crosMatch) {
    cros = crosMatch[1].split(',')
      .map(s => s.trim().replace(/^"|"$/g, ''))
      .filter(s => s);
  }

  const generateHTML = (sponsors, cros) => {
    const buildingSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-blue-600"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`;
    const briefcaseSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#007a87]"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;

    const sponsorsHtml = (sponsors || []).map(sponsor => `
      <div class="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] transition-all group cursor-default">
        <div class="w-2 h-2 rounded-full bg-teal-400 group-hover:bg-[#D9232D] group-hover:scale-150 transition-all duration-300 shrink-0"></div>
        <span style="font-size: 18px;" class="text-slate-700 font-medium group-hover:text-[#007a87] transition-colors">${sponsor}</span>
      </div>
    `).join('');

    const crosHtml = (cros || []).map(cro => `
      <div class="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] transition-all group cursor-default">
        <div class="w-2 h-2 rounded-full bg-teal-400 group-hover:bg-[#D9232D] group-hover:scale-150 transition-all duration-300 shrink-0"></div>
        <span style="font-size: 18px;" class="text-slate-700 font-medium group-hover:text-[#007a87] transition-colors">${cro}</span>
      </div>
    `).join('');

    return `
      <p class="text-slate-600 mb-8 leading-relaxed max-w-3xl">
        We collaborate with leading pharmaceutical companies and Clinical Research Organizations to bring cutting-edge trials to our patients.
      </p>

      <div class="space-y-12">
        <div>
          <div class="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              ${buildingSvg}
            </div>
            <h3 class="text-2xl font-extrabold text-[#002b5c]">
              Clinical Trial Research – Sponsors
            </h3>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${sponsorsHtml}
          </div>
        </div>

        <div>
          <div class="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
            <div class="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
              ${briefcaseSvg}
            </div>
            <h3 class="text-2xl font-extrabold text-[#002b5c]">
              Contract Research Organizations (CROs)
            </h3>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            ${crosHtml}
          </div>
        </div>
      </div>
    `;
  };

  const payload = {
    title: "Sponsors & CROs",
    sponsors: sponsors,
    cros: cros,
    content: generateHTML(sponsors, cros),
    image: ""
  };
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_sponsors_cros' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_research_sponsors_cros', value: JSON.stringify(payload) }
  });
  
  console.log("Successfully seeded page_research_sponsors_cros");
}

run().catch(console.error).finally(() => prisma.$disconnect());
