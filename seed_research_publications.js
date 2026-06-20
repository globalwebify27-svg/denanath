const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const buffer = execSync('git show 3cd82c7:src/app/(research)/publications/page.tsx');
  const fileContent = buffer.toString('utf-8');
  
  let startStr = '<div className="space-y-12">';
  let startIdx = fileContent.indexOf(startStr);
  
  let endStr = '</div>\n          </div>\n\n        </div>\n      </div>\n    </div>\n  );\n}';
  let endIdx = fileContent.indexOf(endStr);
  if (endIdx === -1) endIdx = fileContent.indexOf('</div>\r\n          </div>\r\n\r\n        </div>\r\n      </div>\r\n    </div>\r\n  );\r\n}');
  if (endIdx === -1) endIdx = fileContent.lastIndexOf('</div>\n          </div>');
  
  let html = fileContent.substring(startIdx, endIdx);
  
  // Convert JSX to HTML
  html = html.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  html = html.replace(/className=/g, 'class=');
  html = html.replace(/strokeWidth=/g, 'stroke-width=');
  html = html.replace(/strokeLinecap=/g, 'stroke-linecap=');
  html = html.replace(/strokeLinejoin=/g, 'stroke-linejoin=');
  html = html.replace(/<>\s*/g, '');
  html = html.replace(/<\/>\s*/g, '');
  
  // Handle the map for years
  const yearsMapRegex = /\{\s*\["2024 - 2025"[\s\S]*?\]\.map\(\(year, idx\) => \([\s\S]*?\{year\}[\s\S]*?<\/a>\s*\)\)\s*\}/;
  const match = html.match(yearsMapRegex);
  
  if (match) {
    const years = ["2024 - 2025", "2023 - 2024", "2022 - 2023", "2021 - 2022", "2020 - 2021", "2019 - 2020", "2018 - 2019", "2017 - 2018"];
    const generatedHtml = years.map(year => `
      <a href="#" class="bg-white border border-slate-200 p-4 rounded-xl font-bold text-[#007a87] hover:bg-[#003360] hover:text-white hover:border-[#003360] hover:shadow-[0_8px_30px_rgba(0,51,96,0.15)] hover:-translate-y-1 transition-all shadow-sm flex items-center justify-center text-sm md:text-base decoration-transparent">
        ${year}
      </a>
    `).join('');
    
    html = html.replace(yearsMapRegex, generatedHtml);
  }

  // Strip showAll React state logic
  html = html.replace(/\{showAll2025 && \(/g, '');
  html = html.replace(/\n\s*\)\}/g, '');
  
  // Remove the button block
  const buttonBlockRegex = /<div class="mt-8">\s*<button[\s\S]*?<\/button>\s*<\/div>/g;
  html = html.replace(buttonBlockRegex, '');
  
  // Also, there might be other buttons or `{show... && (` inside the file, let's just make sure we strip them.
  // Wait, there might be other `{showAll2024 && (`?
  html = html.replace(/\{showAll[A-Za-z0-9_]* && \(/g, '');
  html = html.replace(/<button[^>]*onClick=\{[^}]*\}[^>]*>[\s\S]*?<\/button>/g, '');

  const payload = {
    title: "Publications",
    content: html,
    image: ""
  };
  
  await prisma.siteSetting.upsert({
    where: { key: 'page_research_publications' },
    update: { value: JSON.stringify(payload) },
    create: { key: 'page_research_publications', value: JSON.stringify(payload) }
  });
  
  console.log("Successfully seeded page_research_publications");
}

run().catch(console.error).finally(() => prisma.$disconnect());
