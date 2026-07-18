const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixArchive() {
  const current = await prisma.siteSetting.findUnique({where:{key: 'page_research_publications'}});
  const currentData = JSON.parse(current.value);
  
  const content = currentData.content;
  const gridStart = content.indexOf('<div class="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">');
  const gridEnd = content.indexOf('</div>', gridStart) + 6;
  
  const years = [
    '2025 - 2026',
    '2024 - 2025',
    '2023 - 2024',
    '2022 - 2023',
    '2021 - 2022',
    '2020 - 2021',
    '2019 - 2020',
    '2018 - 2019',
    '2017 - 2018',
    '2016 - 2017',
    '2015 - 2016',
    '2014 - 2015',
    '2013 - 2014'
  ];
  
  let gridHtml = '<div class="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">\n';
  for (const year of years) {
    gridHtml += `
      <a href="#" class="bg-white border border-slate-200 p-4 rounded-xl font-bold text-[#007a87] hover:bg-[#003360] hover:text-white hover:border-[#003360] hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:-translate-y-1 transition-all shadow-sm flex items-center justify-center text-sm md:text-base decoration-transparent">
        ${year}
      </a>
    `;
  }
  gridHtml += '            </div>';
  
  const finalHtml = content.substring(0, gridStart) + gridHtml + content.substring(gridEnd);
  
  const payload = {
    title: "Publications",
    content: finalHtml
  };
  
  await prisma.siteSetting.update({
    where: { key: 'page_research_publications' },
    data: { value: JSON.stringify(payload) }
  });
  console.log('Fixed Archive section!');
}

fixArchive().catch(console.error).finally(() => prisma.$disconnect());
