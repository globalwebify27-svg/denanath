const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const data = {
    address: "14th Floor Super Speciality Building, Deenanath Mangeshkar Hospital and Research Centre",
    emails: ["research@dmhospital.org", "iec@dmhospital.org", "test.research@dmhrc.org"],
    personnel: [
      {
        name: "Dr. Vaijayanti V. Pethe",
        designation: "Assistant Director, Research",
        email: "pethev@dmhospital.org"
      }
    ]
  };

  const generateHTML = (address, emails, personnel) => {
    const buildingSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-[#007a87] group-hover:text-[#D9232D] transition-colors"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`;
    const mapPinSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-teal-500 group-hover:text-[#D9232D] shrink-0 mt-1 transition-colors"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
    const mailSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-teal-500 group-hover:text-[#D9232D] shrink-0 transition-colors"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
    const userSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-[#002b5c] group-hover:text-[#003360] transition-colors"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    const smallMailSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-slate-400 group-hover:text-[#003360] shrink-0 transition-colors"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;

    const emailLinks = (emails || []).map(e => `<a href="mailto:${e}" class="text-[#007a87] font-medium hover:underline">${e}</a>`).join('<span class="text-slate-300">|</span>');

    const personnelHtml = (personnel || []).map(p => `
      <div class="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:border-[#003360] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div class="absolute top-0 left-0 w-2 h-full bg-[#002b5c]"></div>
        <div class="flex items-center gap-4 mb-2">
          <div class="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
            ${userSvg}
          </div>
          <div>
            <h3 class="text-xl font-bold text-[#002b5c]">${p.name || ''}</h3>
            ${p.designation ? `<p class="text-[#007a87] font-medium text-sm uppercase tracking-wider">${p.designation}</p>` : ''}
          </div>
        </div>
        
        ${p.email ? `
        <div class="mt-6 space-y-4 text-slate-600 ml-16">
          <div class="flex items-center gap-3">
            ${smallMailSvg}
            <a href="mailto:${p.email}" class="text-slate-600 hover:text-[#007a87] transition-colors">${p.email}</a>
          </div>
        </div>
        ` : ''}
      </div>
    `).join('');

    return `
      <div class="space-y-8">
        <div class="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 hover:shadow-[0_8px_30px_rgba(217,35,45,0.15)] hover:border-[#D9232D] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div class="absolute top-0 left-0 w-2 h-full bg-[#D9232D]"></div>
          <h3 class="text-2xl font-bold text-[#002b5c] mb-6 flex items-center gap-3">
            ${buildingSvg}
            Department Of Research
          </h3>
          
          <div class="space-y-4 text-slate-600">
            ${address ? `
            <div class="flex items-start gap-4">
              ${mapPinSvg}
              <p class="leading-relaxed whitespace-pre-line">${address}</p>
            </div>
            ` : ''}
            
            ${emails && emails.length > 0 ? `
            <div class="flex items-center gap-4">
              ${mailSvg}
              <div class="flex flex-wrap gap-2">
                ${emailLinks}
              </div>
            </div>
            ` : ''}
          </div>
        </div>

        ${personnelHtml}
      </div>
    `;
  };

  const payload = {
    title: "Contact Us",
    ...data,
    content: generateHTML(data.address, data.emails, data.personnel),
    image: ""
  };
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_research_contact' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_research_research_contact', value: JSON.stringify(payload) }
  });
  
  console.log("Successfully seeded page_research_research_contact");
}

run().catch(console.error).finally(() => prisma.$disconnect());
